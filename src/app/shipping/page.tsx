import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: `Learn about ${BRAND.storeName} shipping rates, delivery times, and return policy. Fast worldwide shipping from our fulfillment centers.`,
  keywords: ["shipping policy", "returns", "delivery times", "worldwide shipping", "order tracking"],
};

export default function ShippingPage() {
  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Policies
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          We want your experience with {BRAND.storeName} to be seamless from
          order to delivery.
        </p>
      </div>

      <div className="space-y-8">
        <section className="glass-card p-8">
          <h2 className="mb-4 font-display text-2xl text-white">
            Shipping Policy
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-obsidian-300">
            <p>
              We offer free standard shipping on all orders over $50 within the
              contiguous United States. Orders under $50 are charged a flat rate
              of $5.99.
            </p>
            <p>
              Standard shipping typically takes 5–10 business days for domestic
              orders and 10–20 business days for international orders. Delivery
              times are estimates and not guaranteed, though we always do our
              best to meet them.
            </p>
            <p>
              All orders are processed within 1–2 business days. You will
              receive a confirmation email with tracking information once your
              order ships.
            </p>
            <h3 className="font-semibold text-white">International Shipping</h3>
            <p>
              We ship to most countries worldwide. International shipping rates
              are calculated at checkout based on destination and package weight.
              Please note that customs duties, taxes, and import fees may apply
              and are the responsibility of the customer.
            </p>
            <h3 className="font-semibold text-white">Shipping Carriers</h3>
            <p>
              We partner with USPS, FedEx, and DHL to deliver your orders
              reliably. The carrier used depends on your location and the
              shipping method selected at checkout.
            </p>
          </div>
        </section>

        <section className="glass-card p-8">
          <h2 className="mb-4 font-display text-2xl text-white">
            Return Policy
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-obsidian-300">
            <p>
              We stand behind every product we sell. If you&apos;re not completely
              satisfied with your purchase, you may return it within 30 days of
              delivery for a full refund or exchange.
            </p>
            <h3 className="font-semibold text-white">Conditions</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Items must be unused and in original condition</li>
              <li>Original packaging must be included</li>
              <li>Proof of purchase (order number) is required</li>
            </ul>
            <h3 className="font-semibold text-white">How to Return</h3>
            <ol className="list-inside list-decimal space-y-1">
              <li>Contact our support team to initiate a return</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Ship the item back using the provided return label</li>
              <li>Refunds are processed within 5–7 business days of receipt</li>
            </ol>
            <h3 className="font-semibold text-white">Refunds</h3>
            <p>
              Refunds are issued to the original payment method. If you used
              multiple payment methods, the refund will be split accordingly.
              Shipping costs are non-refundable unless the return is due to our
              error.
            </p>
          </div>
        </section>

        <div className="text-center">
          <p className="mb-4 text-sm text-obsidian-400">
            Have questions about your order?
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
