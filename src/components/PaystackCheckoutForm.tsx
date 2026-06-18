"use client";

import { useCallback, useRef, useState } from "react";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}
import Script from "next/script";

interface PaystackCheckoutFormProps {
  email: string;
  total: number;
  name: string;
  onSuccess: (reference: string) => Promise<void>;
  onError: (message: string) => void;
  submitting: boolean;
}

export function PaystackCheckoutForm({
  email,
  total,
  name,
  onSuccess,
  onError,
  submitting,
}: PaystackCheckoutFormProps) {
  const [loaded, setLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const processingRef = useRef(false);

  const handlePay = useCallback(async () => {
    if (processingRef.current || !window.PaystackPop) return;
    processingRef.current = true;
    setProcessing(true);

    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount: total }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? "Failed to initialize payment");

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "",
        email,
        amount: Math.round(total * 100),
        currency: "ZAR",
        ref: data.reference,
        metadata: { custom_fields: [{ display_name: "Customer Name", variable_name: "customer_name", value: name }] },
        callback: async (response: { reference: string }) => {
          const verifyRes = await fetch(`/api/payments/verify?reference=${encodeURIComponent(response.reference)}`);
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            await onSuccess(response.reference);
          } else {
            onError(verifyData.message ?? "Payment verification failed");
          }
          processingRef.current = false;
          setProcessing(false);
        },
        onClose: () => {
          processingRef.current = false;
          setProcessing(false);
          onError("Payment was cancelled.");
        },
      });

      handler.openIframe();
    } catch (err: any) {
      onError(err.message ?? "Something went wrong");
      processingRef.current = false;
      setProcessing(false);
    }
  }, [email, total, name, onSuccess, onError]);

  const disabled = !loaded || processing || submitting;

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />
      <button
        type="button"
        onClick={handlePay}
        disabled={disabled}
        className="btn-primary w-full py-3 text-sm disabled:opacity-50"
      >
        {processing || submitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </span>
        ) : (
          `Pay R${total.toFixed(2)} with Paystack`
        )}
      </button>
    </>
  );
}
