import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "tech",
    name: "Tech & Gadgets",
    description: "Smart accessories and everyday tech essentials",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Elevate your space with thoughtful design pieces",
  },
  {
    id: "style",
    name: "Style & Wear",
    description: "Minimal accessories and lifestyle wear",
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Products for calm, focus, and daily balance",
  },
];

/**
 * Placeholder catalog — replace supplier fields once products are sourced.
 * See /sourcing for the dropshipping workflow.
 */
export const products: Product[] = [
  {
    id: "1",
    slug: "wireless-charging-dock",
    name: "Obsidian Wireless Charging Dock",
    description: "Sleek 3-in-1 dock for phone, watch, and earbuds.",
    longDescription:
      "Crafted with a matte obsidian finish, this wireless charging dock keeps your desk clutter-free. Supports fast charging for compatible devices with intelligent heat management.",
    price: 49.99,
    compareAtPrice: 79.99,
    category: "tech",
    tags: ["bestseller", "new"],
    image:
      "https://images.unsplash.com/photo-1591290619766-25c525d0668d?w=800&q=80",
    featured: true,
    status: "placeholder",
    supplier: {
      source: "pending",
      notes: "Source from AliExpress or CJ — search '3 in 1 wireless charger'",
    },
  },
  {
    id: "2",
    slug: "minimal-desk-lamp",
    name: "Arc Minimal Desk Lamp",
    description: "Adjustable LED lamp with warm-to-cool temperature control.",
    longDescription:
      "A sculptural desk lamp that blends form and function. Touch controls, memory presets, and a weighted base for stability on any workspace.",
    price: 64.99,
    compareAtPrice: 89.99,
    category: "home",
    tags: ["trending"],
    image:
      "https://images.unsplash.com/photo-1507473886343-ef7d2b3b2381?w=800&q=80",
    featured: true,
    status: "placeholder",
    supplier: {
      source: "pending",
      notes: "Look for USB-C LED desk lamps with CCT control",
    },
  },
  {
    id: "3",
    slug: "noise-cancelling-earbuds",
    name: "Silence Pro Earbuds",
    description: "Active noise cancellation with 32-hour battery life.",
    longDescription:
      "Immerse yourself in crystal-clear audio. IPX5 water resistance, transparency mode, and a compact charging case designed for all-day carry.",
    price: 79.99,
    compareAtPrice: 129.99,
    category: "tech",
    tags: ["bestseller"],
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    featured: true,
    status: "placeholder",
    supplier: {
      source: "pending",
      notes: "Verify ANC quality before listing — order samples first",
    },
  },
  {
    id: "4",
    slug: "ceramic-diffuser-set",
    name: "Ceramic Aroma Diffuser Set",
    description: "Ultrasonic diffuser with essential oil starter kit.",
    longDescription:
      "Transform any room with gentle mist and ambient LED glow. Includes three premium essential oil blends and auto-shutoff for peace of mind.",
    price: 39.99,
    category: "wellness",
    tags: ["new"],
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    status: "placeholder",
    supplier: {
      source: "pending",
    },
  },
  {
    id: "5",
    slug: "leather-card-wallet",
    name: "Slim Leather Card Wallet",
    description: "RFID-blocking wallet holding up to 8 cards.",
    longDescription:
      "Hand-finished vegan leather with a slim profile that disappears in your pocket. RFID shielding protects your cards from digital theft.",
    price: 29.99,
    compareAtPrice: 44.99,
    category: "style",
    tags: ["bestseller"],
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    status: "placeholder",
    supplier: {
      source: "pending",
    },
  },
  {
    id: "6",
    slug: "smart-water-bottle",
    name: "Hydrate Smart Bottle",
    description: "Tracks intake and reminds you to drink throughout the day.",
    longDescription:
      "Syncs with your phone to log hydration goals. Insulated stainless steel keeps drinks cold for 24 hours or hot for 12.",
    price: 44.99,
    category: "wellness",
    tags: ["trending"],
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    status: "placeholder",
    supplier: {
      source: "pending",
    },
  },
  {
    id: "7",
    slug: "portable-blender",
    name: "Pulse Portable Blender",
    description: "USB-rechargeable blender for smoothies on the go.",
    longDescription:
      "Crush ice, blend protein shakes, and clean up in seconds. The travel lid doubles as a cup for gym, office, or road trips.",
    price: 34.99,
    compareAtPrice: 54.99,
    category: "wellness",
    tags: ["new"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b90d8?w=800&q=80",
    status: "placeholder",
    supplier: {
      source: "pending",
    },
  },
  {
    id: "8",
    slug: "modular-shelf-unit",
    name: "Modular Floating Shelf",
    description: "Wall-mounted shelf system with hidden cable routing.",
    longDescription:
      "Install in minutes with included hardware. Supports up to 15 kg per shelf — perfect for books, plants, or display pieces.",
    price: 54.99,
    category: "home",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1594020612200-02f035aa8e77?w=800&q=80",
    status: "placeholder",
    supplier: {
      source: "pending",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
