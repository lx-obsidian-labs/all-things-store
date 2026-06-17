import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, TrendingUp, Clock, Zap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { categories, getBestSellingProducts, getDealProducts, getNewArrivals, getWinningProducts } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  const bestSellers = getBestSellingProducts(6);
  const deals = getDealProducts(4);
  const newArrivals = getNewArrivals(4);
  const winning = getWinningProducts(3);

  return (
    <>
      <Hero />

      {/* Best Sellers — social proof, highest conversion priority */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent-light" />
              <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
                Best Sellers
              </p>
            </div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Most loved by customers
            </h2>
          </div>
          <Link
            href="/shop?sort=bestselling"
            className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
          >
            Shop all best sellers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Deals / On Sale — urgency drives conversion */}
      <section className="section-padding border-t border-white/5 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                  On Sale
                </p>
              </div>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Best deals & discounts
              </h2>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
            >
              View all deals
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories — wayfinding for browsing shoppers */}
      <section className="section-padding mx-auto max-w-7xl">
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
              className="glass-card group p-6 transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-0.5"
            >
              <h3 className="mb-2 font-display text-xl text-white transition-colors group-hover:text-accent-light">
                {cat.name}
              </h3>
              <p className="text-sm text-obsidian-400">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals — freshness signals active catalog */}
      <section className="section-padding border-t border-white/5 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-light" />
                <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
                  New Arrivals
                </p>
              </div>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Fresh from the catalog
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
            >
              View newest
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks — curated selection */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <Zap className="h-5 w-5 text-accent-light" />
          <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
            Curated For You
          </p>
        </div>
        <h2 className="mb-10 font-display text-3xl text-white sm:text-4xl">
          Editor's top picks
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {winning.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Brand Story */}
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

      {/* Blog */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
              Journal
            </p>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Latest from the blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass-card overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-obsidian-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs text-obsidian-400">{post.date}</p>
                <h3 className="font-medium text-white transition-colors group-hover:text-accent-light">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
