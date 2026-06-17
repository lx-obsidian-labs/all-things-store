import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Clothing",
  description: "Shop men's, women's, and kids' clothing.",
};

const SECTIONS = [
  {
    title: "Men",
    slug: "men",
    desc: "Hoodies, jeans, shirts, shorts, jackets & more",
    color: "from-blue-500/20 to-blue-600/10",
    border: "hover:border-blue-500/30",
  },
  {
    title: "Women",
    slug: "women",
    desc: "Dresses, tops, jeans, skirts, jackets & more",
    color: "from-pink-500/20 to-pink-600/10",
    border: "hover:border-pink-500/30",
  },
  {
    title: "Kids",
    slug: "kids",
    desc: "T-shirts, hoodies, dresses, pants & more for little ones",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "hover:border-emerald-500/30",
  },
];

export default function ClothingPage() {
  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          {BRAND.storeName} · Clothing
        </p>
        <h1 className="mb-3 font-display text-4xl text-white sm:text-5xl">
          Shop by gender
        </h1>
        <p className="text-obsidian-400">
          Find the perfect fit for everyone in the family
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/clothing/${s.slug}`}
            className={`glass-card group relative overflow-hidden p-8 transition-all hover:-translate-y-1 ${s.border}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-50`} />
            <div className="relative">
              <h2 className="mb-3 font-display text-2xl text-white transition-colors group-hover:text-accent-light">
                {s.title}
              </h2>
              <p className="mb-6 text-sm text-obsidian-400">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-light">
                Shop {s.title}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
