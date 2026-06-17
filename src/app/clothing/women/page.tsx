import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Clothing",
  description: "Dresses, tops, jeans, skirts, jackets, and more for women.",
};

export default function WomenPage() {
  return <ClothingGrid gender="women" />;
}
