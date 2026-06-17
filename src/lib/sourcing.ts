import type { SupplierSource } from "./types";

export interface ExtractedProduct {
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  supplier: {
    source: SupplierSource;
    sku: string;
    costPrice: number;
    shippingDays: string;
  };
}

export interface SourcingProviderConfig {
  /** "simulated" returns mock data for demo/testing */
  mode: "simulated" | "aliexpress-affiliate" | "cjdropshipping";
  apiKey?: string;
  apiSecret?: string;
}

const DEFAULT_CONFIG: SourcingProviderConfig = {
  mode: "simulated",
};

let config: SourcingProviderConfig = { ...DEFAULT_CONFIG };

export function configureSourcing(c: Partial<SourcingProviderConfig>) {
  config = { ...config, ...c };
}

export function getSourcingConfig() {
  return { ...config };
}

/* ------------------------------------------------------------------ */
/*  Extract product data from a URL or search term                     */
/* ------------------------------------------------------------------ */

export async function extractFromUrl(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  if (!url.trim()) return { success: false, error: "URL is required" };

  const isAliExpress = url.includes("aliexpress.com") || url.includes("aliexpress.us");
  const isCJ = url.includes("cjdropshipping.com");

  if (!isAliExpress && !isCJ) {
    return { success: false, error: "Only AliExpress and CJ Dropshipping URLs are supported" };
  }

  switch (config.mode) {
    case "aliexpress-affiliate":
      return extractViaAliExpressAffiliate(url);
    case "cjdropshipping":
      return extractViaCJApi(url);
    case "simulated":
    default:
      return simulateExtraction(url, isAliExpress ? "aliexpress" : "cj-dropshipping");
  }
}

export async function searchProducts(query: string): Promise<ExtractedProduct[]> {
  if (!query.trim()) return [];

  switch (config.mode) {
    case "aliexpress-affiliate":
      return searchViaAliExpress(query);
    case "cjdropshipping":
      return searchViaCJ(query);
    case "simulated":
    default:
      return simulateSearch(query);
  }
}

/* ------------------------------------------------------------------ */
/*  Real provider stubs — swap in actual API calls when keys are set  */
/* ------------------------------------------------------------------ */

async function extractViaAliExpressAffiliate(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  return { success: false, error: "AliExpress Affiliate API key not configured. Set ALIEXPRESS_API_KEY in your environment." };
}

async function extractViaCJApi(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  return { success: false, error: "CJ Dropshipping API key not configured. Set CJ_API_KEY in your environment." };
}

async function searchViaAliExpress(query: string): Promise<ExtractedProduct[]> {
  return [];
}

async function searchViaCJ(query: string): Promise<ExtractedProduct[]> {
  return [];
}

/* ------------------------------------------------------------------ */
/*  Simulated extraction — returns realistic mock data                 */
/* ------------------------------------------------------------------ */

const mockProducts: ExtractedProduct[] = [
  {
    title: "3-in-1 Wireless Charging Station",
    description: "Fast wireless charger compatible with iPhone 15/14/13, Samsung Galaxy, AirPods, Apple Watch. Foldable design with intelligent LED indicator and overcharge protection.",
    price: 18.99,
    compareAtPrice: 35.99,
    image: "https://images.unsplash.com/photo-1622445275576-721d7630cdb0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622445275576-721d7630cdb0?w=800&q=80",
      "https://images.unsplash.com/photo-1619410284722-0ea0f106e5f6?w=800&q=80",
    ],
    category: "tech",
    tags: ["bestseller", "new"],
    supplier: {
      source: "aliexpress",
      sku: "AE1001-3IN1-WC",
      costPrice: 18.99,
      shippingDays: "10-15",
    },
  },
  {
    title: "USB-C LED Desk Lamp with CCT Control",
    description: "Touch-controlled LED desk lamp with 5 color temperatures, 3 brightness levels, USB-C charging port, and memory function. Eye-care flicker-free light.",
    price: 22.50,
    compareAtPrice: 45.00,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    ],
    category: "home",
    tags: ["trending"],
    supplier: {
      source: "aliexpress",
      sku: "AE1002-LED-LAMP",
      costPrice: 22.50,
      shippingDays: "8-12",
    },
  },
  {
    title: "ANC Wireless Earbuds Bluetooth 5.3",
    description: "Active noise cancelling earbuds with 40dB reduction, 8h playback (32h with case), IPX5 waterproof, touch controls, and low-latency gaming mode.",
    price: 25.99,
    compareAtPrice: 59.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    ],
    category: "tech",
    tags: ["bestseller"],
    supplier: {
      source: "aliexpress",
      sku: "AE1003-ANC-EBUDS",
      costPrice: 25.99,
      shippingDays: "10-15",
    },
  },
  {
    title: "Ultrasonic Aromatherapy Diffuser 300ml",
    description: "Cool mist essential oil diffuser with 7-color LED, auto shut-off, and ultrasonic technology. Covers up to 300 sq ft. Silent operation perfect for bedroom or office.",
    price: 12.99,
    compareAtPrice: 24.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    ],
    category: "wellness",
    tags: ["new"],
    supplier: {
      source: "aliexpress",
      sku: "AE1004-DIFFUSER",
      costPrice: 12.99,
      shippingDays: "10-15",
    },
  },
  {
    title: "RFID Blocking Slim Bifold Wallet",
    description: "Genuine leather RFID blocking wallet with 8 card slots, ID window, and money clip. Ultra-slim design fits front or back pocket. Available in multiple colors.",
    price: 9.99,
    compareAtPrice: 19.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    ],
    category: "style",
    tags: ["bestseller"],
    supplier: {
      source: "aliexpress",
      sku: "AE1005-RFID-WALLET",
      costPrice: 9.99,
      shippingDays: "7-14",
    },
  },
  {
    title: "Smart Water Bottle with LED Temperature Display",
    description: "Vacuum insulated stainless steel water bottle 500ml. LED touch screen shows temperature, reminds you to drink. Keeps cold 24h / hot 12h. USB-C rechargeable.",
    price: 15.99,
    compareAtPrice: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    ],
    category: "wellness",
    tags: ["trending"],
    supplier: {
      source: "aliexpress",
      sku: "AE1006-SMART-BOTTLE",
      costPrice: 15.99,
      shippingDays: "10-15",
    },
  },
  {
    title: "Portable USB-C Blender 400ml",
    description: "Rechargeable portable blender with 6-blade design, 400ml capacity, IPX6 waterproof, dual USB output. Crushes ice and frozen fruit in 30 seconds. Perfect for gym, office, travel.",
    price: 21.99,
    compareAtPrice: 39.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b90d8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b90d8?w=800&q=80",
    ],
    category: "wellness",
    tags: ["new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJ2001-BLENDER",
      costPrice: 21.99,
      shippingDays: "5-8",
    },
  },
  {
    title: "DIY Modular Floating Wall Shelves",
    description: "Set of 3 floating shelves with hidden bracket design. Each shelf holds up to 15kg. MDF + wood veneer finish with cable management channel. Easy 10-min installation.",
    price: 18.99,
    compareAtPrice: 34.99,
    image: "https://images.unsplash.com/photo-1594020612200-02f035aa8e77?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594020612200-02f035aa8e77?w=800&q=80",
    ],
    category: "home",
    tags: [],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJ2002-SHELVES",
      costPrice: 18.99,
      shippingDays: "5-8",
    },
  },
];

function findBySku(sku: string): ExtractedProduct | undefined {
  return mockProducts.find((p) => p.supplier.sku === sku);
}

function simulateExtraction(url: string, source: SupplierSource): { success: true; product: ExtractedProduct } | { success: false; error: string } {
  const idMatch = url.match(/(?:item|dp|product)\/(\d+)/i) || url.match(/\/store\/\d+\/(\d+)/i);
  if (!idMatch) {
    return {
      success: false,
      error: "Could not extract product ID from URL. Make sure it's a valid AliExpress or CJ Dropshipping product page.",
    };
  }

  const sku = `AE${idMatch[1]}`;
  const existing = findBySku(sku) || findBySku(`CJ${idMatch[1]}`) || findBySku(sku);

  if (existing) {
    return { success: true, product: { ...existing } };
  }

  const idx = parseInt(idMatch[1], 10) % mockProducts.length;
  const product = { ...mockProducts[idx] };
  product.supplier = { ...product.supplier, sku };
  return { success: true, product };
}

function simulateSearch(query: string): ExtractedProduct[] {
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
