"use client";

import { useState, useEffect, useCallback } from "react";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "all-things-recently-viewed";
const MAX_ITEMS = 6;

export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSlugs(JSON.parse(stored));
    } catch {}
  }, []);

  const addRecentlyViewed = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const recentlyViewed = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

  return { recentlyViewed, addRecentlyViewed };
}
