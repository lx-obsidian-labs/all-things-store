"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByGender } from "@/lib/products";
import { BRAND } from "@/lib/brand";

interface ClothingGridProps {
  gender: "men" | "women" | "kids";
}

const LABELS: Record<string, { title: string; desc: string }> = {
  men: { title: "Men's Clothing", desc: "Hoodies, jeans, shirts, shorts, and more" },
  women: { title: "Women's Clothing", desc: "Dresses, tops, jeans, skirts, jackets" },
  kids: { title: "Kids' Clothing", desc: "T-shirts, hoodies, dresses, pants for little ones" },
};

export function ClothingGrid({ gender }: ClothingGridProps) {
  const items = getProductsByGender(gender);
  const label = LABELS[gender];

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <Link
        href="/shop"
        className="mb-8 flex items-center gap-1.5 text-sm text-obsidian-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all products
      </Link>

      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-accent-light">
            {BRAND.storeName} · {label.title}
          </p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            {label.title}
          </h1>
          <p className="mt-1 text-obsidian-400">{label.desc}</p>
        </div>
        <p className="text-sm text-obsidian-500">{items.length} products</p>
      </div>

      {items.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <p className="text-obsidian-400">No products found in this category yet.</p>
          <Link href="/shop" className="btn-primary mt-4 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
