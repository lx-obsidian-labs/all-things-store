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

export const products: Product[] = [
  {
    id: "1",
    slug: "wireless-charging-dock",
    name: "3-in-1 Wireless Charging Station",
    description: "Foldable wireless charger with ambience light for phone, watch, and earbuds.",
    longDescription:
      "A versatile 3-in-1 wireless charger designed for your desktop. Features foldable dual coils, a built-in ambience light, and Type-C input. Compatible with all Qi-enabled devices including phones, earbuds, and smartwatches. Intelligent heat management ensures safe overnight charging. Available in Obsidian Black or Matte White.",
    price: 27.99,
    compareAtPrice: 39.99,
    category: "tech",
    tags: ["bestseller", "new"],
    image: "https://cf.cjdropshipping.com/409d441f-542c-4639-9162-281be030d92b.jpg",
    featured: true,
    rating: 4.7,
    reviewCount: 98,
    variants: [
      { name: "Color", options: [{ label: "Obsidian Black" }, { label: "Matte White" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ1601466",
      costPrice: 11.29,
      shippingDays: "5-10",
    },
  },
  {
    id: "2",
    slug: "led-desk-lamp",
    name: "LED Rechargeable Desk Lamp",
    description: "Eye-protection desk lamp with three-color dimming and USB rechargeable battery.",
    longDescription:
      "A modern, minimalist desk lamp with touch-sensitive controls and three adjustable color temperatures (warm, natural, cool). The built-in rechargeable battery delivers up to 8 hours of continuous use on a full charge. The weighted base keeps it stable on any workspace. Ideal for reading, working, or ambient lighting.",
    price: 29.99,
    compareAtPrice: 44.99,
    category: "home",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/2187c755-f027-4e90-87be-89d63adc0da1.jpg",
    featured: true,
    rating: 4.5,
    reviewCount: 67,
    variants: [
      { name: "Color", options: [{ label: "Gold" }, { label: "Silver" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSN1852848",
      costPrice: 12.11,
      shippingDays: "5-10",
    },
  },
  {
    id: "3",
    slug: "amoled-smart-watch",
    name: "MT61 AMOLED Smart Watch",
    description: "Premium AMOLED display smart watch with BT calls, gesture control, and AI voice assistant.",
    longDescription:
      "The MT61 Smart Watch features a stunning AMOLED display with vivid colors and deep blacks. Stay connected with Bluetooth call capabilities, control your music with gestures, and use the built-in AI voice assistant for hands-free tasks. Tracks heart rate, steps, sleep, and multiple sports modes. Water-resistant design with a battery life of 15-21 days. Choose from Vinyl, Silver, Black Leather, or Brown Leather bands.",
    price: 39.99,
    compareAtPrice: 69.99,
    category: "tech",
    tags: ["bestseller", "new"],
    image: "https://cf.cjdropshipping.com/quick/product/c27d4de9-6202-414c-beff-ee734608c50c.jpg",
    featured: true,
    rating: 4.6,
    reviewCount: 156,
    variants: [
      { name: "Band", options: [{ label: "Vinyl" }, { label: "Silver" }, { label: "Black Leather" }, { label: "Brown Leather" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJX2389472",
      costPrice: 16.83,
      shippingDays: "5-10",
    },
  },
  {
    id: "4",
    slug: "aroma-flame-diffuser",
    name: "Flame Aroma Diffuser",
    description: "Ultrasonic aromatherapy humidifier with flame effect, timer, and auto shut-off.",
    longDescription:
      "Create a calming atmosphere with this flame-effect ultrasonic aroma diffuser. Features customizable timer options of 1H, 3H, 6H, or continuous ON mode. The auto shut-off function ensures peace of mind when water runs low. Silent operation makes it perfect for bedrooms, offices, or meditation spaces. Add a few drops of your favorite essential oil for a personalized aromatherapy experience.",
    price: 22.99,
    compareAtPrice: 34.99,
    category: "wellness",
    tags: ["new", "trending"],
    image: "https://cf.cjdropshipping.com/22785577-c43f-445c-8c20-7c41c99cdcc5.jpg",
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1790763",
      costPrice: 9.59,
      shippingDays: "5-10",
    },
  },
  {
    id: "5",
    slug: "vintage-leather-wallet",
    name: "Vintage Crazy Horse Leather Wallet",
    description: "Handcrafted genuine cowhide leather wallet with RFID protection.",
    longDescription:
      "Crafted from premium crazy horse leather that develops a beautiful patina over time. This slim bifold wallet features multiple card slots, a photo window, and a cash compartment. The RFID-blocking layer protects your cards from digital theft. Compact enough for front pocket carry yet spacious enough for all your daily essentials.",
    price: 24.99,
    compareAtPrice: 39.99,
    category: "style",
    tags: ["bestseller"],
    image: "https://cf.cjdropshipping.com/1614837398784.jpg",
    rating: 4.8,
    reviewCount: 212,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJQB1028281",
      costPrice: 10.80,
      shippingDays: "5-10",
    },
  },
  {
    id: "6",
    slug: "mini-metal-wallet",
    name: "RFID Mini Metal Card Holder",
    description: "Ultra-slim PU leather metal wallet with RFID blocking technology.",
    longDescription:
      "A sleek, minimalist card holder that combines PU leather with a metal frame for durability. Holds up to 8 cards with RFID-blocking protection against digital theft. The slim profile fits seamlessly in any pocket or bag. Available in multiple colors to match your style. A perfect balance of form and function.",
    price: 14.99,
    compareAtPrice: 24.99,
    category: "style",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/8ed35ab2-de91-4c0e-a363-0a8c52f81cac.jpg",
    rating: 4.4,
    reviewCount: 89,
    variants: [
      { name: "Color", options: [{ label: "Black" }, { label: "Light Brown" }, { label: "Dark Brown" }, { label: "Gray" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJNS1489386",
      costPrice: 5.06,
      shippingDays: "5-10",
    },
  },
  {
    id: "7",
    slug: "smart-thermal-bottle",
    name: "Smart Digital Thermal Bottle",
    description: "Stainless steel insulated bottle with intelligent temperature display.",
    longDescription:
      "Stay hydrated in style with this smart thermal bottle. The LED display shows real-time temperature at a touch. Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Made from food-grade stainless steel with a leak-proof lid. Perfect for office, gym, travel, or daily commute. Available in Fog White Coffee or Fog White.",
    price: 17.99,
    compareAtPrice: 29.99,
    category: "home",
    tags: ["new"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/09/23/05/a95f5faa-d965-4622-ab3a-6a910dfc2633.jpg",
    rating: 4.3,
    reviewCount: 54,
    variants: [
      { name: "Color", options: [{ label: "Fog White Coffee" }, { label: "Fog White" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1926768",
      costPrice: 7.00,
      shippingDays: "5-10",
    },
  },
  {
    id: "8",
    slug: "portable-blender",
    name: "USB Portable Blender",
    description: "USB-rechargeable portable blender with stainless steel blades for smoothies on the go.",
    longDescription:
      "Blend fresh smoothies, protein shakes, and juices anywhere with this powerful USB-rechargeable portable blender. Features a 350ml capacity, food-grade stainless steel 3D blades, and a powerful motor that crushes ice and frozen fruit with ease. The travel lid doubles as a drinking cup. Simply blend, flip, and go. Perfect for gym, office, travel, and outdoor adventures.",
    price: 24.99,
    compareAtPrice: 39.99,
    category: "wellness",
    tags: ["bestseller", "new"],
    image: "https://cf.cjdropshipping.com/c179a293-c7db-47dd-b67b-74b0b6f081cc.png",
    rating: 4.6,
    reviewCount: 178,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJD1123188",
      costPrice: 10.00,
      shippingDays: "5-10",
    },
  },
  {
    id: "9",
    slug: "magnetic-power-bank",
    name: "Magnetic Wireless Portable Power Bank",
    description: "8400mAh magnetic wireless power bank with slim design for on-the-go charging.",
    longDescription:
      "A sleek 8400mAh magnetic wireless power bank that snaps onto compatible devices for effortless charging. Features a slim 10mm profile, lithium polymer battery, and support for both wireless and wired charging. Perfect for travel, work, or everyday carry. The magnetic alignment ensures optimal charging every time.",
    price: 29.99,
    compareAtPrice: 44.99,
    category: "tech",
    tags: ["bestseller", "new"],
    image: "https://cf.cjdropshipping.com/1612508751624.jpg",
    featured: true,
    rating: 4.5,
    reviewCount: 87,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJCD1007159",
      costPrice: 12.95,
      shippingDays: "5-10",
    },
  },
  {
    id: "10",
    slug: "adjustable-laptop-stand",
    name: "Adjustable Laptop Stand",
    description: "Height-adjustable foldable laptop stand with heat dissipation for better ergonomics.",
    longDescription:
      "Improve your workspace ergonomics with this adjustable laptop stand. Features a hollow metal grid design for optimal heat dissipation, height-adjustable angles, and a foldable portable form factor. Compatible with most laptops and tablets. Elevate your screen to eye level and reduce neck strain during long work sessions.",
    price: 14.99,
    compareAtPrice: 24.99,
    category: "tech",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/e8930315-0d85-4282-b8ab-936276e485b1.jpg",
    rating: 4.3,
    reviewCount: 62,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ2467698",
      costPrice: 4.07,
      shippingDays: "5-10",
    },
  },
  {
    id: "11",
    slug: "outdoor-bluetooth-speaker",
    name: "Outdoor RGB Bluetooth Speaker",
    description: "Portable dual-driver Bluetooth speaker with RGB lighting and 1200mAh battery.",
    longDescription:
      "Take your music anywhere with this rugged outdoor Bluetooth speaker. Dual drivers deliver rich stereo sound, while RGB lighting adds ambience to any setting. The 1200mAh battery provides hours of playback. Features include Bluetooth connectivity, AUX input, and a compact design. Perfect for camping, beach, pool, or backyard parties.",
    price: 19.99,
    compareAtPrice: 34.99,
    category: "tech",
    tags: ["new"],
    image: "https://cf.cjdropshipping.com/quick/product/5f5a8994-3a59-4c41-87e5-7238cf8ede47.jpg",
    rating: 4.4,
    reviewCount: 143,
    variants: [
      { name: "Color", options: [{ label: "Khaki" }, { label: "Black" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2187315",
      costPrice: 7.13,
      shippingDays: "5-10",
    },
  },
  {
    id: "12",
    slug: "laptop-backpack",
    name: "Convertible Laptop Backpack",
    description: "Waterproof nylon laptop backpack for 15.6/17.3-inch laptops with tote conversion.",
    longDescription:
      "A versatile 2-in-1 backpack that converts to a tote bag for ultimate flexibility. Made from durable waterproof nylon, it fits laptops up to 17.3 inches. Multiple compartments keep your devices, documents, and accessories organized. Padded shoulder straps ensure comfort during commutes. Available in Black, Blue, White, and Gray.",
    price: 39.99,
    compareAtPrice: 59.99,
    category: "style",
    tags: ["bestseller"],
    image: "https://cf.cjdropshipping.com/1622699825481.jpg",
    featured: true,
    rating: 4.7,
    reviewCount: 231,
    variants: [
      { name: "Color", options: [{ label: "Black" }, { label: "Blue" }, { label: "White" }, { label: "Gray" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJBJ1157460",
      costPrice: 16.77,
      shippingDays: "5-10",
    },
  },
  {
    id: "13",
    slug: "mesh-watch-men",
    name: "Stainless Steel Mesh Watch",
    description: "Elegant quartz watch with stainless steel mesh band and 30m water resistance.",
    longDescription:
      "A refined timepiece featuring a precise quartz movement, stainless steel mesh band, and mineral glass crystal. The sleek alloy case and three-hand analog display create a timeless look suitable for any occasion. Water-resistant to 30 meters with a comfortable adjustable mesh band. The perfect blend of style and durability.",
    price: 19.99,
    compareAtPrice: 34.99,
    category: "style",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/1613718193599.jpg",
    rating: 4.2,
    reviewCount: 56,
    variants: [
      { name: "Style", options: [{ label: "Black Needle" }, { label: "Rose Needle" }, { label: "Blue Needle" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD1015665",
      costPrice: 6.97,
      shippingDays: "5-10",
    },
  },
  {
    id: "14",
    slug: "wooden-watch",
    name: "Wooden Watch for Men",
    description: "Handcrafted zebra wood watch with quartz movement and natural grain finish.",
    longDescription:
      "A unique timepiece crafted from natural zebra wood and stainless steel. Each watch features a distinctive wood grain pattern, making every piece one of a kind. Quality quartz movement ensures reliable timekeeping. The 40mm case and wooden/stainless band combination creates a sophisticated, eco-friendly accessory. Complete with gift box packaging.",
    price: 49.99,
    compareAtPrice: 79.99,
    category: "style",
    tags: ["bestseller", "new"],
    image: "https://cf.cjdropshipping.com/20200404/581684962303.jpg",
    featured: true,
    rating: 4.6,
    reviewCount: 94,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJZBNSYD00435",
      costPrice: 26.94,
      shippingDays: "5-10",
    },
  },
  {
    id: "15",
    slug: "yoga-mat",
    name: "TPE Two-Color Yoga Mat",
    description: "Non-slip exercise yoga mat with alignment lines, perfect for yoga and fitness.",
    longDescription:
      "A premium TPE yoga mat with a two-color design and textured surface for superior grip. Measuring 183x61x6cm, it provides ample cushioning for joints during floor exercises. Non-slip on both sides ensures stability in any pose. Lightweight and easy to roll up for storage or travel. Available in dark purple and dark blue.",
    price: 14.99,
    compareAtPrice: 24.99,
    category: "wellness",
    tags: ["new"],
    image: "https://cf.cjdropshipping.com/quick/product/f62c8e43-af7b-432e-97bb-cbd5b763224e.jpg",
    rating: 4.5,
    reviewCount: 112,
    variants: [
      { name: "Color", options: [{ label: "Dark Purple" }, { label: "Dark Blue" }, { label: "Violet" }] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2305306",
      costPrice: 3.02,
      shippingDays: "5-10",
    },
  },
  {
    id: "16",
    slug: "resistance-bands-set",
    name: "Resistance Bands Set",
    description: "5-level resistance bands set for yoga, pilates, strength training, and rehab.",
    longDescription:
      "A complete set of 5 resistance bands with progressive tension levels for full-body workouts. Perfect for strength training, yoga, pilates, barre, physical therapy, and home fitness. Made from high-quality natural latex that resists tearing. Each band is color-coded by resistance level for easy identification. Includes a carrying bag and exercise guide.",
    price: 19.99,
    compareAtPrice: 29.99,
    category: "wellness",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/20190915/752951027905.jpg",
    rating: 4.4,
    reviewCount: 198,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYDQTJM00248",
      costPrice: 7.00,
      shippingDays: "5-10",
    },
  },
  {
    id: "17",
    slug: "magnetic-cable-clips",
    name: "Magnetic Cable Management Clips",
    description: "Adhesive magnetic cable clips for under-desk cord organization and wire management.",
    longDescription:
      "Keep your workspace tidy with these magnetic cable management clips. The adhesive backing sticks securely to any surface, while the magnetic design keeps cables organized and within reach. Perfect for under-desk cord management, bedside charging stations, or entertainment centers. The sleek design blends into any environment.",
    price: 12.99,
    compareAtPrice: 19.99,
    category: "home",
    tags: ["new"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/03/18/08/7ff788b5-f1d2-44c5-8a1e-fa8fff446737.jpg",
    rating: 4.1,
    reviewCount: 73,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD1978885",
      costPrice: 5.00,
      shippingDays: "5-10",
    },
  },
  {
    id: "18",
    slug: "ceramic-flower-pot",
    name: "Rectangular Ceramic Flower Pot",
    description: "Breathable stoneware ceramic planter for indoor and outdoor plants, bonsai, and succulents.",
    longDescription:
      "A beautifully crafted rectangular ceramic flower pot made from high-temperature stoneware. The breathable material prevents root rot while retaining just enough moisture. Suitable for bonsai, succulents, herbs, and decorative plants. The natural light brown finish complements any interior or garden setting. Includes drainage hole for optimal plant health.",
    price: 14.99,
    compareAtPrice: 22.99,
    category: "home",
    tags: ["trending"],
    image: "https://oss-cf.cjdropshipping.com/product/2025/10/07/01/1a7cc808-181e-472a-9ef6-abf3851ef55b_fine.jpeg",
    rating: 4.3,
    reviewCount: 41,
    createdAt: "2026-06-01",
    status: "live",
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYL2550820",
      costPrice: 4.70,
      shippingDays: "5-10",
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

export function getDiscountPercent(p: Product): number {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

export function isOnSale(p: Product): boolean {
  return getDiscountPercent(p) > 0;
}

export function getWinningScore(p: Product): number {
  const rating = p.rating ?? 0;
  const reviews = p.reviewCount ?? 0;
  const margin = p.compareAtPrice
    ? (p.compareAtPrice - p.price) / p.compareAtPrice
    : 0.2;
  const recency =
    (new Date().getTime() - new Date(p.createdAt).getTime()) / 86400000;
  const recencyScore = Math.max(0, 1 - recency / 90);
  return rating * Math.log1p(reviews) * (1 + margin) * (0.7 + 0.3 * recencyScore);
}

export function getBestSellingProducts(limit = 6): Product[] {
  return [...products]
    .filter((p) => p.tags.includes("bestseller") || (p.rating ?? 0) >= 4.5)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, limit);
}

export function getDealProducts(limit = 6): Product[] {
  return [...products]
    .filter((p) => isOnSale(p))
    .sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a))
    .slice(0, limit);
}

export function getNewArrivals(limit = 6): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getWinningProducts(limit = 6): Product[] {
  return [...products]
    .sort((a, b) => getWinningScore(b) - getWinningScore(a))
    .slice(0, limit);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

export type SortOption = "default" | "price-asc" | "price-desc" | "name" | "newest" | "rating" | "bestselling";

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "rating":
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "bestselling":
      return sorted.sort(
        (a, b) => getWinningScore(b) - getWinningScore(a)
      );
    default:
      return sorted;
  }
}
