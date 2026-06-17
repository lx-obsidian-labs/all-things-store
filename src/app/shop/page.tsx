import { ShopClient } from "./ShopClient";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop",
  description:
    "Browse our curated collection of tech, home, style, and wellness products.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  return <ShopClient initialCategory={category ?? "all"} />;
}
