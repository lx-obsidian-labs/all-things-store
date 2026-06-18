"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface StripePaymentFormProps {
  total: number;
  currency: string;
  onSuccess: (paymentIntentId: string) => Promise<void>;
  onError: (message: string) => void;
  submitting: boolean;
}

export function StripePaymentForm({
  total,
  currency,
  onSuccess,
  onError,
  submitting,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.origin + "/checkout/confirmation",
      },
    });

    if (error) {
      onError(error.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await onSuccess(paymentIntent.id);
    } else {
      onError(`Payment ${paymentIntent?.status ?? "failed"}. Please try again.`);
      setProcessing(false);
    }
  }

  const disabled = !stripe || !elements || processing || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={disabled}
        className="btn-primary mt-4 w-full py-3 text-sm disabled:opacity-50"
      >
        {processing || submitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </span>
        ) : (
          `Pay ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          }).format(total)}`
        )}
      </button>
    </form>
  );
}
