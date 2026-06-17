"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Clock, AlertTriangle } from "lucide-react";
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
  cjError?: string | null;
}

export default function ConfirmationPage() {
  const { format: fmt } = useCurrency();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("all-things-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!order) {
    return (
      <div className="section-padding mx-auto max-w-7xl text-center">
        <div className="glass-card mx-auto max-w-md py-16">
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
      <div className="glass-card p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>

        <h1 className="mb-2 font-display text-3xl text-white sm:text-4xl">
          Order Confirmed!
        </h1>
        <p className="mb-1 text-obsidian-400">
          Thank you, <span className="font-medium text-white">{order.shippingAddress.name}</span>.
        </p>
        <p className="mb-8 text-sm text-obsidian-500">
          Order #{order.id} &middot; A confirmation email has been sent to {order.email}
        </p>

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

        <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left">
          <h3 className="mb-3 font-medium text-white">Shipping Address</h3>
          <div className="text-sm text-obsidian-400 leading-relaxed">
            <p>{order.shippingAddress.name}</p>
            {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
            <p>{order.shippingAddress.address}</p>
            {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.country}</p>
            {order.shippingAddress.postalCode && <p>{order.shippingAddress.postalCode}</p>}
          </div>
        </div>

        {/* CJ Forwarding Status */}
        {order.cjStatus === "forwarded" && order.cjOrderId && (
          <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-left">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Forwarded to CJ Dropshipping</span>
            </div>
            <p className="mt-1 text-xs text-obsidian-500">
              CJ Order ID: {order.cjOrderId} &middot; Status: Awaiting processing
            </p>
          </div>
        )}

        {order.cjStatus === "failed" && (
          <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Order saved — CJ forwarding pending</span>
            </div>
            <p className="mt-1 text-xs text-obsidian-500">
              {order.cjError || "We will forward this order to our supplier manually."}
            </p>
          </div>
        )}

        {!order.cjStatus && (
          <div className="mb-8 rounded-xl border border-obsidian-700/30 bg-obsidian-800/30 p-4 text-left">
            <div className="flex items-center gap-2 text-obsidian-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Order received</span>
            </div>
            <p className="mt-1 text-xs text-obsidian-500">
              Your order will be processed shortly.
            </p>
          </div>
        )}

        <Link
          href="/account/orders"
          className="mb-8 block text-center text-sm text-accent-light transition-colors hover:text-accent"
        >
          View all orders &rarr;
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
