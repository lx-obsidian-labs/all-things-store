import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian-950">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark">
                <span className="font-display text-lg text-white">AT</span>
              </div>
              <div>
                <p className="font-display text-xl text-white">{BRAND.storeName}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-obsidian-400">
                  A {BRAND.company} brand
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-obsidian-400">
              {BRAND.tagline}. We hand-pick products that blend quality, design,
              and value — delivered straight to your door.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-obsidian-300">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <Link href="/shop" className="transition-colors hover:text-accent-light">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-accent-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sourcing" className="transition-colors hover:text-accent-light">
                  Product Sourcing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-obsidian-300">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>{BRAND.email}</li>
              <li>
                <span className="text-obsidian-500">Powered by </span>
                <span className="text-accent-light">{BRAND.company}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-obsidian-500">
            © {BRAND.year} {BRAND.storeName}. All rights reserved.
          </p>
          <p className="text-xs text-obsidian-500">
            Built with care by{" "}
            <span className="font-medium text-obsidian-400">{BRAND.company}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
