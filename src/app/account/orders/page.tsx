"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  RefreshCw,
  ShoppingBag,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  shippingMethod?: string;
  total: number;
  email: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  paypalCaptureId?: string | null;
  createdAt: string;
  cjStatus?: string;
  cjOrderId?: string | null;
  cjError?: string | null;
  usedBalancePayment?: boolean;
}

export default function OrdersPage() {
  const { format: fmt } = useCurrency();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [refunding, setRefunding] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("all-things-order-history");
      if (stored) setOrders(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  function updateOrder(id: string, patch: Partial<OrderData>) {
    const updated = orders.map((o) => (o.id === id ? { ...o, ...patch } : o));
    setOrders(updated);
    localStorage.setItem("all-things-order-history", JSON.stringify(updated));
  }

  async function handleRetry(orderId: string, orderNumber: string) {
    setRetrying(orderId);
    try {
      const res = await fetch("/api/orders/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber }),
      });
      const data = await res.json();

      if (data.success) {
        updateOrder(orderId, {
          cjStatus: "forwarded",
          cjOrderId: data.data.cjOrderId || orderNumber,
          usedBalancePayment: true,
          cjError: null,
        });
      } else {
        updateOrder(orderId, {
          cjError: data.message || "Retry failed",
        });
      }
    } catch {
      updateOrder(orderId, { cjError: "Network error during retry" });
    }
    setRetrying(null);
  }

  async function handleRefund(orderId: string, captureId: string) {
    if (!confirm("Refund this order? This cannot be undone.")) return;
    setRefunding(orderId);
    try {
      const res = await fetch("/api/paypal/refund-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captureId }),
      });
      const data = await res.json();
      if (data.success) {
        updateOrder(orderId, { cjStatus: "refunded" });
      } else {
        alert(data.message || "Refund failed");
      }
    } catch {
      alert("Network error during refund");
    }
    setRefunding(null);
  }

  if (!loaded) return null;

  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">Order History</h1>
        <p className="mt-1 text-sm text-obsidian-400">
          {orders.length === 0
            ? "No orders yet"
            : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h2 className="mb-2 font-display text-xl text-white">No orders yet</h2>
          <p className="mb-6 text-obsidian-400">
            Your order history will appear here once you place an order.
          </p>
          <Link href="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="glass-card p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-white">{order.id}</p>
                  <p className="text-xs text-obsidian-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    &nbsp;&middot;&nbsp;
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-accent-light" />
                  <span className="text-xs text-obsidian-400">
                    {order.shippingMethod || "Standard Shipping"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-16 w-16 overflow-hidden rounded-lg bg-obsidian-800"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-semibold text-white">
                  {fmt(order.total)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {order.paymentMethod === "paypal" ? "PayPal" : "Pay on Delivery"}
                </span>
              </div>

              {/* CJ Status Badge */}
              {(order.cjStatus || order.cjError) && (
                <div className="mt-3">
                  {order.cjStatus === "forwarded" && order.usedBalancePayment && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Fulfilled by CJ Dropshipping</span>
                      {order.cjOrderId && (
                        <span className="text-obsidian-500">
                          &middot; CJ ID: {order.cjOrderId}
                        </span>
                      )}
                    </div>
                  )}
                  {order.cjStatus === "forwarded" && !order.usedBalancePayment && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Pending CJ payment</span>
                      {order.cjOrderId && (
                        <span className="text-obsidian-500">
                          &middot; CJ ID: {order.cjOrderId}
                        </span>
                      )}
                    </div>
                  )}
                  {order.cjStatus === "failed" && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>CJ forwarding failed</span>
                      {order.cjError && (
                        <span className="text-obsidian-500">: {order.cjError}</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer text-xs text-obsidian-500 transition-colors hover:text-white">
                  View details
                </summary>
                <div className="mt-4 space-y-4 border-t border-white/10 pt-4 text-sm">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-obsidian-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-white">{item.name}</p>
                        <p className="text-xs text-obsidian-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-white">
                        {fmt(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  <div className="space-y-1 border-t border-white/10 pt-3 text-xs">
                    <div className="flex justify-between text-obsidian-400">
                      <span>Subtotal</span>
                      <span>{fmt(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-obsidian-400">
                      <span>Shipping</span>
                      <span>
                        {order.shipping === 0 ? (
                          <span className="text-emerald-400">Free</span>
                        ) : (
                          fmt(order.shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-white">
                      <span>Total</span>
                      <span>{fmt(order.total)}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3 text-xs text-obsidian-500">
                    <p>Shipped to: {order.shippingAddress.name}</p>
                    <p>
                      {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  {/* CJ section in details */}
                  <div className="border-t border-white/10 pt-3">
                    <p className="mb-2 text-xs font-medium text-obsidian-400">
                      CJ Dropshipping
                    </p>
                    {order.cjStatus === "forwarded" && order.usedBalancePayment ? (
                      <div className="space-y-1 text-xs">
                        <p className="text-emerald-400">
                          Paid and processing
                        </p>
                        {order.cjOrderId && (
                          <p className="text-obsidian-500">
                            CJ Order ID: {order.cjOrderId}
                          </p>
                        )}
                      </div>
                    ) : order.cjStatus === "forwarded" && !order.usedBalancePayment ? (
                      <div className="space-y-1 text-xs">
                        <p className="text-amber-400">
                          Order created — needs payment on CJ dashboard
                        </p>
                        {order.cjOrderId && (
                          <p className="text-obsidian-500">
                            CJ Order ID: {order.cjOrderId}
                          </p>
                        )}
                        <a
                          href="https://www.cjdropshipping.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-accent-light hover:text-accent"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Open CJ Dashboard
                        </a>
                      </div>
                    ) : order.cjStatus === "failed" ? (
                      <div className="space-y-2 text-xs">
                        <p className="text-red-400">
                          {order.cjError || "Failed to forward to CJ"}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRetry(order.id, order.id)}
                          disabled={retrying === order.id}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-accent-light transition-colors hover:bg-accent/20 disabled:opacity-50"
                        >
                          <RefreshCw
                            className={`h-3 w-3 ${retrying === order.id ? "animate-spin" : ""}`}
                          />
                          {retrying === order.id ? "Retrying..." : "Retry with CJ"}
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-obsidian-600">
                        Not yet forwarded
                      </p>
                    )}
                  </div>

                  {/* Refund for PayPal orders */}
                  {order.paymentMethod === "paypal" && order.paypalCaptureId && order.cjStatus !== "refunded" && (
                    <div className="border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() => handleRefund(order.id, order.paypalCaptureId!)}
                        disabled={refunding === order.id}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${refunding === order.id ? "animate-spin" : ""}`} />
                        {refunding === order.id ? "Refunding..." : "Refund via PayPal"}
                      </button>
                    </div>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-accent-light transition-colors hover:text-accent"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
