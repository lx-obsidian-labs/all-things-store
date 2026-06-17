import Link from "next/link";
import { ArrowRight, Sparkles, Truck, Shield, RefreshCw } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.2),transparent_50%)]" />
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
            <Sparkles className="h-3.5 w-3.5" />
            Curated by {BRAND.company}
          </div>

          <h1 className="mb-6 font-display text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">All Things</span>
            <br />
            <span className="text-white">you&apos;ll love</span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-obsidian-300 sm:text-xl">
            {BRAND.tagline}. Discover thoughtfully selected tech, home, style,
            and wellness products — shipped worldwide.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="btn-primary group">
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
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
