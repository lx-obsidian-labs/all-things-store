import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${BRAND.storeName} by ${BRAND.company}. We curate quality products across electronics, fashion, home, wellness, and automotive — making smart shopping accessible to everyone.`,
  keywords: ["about us", BRAND.company.toLowerCase(), "curated marketplace", "our story"],
  openGraph: {
    title: `About ${BRAND.storeName}`,
    description: `Discover the story behind ${BRAND.storeName} — a curated marketplace by ${BRAND.company}.`,
  },
};

export default function AboutPage() {
  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Our Story
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          About {BRAND.storeName}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          A curated marketplace built with obsidian-level standards by{" "}
          <span className="text-accent-light">{BRAND.company}</span>.
        </p>
      </div>

      <div className="space-y-8">
        <section className="glass-card p-8">
          <h2 className="mb-4 font-display text-2xl text-white">The Vision</h2>
          <p className="leading-relaxed text-obsidian-300">
            {BRAND.storeName} was born from a simple idea: life is better when
            you surround yourself with things that work beautifully and look
            even better. We&apos;re not another generic marketplace — we&apos;re
            a carefully curated destination for products that earn their place
            in your daily routine.
          </p>
        </section>

        <section className="glass-card p-8">
          <h2 className="mb-4 font-display text-2xl text-white">
            {BRAND.company}
          </h2>
          <p className="leading-relaxed text-obsidian-300">
            {BRAND.company} is the creative and technology studio behind{" "}
            {BRAND.storeName}. We combine design sensibility with modern
            e-commerce to build brands and experiences that stand out. This
            store represents our commitment to quality curation and customer
            trust.
          </p>
        </section>

        <section className="glass-card p-8">
          <h2 className="mb-4 font-display text-2xl text-white">Our Promise</h2>
          <ul className="space-y-4 text-obsidian-300">
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-white">Curated, not cluttered</strong> —
                every product is evaluated before it reaches our catalog
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-white">Transparent sourcing</strong> —
                we partner with reliable suppliers and order samples first
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-white">Customer-first</strong> — easy
                returns, responsive support, and honest product descriptions
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
