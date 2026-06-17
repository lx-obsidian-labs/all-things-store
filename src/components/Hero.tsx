import Link from "next/link";
import { ArrowRight, Sparkles, Truck, Shield, RefreshCw, Package } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { categories } from "@/lib/products";

export function Hero() {
  const totalProducts = 5736; // static total, updated when products are added

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.2),transparent_50%)]" />
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
            <Package className="h-3.5 w-3.5" />
            {totalProducts}+ products across 5 collections
          </div>

          <h1 className="mb-6 font-display text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">Everything</span>
            <br />
            <span className="text-white">you need, all in one place</span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-obsidian-300 sm:text-xl">
            From tech gadgets to home essentials, style staples to wellness must-haves —
            we source the best so you don&apos;t have to.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="btn-primary group text-base">
              Browse Everything
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-secondary text-base">
              How It Works
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="glass-card group flex items-center gap-4 p-5 transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Package className="h-5 w-5 text-accent-light" />
              </div>
              <div>
                <p className="font-semibold text-white transition-colors group-hover:text-accent-light">
                  {cat.name}
                </p>
                <p className="text-sm text-obsidian-400">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On orders over $50",
            },
            {
              icon: Shield,
              title: "Secure Checkout",
              desc: "Protected payments",
            },
            {
              icon: RefreshCw,
              title: "Easy Returns",
              desc: "30-day guarantee",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card flex items-center gap-4 p-5 transition-colors hover:border-accent/20"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Icon className="h-5 w-5 text-accent-light" />
              </div>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-obsidian-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
