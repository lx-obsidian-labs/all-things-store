"use client";

import Link from "next/link";
import { getParentCategories, getChildCategories } from "@/lib/products";

interface CategoryPillsProps {
  active?: string;
  basePath?: string;
}

export function CategoryPills({
  active = "all",
  basePath = "/shop",
}: CategoryPillsProps) {
  const parentCategories = getParentCategories();
  const childCategories = active !== "all" ? getChildCategories(active) : [];

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
      {parentCategories.map((cat) => (
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
      {childCategories.length > 0 && (
        <div className="flex w-full flex-wrap gap-2 pt-1">
          {childCategories.map((child) => (
            <Link
              key={child.id}
              href={`${basePath}?category=${child.id}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                active === child.id
                  ? "bg-accent/20 text-accent-light"
                  : "border border-white/5 bg-white/[0.02] text-obsidian-500 hover:border-white/20 hover:text-obsidian-300"
              }`}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}