"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Domestic orders (US) typically arrive within 5–10 business days. International orders can take 10–20 business days depending on the destination. You'll receive a tracking number once your order ships.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 are charged a flat rate of $5.99.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "We process orders quickly, but if you need to make a change, please contact us within 2 hours of placing your order. We'll do our best to accommodate your request.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Duties and taxes may apply and are the responsibility of the customer.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy from the date of delivery. Items must be unused and in original packaging. To start a return, contact our support team and we'll guide you through the process.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your return, refunds are processed within 5–7 business days. The amount will be credited to your original payment method.",
      },
      {
        q: "Who pays for return shipping?",
        a: "We cover return shipping for defective or incorrect items. For all other returns, the customer is responsible for return shipping costs.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "Are your products tested for quality?",
        a: "Absolutely. Every product listed on All Things is evaluated for quality, design, and functionality before it reaches our catalog. We order samples from suppliers and only list products that meet our standards.",
      },
      {
        q: "Are product images accurate?",
        a: "We use high-quality images provided by our suppliers and supplement them with our own photography when possible. Colors may vary slightly depending on your screen settings.",
      },
      {
        q: "Do you offer product warranties?",
        a: "Most of our products come with a manufacturer's warranty ranging from 6 months to 2 years. Specific warranty information is listed on each product page.",
      },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All payments are processed securely through encrypted connections.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. We use industry-standard SSL encryption to protect your personal and payment information. We do not store your full card details on our servers.",
      },
      {
        q: "Do I need an account to place an order?",
        a: "No, you can check out as a guest. However, creating an account allows you to track orders, save your wishlist, and enjoy a faster checkout on future purchases.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const filtered = faqs
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Help Center
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-obsidian-300">
          Everything you need to know about shopping with us.
        </p>

        <div className="relative mx-auto max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-obsidian-500 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card py-12 text-center">
          <p className="text-obsidian-400">No FAQs match your search.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filtered.map((group) => (
            <section key={group.category}>
              <h2 className="mb-4 font-display text-2xl text-white">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => {
                  const key = `${group.category}-${item.q}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={key}
                      className="glass-card overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left"
                      >
                        <span className="pr-4 font-medium text-white">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-obsidian-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <p className="border-t border-white/5 px-6 pb-5 pt-4 text-sm leading-relaxed text-obsidian-300">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="mb-4 text-obsidian-400">
          Still have questions? We&apos;re here to help.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
