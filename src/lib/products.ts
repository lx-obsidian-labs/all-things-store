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

const SHIP_FROM = "China";

const cn = (label: string, color?: string) => ({ label, color });

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
      { name: "Color", options: [cn("Obsidian Black"), cn("Matte White")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "328g",
    inventory: 8751,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.32, processingDays: "3-5 days for 74.3% orders", deliveryDays: "5-11 days for 62% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 8.27, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
      { name: "CJ Express", fee: 12.50, processingDays: "1-2 days", deliveryDays: "3-7 days", tracking: "Full tracking with last mile" },
    ],
    totalLandedCost: 32.31,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ1601466",
      costPrice: 11.29,
      shippingDays: "5-10",
      shippingFee: 4.32,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Gold"), cn("Silver")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "520g",
    inventory: 6320,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 5.14, processingDays: "3-5 days for 71% orders", deliveryDays: "7-12 days for 65% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 3.89, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 35.13,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSN1852848",
      costPrice: 12.11,
      shippingDays: "5-10",
      shippingFee: 5.14,
      processingTime: "3-5 days",
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
      { name: "Band", options: [cn("Vinyl"), cn("Silver"), cn("Black Leather"), cn("Brown Leather")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "112g",
    inventory: 12450,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.89, processingDays: "2-4 days for 78% orders", deliveryDays: "5-10 days for 68% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 6.75, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 44.88,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJX2389472",
      costPrice: 16.83,
      shippingDays: "5-10",
      shippingFee: 4.89,
      processingTime: "2-4 days",
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
    weight: "410g",
    inventory: 5210,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.52, processingDays: "3-5 days for 72% orders", deliveryDays: "6-12 days for 64% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 3.15, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 27.51,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1790763",
      costPrice: 9.59,
      shippingDays: "5-10",
      shippingFee: 4.52,
      processingTime: "3-5 days",
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
    weight: "98g",
    inventory: 9820,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.87, processingDays: "3-5 days for 76% orders", deliveryDays: "5-11 days for 65% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 5.20, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
      { name: "CJ Express", fee: 10.00, processingDays: "1-2 days", deliveryDays: "3-7 days", tracking: "Full tracking with last mile" },
    ],
    totalLandedCost: 28.86,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJQB1028281",
      costPrice: 10.80,
      shippingDays: "5-10",
      shippingFee: 3.87,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Black"), cn("Light Brown"), cn("Dark Brown"), cn("Gray")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "132g",
    inventory: 7430,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.62, processingDays: "3-5 days for 73% orders", deliveryDays: "5-11 days for 63% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 2.48, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 18.61,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJNS1489386",
      costPrice: 5.06,
      shippingDays: "5-10",
      shippingFee: 3.62,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Fog White Coffee"), cn("Fog White")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "380g",
    inventory: 4150,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.18, processingDays: "3-5 days for 70% orders", deliveryDays: "6-12 days for 61% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 7.45, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
    ],
    totalLandedCost: 22.17,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1926768",
      costPrice: 7.00,
      shippingDays: "5-10",
      shippingFee: 4.18,
      processingTime: "3-5 days",
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
    weight: "450g",
    inventory: 6890,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.76, processingDays: "3-5 days for 75% orders", deliveryDays: "5-11 days for 66% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 6.30, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 29.75,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJD1123188",
      costPrice: 10.00,
      shippingDays: "5-10",
      shippingFee: 4.76,
      processingTime: "3-5 days",
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
    weight: "240g",
    inventory: 11020,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.35, processingDays: "3-5 days for 74% orders", deliveryDays: "5-11 days for 63% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 7.80, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
    ],
    totalLandedCost: 34.34,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJCD1007159",
      costPrice: 12.95,
      shippingDays: "5-10",
      shippingFee: 4.35,
      processingTime: "3-5 days",
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
    weight: "680g",
    inventory: 5340,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 5.89, processingDays: "3-5 days for 71% orders", deliveryDays: "6-12 days for 62% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 4.12, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 20.88,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ2467698",
      costPrice: 4.07,
      shippingDays: "5-10",
      shippingFee: 5.89,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Khaki"), cn("Black")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "375g",
    inventory: 4780,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.62, processingDays: "3-5 days for 73% orders", deliveryDays: "5-11 days for 64% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 6.10, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 24.61,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2187315",
      costPrice: 7.13,
      shippingDays: "5-10",
      shippingFee: 4.62,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Black"), cn("Blue"), cn("White"), cn("Gray")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "820g",
    inventory: 3890,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 6.95, processingDays: "3-5 days for 72% orders", deliveryDays: "6-12 days for 63% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 10.50, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
      { name: "CJ Express", fee: 15.00, processingDays: "1-2 days", deliveryDays: "3-7 days", tracking: "Full tracking with last mile" },
    ],
    totalLandedCost: 46.94,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJBJ1157460",
      costPrice: 16.77,
      shippingDays: "5-10",
      shippingFee: 6.95,
      processingTime: "3-5 days",
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
      { name: "Style", options: [cn("Black Needle"), cn("Rose Needle"), cn("Blue Needle")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "156g",
    inventory: 6250,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.95, processingDays: "3-5 days for 74% orders", deliveryDays: "5-11 days for 65% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 2.80, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 23.94,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD1015665",
      costPrice: 6.97,
      shippingDays: "5-10",
      shippingFee: 3.95,
      processingTime: "3-5 days",
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
    weight: "84g",
    inventory: 2940,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.78, processingDays: "3-5 days for 75% orders", deliveryDays: "5-11 days for 67% orders", tracking: "Full tracking via CJ number" },
      { name: "CJ Express", fee: 11.20, processingDays: "1-2 days", deliveryDays: "3-7 days", tracking: "Full tracking with last mile" },
    ],
    totalLandedCost: 53.77,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJZBNSYD00435",
      costPrice: 26.94,
      shippingDays: "5-10",
      shippingFee: 3.78,
      processingTime: "3-5 days",
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
      { name: "Color", options: [cn("Dark Purple"), cn("Dark Blue"), cn("Violet")] },
    ],
    createdAt: "2026-06-01",
    status: "live",
    weight: "950g",
    inventory: 8710,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 6.42, processingDays: "3-5 days for 71% orders", deliveryDays: "6-12 days for 62% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 4.80, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
      { name: "LuWei Ordinary US", fee: 9.15, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
    ],
    totalLandedCost: 21.41,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2305306",
      costPrice: 3.02,
      shippingDays: "5-10",
      shippingFee: 6.42,
      processingTime: "3-5 days",
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
    weight: "520g",
    inventory: 12300,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.28, processingDays: "3-5 days for 73% orders", deliveryDays: "5-11 days for 64% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 5.80, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 24.27,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYDQTJM00248",
      costPrice: 7.00,
      shippingDays: "5-10",
      shippingFee: 4.28,
      processingTime: "3-5 days",
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
    weight: "120g",
    inventory: 15600,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 2.84, processingDays: "3-5 days for 74% orders", deliveryDays: "5-11 days for 65% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 1.95, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 15.83,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD1978885",
      costPrice: 5.00,
      shippingDays: "5-10",
      shippingFee: 2.84,
      processingTime: "3-5 days",
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
    weight: "1.2kg",
    inventory: 3480,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 7.35, processingDays: "3-5 days for 70% orders", deliveryDays: "6-12 days for 61% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 11.80, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
    ],
    totalLandedCost: 22.34,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYL2550820",
      costPrice: 4.70,
      shippingDays: "5-10",
      shippingFee: 7.35,
      processingTime: "3-5 days",
    },
  },
  {
    id: "19",
    slug: "wireless-ear-clip-earbuds",
    name: "Wireless Ear Clip Earbuds",
    description: "TWS Bluetooth 5.3 ear clip earbuds with comfortable wear, breathable light, and sports fit.",
    longDescription:
      "Experience next-gen wireless audio with these ear clip earbuds featuring Bluetooth 5.3 technology. The open-ear design provides all-day comfort without ear fatigue, making them perfect for sports, calls, and daily wear. IPX5 waterproof with a built-in breathing light. Features touch controls, crystal-clear calls, and a stable connection up to 10 meters. Available in Black or White.",
    price: 14.99,
    compareAtPrice: 24.99,
    category: "tech",
    tags: ["new"],
    image: "https://cf.cjdropshipping.com/0497762e-6c2b-4eea-b8cb-cf78de2b8819_trans.jpeg",
    rating: 4.3,
    reviewCount: 67,
    variants: [
      { name: "Color", options: [cn("Black"), cn("White")] },
    ],
    createdAt: "2026-06-10",
    status: "live",
    weight: "48g",
    inventory: 21400,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.45, processingDays: "3-5 days for 76% orders", deliveryDays: "5-11 days for 67% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 4.90, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 18.44,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYP1841131",
      costPrice: 2.50,
      shippingDays: "5-10",
      shippingFee: 3.45,
      processingTime: "3-5 days",
    },
  },
  {
    id: "20",
    slug: "phone-stand-holder",
    name: "Phone Stand Holder",
    description: "Compact metal phone stand holder for desk, car, or bedside — universal fit.",
    longDescription:
      "A sturdy metal phone stand that keeps your device at the perfect viewing angle. Ideal for video calls, streaming, or hands-free use. The compact design fits anywhere — desk, nightstand, or kitchen counter. Universal compatibility works with all smartphones in any case. Slim enough to slip in a pocket or bag.",
    price: 7.99,
    compareAtPrice: 14.99,
    category: "tech",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/20200224/988544465453.jpg",
    rating: 4.1,
    reviewCount: 43,
    createdAt: "2026-06-10",
    status: "live",
    weight: "68g",
    inventory: 28900,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 2.48, processingDays: "3-5 days for 75% orders", deliveryDays: "5-11 days for 66% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 1.60, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 10.47,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJSJSJ01018",
      costPrice: 0.65,
      shippingDays: "5-10",
      shippingFee: 2.48,
      processingTime: "3-5 days",
    },
  },
  {
    id: "21",
    slug: "braided-usb-c-cable",
    name: "Braided USB-C Cable",
    description: "Durable braided nylon USB-C cable for fast charging and data transmission.",
    longDescription:
      "A premium braided nylon USB-C cable built for speed and durability. Supports fast charging and high-speed data transfer for all USB-C devices. The reinforced braided exterior prevents fraying and tangling, while the aluminum connectors resist corrosion. Available in multiple vibrant colors. The essential cable for your everyday carry.",
    price: 9.99,
    compareAtPrice: 16.99,
    category: "tech",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/1616985474298.jpg",
    rating: 4.5,
    reviewCount: 189,
    createdAt: "2026-06-10",
    status: "live",
    weight: "35g",
    inventory: 45200,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 2.12, processingDays: "3-5 days for 77% orders", deliveryDays: "5-11 days for 68% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 1.35, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 12.11,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSM1058128",
      costPrice: 0.70,
      shippingDays: "5-10",
      shippingFee: 2.12,
      processingTime: "3-5 days",
    },
  },
  {
    id: "22",
    slug: "charging-stand-3-in-1",
    name: "3-in-1 Charging Stand",
    description: "Multi-device wireless charging stand for phone, watch, and earbuds.",
    longDescription:
      "Declutter your desk with this versatile 3-in-1 charging stand. Features a 15W wireless charger for phones, a dedicated spot for your smartwatch, and an earbuds charging area. The sleek aluminum design complements any workspace. Available in Black, White, Silver, or Rose Gold. LED indicator shows charging status at a glance.",
    price: 16.99,
    compareAtPrice: 29.99,
    category: "tech",
    tags: ["new", "bestseller"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/07/18/08/39d76600-32b6-4611-8bb0-7720931f1a49_trans.jpeg",
    featured: true,
    rating: 4.6,
    reviewCount: 112,
    variants: [
      { name: "Color", options: [cn("Black"), cn("White"), cn("Silver"), cn("Rose Gold")] },
    ],
    createdAt: "2026-06-10",
    status: "live",
    weight: "210g",
    inventory: 7840,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.89, processingDays: "3-5 days for 74% orders", deliveryDays: "5-11 days for 63% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 5.45, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 20.88,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2087178",
      costPrice: 4.87,
      shippingDays: "5-10",
      shippingFee: 3.89,
      processingTime: "3-5 days",
    },
  },
  {
    id: "23",
    slug: "modern-wall-clock",
    name: "Modern Wall Clock",
    description: "Silent minimalist wall clock with clean European design for living room or office.",
    longDescription:
      "A stylish modern wall clock that adds elegance to any room. The clean European-style design features a silent quartz movement for noise-free timekeeping. The large face is easy to read from across the room. Perfect for living rooms, bedrooms, kitchens, or offices. Makes a thoughtful housewarming or office gift.",
    price: 12.99,
    compareAtPrice: 22.99,
    category: "home",
    tags: ["new"],
    image: "https://cf.cjdropshipping.com/1623289640002.jpg",
    rating: 4.2,
    reviewCount: 38,
    createdAt: "2026-06-10",
    status: "live",
    weight: "540g",
    inventory: 4120,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 5.20, processingDays: "3-5 days for 72% orders", deliveryDays: "6-12 days for 62% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 3.65, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 18.19,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJY1167766",
      costPrice: 2.19,
      shippingDays: "5-10",
      shippingFee: 5.20,
      processingTime: "3-5 days",
    },
  },
  {
    id: "24",
    slug: "smart-led-desk-lamp",
    name: "Smart LED Desk Lamp with Wireless Charger",
    description: "LED desk lamp with built-in 15W wireless charger, fast PD charging, and adjustable neck.",
    longDescription:
      "A smart 2-in-1 desk lamp that combines eye-care LED lighting with a built-in 15W wireless charging pad. The flexible neck adjusts to any angle, and the PD fast-charging port keeps your devices powered. Perfect for late-night work, reading, or studying. Space-saving design eliminates the need for a separate charger on your desk.",
    price: 19.99,
    compareAtPrice: 34.99,
    category: "home",
    tags: ["trending", "bestseller"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/06/04/01/c6785eca-f50c-44be-978e-7f24c22a8af8_trans.jpeg",
    rating: 4.4,
    reviewCount: 76,
    createdAt: "2026-06-10",
    status: "live",
    weight: "580g",
    inventory: 3960,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 5.45, processingDays: "3-5 days for 71% orders", deliveryDays: "6-12 days for 61% orders", tracking: "Full tracking via CJ number" },
      { name: "LuWei Ordinary US", fee: 9.20, processingDays: "3-5 days", deliveryDays: "5-11 days", tracking: "LW tracking number only" },
    ],
    totalLandedCost: 25.44,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ2052800",
      costPrice: 4.89,
      shippingDays: "5-10",
      shippingFee: 5.45,
      processingTime: "3-5 days",
    },
  },
  {
    id: "25",
    slug: "nordic-ceramic-planter",
    name: "Nordic Ceramic Flower Planter",
    description: "Colorful ceramic succulent planter with drainage hole — ideal for desk or shelf.",
    longDescription:
      "A beautifully glazed ceramic planter in nordic industrial style. Features a bottom drainage hole for healthy plant growth, making it perfect for succulents, cacti, and small houseplants. The cylindrical shape and vibrant colors add a modern touch to any desk, shelf, or windowsill. Comes with a matching drip tray. Breathable ceramic material promotes root health.",
    price: 12.99,
    compareAtPrice: 19.99,
    category: "home",
    tags: ["new"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/12/31/07/fb7b254a-dd17-4bfe-b8fc-7fce7b9bf2b0.jpg",
    rating: 4.3,
    reviewCount: 54,
    createdAt: "2026-06-10",
    status: "live",
    weight: "450g",
    inventory: 6780,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 4.85, processingDays: "3-5 days for 73% orders", deliveryDays: "5-11 days for 64% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 3.20, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 17.84,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1178499",
      costPrice: 2.50,
      shippingDays: "5-10",
      shippingFee: 4.85,
      processingTime: "3-5 days",
    },
  },
  {
    id: "26",
    slug: "leather-bracelet-men",
    name: "Genuine Leather Bracelet for Men",
    description: "Classic genuine leather bracelet with magnetic buckle — vintage style for everyday wear.",
    longDescription:
      "A handcrafted genuine leather bracelet featuring a secure magnetic buckle closure. The vintage distressed leather develops a unique patina over time. Adjustable sizing fits most wrists comfortably. The minimalist European-American design pairs well with casual or formal attire. Packaged in an elegant gift bag — ready for gifting.",
    price: 9.99,
    compareAtPrice: 16.99,
    category: "style",
    tags: ["trending"],
    image: "https://cf.cjdropshipping.com/1617675346410.jpg",
    rating: 4.0,
    reviewCount: 31,
    variants: [
      { name: "Color", options: [cn("Brown"), cn("Black")] },
    ],
    createdAt: "2026-06-10",
    status: "live",
    weight: "42g",
    inventory: 18300,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 2.65, processingDays: "3-5 days for 76% orders", deliveryDays: "5-11 days for 67% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 1.70, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 12.64,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD1067291",
      costPrice: 1.07,
      shippingDays: "5-10",
      shippingFee: 2.65,
      processingTime: "3-5 days",
    },
  },
  {
    id: "27",
    slug: "woven-leather-bracelet",
    name: "Multi-layer Woven Leather Bracelet",
    description: "Handwoven multi-layer leather bracelet with braided design — rugged and stylish.",
    longDescription:
      "A meticulously handwoven leather bracelet with a unique multi-layer braided design. Each bracelet is crafted from premium leather cords, giving it a rugged yet refined look. The adjustable sliding knot fits any wrist size. Perfect for men who appreciate artisanal accessories. Available in Black and Coffee.",
    price: 12.99,
    compareAtPrice: 19.99,
    category: "style",
    tags: ["new"],
    image: "https://cf.cjdropshipping.com/quick/product/40a6b402-af3a-4911-84d9-0a3fa7d04d35.jpg",
    rating: 4.2,
    reviewCount: 47,
    variants: [
      { name: "Color", options: [cn("Black"), cn("Coffee")] },
    ],
    createdAt: "2026-06-10",
    status: "live",
    weight: "38g",
    inventory: 14200,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 2.55, processingDays: "3-5 days for 75% orders", deliveryDays: "5-11 days for 66% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 1.65, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 15.54,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSL2041539",
      costPrice: 2.00,
      shippingDays: "5-10",
      shippingFee: 2.55,
      processingTime: "3-5 days",
    },
  },
  {
    id: "28",
    slug: "knitted-beanie-hat",
    name: "Knitted Beanie Hat",
    description: "Unisex warm knitted beanie hat for winter — stretch fit for cycling, camping, and travel.",
    longDescription:
      "A cozy unisex knitted beanie that combines style with warmth. Made from soft acrylic yarn with a stretchy fit that adapts to any head size. Perfect for outdoor activities like cycling, camping, hiking, or everyday winter wear. The ribbed cuffs and fold-over design provide extra ear coverage. Available in multiple colors to match any outfit.",
    price: 19.99,
    compareAtPrice: 29.99,
    category: "style",
    tags: ["bestseller"],
    image: "https://cf.cjdropshipping.com/2c57bffd-ce52-45f3-a4fa-8e1a76f2d55f.jpg",
    rating: 4.5,
    reviewCount: 93,
    createdAt: "2026-06-10",
    status: "live",
    weight: "110g",
    inventory: 9340,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.15, processingDays: "3-5 days for 74% orders", deliveryDays: "5-11 days for 65% orders", tracking: "Full tracking via CJ number" },
      { name: "ePacket", fee: 4.50, processingDays: "2-4 days", deliveryDays: "7-14 days", tracking: "Full tracking with USPS last mile" },
    ],
    totalLandedCost: 23.14,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJRN1868419",
      costPrice: 6.42,
      shippingDays: "5-10",
      shippingFee: 3.15,
      processingTime: "3-5 days",
    },
  },
  {
    id: "29",
    slug: "yoga-block-set",
    name: "High Density EVA Yoga Block",
    description: "Supportive EVA foam yoga block for alignment, balance, and deeper stretches.",
    longDescription:
      "A high-density EVA foam yoga block designed to support your practice. Provides stability for standing poses, bridges the floor-to-hand gap in seated poses, and helps deepen stretches safely. Lightweight yet durable — easy to carry to class or store at home. Non-slip surface ensures a secure grip even during sweaty sessions. Available in multiple colors.",
    price: 12.99,
    compareAtPrice: 19.99,
    category: "wellness",
    tags: ["new"],
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/21/07/94919bd5-f6d0-4fc1-bcaa-9818ac2e58dc_trans.jpeg",
    rating: 4.4,
    reviewCount: 58,
    variants: [
      { name: "Color", options: [cn("Black"), cn("Pink"), cn("Purple"), cn("Blue")] },
    ],
    createdAt: "2026-06-10",
    status: "live",
    weight: "180g",
    inventory: 11200,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 3.78, processingDays: "3-5 days for 73% orders", deliveryDays: "5-11 days for 64% orders", tracking: "Full tracking via CJ number" },
      { name: "Yanwen Economy", fee: 2.50, processingDays: "3-5 days", deliveryDays: "10-18 days", tracking: "Yanwen tracking number" },
    ],
    totalLandedCost: 16.77,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJYD2203154",
      costPrice: 2.72,
      shippingDays: "5-10",
      shippingFee: 3.78,
      processingTime: "3-5 days",
    },
  },
  {
    id: "30",
    slug: "mini-massage-gun",
    name: "Mini Massage Gun",
    description: "Portable pocket massage gun for deep muscle relief — 6000rpm, 20h battery, low noise.",
    longDescription:
      "A powerful yet compact massage gun that fits in your pocket. Delivers 6000rpm of percussive therapy reaching 12mm deep into muscle tissue. Ultra-quiet operation at under 45dB won't disturb others. The 20-hour battery life lasts weeks of regular use. Includes multiple massage heads for different muscle groups. Perfect for post-workout recovery, office tension relief, or travel.",
    price: 39.99,
    compareAtPrice: 69.99,
    category: "wellness",
    tags: ["bestseller", "new", "trending"],
    image: "https://cf.cjdropshipping.com/e52af6a7-f45f-4af0-848d-b4748a6f7e45.jpg",
    featured: true,
    rating: 4.7,
    reviewCount: 156,
    createdAt: "2026-06-10",
    status: "live",
    weight: "280g",
    inventory: 5610,
    shippingFrom: SHIP_FROM,
    shippingMethods: [
      { name: "CJ Registered Air Mail", fee: 5.15, processingDays: "3-5 days for 72% orders", deliveryDays: "5-11 days for 63% orders", tracking: "Full tracking via CJ number" },
      { name: "CJ Express", fee: 12.80, processingDays: "1-2 days", deliveryDays: "3-7 days", tracking: "Full tracking with last mile" },
    ],
    totalLandedCost: 45.14,
    supplier: {
      source: "cj-dropshipping",
      sku: "CJAM1362673",
      costPrice: 15.00,
      shippingDays: "5-10",
      shippingFee: 5.15,
      processingTime: "3-5 days",
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
