"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByTag } from "@/lib/products";
import { BRAND } from "@/lib/brand";

const GENDERS = ["all", "men", "women", "kids"] as const;
const TYPES = [
  "all",
  "sneakers",
  "boots",
  "sandals",
  "athletic",
  "formal",
  "loafers",
  "heels",
  "flats",
  "hiking",
] as const;

const TYPE_LABELS: Record<string, string> = {
  sneakers: "Sneakers",
  boots: "Boots",
  sandals: "Sandals",
  athletic: "Athletic",
  formal: "Formal",
  loafers: "Loafers",
  heels: "Heels",
  flats: "Flats",
  hiking: "Hiking",
};

export default function ShoesPage() {
  const allShoes = useMemo(() => getProductsByTag("shoes"), []);
  const [gender, setGender] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  const filtered = useMemo(() => {
    return allShoes.filter((p) => {
      if (gender !== "all" && !p.tags.includes(gender)) return false;
      if (type !== "all" && !p.tags.includes(type)) return false;
      return true;
    });
  }, [allShoes, gender, type]);

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <Link
        href="/shop"
        className="mb-8 flex items-center gap-1.5 text-sm text-obsidian-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all products
      </Link>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-accent-light">
            {BRAND.storeName} · Footwear
          </p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            Shoes
          </h1>
          <p className="mt-1 text-obsidian-400">
            {allShoes.length} styles across sneakers, boots, sandals & more
          </p>
        </div>
        <p className="text-sm text-obsidian-500">{filtered.length} products</p>
      </div>

      {/* Gender filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-obsidian-500" />
        <span className="mr-1 text-xs font-medium uppercase tracking-wider text-obsidian-500">
          Gender
        </span>
        {GENDERS.map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              gender === g
                ? "border-accent/40 bg-accent/10 text-accent-light shadow-sm shadow-accent/10"
                : "border-white/10 text-obsidian-300 hover:border-accent/30 hover:text-white"
            }`}
          >
            {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      {/* Type filter pills */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              type === t
                ? "border-accent/40 bg-accent/10 text-accent-light shadow-sm shadow-accent/10"
                : "border-white/10 text-obsidian-300 hover:border-accent/30 hover:text-white"
            }`}
          >
            {t === "all" ? "All Types" : TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <p className="text-obsidian-400">No shoes match your filters.</p>
          <button
            onClick={() => { setGender("all"); setType("all"); }}
            className="btn-primary mt-4 inline-block"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
