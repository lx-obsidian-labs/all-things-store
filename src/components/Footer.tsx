import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian-950">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo-icon.png"
                alt={BRAND.storeName}
                className="h-10 w-10 rounded-xl object-cover"
              />
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
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <Link href="/shop" className="transition-colors hover:text-accent-light">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=bestselling" className="transition-colors hover:text-accent-light">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="transition-colors hover:text-accent-light">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors hover:text-accent-light">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-obsidian-300">
              Learn
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-accent-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-accent-light">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-accent-light">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-accent-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-obsidian-300">
              Policies
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <Link href="/shipping" className="transition-colors hover:text-accent-light">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-accent-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-accent-light">
                  Terms of Service
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-obsidian-300">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-accent-light">
                  {BRAND.email}
                </a>
              </li>
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
