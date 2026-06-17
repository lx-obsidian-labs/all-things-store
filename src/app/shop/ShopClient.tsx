"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3X3, List, ListOrdered, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryPills } from "@/components/CategoryPills";
import { categories, products, sortProducts } from "@/lib/products";
import { subcategories, getSubcategoryLabel } from "@/lib/subcategories";
import type { SortOption } from "@/lib/products";

interface ShopClientProps {
  initialCategory: string;
}

export function ShopClient({ initialCategory }: ShopClientProps) {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortOption>("default");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("");

  const activeCategory = searchParams.get("category") ?? initialCategory;

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const availableSubcategories = useMemo(() => {
    const set = new Set<string>();
    for (const p of filtered) {
      if (p.subcategory) set.add(p.subcategory);
    }
    return subcategories.filter((s) => set.has(s.id));
  }, [filtered]);

  const subcategoryFiltered = useMemo(
    () =>
      activeSubcategory
        ? filtered.filter((p) => p.subcategory === activeSubcategory)
        : filtered,
    [filtered, activeSubcategory]
  );

  const sorted = useMemo(() => sortProducts(subcategoryFiltered, sort), [subcategoryFiltered, sort]);

  const categoryInfo = categories.find((c) => c.id === activeCategory);

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Collection
        </p>
        <h1 className="mb-3 font-display text-4xl text-white sm:text-5xl">
          {categoryInfo && activeCategory !== "all"
            ? categoryInfo.name
            : "Shop All"}
        </h1>
        <p className="max-w-xl text-obsidian-400">
          {categoryInfo && activeCategory !== "all"
            ? categoryInfo.description
            : "Explore our full catalog of curated essentials."}
        </p>
      </div>

      <div className="mb-4">
        <CategoryPills active={activeCategory} />
      </div>

      {availableSubcategories.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveSubcategory("")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              !activeSubcategory
                ? "border-accent/40 bg-accent/10 text-accent-light shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                : "border-white/[0.06] bg-white/[0.02] text-obsidian-500 hover:border-white/20 hover:text-obsidian-300"
            }`}
          >
            All
            <span className={`ml-1.5 tabular-nums ${
              !activeSubcategory ? "text-accent-light/60" : "text-obsidian-600"
            }`}>
              {sorted.length}
            </span>
          </button>
          {availableSubcategories.map((sub) => {
            const count = filtered.filter((p) => p.subcategory === sub.id).length;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveSubcategory(sub.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  activeSubcategory === sub.id
                    ? "border-accent/40 bg-accent/10 text-accent-light shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                    : "border-white/[0.06] bg-white/[0.02] text-obsidian-500 hover:border-white/20 hover:text-obsidian-300"
                }`}
              >
                {sub.label}
                <span className={`ml-1.5 tabular-nums ${
                  activeSubcategory === sub.id ? "text-accent-light/60" : "text-obsidian-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {activeSubcategory && (
            <button
              type="button"
              onClick={() => setActiveSubcategory("")}
              className="flex items-center gap-1.5 text-xs text-obsidian-500 transition-colors hover:text-white"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
          <p className="text-xs tabular-nums text-obsidian-500">
            {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <ListOrdered className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-8 text-sm text-obsidian-300 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              <option value="default" className="bg-obsidian-900">
                Default
              </option>
              <option value="bestselling" className="bg-obsidian-900">
                Best Selling
              </option>
              <option value="rating" className="bg-obsidian-900">
                Top Rated
              </option>
              <option value="price-asc" className="bg-obsidian-900">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-obsidian-900">
                Price: High to Low
              </option>
              <option value="newest" className="bg-obsidian-900">
                Newest
              </option>
              <option value="name" className="bg-obsidian-900">
                Name
              </option>
            </select>
          </div>

          <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-full p-2 transition-colors ${
                view === "grid"
                  ? "bg-accent text-white"
                  : "text-obsidian-400 hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-full p-2 transition-colors ${
                view === "list"
                  ? "bg-accent text-white"
                  : "text-obsidian-400 hover:text-white"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <p className="text-obsidian-400">No products in this category yet.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
