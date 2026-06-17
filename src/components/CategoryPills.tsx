"use client";

import Link from "next/link";
import { categories } from "@/lib/products";

interface CategoryPillsProps {
  active?: string;
  basePath?: string;
}

export function CategoryPills({
  active = "all",
  basePath = "/shop",
}: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={basePath}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          active === "all"
            ? "bg-accent text-white shadow-lg shadow-accent/25"
            : "border border-white/10 bg-white/5 text-obsidian-300 hover:border-accent/30 hover:text-white"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`${basePath}?category=${cat.id}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            active === cat.id
              ? "bg-accent text-white shadow-lg shadow-accent/25"
              : "border border-white/10 bg-white/5 text-obsidian-300 hover:border-accent/30 hover:text-white"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
