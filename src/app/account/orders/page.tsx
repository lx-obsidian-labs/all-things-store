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
  ChevronRight,
  CreditCard,
  X,
  AlertCircle,
  Copy,
  Ban,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";

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
  cjPayUrl?: string | null;
  cjError?: string | null;
  usedBalancePayment?: boolean;
}

function RefundModal({
  order,
  formattedTotal,
  onClose,
  onConfirm,
  loading,
}: {
  order: OrderData;
  formattedTotal: string;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian-950/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="glass-card w-full max-w-md p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400">
            <Ban className="h-5 w-5" />
            <h3 className="font-display text-lg text-white">Refund Order</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-obsidian-500 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-2 text-sm text-obsidian-400">
          This will refund <span className="font-medium text-white">{order.id}</span> via PayPal.
        </p>
        <p className="mb-6 text-sm text-obsidian-500">
          The full amount of <span className="font-medium text-obsidian-300">{formattedTotal}</span> will be returned to the customer. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-secondary flex-1 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-400 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Refunding...
              </>
            ) : (
              <>
                <Ban className="h-4 w-4" />
                Confirm Refund
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { format: fmt } = useCurrency();
  const { addToast } = useToast();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [refunding, setRefunding] = useState<string | null>(null);
  const [refundTarget, setRefundTarget] = useState<OrderData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  async function copyOrderId(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      addToast("Order ID copied", "success");
    } catch {
      addToast("Failed to copy", "error");
    }
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
          cjPayUrl: data.data.cjPayUrl || null,
          usedBalancePayment: data.data.usedBalancePayment === true,
          cjError: data.data.message && !data.data.usedBalancePayment ? data.data.message : null,
        });
        addToast(
          data.data.usedBalancePayment
            ? "Order retried and paid successfully"
            : "Order created at CJ — payment link available",
          data.data.usedBalancePayment ? "success" : "info"
        );
      } else {
        updateOrder(orderId, {
          cjError: data.message || "Retry failed",
        });
        addToast(data.message || "Retry failed", "error");
      }
    } catch {
      updateOrder(orderId, { cjError: "Network error during retry" });
      addToast("Network error during retry", "error");
    }
    setRetrying(null);
  }

  async function handleRefund(orderId: string, captureId: string) {
    setRefunding(orderId);
    setRefundTarget(null);
    try {
      const res = await fetch("/api/paypal/refund-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captureId }),
      });
      const data = await res.json();
      if (data.success) {
        updateOrder(orderId, { cjStatus: "refunded" });
        addToast("Order refunded successfully", "success");
      } else {
        addToast(data.message || "Refund failed", "error");
      }
    } catch {
      addToast("Network error during refund", "error");
    }
    setRefunding(null);
  }

  function statusBadge(order: OrderData) {
    if (order.cjStatus === "refunded") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
          <Ban className="h-3 w-3" />
          Refunded
        </span>
      );
    }
    if (order.cjStatus === "forwarded" && order.usedBalancePayment) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle className="h-3 w-3" />
          Fulfilling
        </span>
      );
    }
    if (order.cjStatus === "forwarded" && !order.usedBalancePayment) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
          <Clock className="h-3 w-3" />
          Pending Payment
        </span>
      );
    }
    if (order.cjStatus === "failed") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
          <AlertTriangle className="h-3 w-3" />
          Failed
        </span>
      );
    }
    return null;
  }

  if (!loaded) return null;

  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-10 animate-fade-in">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Your Account
        </p>
        <h1 className="font-display text-4xl text-white">
          Order History
        </h1>
        <p className="mt-1 text-sm text-obsidian-400">
          {orders.length === 0
            ? "No orders yet"
            : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card py-16 text-center animate-fade-in">
          <Package className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h2 className="mb-2 font-display text-xl text-white">No orders yet</h2>
          <p className="mb-6 text-obsidian-400">
            Your order history will appear here once you place an order.
          </p>
          <Link href="/shop" className="btn-primary">
            <ShoppingBag className="h-4 w-4" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className="glass-card p-6 transition-all duration-300 hover:border-white/20"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Header */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white truncate">{order.id}</p>
                    <button
                      type="button"
                      onClick={() => copyOrderId(order.id)}
                      className="shrink-0 rounded-md border border-white/10 bg-white/5 p-1 text-obsidian-500 transition-all hover:border-accent/30 hover:text-accent-light"
                    >
                      {copiedId === order.id ? (
                        <CheckCircle className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-obsidian-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {statusBadge(order)}
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex flex-wrap gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative h-16 w-16 overflow-hidden rounded-xl bg-obsidian-800 transition-transform hover:scale-105"
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

              {/* CJ Pay Now CTA — prominent for unpaid orders */}
              {order.cjStatus === "forwarded" && !order.usedBalancePayment && (
                <div className="mt-4 rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-amber-400">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>Payment needed to start fulfillment</span>
                    </div>
                    <div className="flex gap-2">
                      {order.cjPayUrl ? (
                        <a
                          href={order.cjPayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-5 py-2 text-sm font-medium text-amber-400 shadow-lg shadow-amber-500/5 transition-all hover:bg-amber-500/25 active:scale-[0.98]"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Pay Now on CJ
                        </a>
                      ) : (
                        <a
                          href="https://www.cjdropshipping.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all hover:border-accent/30 hover:bg-white/10 active:scale-[0.98]"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open CJ Dashboard
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Row */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="space-y-0.5">
                  <span className="font-semibold text-white">{fmt(order.total)}</span>
                  <div className="flex items-center gap-1.5 text-xs text-obsidian-500">
                    <Truck className="h-3 w-3" />
                    {order.shippingMethod || "Standard Shipping"}
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {order.paymentMethod === "paypal" ? "PayPal" : "Pay on Delivery"}
                </span>
              </div>

              {/* Details */}
              <details className="group mt-2">
                <summary className="flex cursor-pointer items-center gap-1.5 py-2 text-xs text-obsidian-500 transition-colors hover:text-white">
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" />
                  View details
                </summary>
                <div className="mt-2 space-y-4 border-t border-white/10 pt-4 text-sm">
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

                  {/* CJ Section */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-obsidian-400">
                      <Package className="h-3.5 w-3.5" />
                      Supplier Fulfillment (CJ Dropshipping)
                    </div>
                    {order.cjStatus === "forwarded" && order.usedBalancePayment ? (
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Paid and processing</span>
                        </div>
                        {order.cjOrderId && (
                          <p className="text-obsidian-500">Order ID: {order.cjOrderId}</p>
                        )}
                      </div>
                    ) : order.cjStatus === "forwarded" && !order.usedBalancePayment ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Created — needs payment on CJ</span>
                        </div>
                        {order.cjOrderId && (
                          <p className="text-obsidian-500">CJ Order ID: {order.cjOrderId}</p>
                        )}
                        <div className="flex gap-2 pt-1">
                          {order.cjPayUrl ? (
                            <a
                              href={order.cjPayUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-amber-400 transition-colors hover:bg-amber-500/20"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Pay Now
                            </a>
                          ) : (
                            <a
                              href="https://www.cjdropshipping.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-obsidian-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <ExternalLink className="h-3 w-3" />
                              CJ Dashboard
                            </a>
                          )}
                        </div>
                      </div>
                    ) : order.cjStatus === "failed" ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-red-400">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{order.cjError || "Failed to forward to CJ"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRetry(order.id, order.id)}
                          disabled={retrying === order.id}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-accent-light transition-all hover:bg-accent/20 active:scale-[0.98] disabled:opacity-50"
                        >
                          <RefreshCw
                            className={`h-3 w-3 ${retrying === order.id ? "animate-spin" : ""}`}
                          />
                          {retrying === order.id ? "Retrying..." : "Retry"}
                        </button>
                      </div>
                    ) : order.cjStatus === "refunded" ? (
                      <div className="flex items-center gap-1.5 text-xs text-obsidian-500">
                        <Ban className="h-3.5 w-3.5" />
                        <span>Refunded</span>
                      </div>
                    ) : (
                      <p className="text-xs text-obsidian-600">
                        Not yet forwarded
                      </p>
                    )}
                  </div>

                  {/* Refund Action */}
                  {order.paymentMethod === "paypal" && order.paypalCaptureId && order.cjStatus !== "refunded" && (
                    <div className="border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() => setRefundTarget(order)}
                        disabled={refunding === order.id}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition-all hover:bg-red-500/20 active:scale-[0.98] disabled:opacity-50"
                      >
                        <Ban className="h-3 w-3" />
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

      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-accent-light transition-colors hover:text-accent"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      {/* Refund Confirmation Modal */}
      {refundTarget && (
        <RefundModal
          order={refundTarget}
          formattedTotal={fmt(refundTarget.total)}
          onClose={() => setRefundTarget(null)}
          onConfirm={() => handleRefund(refundTarget.id, refundTarget.paypalCaptureId!)}
          loading={refunding === refundTarget.id}
        />
      )}
    </div>
  );
}
