import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount =
    product.compareAtPrice &&
    Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );

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
      </div>

      <div className="p-5">
        <h3 className="mb-1 font-medium text-white transition-colors group-hover:text-accent-light">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-obsidian-400">
          {product.description}
        </p>
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
