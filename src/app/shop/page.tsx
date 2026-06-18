import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { categories } from "@/lib/products";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = categories.find((c) => c.id === category);
  const title = cat ? `${cat.name} — Shop All Products` : "Shop All Products";
  const description = cat?.description ?? "Browse 5,000+ curated products across electronics, fashion, home & living, wellness, automotive, and more. Quality you can trust, prices you'll love.";
  return {
    title,
    description,
    keywords: [cat?.name ?? "shop", "all products", "online store", "curated catalog"],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  return <ShopClient initialCategory={category ?? "all"} />;
}
