"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Minus,
  Package,
  Plus,
  Star,
} from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  formatPrice,
  getCategoryName,
  products,
} from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const { addItem } = useCart();
  const { addToast } = useToast();

  const allImages = product.images?.length ? product.images : [product.image];
  const discount =
    product.compareAtPrice &&
    Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddWithQuantity = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          {
            label: getCategoryName(product.category),
            href: `/shop?category=${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-obsidian-800">
            <Image
              src={allImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.status === "placeholder" && (
              <div className="absolute bottom-4 left-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
                Preview listing — sourcing in progress
              </div>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    i === selectedImage
                      ? "border-accent"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
            {getCategoryName(product.category)}
          </p>
          <h1 className="mb-4 font-display text-4xl text-white">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "text-obsidian-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-obsidian-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          <p className="mb-6 text-lg leading-relaxed text-obsidian-300">
            {product.longDescription ?? product.description}
          </p>

          {/* Price */}
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-obsidian-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discount && discount > 0 && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-sm font-semibold text-emerald-400">
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.name} className="mb-6">
              <p className="mb-3 text-sm font-medium text-obsidian-300">
                {variant.name}:{" "}
                <span className="text-white">
                  {selectedVariant[variant.name] ?? variant.options[0].label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => {
                  const isSelected =
                    (selectedVariant[variant.name] ??
                      variant.options[0].label) === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        setSelectedVariant((prev) => ({
                          ...prev,
                          [variant.name]: opt.label,
                        }))
                      }
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-accent bg-accent/20 text-white"
                          : "border-white/10 bg-white/5 text-obsidian-300 hover:border-accent/30 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-obsidian-300">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-lg font-medium text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddWithQuantity}
            className="btn-primary mb-8 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add to Cart — {formatPrice(product.price * quantity)}
          </button>

          {/* Shipping Info */}
          <div className="glass-card space-y-4 p-6">
            <div className="flex items-center gap-3 text-sm text-obsidian-300">
              <TruckIcon />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-obsidian-300">
              <Package className="h-5 w-5 shrink-0 text-accent-light" />
              <span>Ships within 3–7 business days</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-obsidian-300">
              <Clock className="h-5 w-5 shrink-0 text-accent-light" />
              <span>30-day easy returns</span>
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="glass-card mt-6 p-6">
            <h3 className="mb-4 font-display text-lg text-white">
              Customer Reviews
            </h3>
            {product.reviewCount && product.reviewCount > 0 ? (
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="font-display text-5xl text-white">
                    {product.rating}
                  </span>
                  <div className="mt-1 flex justify-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.round(product.rating!)
                            ? "fill-amber-400 text-amber-400"
                            : "text-obsidian-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-obsidian-500">
                    {product.reviewCount} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div
                      key={star}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="w-8 text-right text-obsidian-400">
                        {star}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-obsidian-700">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{
                            width: `${Math.round(
                              ((star === 5
                                ? 60
                                : star === 4
                                ? 25
                                : star === 3
                                ? 10
                                : star === 2
                                ? 3
                                : 2) *
                                product.rating!) /
                                5
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-obsidian-400">
                Reviews will appear once this product is live.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-white/5 pt-16">
          <h2 className="mb-8 font-display text-2xl text-white">
            You may also like
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-accent-light"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    </svg>
  );
}
