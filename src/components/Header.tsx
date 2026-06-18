"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { BRAND } from "@/lib/brand";
import { getParentCategories } from "@/lib/products";
import { SearchOverlay } from "@/components/SearchOverlay";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";

const topLevelLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const categories = getParentCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo-icon.png"
            alt={BRAND.storeName}
            className="h-10 w-10 rounded-xl object-cover transition-transform group-hover:scale-105"
          />
          <div>
            <span className="font-display text-xl tracking-wide text-white">
              {BRAND.storeName}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-obsidian-400">
              by {BRAND.companyShort}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopMenuOpen(true)}
            onMouseLeave={() => setShopMenuOpen(false)}
          >
            <Link
              href="/shop"
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent-light ${
                pathname.startsWith("/shop") || pathname.startsWith("/clothing") || pathname.startsWith("/shoes")
                  ? "text-accent-light"
                  : "text-obsidian-300"
              }`}
            >
              Shop
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${shopMenuOpen ? "rotate-180" : ""}`} />
            </Link>
            {shopMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-obsidian-950 py-2 shadow-2xl backdrop-blur-xl">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian-300 transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setShopMenuOpen(false)}
                  >
                    <span>{cat.name}</span>
                  </Link>
                ))}
                <div className="my-1 border-t border-white/5" />
                <Link
                  href="/clothing"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setShopMenuOpen(false)}
                >
                  <span>Clothing</span>
                </Link>
                <Link
                  href="/shoes"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setShopMenuOpen(false)}
                >
                  <span>Shoes</span>
                </Link>
              </div>
            )}
          </div>

          {topLevelLinks.filter((l) => l.href !== "/shop").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-light ${
                pathname === link.href ? "text-accent-light" : "text-obsidian-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:block">
            <CurrencySwitcher />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-accent/40 hover:bg-white/10"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-accent/40 hover:bg-white/10"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-obsidian-600 text-[10px] font-bold">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-accent/40 hover:bg-white/10"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/5 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                pathname.startsWith("/shop")
                  ? "bg-accent/10 text-accent-light"
                  : "text-obsidian-300 hover:bg-white/5"
              }`}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-obsidian-300 hover:bg-white/5"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/clothing"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-obsidian-300 hover:bg-white/5"
            >
              Clothing
            </Link>
            <Link
              href="/shoes"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-obsidian-300 hover:bg-white/5"
            >
              Shoes
            </Link>
            <hr className="border-white/5" />
            {topLevelLinks.filter((l) => l.href !== "/shop").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-accent/10 text-accent-light"
                    : "text-obsidian-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}