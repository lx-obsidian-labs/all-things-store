"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Loader2,
  PackageSearch,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/products";
import type { ExtractedProduct } from "@/lib/sourcing";

export default function ImportPage() {
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedProduct | null>(null);
  const [searchResults, setSearchResults] = useState<ExtractedProduct[]>([]);
  const [imported, setImported] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!url.trim()) return;
    setExtracting(true);
    setError("");
    setExtracted(null);

    try {
      const res = await fetch("/api/sourcing/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error);
      } else {
        setExtracted(data.product);
      }
    } catch {
      setError("Failed to connect to extraction service");
    } finally {
      setExtracting(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setError("");

    try {
      const res = await fetch(`/api/sourcing/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.products);
      }
    } catch {
      setError("Search failed");
    } finally {
      setSearching(false);
    }
  };

  const handleImport = async (products: ExtractedProduct[]) => {
    try {
      const res = await fetch("/api/sourcing/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });
      const data = await res.json();
      if (data.success) {
        setImported(data.imported);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Import failed");
    }
  };

  if (imported) {
    return (
      <div className="section-padding mx-auto max-w-5xl">
        <div className="glass-card p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <ShoppingBag className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="mb-2 font-display text-2xl text-white">
            Products Extracted Successfully
          </h2>
          <p className="mb-2 text-obsidian-400">
            {imported.length} product(s) are ready to review. Copy the code below
            into <code className="rounded bg-obsidian-800 px-2 py-0.5 text-accent-light">src/lib/products.ts</code>.
          </p>
          <pre className="mb-6 mt-4 max-h-96 overflow-auto rounded-xl bg-obsidian-950 p-4 text-left text-xs leading-relaxed text-obsidian-300">
{JSON.stringify(imported, null, 2)}
          </pre>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sourcing" className="btn-secondary">
              Back to Sourcing
            </Link>
            <button
              type="button"
              onClick={() => {
                setImported(null);
                setExtracted(null);
                setSearchResults([]);
                setUrl("");
                setSearchQuery("");
              }}
              className="btn-primary"
            >
              Import More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding mx-auto max-w-5xl">
      <Link
        href="/sourcing"
        className="mb-8 inline-flex items-center gap-2 text-sm text-obsidian-400 transition-colors hover:text-accent-light"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sourcing
      </Link>

      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Import Tool
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Import Products from AliExpress
        </h1>
        <p className="max-w-2xl text-lg text-obsidian-300">
          Paste an AliExpress or CJ Dropshipping product URL, or search for
          products to import into your catalog.
        </p>
      </div>

      {error && (
        <div className="glass-card mb-8 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* URL Import */}
      <section className="mb-12">
        <div className="glass-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-white">
            <Globe className="h-5 w-5 text-accent-light" />
            Import by URL
          </h2>
          <p className="mb-4 text-sm text-obsidian-400">
            Paste a product page URL from AliExpress or CJ Dropshipping to
            extract product details.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.aliexpress.com/item/..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              onKeyDown={(e) => e.key === "Enter" && handleExtract()}
            />
            <button
              type="button"
              onClick={handleExtract}
              disabled={extracting || !url.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {extracting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <PackageSearch className="h-4 w-4" />
                  Extract
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mb-12">
        <div className="glass-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-white">
            <Search className="h-5 w-5 text-accent-light" />
            Search Products
          </h2>
          <p className="mb-4 text-sm text-obsidian-400">
            Search for products by keyword to find AliExpress/CJ listings.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Wireless charger, desk lamp, earbuds..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-obsidian-500 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {searching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Extracted Product Preview */}
      {extracted && (
        <section className="mb-12">
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col gap-6 p-6 sm:flex-row">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-obsidian-800 sm:w-48">
                <Image
                  src={extracted.image}
                  alt={extracted.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <div className="flex-1">
                <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent-light">
                  {extracted.supplier.source === "aliexpress"
                    ? "AliExpress"
                    : "CJ Dropshipping"}
                </span>
                <h3 className="mb-2 font-display text-xl text-white">
                  {extracted.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-obsidian-400">
                  {extracted.description}
                </p>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-lg font-bold text-white">
                    Cost: {formatPrice(extracted.supplier.costPrice)}
                  </span>
                  {extracted.compareAtPrice && (
                    <span className="text-sm text-obsidian-500 line-through">
                      {formatPrice(extracted.compareAtPrice)}
                    </span>
                  )}
                  <span className="text-sm text-emerald-400">
                    2.5× retail: {formatPrice(extracted.supplier.costPrice * 2.5)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-obsidian-400">
                  <span>SKU: {extracted.supplier.sku}</span>
                  <span>Shipping: {extracted.supplier.shippingDays} days</span>
                  <span>Category: {extracted.category}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 px-6 py-4">
              <button
                type="button"
                onClick={() => handleImport([extracted])}
                className="btn-primary"
              >
                <ShoppingBag className="h-4 w-4" />
                Import to Catalog
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl text-white">
            Search Results ({searchResults.length})
          </h2>
          <div className="space-y-4">
            {searchResults.map((product) => (
              <div
                key={product.supplier.sku}
                className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-obsidian-800">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-white">
                    {product.title}
                  </h3>
                  <p className="truncate text-sm text-obsidian-400">
                    {product.description}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-obsidian-500">
                    <span>SKU: {product.supplier.sku}</span>
                    <span>Cost: {formatPrice(product.supplier.costPrice)}</span>
                    <span>
                      Retail: {formatPrice(product.supplier.costPrice * 2.5)}
                    </span>
                    <span>Shipping: {product.supplier.shippingDays} days</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleImport([product])}
                  className="btn-secondary shrink-0"
                >
                  Import
                </button>
              </div>
            ))}
          </div>
          {searchResults.length > 1 && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => handleImport(searchResults)}
                className="btn-primary"
              >
                Import All ({searchResults.length})
              </button>
            </div>
          )}
        </section>
      )}

      <section className="glass-card mt-12 p-6">
        <h2 className="mb-4 font-display text-xl text-white">
          How It Works
        </h2>
        <div className="grid gap-6 text-sm sm:grid-cols-3">
          <div>
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
              1
            </div>
            <h3 className="mb-1 font-semibold text-white">Paste or Search</h3>
            <p className="text-obsidian-400">
              Enter an AliExpress/CJ product URL or search by keyword.
            </p>
          </div>
          <div>
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
              2
            </div>
            <h3 className="mb-1 font-semibold text-white">Review &amp; Set Margins</h3>
            <p className="text-obsidian-400">
              Check extracted details. Retail price is auto-calculated at 2.5× cost.
            </p>
          </div>
          <div>
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
              3
            </div>
            <h3 className="mb-1 font-semibold text-white">Copy to Catalog</h3>
            <p className="text-obsidian-400">
              Import generates product data ready to paste into your codebase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
