import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about ordering, shipping, returns, payments, and more at All Things. Fast support for all your inquiries.",
  keywords: ["FAQ", "frequently asked questions", "help center", "shipping info", "returns", "payments", "customer service"],
  openGraph: {
    title: "FAQ — All Things",
    description: "Answers to common questions about ordering, shipping, returns & more.",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
