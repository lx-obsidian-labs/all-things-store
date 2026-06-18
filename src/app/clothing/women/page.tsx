import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Clothing — Dresses, Tops, Jeans & More",
  description: "Shop premium women's clothing at All Things. Discover dresses, tops, jeans, skirts, jackets, and activewear. Trendy styles, comfortable fits, great prices.",
  keywords: ["women's clothing", "women's fashion", "dresses", "women's tops", "women's jeans", "women's jackets"],
  openGraph: {
    title: "Women's Clothing Collection",
    description: "Shop trendy dresses, tops, jeans, skirts, jackets & more for women.",
  },
};

export default function WomenPage() {
  return <ClothingGrid gender="women" />;
}
