import { ProductCard } from "@/components/ProductCard";
import { CategoryPills } from "@/components/CategoryPills";
import { categories, products } from "@/lib/products";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop",
  description: "Browse our curated collection of tech, home, style, and wellness products.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "all";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const categoryInfo = categories.find((c) => c.id === activeCategory);

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Collection
        </p>
        <h1 className="mb-3 font-display text-4xl text-white sm:text-5xl">
          {categoryInfo && activeCategory !== "all"
            ? categoryInfo.name
            : "Shop All"}
        </h1>
        <p className="max-w-xl text-obsidian-400">
          {categoryInfo && activeCategory !== "all"
            ? categoryInfo.description
            : "Explore our full catalog of curated essentials."}
        </p>
      </div>

      <div className="mb-10">
        <CategoryPills active={activeCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <p className="text-obsidian-400">No products in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
