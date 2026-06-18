"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

const ABANDONED_KEY = "all-things-abandoned-cart";
const DISMISSED_KEY = "all-things-abandoned-dismissed";

export function AbandonedCartBanner() {
  const { items, subtotal } = useCart();
  const { format: fmt } = useCurrency();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const now = Date.now();
    let lastSeen: number | null = null;

    try {
      const stored = localStorage.getItem(ABANDONED_KEY);
      if (stored) lastSeen = parseInt(stored, 10);
    } catch {}

    if (lastSeen && now - lastSeen > 60 * 60 * 1000) {
      // More than 1 hour since last cart update — show banner
      try {
        const dismissed = localStorage.getItem(DISMISSED_KEY);
        if (dismissed === "true") return;
      } catch {}
      setVisible(true);
    }

    // Update last-seen timestamp
    try {
      localStorage.setItem(ABANDONED_KEY, now.toString());
    } catch {}
  }, [items]);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {}
  };

  if (!visible || items.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-md animate-slide-up sm:left-auto sm:right-6 sm:bottom-6">
      <div className="rounded-2xl border border-accent/20 bg-obsidian-900/95 p-5 shadow-2xl shadow-accent/10 backdrop-blur-xl">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 rounded-full p-1 text-obsidian-500 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
            <ShoppingBag className="h-5 w-5 text-accent-light" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white">
              You have {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
            <p className="mt-0.5 text-sm text-obsidian-400">
              {fmt(subtotal)} &middot; Complete your order now
            </p>
            <Link
              href="/cart"
              onClick={handleDismiss}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-accent-light active:scale-[0.98]"
            >
              Return to Cart
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
