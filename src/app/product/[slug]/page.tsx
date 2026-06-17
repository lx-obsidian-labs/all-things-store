import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Package } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getCategoryName,
  getProductBySlug,
  products,
} from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const discount =
    product.compareAtPrice &&
    Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm text-obsidian-400 transition-colors hover:text-accent-light"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-obsidian-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.status === "placeholder" && (
            <div className="absolute bottom-4 left-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
              Preview listing — sourcing in progress
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
            {getCategoryName(product.category)}
          </p>
          <h1 className="mb-4 font-display text-4xl text-white">{product.name}</h1>
          <p className="mb-6 text-lg leading-relaxed text-obsidian-300">
            {product.longDescription ?? product.description}
          </p>

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

          <AddToCartButton product={product} size="lg" className="mb-8 w-full sm:w-auto" />

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
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-white/5 pt-16">
          <h2 className="mb-8 font-display text-2xl text-white">You may also like</h2>
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
