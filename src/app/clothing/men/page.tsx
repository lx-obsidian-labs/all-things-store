import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Clothing — Hoodies, Jeans, Shirts & More",
  description: "Shop premium men's clothing at All Things. Discover hoodies, jeans, shirts, shorts, jackets, and activewear. Quality fabrics, modern styles, affordable prices.",
  keywords: ["men's clothing", "men's fashion", "hoodies for men", "men's jeans", "men's shirts", "men's jackets"],
  openGraph: {
    title: "Men's Clothing Collection",
    description: "Shop premium hoodies, jeans, shirts, shorts, jackets & more for men.",
  },
};

export default function MenPage() {
  return <ClothingGrid gender="men" />;
}
