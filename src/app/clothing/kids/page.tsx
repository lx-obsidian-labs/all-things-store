import { ClothingGrid } from "@/components/ClothingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids' Clothing",
  description: "T-shirts, hoodies, dresses, pants, and more for kids.",
};

export default function KidsPage() {
  return <ClothingGrid gender="kids" />;
}
