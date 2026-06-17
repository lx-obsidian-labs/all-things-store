"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="section-padding mx-auto max-w-7xl text-center">
        <div className="glass-card mx-auto max-w-md py-16">
          <Heart className="mx-auto mb-4 h-12 w-12 text-obsidian-500" />
          <h1 className="mb-2 font-display text-2xl text-white">Your wishlist is empty</h1>
          <p className="mb-6 text-obsidian-400">
            Save your favorite items and come back to them later.
          </p>
          <Link href="/shop" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
            Saved Items
          </p>
          <h1 className="font-display text-4xl text-white">
            Your Wishlist ({items.length})
          </h1>
        </div>
        <button
          type="button"
          onClick={clearWishlist}
          className="text-sm text-obsidian-500 transition-colors hover:text-red-400"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="group glass-card overflow-hidden transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
            <div className="relative aspect-square overflow-hidden bg-obsidian-800">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </Link>
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-obsidian-900/80 text-obsidian-400 backdrop-blur-sm transition-colors hover:bg-red-500/20 hover:text-red-400"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <Link href={`/product/${product.slug}`}>
                <h3 className="mb-1 font-medium text-white transition-colors hover:text-accent-light">
                  {product.name}
                </h3>
              </Link>
              <p className="mb-3 line-clamp-2 text-sm text-obsidian-400">
                {product.description}
              </p>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-lg font-semibold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-obsidian-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <AddToCartButton product={product} size="sm" className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
