import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Clothing",
  description: "Hoodies, jeans, shirts, shorts, and more for men.",
};

export default function MenPage() {
  return <ClothingGrid gender="men" />;
}
