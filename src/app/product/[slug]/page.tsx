import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products, formatPrice } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { BRAND } from "@/lib/brand";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://allthings.store";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  const price = formatPrice(product.price);
  const imageUrl = product.image.startsWith("http") ? product.image : `${BASE_URL}${product.image}`;
  return {
    title: `${product.name} — ${price}`,
    description: `Buy ${product.name} at ${BRAND.storeName}. ${product.description.substring(0, 150)} High-quality product, fast shipping, great price.`,
    keywords: [product.name, product.category, "buy online", "shop now"],
    openGraph: {
      title: `${product.name} — ${price}`,
      description: product.description.substring(0, 160),
      type: "website",
      url: `${BASE_URL}/product/${slug}`,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${price}`,
      description: product.description.substring(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
