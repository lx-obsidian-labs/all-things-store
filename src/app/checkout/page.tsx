"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Lock,
  Minus,
  Plus,
  Shield,
  Trash2,
  Truck,
  Zap,
  Check,
  Loader2,
  MapPin,
  Mail,
  User,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { orderConfirmationEmail } from "@/lib/email-templates";

const STEPS = [
  { key: "contact", label: "Contact", icon: Mail },
  { key: "shipping", label: "Shipping", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
];

const COUNTRIES = [
  "United States", "South Africa", "Nigeria", "United Kingdom",
  "Germany", "France", "Kenya", "Ghana", "Morocco", "Egypt",
  "India", "China", "Japan", "Australia", "Canada", "Brazil",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  emailConfirm?: string;
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  phone?: string;
}

type ShippingMethod = "standard" | "express";

const SHIPPING_OPTIONS: Record<
  ShippingMethod,
  { label: string; fee: number; days: string }
> = {
  standard: { label: "Standard Shipping", fee: 0, days: "10-15 business days" },
  express: {
    label: "Express Shipping",
    fee: 12.99,
    days: "5-7 business days",
  },
};

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const { format: fmt } = useCurrency();

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState<string>("contact");

  const submittingRef = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  const shippingFee = subtotal >= 50 ? SHIPPING_OPTIONS[shippingMethod].fee : 4.99;
  const displayShipping =
    subtotal >= 50
      ? shippingFee
      : Math.max(4.99, shippingFee);
  const total = subtotal + displayShipping;

  if (items.length === 0) {
    return (
      <div className="section-padding mx-auto max-w-7xl text-center">
        <div className="glass-card mx-auto max-w-md py-16">
          <h1 className="mb-2 font-display text-2xl text-white">Your cart is empty</h1>
          <p className="mb-6 text-obsidian-400">Add some items before checking out.</p>
          <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!email) e.email = "Email is required";
    else if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address";
    if (email && emailConfirm && email !== emailConfirm) e.emailConfirm = "Emails do not match";
    if (!name) e.name = "Full name is required";
    if (!address) e.address = "Address is required";
    if (!city) e.city = "City is required";
    if (!country) e.country = "Select your country";
    if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone))
      e.phone = "Enter a valid phone number (e.g. +1234567890)";
    return e;
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function scrollToTop() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToStep(step: string) {
    const fieldErrors = validate();
    if (step === "shipping" || step === "payment") {
      const required = step === "shipping"
        ? { email: true, emailConfirm: true, name: true }
        : { email: true, emailConfirm: true, name: true, address: true, city: true, country: true };
      const hasErrors = Object.keys(required).some((f) => fieldErrors[f as keyof FieldErrors]);
      if (hasErrors) {
        setErrors(fieldErrors);
        setTouched(Object.keys(required).reduce((acc, f) => ({ ...acc, [f]: true }), {}));
        scrollToTop();
        return;
      }
    }
    setActiveStep(step);
    scrollToTop();
  }

  function isStepComplete(step: string): boolean {
    const e = validate();
    switch (step) {
      case "contact": return !!email && EMAIL_RE.test(email);
      case "shipping": return !!name && !!email && EMAIL_RE.test(email);
      case "payment": return !!address && !!city && !!country;
      default: return false;
    }
  }

  async function placeOrder(paypalCaptureId?: string) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitError("");

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const orderItems = items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.image,
    }));

    let cjResult: any = null;
    try {
      const cjProducts = items.map((i) => ({
        sku: i.product.supplier?.sku || "",
        quantity: i.quantity,
        unitPrice: i.product.supplier?.costPrice || 0,
      }));

      const res = await fetch("/api/orders/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          shippingCountry: country,
          shippingProvince: province || city,
          shippingCity: city,
          shippingPhone: phone,
          shippingCustomerName: name,
          shippingAddress: address,
          shippingAddress2: address2,
          shippingZip: postalCode,
          email,
          remark: "",
          shippingMethod,
          products: cjProducts,
          isSandbox: false,
        }),
      });

      cjResult = await res.json();
    } catch (err: any) {
      cjResult = { success: false, message: err.message };
    }

    const order = {
      id: orderNumber,
      items: orderItems,
      subtotal,
      shipping: displayShipping,
      shippingMethod: SHIPPING_OPTIONS[shippingMethod].label,
      total,
      email,
      shippingAddress: { name, phone, address, address2, city, country, postalCode },
      paymentMethod: "paypal",
      paypalCaptureId: paypalCaptureId || null,
      createdAt: new Date().toISOString(),
      cjStatus: cjResult?.success ? "forwarded" : "failed",
      cjOrderId: cjResult?.success ? (cjResult?.data?.cjOrderId || orderNumber) : null,
      usedBalancePayment: cjResult?.data?.usedBalancePayment === true,
      cjPayUrl: cjResult?.data?.cjPayUrl || null,
      cjError: cjResult?.success ? null : (cjResult?.message || cjResult?.data?.message || "Order could not be forwarded to CJ"),
    };

    const history = JSON.parse(localStorage.getItem("all-things-order-history") || "[]");
    history.unshift(order);
    localStorage.setItem("all-things-order-history", JSON.stringify(history.slice(0, 50)));
    localStorage.setItem("all-things-last-order", JSON.stringify(order));

    if (!cjResult?.success) {
      setSubmitError(cjResult?.message || "Order placed locally but CJ forwarding failed. We will process it manually.");
    }

    // Send confirmation email (best-effort)
    try {
      const html = orderConfirmationEmail({
        name,
        orderNumber,
        items: orderItems.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: fmt(i.price * i.quantity),
        })),
        total: fmt(total),
        address: [address, address2, city, country].filter(Boolean).join(", "),
      });

      await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, subject: `Order Confirmed — #${orderNumber}`, html }),
      });
    } catch {
      // email is best-effort
    }

    clearCart();
    submittingRef.current = false;
    setSubmitting(false);
    router.push("/checkout/confirmation");
  }

  async function createPayPalOrder(): Promise<string> {
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setTouched({ email: true, name: true, address: true, city: true, country: true });
      throw new Error("Please fill in all required fields");
    }

    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, currency: "USD" }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to create PayPal order");
    return data.orderID;
  }

  async function onPayPalApprove(data: { orderID: string }) {
    setSubmitError("");
    setSubmitting(true);

    try {
      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const captureData = await captureRes.json();
      if (!captureData.success) {
        setSubmitError(captureData.message || "Payment capture failed");
        setSubmitting(false);
        return;
      }

      await placeOrder(captureData.captureId);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong processing your payment");
      setSubmitting(false);
    }
  }

  const fieldError = (field: string) =>
    touched[field] && errors[field as keyof FieldErrors]
      ? errors[field as keyof FieldErrors]
      : null;

  function inputCls(field: string) {
    const err = fieldError(field);
    return `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-all duration-200 focus:border-accent/50 ${
      err
        ? "border-red-500/60 bg-red-500/5"
        : "border-white/10 bg-white/5"
    }`;
  }

  function renderStepIndicator() {
    return (
      <div className="mb-10">
        <div className="flex items-center justify-center gap-1 sm:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === step.key;
            const isComplete = isStepComplete(step.key) || STEPS.findIndex((s) => s.key === activeStep) > i;
            return (
              <div key={step.key} className="flex items-center gap-1 sm:gap-4">
                <button
                  type="button"
                  onClick={() => goToStep(step.key)}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm ${
                    isActive
                      ? "bg-accent/15 text-accent-light shadow-lg shadow-accent/10"
                      : isComplete
                        ? "text-emerald-400 hover:bg-white/5"
                        : "text-obsidian-500 hover:text-obsidian-300"
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 sm:h-7 sm:w-7 ${
                    isActive
                      ? "bg-accent text-white"
                      : isComplete
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-obsidian-500"
                  }`}>
                    {isComplete && !isActive ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-8 transition-colors duration-300 sm:w-16 ${
                    isComplete ? "bg-emerald-500/40" : "bg-white/10"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const stepVisibility = (step: string) =>
    activeStep === step ? "block animate-fade-in" : "hidden";

  return (
    <div className="section-padding mx-auto max-w-7xl" ref={formRef}>
      <Link
        href="/cart"
        className="mb-6 flex items-center gap-1.5 text-sm text-obsidian-400 transition-colors hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD" }}>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            {renderStepIndicator()}

            {/* Contact Step */}
            <div className={`${stepVisibility("contact")} space-y-6`}>
              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent-light" />
                  <h2 className="font-display text-lg text-white">Contact</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(validate()); }}
                      onBlur={() => handleBlur("email")}
                      placeholder="Email address *"
                      className={inputCls("email")}
                    />
                    {fieldError("email") && (
                      <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("email")}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={emailConfirm}
                      onChange={(e) => { setEmailConfirm(e.target.value); if (touched.emailConfirm) setErrors(validate()); }}
                      onBlur={() => handleBlur("emailConfirm")}
                      placeholder="Confirm email *"
                      className={inputCls("emailConfirm")}
                    />
                    {fieldError("emailConfirm") && (
                      <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("emailConfirm")}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => goToStep("shipping")}
                  className="btn-primary"
                >
                  Continue to Shipping
                </button>
              </div>
            </div>

            {/* Shipping Step */}
            <div className={`${stepVisibility("shipping")} space-y-6`}>
              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-2">
                  <User className="h-4 w-4 text-accent-light" />
                  <h2 className="font-display text-lg text-white">Who is this for?</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (touched.name) setErrors(validate()); }}
                      onBlur={() => handleBlur("name")}
                      placeholder="Full name *"
                      className={inputCls("name")}
                    />
                    {fieldError("name") && (
                      <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("name")}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); if (touched.phone) setErrors(validate()); }}
                      onBlur={() => handleBlur("phone")}
                      placeholder="Phone number (optional)"
                      className={inputCls("phone")}
                    />
                    {fieldError("phone") && (
                      <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("phone")}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent-light" />
                  <h2 className="font-display text-lg text-white">Shipping Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); if (touched.address) setErrors(validate()); }}
                      onBlur={() => handleBlur("address")}
                      placeholder="Address *"
                      className={inputCls("address")}
                    />
                    {fieldError("address") && (
                      <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("address")}</p>
                    )}
                  </div>
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-all duration-200 focus:border-accent/50"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => { setCity(e.target.value); if (touched.city) setErrors(validate()); }}
                        onBlur={() => handleBlur("city")}
                        placeholder="City *"
                        className={inputCls("city")}
                      />
                      {fieldError("city") && (
                        <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("city")}</p>
                      )}
                    </div>
                    <div>
                      <select
                        value={country}
                        onChange={(e) => { setCountry(e.target.value); if (touched.country) setErrors(validate()); }}
                        onBlur={() => handleBlur("country")}
                        className={inputCls("country") + " appearance-none"}
                      >
                        <option value="" disabled className="bg-obsidian-900">
                          Country *
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-obsidian-900">
                            {c}
                          </option>
                        ))}
                      </select>
                      {fieldError("country") && (
                        <p className="mt-1.5 animate-slide-up text-xs text-red-400">{fieldError("country")}</p>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="State / Province (optional)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-all duration-200 focus:border-accent/50"
                  />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal code (optional)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-all duration-200 focus:border-accent/50"
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent-light" />
                  <h2 className="font-display text-lg text-white">Delivery Method</h2>
                </div>

                <div className="space-y-3">
                  {(Object.entries(SHIPPING_OPTIONS) as [ShippingMethod, typeof SHIPPING_OPTIONS[ShippingMethod]][]).map(
                    ([key, opt]) => {
                      const fee =
                        subtotal >= 50 ? opt.fee : Math.max(4.99, opt.fee);
                      const disabled = key === "express" && subtotal < 50;

                      return (
                        <label
                          key={key}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                            disabled
                              ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-40"
                              : shippingMethod === key
                                ? "border-accent/30 bg-accent/5 shadow-lg shadow-accent/5"
                                : "border-white/10 bg-white/5 hover:border-accent/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={key}
                            checked={shippingMethod === key}
                            onChange={() => setShippingMethod(key)}
                            disabled={disabled}
                            className="h-4 w-4 accent-accent"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{opt.label}</p>
                            <p className="text-xs text-obsidian-500">{opt.days}</p>
                          </div>
                          <span className="text-sm font-medium text-white">
                            {fee === 0 ? (
                              <span className="text-emerald-400">Free</span>
                            ) : (
                              fmt(fee)
                            )}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
                {subtotal < 50 && (
                  <p className="mt-3 animate-slide-up text-xs text-obsidian-500">
                    Add {fmt(50 - subtotal)} more for free standard shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => goToStep("contact")}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => goToStep("payment")}
                  className="btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </div>

            {/* Payment Step */}
            <div className={`${stepVisibility("payment")} space-y-6`}>
              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-accent-light" />
                  <h2 className="font-display text-lg text-white">Payment</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                    <Lock className="h-3.5 w-3.5 shrink-0" />
                    <span>Your payment is secured with PayPal — credit/debit card or PayPal account</span>
                  </div>

                  {PAYPAL_CLIENT_ID ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-accent/20">
                      <PayPalButtons
                        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                        createOrder={createPayPalOrder}
                        onApprove={onPayPalApprove}
                        onError={() => setSubmitError("PayPal payment failed. Please try again.")}
                        onCancel={() => setSubmitError("PayPal payment was cancelled.")}
                        disabled={submitting}
                      />
                    </div>
                  ) : (
                    <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-400">
                      PayPal not configured. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => goToStep("shipping")}
                  className="btn-secondary"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-2">
            <div className="glass-card sticky top-24 space-y-6 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-white">Order Summary</h2>
                <Link
                  href="/cart"
                  className="text-xs text-accent-light transition-colors hover:text-accent"
                >
                  Edit cart
                </Link>
              </div>

              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-obsidian-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {product.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-obsidian-400 transition-colors hover:border-accent/30 hover:text-white"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5ch] text-center text-xs text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-obsidian-400 transition-colors hover:border-accent/30 hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          {fmt(product.price * quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-obsidian-600 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-obsidian-300">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-obsidian-300">
                  <span>Shipping</span>
                  <span>
                    {displayShipping === 0 ? (
                      <span className="text-emerald-400">Free</span>
                    ) : (
                      fmt(displayShipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              {submitError && (
                <div className="animate-slide-up rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-400">
                  <p>{submitError}</p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-obsidian-500">
                <Lock className="h-3 w-3" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </PayPalScriptProvider>

      {/* Processing Overlay */}
      {submitting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian-950/80 backdrop-blur-sm">
          <div className="glass-card mx-4 max-w-sm px-10 py-12 text-center">
            <Loader2 className="mx-auto mb-5 h-10 w-10 animate-spin text-accent-light" />
            <h3 className="mb-1 font-display text-lg text-white">Processing your order</h3>
            <p className="text-sm text-obsidian-400">
              Please wait while we confirm your payment and forward your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
