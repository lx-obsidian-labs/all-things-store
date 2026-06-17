"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCurrency } from "@/context/CurrencyContext";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const { format: fmt } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    );
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-obsidian-950/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 pt-16 sm:px-6">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 transition-colors focus-within:border-accent/50">
          <Search className="h-5 w-5 shrink-0 text-obsidian-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-lg text-white placeholder-obsidian-500 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 text-obsidian-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-sm text-obsidian-400 transition-colors hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto mt-8 w-full max-w-3xl overflow-y-auto px-4 pb-8 sm:px-6">
        {query && results.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-obsidian-400">
              No products found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm text-obsidian-500">
              Try a different search term
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-obsidian-500">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            {results.map((product, i) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-obsidian-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white transition-colors group-hover:text-accent-light">
                    {product.name}
                  </p>
                  <p className="truncate text-sm text-obsidian-400">
                    {product.description}
                  </p>
                </div>
                <span className="shrink-0 font-semibold text-white">
                  {fmt(product.price)}
                </span>
              </Link>
            ))}
          </div>
        )}

        {!query && (
          <div className="py-16 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-obsidian-600" />
            <p className="text-lg text-obsidian-400">
              Search across {products.length} products
            </p>
            <p className="mt-1 text-sm text-obsidian-500">
              Start typing to find what you&apos;re looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
