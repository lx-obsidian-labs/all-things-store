"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Minus,
  Package,
  Plus,
  Star,
  Shield,
  Truck,
} from "lucide-react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  getCategoryName,
  products,
} from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useCurrency } from "@/context/CurrencyContext";
import type { Product } from "@/lib/types";

const REVIEW_DATA: Record<string, { author: string; date: string; text: string; rating: number }[]> = {
  "wireless-charging-dock": [
    { author: "Alex M.", date: "2 weeks ago", text: "Charges all three devices simultaneously without overheating. The ambience light is a nice bonus for nighttime.", rating: 5 },
    { author: "Sam K.", date: "1 month ago", text: "Great build quality. Works perfectly with my iPhone and AirPods.", rating: 5 },
    { author: "Jordan P.", date: "3 weeks ago", text: "Foldable design saves desk space. Wish it came with a power brick though.", rating: 4 },
  ],
  "led-desk-lamp": [
    { author: "Taylor R.", date: "1 week ago", text: "Love the adjustable color temps. Battery lasts all day.", rating: 5 },
    { author: "Morgan S.", date: "2 weeks ago", text: "Sleek design, bright enough for detailed work.", rating: 4 },
  ],
  "amoled-smart-watch": [
    { author: "Casey L.", date: "3 days ago", text: "AMOLED screen is gorgeous. Battery lasts a full 2 weeks.", rating: 5 },
    { author: "Drew N.", date: "1 week ago", text: "Voice assistant works great for calls and texts.", rating: 4 },
    { author: "Riley T.", date: "2 weeks ago", text: "Good value for the price. Heart rate tracking seems accurate.", rating: 4 },
  ],
  "aroma-flame-diffuser": [
    { author: "Avery J.", date: "5 days ago", text: "The flame effect is mesmerizing. Perfect for meditation.", rating: 5 },
    { author: "Quinn B.", date: "2 weeks ago", text: "Quiet operation and easy to clean. Love it.", rating: 4 },
  ],
  "vintage-leather-wallet": [
    { author: "Blake W.", date: "1 week ago", text: "Leather is developing a beautiful patina. RFID works great.", rating: 5 },
    { author: "Sydney C.", date: "3 weeks ago", text: "Slim but holds everything I need. Quality stitching.", rating: 5 },
    { author: "Jamie F.", date: "1 month ago", text: "Best wallet I've owned. The crazy horse leather is gorgeous.", rating: 5 },
  ],
  "mini-metal-wallet": [
    { author: "Logan H.", date: "4 days ago", text: "Ultra-slim, fits in any pocket. Holds 6 cards easily.", rating: 4 },
    { author: "Morgan D.", date: "2 weeks ago", text: "Sleek metal finish. RFID protection is a must.", rating: 4 },
  ],
  "smart-thermal-bottle": [
    { author: "Cameron B.", date: "1 week ago", text: "LED temp display is surprisingly useful. Keeps coffee hot for hours.", rating: 5 },
    { author: "Jordan F.", date: "3 weeks ago", text: "No more guessing if my drink is cold enough!", rating: 4 },
  ],
  "portable-blender": [
    { author: "Taylor M.", date: "2 days ago", text: "Perfect for post-workout smoothies. Battery lasts a week.", rating: 5 },
    { author: "Reese A.", date: "1 week ago", text: "Blends frozen fruit easily. Easy to clean.", rating: 4 },
    { author: "Drew P.", date: "2 weeks ago", text: "USB rechargeable is super convenient for travel.", rating: 5 },
  ],
  "magnetic-power-bank": [
    { author: "Skyler J.", date: "3 days ago", text: "Snaps right on and charges fast. Slim enough for pocket carry.", rating: 5 },
    { author: "Morgan L.", date: "1 week ago", text: "8400mAh charges my phone twice. Love the wireless convenience.", rating: 5 },
  ],
  "adjustable-laptop-stand": [
    { author: "Alex T.", date: "5 days ago", text: "My neck pain is gone. Adjustable height is perfect.", rating: 4 },
    { author: "Casey R.", date: "2 weeks ago", text: "Foldable and portable. Great heat dissipation.", rating: 4 },
  ],
  "outdoor-bluetooth-speaker": [
    { author: "Jordan K.", date: "1 week ago", text: "RGB lights are fun at parties. Sound is impressive for the size.", rating: 4 },
    { author: "Riley S.", date: "2 weeks ago", text: "Took it camping — battery lasted the whole weekend.", rating: 5 },
  ],
  "laptop-backpack": [
    { author: "Quinn M.", date: "4 days ago", text: "Converts from backpack to tote in seconds. Very roomy.", rating: 5 },
    { author: "Avery D.", date: "1 week ago", text: "Waterproof material saved my laptop in a rainstorm.", rating: 5 },
    { author: "Sam W.", date: "3 weeks ago", text: "Comfortable straps even with a heavy load.", rating: 4 },
  ],
  "mesh-watch-men": [
    { author: "Blake T.", date: "6 days ago", text: "Classic look with modern mesh band. Gets compliments.", rating: 4 },
    { author: "Drew S.", date: "2 weeks ago", text: "Great everyday watch. The mesh band is comfortable.", rating: 4 },
  ],
  "wooden-watch": [
    { author: "Casey N.", date: "3 days ago", text: "Unique wood grain — no two are alike. Gift box was nice.", rating: 5 },
    { author: "Jordan P.", date: "1 week ago", text: "Eco-friendly and stylish. Quartz movement is accurate.", rating: 5 },
  ],
  "yoga-mat": [
    { author: "Taylor K.", date: "5 days ago", text: "Non-slip even during hot yoga. Perfect thickness.", rating: 5 },
    { author: "Morgan R.", date: "2 weeks ago", text: "Good grip and cushioning. Lightweight to carry.", rating: 4 },
  ],
  "resistance-bands-set": [
    { author: "Alex F.", date: "1 week ago", text: "5 levels cover all my workouts. Bands are sturdy.", rating: 4 },
    { author: "Riley J.", date: "3 weeks ago", text: "Great for home workouts. Comes with a nice carry bag.", rating: 5 },
  ],
  "magnetic-cable-clips": [
    { author: "Sam D.", date: "4 days ago", text: "Finally an organized desk! Adhesive is strong.", rating: 4 },
    { author: "Quinn B.", date: "1 week ago", text: "Simple but useful. Cables stay put.", rating: 4 },
  ],
  "ceramic-flower-pot": [
    { author: "Drew L.", date: "2 days ago", text: "Beautiful pot, perfect for my succulent collection.", rating: 5 },
    { author: "Casey W.", date: "1 week ago", text: "Breathable material keeps plants healthy.", rating: 4 },
  ],
};

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [showMobileBar, setShowMobileBar] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();
  const { format: fmt } = useCurrency();

  useEffect(() => {
    const onScroll = () => setShowMobileBar(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addRecentlyViewed(product.slug);
  }, [product.slug, addRecentlyViewed]);

  const viewingCount = useMemo(() => {
    const id = parseInt(product.id, 10) || 1;
    return 8 + ((id * 13 + 7) % 35);
  }, [product.id]);

  const freeShippingRemaining = useMemo(() => {
    const remaining = 50 - product.price;
    if (remaining <= 0) return 0;
    if (remaining < 50) return remaining;
    return null;
  }, [product.price]);

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
              {fmt(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-obsidian-500 line-through">
                  {fmt(product.compareAtPrice)}
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

          {/* Social Proof */}
          <div className="mb-4 flex items-center gap-2 text-sm text-obsidian-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>{viewingCount} people are viewing this right now</span>
          </div>

          {/* Free Shipping Offer */}
          {freeShippingRemaining !== null ? (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
              <Truck className="h-4 w-4 shrink-0 text-accent-light" />
              <p className="text-sm text-obsidian-300">
                {freeShippingRemaining === 0
                  ? "This item qualifies for free shipping!"
                  : `Add only ${fmt(freeShippingRemaining)} more for free shipping`}
              </p>
            </div>
          ) : (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <Truck className="h-4 w-4 shrink-0 text-obsidian-500" />
              <p className="text-sm text-obsidian-500">
                Free shipping on orders over {fmt(50)}
              </p>
            </div>
          )}

          {/* Trust Badges — right next to CTA */}
          <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-xs text-obsidian-400">
              <Shield className="h-4 w-4 shrink-0 text-accent-light" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-400">
              <Package className="h-4 w-4 shrink-0 text-accent-light" />
              <span>CJ Dropshipping</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-400">
              <Shield className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-400">
              <Truck className="h-4 w-4 shrink-0 text-accent-light" />
              <span>Global shipping</span>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddWithQuantity}
            className="btn-primary mb-6 w-full"
          >
            <Plus className="h-4 w-4" />
            Add to Cart — {fmt(product.price * quantity)}
          </button>

          {/* CJ-Style Product Details Panel */}
          <div className="glass-card divide-y divide-white/5">
            {/* SKU & Basic Info */}
            <div className="grid grid-cols-2 gap-4 p-5">
              <div>
                <p className="mb-0.5 text-xs text-obsidian-500">SKU</p>
                <p className="text-sm font-medium text-white">{product.supplier.sku ?? "—"}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-obsidian-500">Weight</p>
                <p className="text-sm font-medium text-white">{product.weight ?? "—"}</p>
              </div>
              {product.inventory !== undefined && (
                <div className="col-span-2">
                  <p className="mb-0.5 text-xs text-obsidian-500">Inventory</p>
                  <p className="text-sm font-medium text-emerald-400">
                    {product.inventory.toLocaleString()} units
                    {product.inventory < 100 && (
                      <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">Low stock</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-light" />
                <p className="text-sm font-medium text-white">
                  Shipping from {product.shippingFrom ?? "China"}
                </p>
              </div>

              <div className="space-y-3">
                {(product.shippingMethods ?? []).map((method, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-4 transition-all ${
                      i === 0
                        ? "border-accent/30 bg-accent/5"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {method.name}
                      </span>
                      <span className="text-sm font-bold text-accent-light">
                        {fmt(method.fee)}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-obsidian-400">
                      <p>Processing: {method.processingDays}</p>
                      <p>Delivery: {method.deliveryDays}</p>
                      <p className="text-obsidian-500">Tracking: {method.tracking}</p>
                    </div>
                  </div>
                ))}
              </div>

              {product.supplier.processingTime && (
                <p className="mt-3 text-xs text-obsidian-500">
                  Estimated processing time: {product.supplier.processingTime}
                </p>
              )}
            </div>

            {/* Sell & Earn (Total Landed Cost) */}
            {product.totalLandedCost && (
              <div className="p-5">
                <p className="mb-1 text-xs text-obsidian-500">Sell & Earn</p>
                <p className="font-display text-2xl text-white">
                  {fmt(product.totalLandedCost)}
                </p>
                <p className="text-xs text-obsidian-500">
                  Product ({fmt(product.price)}) + Shipping ({fmt(product.shippingMethods?.[0]?.fee ?? 0)})
                </p>
              </div>
            )}

          </div>

          {product.supplier.sku && (
            <p className="mt-2 text-xs text-obsidian-600">
              Lists: 30  |  SKU: {product.supplier.sku}
            </p>
          )}

          {/* Reviews */}
          <div className="glass-card mt-6 p-6">
            <h3 className="mb-6 font-display text-lg text-white">
              Customer Reviews
            </h3>

            {REVIEW_DATA[product.slug] && REVIEW_DATA[product.slug].length > 0 ? (
              <>
                <div className="mb-6 flex items-center gap-6">
                  <div className="text-center">
                    <span className="font-display text-5xl text-white">
                      {product.rating?.toFixed(1)}
                    </span>
                    <div className="mt-1 flex justify-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.round(product.rating ?? 0)
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
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = REVIEW_DATA[product.slug]
                        ? Math.round(
                            (REVIEW_DATA[product.slug].filter(
                              (r) => r.rating === star
                            ).length /
                              REVIEW_DATA[product.slug].length) *
                              100
                          )
                        : 0;
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="w-8 text-right text-obsidian-400">
                            {star}
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-obsidian-700">
                            <div
                              className="h-full rounded-full bg-amber-400 transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-6 text-right text-obsidian-500">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  {REVIEW_DATA[product.slug].map((review, i) => (
                    <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {review.author}
                        </span>
                        <span className="text-xs text-obsidian-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="mb-1.5 flex">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star
                            key={j}
                            className={`h-3 w-3 ${
                              j < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-obsidian-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-obsidian-300">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-obsidian-400">
                Be the first to review this product.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-20 border-t border-white/5 pt-16">
          <h2 className="mb-8 font-display text-2xl text-white">
            Recently Viewed
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {recentlyViewed.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

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

      {/* Sticky Mobile Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-obsidian-950/95 p-4 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
          showMobileBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-obsidian-400">{product.name}</p>
            <p className="text-lg font-bold text-white">{fmt(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAddWithQuantity}
            className="btn-primary shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


