"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "@/components/ProductCard";

export function RecentlyViewedSection() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Continue Browsing
        </p>
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          Recently Viewed
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {recentlyViewed.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
