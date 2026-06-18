import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids' Clothing — T-Shirts, Hoodies & More for Children",
  description: "Shop cute and comfortable kids' clothing at All Things. Discover t-shirts, hoodies, dresses, pants, and activewear for boys and girls. Quality styles your little ones will love.",
  keywords: ["kids clothing", "children's fashion", "kids t-shirts", "kids hoodies", "kids dresses", "kids pants", "boys clothing", "girls clothing"],
  openGraph: {
    title: "Kids' Clothing Collection",
    description: "Shop cute t-shirts, hoodies, dresses & pants for boys and girls.",
  },
};

export default function KidsPage() {
  return <ClothingGrid gender="kids" />;
}
