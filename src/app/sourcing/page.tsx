import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  PackageSearch,
  ShoppingBag,
  TestTube,
  TrendingUp,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import type { SupplierSource } from "@/lib/types";

export const metadata = {
  title: "Product Sourcing",
  description:
    "Dropshipping sourcing guide and workflow for All Things store.",
};

const suppliers = [
  {
    name: "CJ Dropshipping",
    desc: "US/EU warehouses, product sourcing agents, quality inspection",
    url: "https://cjdropshipping.com",
    bestFor: "General catalog, faster US shipping",
  },
  {
    name: "AliExpress",
    desc: "Massive catalog, low cost, direct from manufacturers",
    url: "https://www.aliexpress.com",
    bestFor: "Testing products, wide variety",
  },
  {
    name: "Spocket",
    desc: "US/EU suppliers, branded invoicing, Shopify integration",
    url: "https://www.spocket.co",
    bestFor: "Premium feel, faster delivery",
  },
  {
    name: "Printful",
    desc: "Print-on-demand for apparel, mugs, and custom goods",
    url: "https://www.printful.com",
    bestFor: "Branded merchandise",
  },
];

const steps = [
  {
    icon: PackageSearch,
    title: "1. Research & Select",
    desc: "Browse supplier catalogs. Look for 4+ star ratings, 100+ orders, and real customer photos.",
  },
  {
    icon: TestTube,
    title: "2. Order Samples",
    desc: "Always order samples before listing. Check build quality, packaging, and shipping time.",
  },
  {
    icon: TrendingUp,
    title: "3. Set Margins",
    desc: "Aim for 2.5–3× markup. Factor in shipping, payment fees (~3%), and ad costs.",
  },
  {
    icon: CheckCircle2,
    title: "4. Update Catalog",
    desc: "Add supplier SKU, cost price, and shipping days. Change status to 'live'.",
  },
];

const sourceLabels: Record<SupplierSource, string> = {
  pending: "Pending",
  aliexpress: "AliExpress",
  "cj-dropshipping": "CJ Dropshipping",
  spocket: "Spocket",
  printful: "Printful",
  manual: "Manual",
};

const sourceColors: Record<SupplierSource, string> = {
  pending: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  aliexpress: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  "cj-dropshipping": "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  spocket: "text-purple-300 bg-purple-500/10 border-purple-500/20",
  printful: "text-pink-300 bg-pink-500/10 border-pink-500/20",
  manual: "text-obsidian-300 bg-white/5 border-white/10",
};

export default function SourcingPage() {
  const pendingCount = products.filter((p) => p.status === "placeholder").length;
  const liveCount = products.filter((p) => p.status === "live").length;

  return (
    <div className="section-padding mx-auto max-w-5xl">
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Internal Guide
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Product Sourcing
        </h1>
        <p className="max-w-2xl text-lg text-obsidian-300">
          {BRAND.storeName} currently has{" "}
          <span className="font-semibold text-amber-300">
            {pendingCount} placeholder products
          </span>{" "}
          and{" "}
          <span className="font-semibold text-emerald-300">
            {liveCount} live
          </span>
          . Follow this workflow to go live.
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-5">
          <p className="text-2xl font-bold text-white">{products.length}</p>
          <p className="text-xs text-obsidian-400">Total Products</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-2xl font-bold text-amber-300">{pendingCount}</p>
          <p className="text-xs text-obsidian-400">Needs Sourcing</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-2xl font-bold text-emerald-300">{liveCount}</p>
          <p className="text-xs text-obsidian-400">Live Products</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-2xl font-bold text-accent-light">
            {Math.round((liveCount / products.length) * 100)}%
          </p>
          <p className="text-xs text-obsidian-400">Progress</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12 flex flex-wrap gap-3">
        <Link href="/sourcing/import" className="btn-primary group">
          <Globe className="h-4 w-4" />
          Import from AliExpress
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link href="/shop" className="btn-secondary">
          <ShoppingBag className="h-4 w-4" />
          View Catalog
        </Link>
      </div>

      {/* Product Status Table */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl text-white">
          Product Sourcing Status
        </h2>
        <div className="space-y-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="glass-card group flex items-center justify-between gap-4 p-4 transition-all hover:border-accent/30"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white transition-colors group-hover:text-accent-light">
                  {product.name}
                </p>
                <p className="text-xs text-obsidian-400">
                  Target: {formatPrice(product.price)} |{" "}
                  {product.supplier.costPrice
                    ? `Cost: ${formatPrice(product.supplier.costPrice)} | Margin: ${Math.round(
                        ((product.price - product.supplier.costPrice) /
                          product.price) *
                          100
                      )}%`
                    : "Cost: TBD"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    sourceColors[product.supplier.source]
                  }`}
                >
                  {sourceLabels[product.supplier.source]}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    product.status === "live"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Workflow Steps */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-card p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Icon className="h-5 w-5 text-accent-light" />
            </div>
            <h3 className="mb-2 font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-obsidian-400">{desc}</p>
          </div>
        ))}
      </div>

      {/* Recommended Suppliers */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl text-white">
          Recommended Suppliers
        </h2>
        <div className="space-y-4">
          {suppliers.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-start justify-between gap-4 p-6 transition-all hover:border-accent/30"
            >
              <div>
                <h3 className="mb-1 font-semibold text-white group-hover:text-accent-light">
                  {s.name}
                </h3>
                <p className="mb-2 text-sm text-obsidian-400">{s.desc}</p>
                <span className="text-xs text-accent-light">
                  Best for: {s.bestFor}
                </span>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-obsidian-500 transition-colors group-hover:text-accent-light" />
            </a>
          ))}
        </div>
      </section>

      {/* Code Reference */}
      <section className="glass-card p-8">
        <h2 className="mb-4 font-display text-2xl text-white">
          Updating the Catalog
        </h2>
        <p className="mb-4 text-sm text-obsidian-300">
          Products live in{" "}
          <code className="rounded bg-obsidian-800 px-2 py-0.5 text-accent-light">
            src/lib/products.ts
          </code>
          . When you source a product, update its supplier block:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-obsidian-950 p-4 text-xs leading-relaxed text-obsidian-300">
{`supplier: {
  source: "cj-dropshipping",  // or aliexpress, spocket, etc.
  sku: "CJABC123",
  costPrice: 12.50,
  shippingDays: "5-10",
  notes: "Verified sample — good quality",
},
status: "live",  // change from "placeholder"`}
        </pre>
        <p className="mt-4 text-sm text-obsidian-400">
          Once all products are sourced, integrate payment (Stripe) and connect
          your supplier for automated order fulfillment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/sourcing/import" className="btn-secondary">
            Import Products
          </Link>
          <Link href="/shop" className="btn-secondary">
            View current catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
