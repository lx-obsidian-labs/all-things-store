"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { getDiscountPercent } from "@/lib/products";
import { getSubcategoryLabel } from "@/lib/subcategories";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToast } = useToast();
  const { format: fmt } = useCurrency();

  const discount = getDiscountPercent(product);
  const isNew = product.tags.includes("new");
  const isBestseller = product.tags.includes("bestseller");
  const isTrending = product.tags.includes("trending");
  const rating = product.rating ?? 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group animate-slide-up overflow-hidden rounded-2xl border border-white/5 bg-obsidian-900/50 transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-obsidian-800">
        <div className="absolute inset-0 animate-pulse bg-obsidian-800" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="relative object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {discount > 0 && (
          <span className="absolute left-3 top-3 animate-pulse rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
            -{discount}%
          </span>
        )}
        {isBestseller && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
            Bestseller
          </span>
        )}
        {isNew && !isBestseller && (
          <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            New
          </span>
        )}
        {isTrending && !isBestseller && !isNew && discount === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
            Trending
          </span>
        )}

        {product.inventory !== undefined && product.inventory < 100 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-lg">
            Low Stock
          </span>
        )}

        {product.shippingFrom && !(product.inventory !== undefined && product.inventory < 100) && (
          <span className="absolute bottom-3 left-3 rounded-full bg-obsidian-900/70 px-2 py-0.5 text-[10px] font-medium text-obsidian-300 backdrop-blur-sm">
            {product.shippingFrom}
          </span>
        )}

        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white opacity-0 shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-light hover:scale-110 active:scale-95 group-hover:opacity-100"
          aria-label="Quick add to cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="mb-0.5 font-medium text-white transition-colors group-hover:text-accent-light line-clamp-1">
          {product.name}
        </h3>
        {product.subcategory && (
          <span className="mb-2 inline-block rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-[1px] text-[9px] font-medium uppercase tracking-[0.08em] text-obsidian-500">
            {getSubcategoryLabel(product.subcategory)}
          </span>
        )}
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-obsidian-400">
          {product.description}
        </p>

        {rating > 0 && (
          <div className="mb-2 flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.round(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-obsidian-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-obsidian-500">
              {rating.toFixed(1)} ({product.reviewCount ?? 0})
            </span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            {fmt(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-obsidian-500 line-through">
              {fmt(product.compareAtPrice)}
            </span>
          )}
          {product.price < 5 && (
            <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Best Value
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
