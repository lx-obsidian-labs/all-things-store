"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const shipping = subtotal >= 50 ? 0 : subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="section-padding mx-auto max-w-7xl text-center">
        <div className="glass-card mx-auto max-w-md py-16">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h1 className="mb-2 font-display text-2xl text-white">Your cart is empty</h1>
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
      <h1 className="mb-10 font-display text-4xl text-white">Your Cart</h1>

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
                    {formatPrice(product.price)} each
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-white">
                      {formatPrice(product.price * quantity)}
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

          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-obsidian-500 transition-colors hover:text-red-400"
          >
            Clear cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card sticky top-24 p-6">
            <h2 className="mb-6 font-display text-xl text-white">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-obsidian-300">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-obsidian-300">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-400">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {subtotal > 0 && subtotal < 50 && (
                <p className="text-xs text-obsidian-500">
                  Add {formatPrice(50 - subtotal)} more for free shipping
                </p>
              )}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button type="button" className="btn-primary mt-6 w-full" disabled>
              Checkout — Coming Soon
            </button>
            <p className="mt-3 text-center text-xs text-obsidian-500">
              Payment integration will be added once products are sourced
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
