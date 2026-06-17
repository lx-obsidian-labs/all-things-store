"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Lock, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

const COUNTRIES = [
  "United States", "South Africa", "Nigeria", "United Kingdom",
  "Germany", "France", "Kenya", "Ghana", "Morocco", "Egypt",
  "India", "China", "Japan", "Australia", "Canada", "Brazil",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { format: fmt } = useCurrency();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= 50 ? 0 : subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !address || !city || !country) return;
    setSubmitting(true);

    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      subtotal,
      shipping,
      total,
      email,
      shippingAddress: { name, address, city, country, postalCode },
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("all-things-last-order", JSON.stringify(order));
    clearCart();

    await new Promise((r) => setTimeout(r, 800));
    router.push("/checkout/confirmation");
  };

  const valid = email && name && address && city && country;

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
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
              />
            </div>

            {/* Shipping */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-light" />
                <h2 className="font-display text-lg text-white">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                  />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/50"
                  >
                    <option value="" disabled className="bg-obsidian-900">Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-obsidian-900">{c}</option>
                    ))}
                  </select>
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

            {/* Payment */}
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent-light" />
                <h2 className="font-display text-lg text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-accent/30">
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
                    <p className="text-xs text-obsidian-500">Pay when you receive your order</p>
                  </div>
                </label>

                <div className="cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.01] p-4 opacity-40">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      disabled
                      className="h-4 w-4 accent-accent"
                    />
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
              <h2 className="font-display text-lg text-white">Order Summary</h2>

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
                      <p className="text-xs text-obsidian-500">Qty: {quantity}</p>
                      <p className="text-sm font-medium text-white">
                        {fmt(product.price * quantity)}
                      </p>
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
                  <span>{shipping === 0 ? <span className="text-emerald-400">Free</span> : fmt(shipping)}</span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-xs text-obsidian-500">
                    Add {fmt(50 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!valid || submitting}
                className="btn-primary w-full py-3 text-sm disabled:opacity-50"
              >
                {submitting ? "Processing..." : `Place Order — ${fmt(total)}`}
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
