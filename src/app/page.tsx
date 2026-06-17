import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Clock, Zap, Tag, Snowflake } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { RecentlyViewedSection } from "./RecentlyViewedSection";
import { getBestSellingProducts, getDealProducts, getNewArrivals, getWinningProducts, getCheapestProducts, getWinterProducts } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  const bestSellers = getBestSellingProducts(6);
  const deals = getDealProducts(4);
  const cheapest = getCheapestProducts(6);
  const newArrivals = getNewArrivals(4);
  const winning = getWinningProducts(3);
  const winterItems = getWinterProducts(6);

  return (
    <>
      <Hero />

      {/* Best Sellers */}
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
              Most loved by our community
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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Deals + Budget Finds — merged into one value-focused row */}
      <section className="section-padding border-t border-white/5 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                  Best Value
                </p>
              </div>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Deals & budget finds
              </h2>
            </div>
            <Link
              href="/shop?sort=price-asc"
              className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
            >
              Shop all deals
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {[...deals, ...cheapest.slice(0, 2)].map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent-light" />
              <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
                New Arrivals
              </p>
            </div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Fresh drops
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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Winter Special — seasonal */}
      <section className="section-padding border-t border-white/5 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-sky-400" />
                <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
                  Winter Special
                </p>
              </div>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Stay warm this season
              </h2>
            </div>
            <Link
              href="/shop?tag=winter"
              className="group flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-white"
            >
              View all winter gear
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {winterItems.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <Zap className="h-5 w-5 text-accent-light" />
          <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
            Curated For You
          </p>
        </div>
        <h2 className="mb-10 font-display text-3xl text-white sm:text-4xl">
          Editor&apos;s top picks
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {winning.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <RecentlyViewedSection />

      {/* Brand Story */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="glass-card relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
              {BRAND.company}
            </p>
            <h2 className="mb-4 font-display text-3xl text-white sm:text-4xl">
              Everything, curated
            </h2>
            <p className="mb-8 text-obsidian-300 leading-relaxed">
              We search thousands of products so you don&apos;t have to. Every item
              at {BRAND.storeName} is chosen for quality, design, and value —
              across tech, home, style, and wellness.
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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
