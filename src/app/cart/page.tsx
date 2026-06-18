"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Tag, Trash2, ArrowRight, Truck, Shield } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { format: fmt } = useCurrency();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = subtotal >= 50 ? 0 : subtotal > 0 ? 5.99 : 0;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "welcome10") {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="section-padding mx-auto max-w-7xl text-center">
        <div className="glass-card mx-auto max-w-md py-16">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h1 className="mb-2 font-display text-2xl text-white">
            Your cart is empty
          </h1>
          <p className="mb-6 text-obsidian-400">
            Discover something you&apos;ll love in our collection.
          </p>
          <Link href="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
            Your Cart
          </p>
          <h1 className="font-display text-4xl text-white">
            Cart ({items.length} item{items.length !== 1 ? "s" : ""})
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-obsidian-500 transition-colors hover:text-red-400"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="glass-card flex gap-4 p-4 sm:p-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-obsidian-800 sm:h-28 sm:w-28">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium text-white transition-colors hover:text-accent-light"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-obsidian-400">
                    {fmt(product.price)} each
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={99}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (val >= 1) updateQuantity(product.id, val);
                      }}
                      className="w-12 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-sm font-medium text-white outline-none transition-colors focus:border-accent/50"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-white">
                      {fmt(product.price * quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-obsidian-500 transition-colors hover:text-red-400"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Progress Bar */}
        {subtotal > 0 && subtotal < 50 && (
          <div className="glass-card p-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-obsidian-400">Free shipping</span>
              <span className="text-obsidian-500">
                {fmt(50 - subtotal)} away
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-obsidian-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-obsidian-500">
              Add {fmt(50 - subtotal)} more for free shipping
            </p>
          </div>
        )}
        {subtotal >= 50 && (
          <div className="glass-card flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
              <Truck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-400">You qualify for free shipping!</p>
              <p className="text-xs text-obsidian-500">Delivery in 10-15 business days</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-accent/10 bg-accent/5 px-4 py-3 text-xs text-accent-light">
            <Shield className="h-3.5 w-3.5 shrink-0" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-300">
            <Truck className="h-3.5 w-3.5 shrink-0" />
            <span>30-day returns</span>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card sticky top-24 space-y-6 p-6">
            <h2 className="font-display text-xl text-white">Order Summary</h2>

            {/* Coupon */}
            {!couponApplied ? (
              <div>
                <label className="mb-2 block text-xs font-medium text-obsidian-400">
                  Have a coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!coupon.trim()}
                    className="btn-secondary py-2 text-xs disabled:opacity-50"
                  >
                    <Tag className="h-3.5 w-3.5" />
                    Apply
                  </button>
                </div>
                <p className="mt-2 text-xs text-obsidian-500">
                  Try code <span className="font-mono text-accent-light">WELCOME10</span> for 10% off
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300">
                <Tag className="h-4 w-4" />
                Code WELCOME10 applied — 10% off
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-obsidian-300">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount (10%)</span>
                  <span>-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-obsidian-300">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-400">Free</span>
                  ) : (
                    fmt(shipping)
                  )}
                </span>
              </div>
              {subtotal > 0 && subtotal < 50 && (
                <p className="text-xs text-obsidian-500">
                  Add {fmt(50 - subtotal)} more for free shipping
                </p>
              )}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full">
              Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-center text-xs text-obsidian-500">
              Pay on delivery &mdash; no card needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
