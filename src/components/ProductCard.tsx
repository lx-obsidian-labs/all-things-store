"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToast } = useToast();

  const discount =
    product.compareAtPrice &&
    Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group glass-card animate-slide-up overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-obsidian-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {product.tags.includes("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
            Bestseller
          </span>
        )}
        {product.tags.includes("new") && !product.tags.includes("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
            New
          </span>
        )}
        {discount && discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-bold">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white opacity-0 shadow-lg shadow-accent/30 transition-all duration-300 hover:bg-accent-light active:scale-95 group-hover:opacity-100"
          aria-label="Quick add to cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="mb-1 font-medium text-white transition-colors group-hover:text-accent-light">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-obsidian-400">
          {product.description}
        </p>
        {product.rating && (
          <div className="mb-2 flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating!)
                      ? "text-amber-400"
                      : "text-obsidian-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-obsidian-500">
              ({product.reviewCount})
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-white">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-obsidian-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
