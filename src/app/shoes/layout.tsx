import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoes & Footwear Collection",
  description: "Shop the latest shoes and footwear at All Things. Discover sneakers, boots, casual shoes, athletic footwear and more for men, women, and kids.",
  keywords: ["shoes", "footwear", "sneakers", "boots", "men's shoes", "women's shoes", "kids shoes", "athletic footwear"],
  openGraph: {
    title: "Shoes & Footwear — All Things",
    description: "Shop sneakers, boots, casual & athletic footwear for the whole family.",
  },
};

export default function ShoesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
