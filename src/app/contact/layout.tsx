import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the All Things team. We're here to help with orders, product questions, returns, and general inquiries.",
  keywords: ["contact us", "customer support", "help", "questions", "All Things support"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
