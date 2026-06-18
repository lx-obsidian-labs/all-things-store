import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { categories } from "@/lib/products";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = categories.find((c) => c.id === category);
  return {
    title: cat ? `${cat.name} — Shop` : "Shop All Products",
    description: cat?.description ?? "Browse our full catalog of curated essentials across electronics, fashion, home, wellness, and more.",
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  return <ShopClient initialCategory={category ?? "all"} />;
}
