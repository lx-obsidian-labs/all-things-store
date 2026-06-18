import { products, categories } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

const BASE = "https://allthings.store";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/shop", "/about", "/blog", "/clothing", "/clothing/men",
    "/clothing/women", "/clothing/kids", "/contact", "/faq", "/privacy",
    "/shipping", "/shoes", "/terms", "/sourcing",
  ];

  const categoryPages = categories.map((cat) => `/shop?category=${cat.id}`);

  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...categoryPages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...products.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
