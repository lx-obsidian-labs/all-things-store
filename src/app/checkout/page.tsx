"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

const COUNTRIES = [
  "United States", "South Africa", "Nigeria", "United Kingdom",
  "Germany", "France", "Kenya", "Ghana", "Morocco", "Egypt",
  "India", "China", "Japan", "Australia", "Canada", "Brazil",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  name?: string;
  address?: string;
  city?: string;
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

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const { format: fmt } = useCurrency();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    else if (!EMAIL_RE.test(email)) e.email = "Invalid email address";
    if (!name) e.name = "Full name is required";
    if (!address) e.address = "Address is required";
    if (!city) e.city = "City is required";
    if (!country) e.country = "Select your country";
    if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone))
      e.phone = "Invalid phone number";
    return e;
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const fieldErrors = validate();
    setErrors(fieldErrors);
    setTouched({ email: true, name: true, address: true, city: true, country: true });
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const orderItems = items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.image,
    }));

    // Forward order to CJ Dropshipping
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
          shippingProvince: city,
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
      paymentMethod,
      createdAt: new Date().toISOString(),
      cjStatus: cjResult?.success ? "forwarded" : "failed",
      cjOrderId: cjResult?.success ? (cjResult?.data?.cjOrderId || orderNumber) : null,
      usedBalancePayment: cjResult?.data?.usedBalancePayment === true,
      cjError: cjResult?.success ? null : (cjResult?.message || cjResult?.data?.message || "Order could not be forwarded to CJ"),
    };

    const history = JSON.parse(localStorage.getItem("all-things-order-history") || "[]");
    history.unshift(order);
    localStorage.setItem("all-things-order-history", JSON.stringify(history.slice(0, 50)));

    localStorage.setItem("all-things-last-order", JSON.stringify(order));

    if (!cjResult?.success) {
      setSubmitError(cjResult?.message || "Order placed locally but CJ forwarding failed. We will process it manually.");
    }

    clearCart();
    await new Promise((r) => setTimeout(r, 600));
    router.push("/checkout/confirmation");
  }

  const fieldError = (field: string) =>
    touched[field] && errors[field as keyof FieldErrors]
      ? errors[field as keyof FieldErrors]
      : null;

  function inputCls(field: string) {
    const err = fieldError(field);
    return `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50 ${
      err
        ? "border-red-500/60 bg-red-500/5"
        : "border-white/10 bg-white/5"
    }`;
  }

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <Link
        href="/cart"
        className="mb-8 flex items-center gap-1.5 text-sm text-obsidian-400 transition-colors hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="mb-1 font-display text-3xl text-white">Checkout</h1>
              <p className="text-sm text-obsidian-400">
                {items.length} item{items.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            {/* Contact */}
            <div className="glass-card p-6">
              <h2 className="mb-4 font-display text-lg text-white">Contact</h2>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="Email address *"
                  className={inputCls("email")}
                />
                {fieldError("email") && (
                  <p className="mt-1.5 text-xs text-red-400">{fieldError("email")}</p>
                )}
              </div>
            </div>

            {/* Shipping */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-light" />
                <h2 className="font-display text-lg text-white">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Full name *"
                    className={inputCls("name")}
                  />
                  {fieldError("name") && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldError("name")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="Phone number (optional)"
                    className={inputCls("phone")}
                  />
                  {fieldError("phone") && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldError("phone")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => handleBlur("address")}
                    placeholder="Address *"
                    className={inputCls("address")}
                  />
                  {fieldError("address") && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldError("address")}</p>
                  )}
                </div>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onBlur={() => handleBlur("city")}
                      placeholder="City *"
                      className={inputCls("city")}
                    />
                    {fieldError("city") && (
                      <p className="mt-1.5 text-xs text-red-400">{fieldError("city")}</p>
                    )}
                  </div>
                  <div>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                      <p className="mt-1.5 text-xs text-red-400">{fieldError("country")}</p>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code (optional)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
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
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                          disabled
                            ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-40"
                            : shippingMethod === key
                              ? "border-accent/30 bg-accent/5"
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
                <p className="mt-3 text-xs text-obsidian-500">
                  Add {fmt(50 - subtotal)} more for free standard shipping
                </p>
              )}
            </div>

            {/* Payment */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent-light" />
                <h2 className="font-display text-lg text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="delivery"
                    checked={paymentMethod === "delivery"}
                    onChange={() => setPaymentMethod("delivery")}
                    className="h-4 w-4 accent-accent"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">Pay on Delivery</p>
                    <p className="text-xs text-obsidian-500">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>

                <div className="cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.01] p-4 opacity-40">
                  <div className="flex items-center gap-4">
                    <input type="radio" disabled className="h-4 w-4 accent-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Credit Card</p>
                      <p className="text-xs text-obsidian-500">Coming soon</p>
                    </div>
                  </div>
                </div>
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
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3 text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Forwarding to CJ...
                  </span>
                ) : (
                  `Place Order — ${fmt(total)}`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-obsidian-500">
                <Lock className="h-3 w-3" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
