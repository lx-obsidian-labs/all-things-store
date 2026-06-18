"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Package,
  Clock,
  AlertTriangle,
  ExternalLink,
  Copy,
  ShoppingBag,
  Home,
  ChevronRight,
  Star,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface OrderData {
  id: string;
  items: { id: string; name: string; price: number; quantity: number; image: string }[];
  subtotal: number;
  shipping: number;
  shippingMethod?: string;
  total: number;
  email: string;
  shippingAddress: { name: string; phone?: string; address: string; address2?: string; city: string; country: string; postalCode?: string };
  paymentMethod: string;
  createdAt: string;
  cjStatus?: string;
  cjOrderId?: string | null;
  cjPayUrl?: string | null;
  cjError?: string | null;
  usedBalancePayment?: boolean;
}

export default function ConfirmationPage() {
  const { format: fmt } = useCurrency();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("all-things-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  async function copyOrderId() {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  if (!loaded) return null;

  if (!order) {
    return (
      <div className="section-padding mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center text-center">
        <div className="glass-card max-w-md py-16 animate-fade-in">
          <Package className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h1 className="mb-2 font-display text-2xl text-white">No order found</h1>
          <p className="mb-6 text-obsidian-400">Browse our collection and place an order.</p>
          <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-obsidian-500">
        <Link href="/cart" className="transition-colors hover:text-white">Cart</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/checkout" className="transition-colors hover:text-white">Checkout</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">Confirmation</span>
      </nav>

      <div className="glass-card p-8 text-center sm:p-12 animate-fade-in">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 shadow-lg shadow-emerald-500/10">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
        </div>

        <h1 className="mb-2 font-display text-3xl text-white sm:text-4xl">
          Order Confirmed!
        </h1>
        <p className="mb-1 text-obsidian-400">
          Thank you, <span className="font-medium text-white">{order.shippingAddress.name}</span>.
        </p>
        <div className="mb-8 flex items-center justify-center gap-3 text-sm text-obsidian-500">
          <span>Order #{order.id}</span>
          <button
            type="button"
            onClick={copyOrderId}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-obsidian-400 transition-all hover:border-accent/30 hover:text-accent-light"
          >
            {copied ? (
              <>
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left">
          <h2 className="mb-4 font-display text-lg text-white">Order Summary</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-obsidian-800">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-obsidian-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium text-white">{fmt(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-obsidian-300">
              <span>Subtotal</span>
              <span>{fmt(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-obsidian-300">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? <span className="text-emerald-400">Free</span> : fmt(order.shipping)}</span>
            </div>
            {order.shippingMethod && (
              <div className="flex items-center gap-2 text-xs text-obsidian-500">
                <Clock className="h-3 w-3" />
                <span>{order.shippingMethod}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-semibold text-white">
              <span>Total</span>
              <span>{fmt(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left">
          <h3 className="mb-3 flex items-center gap-2 font-medium text-white">
            <Package className="h-4 w-4 text-accent-light" />
            Shipping Address
          </h3>
          <div className="text-sm text-obsidian-400 leading-relaxed">
            <p className="text-white">{order.shippingAddress.name}</p>
            {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
            <p>{order.shippingAddress.address}</p>
            {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
            <p>
              {order.shippingAddress.city}
              {order.shippingAddress.country && `, ${order.shippingAddress.country}`}
            </p>
            {order.shippingAddress.postalCode && <p>{order.shippingAddress.postalCode}</p>}
          </div>
        </div>

        {/* CJ Status Sections */}
        {order.cjStatus === "forwarded" && order.usedBalancePayment && (
          <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-left transition-all hover:border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Supplier order placed &amp; paid</span>
            </div>
            <p className="mt-2 text-sm text-obsidian-400">
              Your order has been forwarded to our fulfillment partner and is being processed. You will receive tracking info by email once shipped.
            </p>
            {order.cjOrderId && (
              <p className="mt-2 text-xs text-obsidian-500">
                Supplier reference: {order.cjOrderId}
              </p>
            )}
          </div>
        )}

        {order.cjStatus === "forwarded" && !order.usedBalancePayment && (
          <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-left transition-all hover:border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Supplier payment needed</span>
            </div>
            <p className="mt-2 text-sm text-obsidian-400">
              Your order has been registered with our supplier. A manual payment is required on their platform to begin fulfillment.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {order.cjPayUrl ? (
                <a
                  href={order.cjPayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 px-5 py-2.5 text-sm font-medium text-amber-400 shadow-lg shadow-amber-500/5 transition-all hover:bg-amber-500/25 active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Pay Now on CJ
                </a>
              ) : order.cjOrderId ? (
                <a
                  href="https://www.cjdropshipping.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-accent/30 hover:bg-white/10 active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open CJ Dashboard
                </a>
              ) : null}
              <Link
                href="/account/orders"
                className="inline-flex items-center gap-2 text-sm text-accent-light transition-colors hover:text-accent"
              >
                Order History
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {order.cjStatus === "failed" && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-left transition-all hover:border-red-500/30">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Order saved — supplier forwarding issue</span>
            </div>
            <p className="mt-2 text-sm text-obsidian-400">
              {order.cjError || "We were unable to forward your order to our supplier automatically. Your order has been saved and we will process it manually."}
            </p>
            <div className="mt-4">
              <Link
                href="/account/orders"
                className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent-light transition-all hover:bg-accent/20 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                View &amp; Retry in Orders
              </Link>
            </div>
          </div>
        )}

        {!order.cjStatus && (
          <div className="mb-8 rounded-xl border border-obsidian-700/30 bg-obsidian-800/30 p-5 text-left">
            <div className="flex items-center gap-2 text-obsidian-400">
              <Clock className="h-5 w-5" />
              <span className="font-medium text-white">Order received</span>
            </div>
            <p className="mt-2 text-sm text-obsidian-500">
              Your order will be processed and confirmed shortly.
            </p>
          </div>
        )}

        {/* Review Request */}
        {order.items.length > 0 && (
          <div className="mb-8 rounded-xl border border-accent/20 bg-accent/5 p-5 text-left transition-all hover:border-accent/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Star className="h-5 w-5 text-accent-light" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">Love your purchase?</p>
                <p className="mt-0.5 text-sm text-obsidian-400">
                  Share your review and help others discover great products.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {order.items.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href={`/product/${item.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-obsidian-300 transition-all hover:border-accent/30 hover:text-accent-light"
                    >
                      <Star className="h-3 w-3" />
                      Review {item.name.length > 20 ? item.name.slice(0, 20) + "…" : item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/shop" className="btn-primary">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1 text-sm text-obsidian-500 transition-colors hover:text-white"
        >
          View all orders
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
