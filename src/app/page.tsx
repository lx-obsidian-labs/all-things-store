import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { categories, getFeaturedProducts } from "@/lib/products";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
              Featured
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Trending picks
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-white/5 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
              Categories
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Shop by collection
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="glass-card group p-6 transition-all hover:border-accent/30 hover:bg-accent/5"
              >
                <h3 className="mb-2 font-display text-xl text-white transition-colors group-hover:text-accent-light">
                  {cat.name}
                </h3>
                <p className="text-sm text-obsidian-400">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="glass-card relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
              {BRAND.company}
            </p>
            <h2 className="mb-4 font-display text-3xl text-white sm:text-4xl">
              Quality products, obsidian-level standards
            </h2>
            <p className="mb-8 text-obsidian-300 leading-relaxed">
              Every product at {BRAND.storeName} is evaluated for quality,
              design, and customer satisfaction. We&apos;re building a store
              you can trust — one curated item at a time.
            </p>
            <Link href="/about" className="btn-primary">
              Learn about us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
