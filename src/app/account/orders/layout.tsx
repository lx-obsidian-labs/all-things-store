import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track your orders, view order history, and manage returns at All Things.",
  robots: { index: false, follow: false },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
