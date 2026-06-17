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
  mode: "simulated" | "aliexpress-affiliate" | "cjdropshipping";
  apiKey?: string;
  apiSecret?: string;
}

const DEFAULT_CONFIG: SourcingProviderConfig = {
  mode:
    (process.env.CJ_API_KEY ? "cjdropshipping" :
     process.env.ALIEXPRESS_API_KEY ? "aliexpress-affiliate" :
     "simulated") as SourcingProviderConfig["mode"],
  apiKey: process.env.CJ_API_KEY || process.env.ALIEXPRESS_API_KEY,
  apiSecret: process.env.ALIEXPRESS_API_SECRET,
};

let config: SourcingProviderConfig = { ...DEFAULT_CONFIG };

export function configureSourcing(c: Partial<SourcingProviderConfig>) {
  config = { ...config, ...c };
}

export function getSourcingConfig() {
  return { ...config };
}

/* ------------------------------------------------------------------ */
/*  CJ Dropshipping – Token management                                 */
/* ------------------------------------------------------------------ */

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

interface CJToken {
  accessToken: string;
  accessTokenExpiryDate: string;
  refreshToken: string;
  refreshTokenExpiryDate: string;
}

let cachedToken: CJToken | null = null;

async function getCJToken(): Promise<string> {
  if (cachedToken && new Date(cachedToken.accessTokenExpiryDate) > new Date()) {
    return cachedToken.accessToken;
  }

  const apiKey = config.apiKey || process.env.CJ_API_KEY;
  if (!apiKey) throw new Error("CJ_API_KEY not configured");

  // Try refresh first
  if (cachedToken?.refreshToken) {
    try {
      const res = await fetch(`${CJ_BASE}/authentication/refreshAccessToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: cachedToken.refreshToken }),
      });
      const data = await res.json();
      if (data.success && data.data?.accessToken) {
        cachedToken = {
          ...cachedToken!,
          accessToken: data.data.accessToken,
          accessTokenExpiryDate: data.data.accessTokenExpiryDate,
          refreshToken: data.data.refreshToken,
          refreshTokenExpiryDate: data.data.refreshTokenExpiryDate,
        };
        return cachedToken.accessToken;
      }
    } catch { /* fall through to full auth */ }
  }

  // Full auth
  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(`CJ auth failed: ${data.message}`);
  }
  cachedToken = data.data;
  return cachedToken!.accessToken;
}

/* ------------------------------------------------------------------ */
/*  Country code mapping for CJ orders                                  */
/* ------------------------------------------------------------------ */

const COUNTRY_CODES: Record<string, string> = {
  "United States": "US",
  "South Africa": "ZA",
  "Nigeria": "NG",
  "United Kingdom": "GB",
  "Germany": "DE",
  "France": "FR",
  "Kenya": "KE",
  "Ghana": "GH",
  "Morocco": "MA",
  "Egypt": "EG",
  "India": "IN",
  "China": "CN",
  "Japan": "JP",
  "Australia": "AU",
  "Canada": "CA",
  "Brazil": "BR",
};

export function getCountryCode(countryName: string): string {
  return COUNTRY_CODES[countryName] || "US";
}

/* ------------------------------------------------------------------ */
/*  CJ Order Creation – full pipeline                                   */
/* ------------------------------------------------------------------ */

export interface CJOrderProduct {
  sku: string;
  quantity: number;
  unitPrice?: number;
}

export interface CreateCJOrderParams {
  orderNumber: string;
  shippingCountry: string;
  shippingProvince: string;
  shippingCity: string;
  shippingPhone: string;
  shippingCustomerName: string;
  shippingAddress: string;
  shippingAddress2?: string;
  shippingZip?: string;
  email: string;
  remark?: string;
  logisticName: string;
  products: CJOrderProduct[];
  isSandbox?: boolean;
}

export interface CJOrderResult {
  success: boolean;
  cjOrderId?: string;
  cjOrderNumber?: string;
  orderAmount?: number;
  postageAmount?: number;
  productAmount?: number;
  actualPayment?: number;
  cjPayUrl?: string;
  orderStatus?: string;
  usedBalancePayment?: boolean;
  message?: string;
}

async function callCJOrderAPI(
  token: string,
  body: Record<string, any>,
  payType: number
): Promise<{ data: any; success: boolean; message: string }> {
  const res = await fetch(`${CJ_BASE}/shopping/order/createOrderV2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({ ...body, payType }),
  });

  const result = await res.json();
  const ok = result.success === true || result.code === 200;

  return {
    success: ok,
    data: result.data,
    message: result.message || "",
  };
}

export async function createCJOrder(
  params: CreateCJOrderParams
): Promise<CJOrderResult> {
  try {
    const token = await getCJToken();
    const countryCode = getCountryCode(params.shippingCountry);

    const baseBody: Record<string, any> = {
      orderNumber: params.orderNumber,
      shippingCountryCode: countryCode,
      shippingCountry: params.shippingCountry,
      shippingProvince: params.shippingProvince || params.shippingCity,
      shippingCity: params.shippingCity,
      shippingCustomerName: params.shippingCustomerName,
      shippingAddress: params.shippingAddress,
      shippingAddress2: params.shippingAddress2 || "",
      shippingZip: params.shippingZip || "",
      shippingPhone: params.shippingPhone || "",
      email: params.email || "",
      remark: params.remark || "",
      logisticName: params.logisticName,
      fromCountryCode: "CN",
      platform: "api",
      orderFlow: 1,
      isSandbox: params.isSandbox ? 1 : 0,
      products: params.products.map((p) => ({
        sku: p.sku,
        quantity: p.quantity,
        ...(p.unitPrice ? { unitPrice: p.unitPrice } : {}),
      })),
    };

    // Try payType=2 (balance payment — auto cart + confirm + pay)
    const payResult = await callCJOrderAPI(token, baseBody, 2);

    if (payResult.success && payResult.data) {
      return {
        success: true,
        cjOrderId: payResult.data.orderId,
        cjOrderNumber: payResult.data.orderNumber,
        orderAmount: payResult.data.orderAmount,
        postageAmount: payResult.data.postageAmount,
        productAmount: payResult.data.productAmount,
        actualPayment: payResult.data.actualPayment,
        orderStatus: payResult.data.orderStatus,
        usedBalancePayment: true,
      };
    }

    // Fallback: create only (payType=3) so order is at least recorded at CJ
    const fallback = await callCJOrderAPI(token, baseBody, 3);

    if (fallback.success && fallback.data) {
      return {
        success: true,
        cjOrderId: fallback.data.orderId,
        cjOrderNumber: fallback.data.orderNumber,
        orderAmount: fallback.data.orderAmount,
        postageAmount: fallback.data.postageAmount,
        productAmount: fallback.data.productAmount,
        cjPayUrl: fallback.data.cjPayUrl,
        orderStatus: fallback.data.orderStatus,
        usedBalancePayment: false,
        message: `Order created at CJ. Balance payment failed (${payResult.message}). Pay via CJ dashboard to fulfill.`,
      };
    }

    return {
      success: false,
      message: `CJ create failed: ${payResult.message}`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "CJ order request failed",
    };
  }
}

/* ------------------------------------------------------------------ */
/*  CJ Order Status & Tracking                                          */
/* ------------------------------------------------------------------ */

export interface CJOrderStatusResult {
  success: boolean;
  orderStatus?: string;
  shippingStatus?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  logisticName?: string;
  message?: string;
}

export async function getCJOrderStatus(
  orderId: string
): Promise<CJOrderStatusResult> {
  try {
    const token = await getCJToken();

    // Query order details
    const res = await fetch(
      `${CJ_BASE}/shopping/order/query?orderId=${orderId}`,
      { headers: { "CJ-Access-Token": token } }
    );

    const data = await res.json();

    if (!data.success && data.code !== 200) {
      return { success: false, message: data.message || "Query failed" };
    }

    const order = data.data;
    return {
      success: true,
      orderStatus: order.orderStatus,
      shippingStatus: order.shippingStatus,
      trackingNumber: order.trackingNumber,
      trackingUrl: order.trackingUrl,
      logisticName: order.logisticName,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function retryCJOrderPayment(
  orderNumber: string
): Promise<CJOrderResult> {
  try {
    const token = await getCJToken();

    // Re-attempt with payType=2
    const res = await fetch(
      `${CJ_BASE}/shopping/order/createOrderV2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CJ-Access-Token": token,
        },
        body: JSON.stringify({
          orderNumber,
          payType: 2,
          isSandbox: 0,
        }),
      }
    );

    const result = await res.json();

    if (!result.success && result.code !== 200) {
      return {
        success: false,
        message: result.message || "Payment retry failed",
      };
    }

    return {
      success: true,
      cjOrderId: result.data?.orderId,
      orderStatus: result.data?.orderStatus,
      actualPayment: result.data?.actualPayment,
      usedBalancePayment: true,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

/* ------------------------------------------------------------------ */
/*  Extract product data from a URL or search term                      */
/* ------------------------------------------------------------------ */

export async function extractFromUrl(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  if (!url.trim()) return { success: false, error: "URL is required" };

  const isAliExpress = url.includes("aliexpress.com") || url.includes("aliexpress.us");
  const isCJ = url.includes("cjdropshipping.com") || url.includes("cjdropshipping.cn");

  if (!isAliExpress && !isCJ) {
    return { success: false, error: "Only AliExpress and CJ Dropshipping URLs are supported" };
  }

  if (config.mode === "cjdropshipping" && isCJ) {
    return extractFromCJUrl(url);
  }
  if (config.mode === "aliexpress-affiliate" && isAliExpress) {
    return extractViaAliExpressAffiliate(url);
  }

  return simulateExtraction(url, isAliExpress ? "aliexpress" : "cj-dropshipping");
}

export async function searchProducts(query: string): Promise<ExtractedProduct[]> {
  if (!query.trim()) return [];

  if (config.mode === "cjdropshipping") {
    return searchCJProducts(query);
  }
  if (config.mode === "aliexpress-affiliate") {
    return searchViaAliExpress(query);
  }

  return simulateSearch(query);
}

/* ------------------------------------------------------------------ */
/*  CJ Dropshipping – real API calls                                    */
/* ------------------------------------------------------------------ */

async function extractFromCJUrl(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  try {
    const pidMatch = url.match(/[?&]pid=([^&]+)/) || url.match(/\/product\/([a-f0-9-]+)/i);
    const skuMatch = url.match(/[?&]sku=([^&]+)/i);
    const id = pidMatch?.[1] || skuMatch?.[1];

    if (!id) {
      return { success: false, error: "Could not extract product ID from CJ URL" };
    }

    const token = await getCJToken();
    const res = await fetch(`${CJ_BASE}/product/list?pid=${id}&pageSize=1`, {
      headers: { "CJ-Access-Token": token },
    });
    const data = await res.json();

    if (!data.success || !data.data?.list?.length) {
      return { success: false, error: "Product not found on CJ Dropshipping" };
    }

    const p = data.data.list[0];
    return {
      success: true,
      product: mapCJProduct(p),
    };
  } catch (err: any) {
    return { success: false, error: err.message || "CJ API request failed" };
  }
}

async function searchCJProducts(query: string): Promise<ExtractedProduct[]> {
  try {
    const token = await getCJToken();
    const res = await fetch(
      `${CJ_BASE}/product/listV2?keyWord=${encodeURIComponent(query)}&page=1&size=10&features=enable_description`,
      { headers: { "CJ-Access-Token": token } }
    );
    const data = await res.json();

    if (!data.success) return [];
    const list = data.data?.content?.[0]?.productList ?? [];
    return list.map(mapCJProductV2);
  } catch {
    return [];
  }
}

function mapCJProduct(p: any): ExtractedProduct {
  return {
    title: p.productNameEn || p.productName || "Unknown Product",
    description: (p.remark || p.productNameEn || "").replace(/[[\]"]/g, "").slice(0, 500),
    price: parseFloat(p.sellPrice) || 0,
    compareAtPrice: p.sellPrice ? parseFloat(p.sellPrice) * 1.5 : undefined,
    image: p.productImage || "",
    images: p.productImage ? [p.productImage] : [],
    category: mapCJCategory(p.categoryName || ""),
    tags: [],
    supplier: {
      source: "cj-dropshipping",
      sku: p.productSku || p.pid || "",
      costPrice: parseFloat(p.sellPrice) || 0,
      shippingDays: p.deliveryTime || "5-10",
    },
  };
}

function mapCJProductV2(p: any): ExtractedProduct {
  return {
    title: p.nameEn || "Unknown Product",
    description: (p.description || p.nameEn || "").replace(/<[^>]*>/g, "").slice(0, 500),
    price: parseFloat(p.sellPrice) || 0,
    compareAtPrice: p.nowPrice ? parseFloat(p.nowPrice) * 1.5 : undefined,
    image: p.bigImage || "",
    images: p.bigImage ? [p.bigImage] : [],
    category: mapCJCategory(p.oneCategoryName || p.threeCategoryName || ""),
    tags: [],
    supplier: {
      source: "cj-dropshipping",
      sku: p.sku || "",
      costPrice: parseFloat(p.discountPrice || p.sellPrice) || 0,
      shippingDays: p.deliveryCycle || "5-10",
    },
  };
}

function mapCJCategory(cjCat: string): string {
  const lower = cjCat.toLowerCase();
  if (lower.includes("phone") || lower.includes("electron") || lower.includes("computer") || lower.includes("gadget")) return "tech";
  if (lower.includes("home") || lower.includes("furniture") || lower.includes("kitchen")) return "home";
  if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("accessor") || lower.includes("wear")) return "style";
  if (lower.includes("health") || lower.includes("sport") || lower.includes("beauty") || lower.includes("wellness")) return "wellness";
  return "tech";
}

/* ------------------------------------------------------------------ */
/*  AliExpress Affiliate API stubs – implement when key is configured   */
/* ------------------------------------------------------------------ */

async function extractViaAliExpressAffiliate(url: string): Promise<{ success: true; product: ExtractedProduct } | { success: false; error: string }> {
  return { success: false, error: "AliExpress Affiliate API key not configured. Set ALIEXPRESS_API_KEY env var." };
}

async function searchViaAliExpress(query: string): Promise<ExtractedProduct[]> {
  return [];
}

/* ------------------------------------------------------------------ */
/*  Simulated extraction – returns CJ-sourced mock data                  */
/* ------------------------------------------------------------------ */

const mockProducts: ExtractedProduct[] = [
  {
    title: "3-in-1 Wireless Charging Station",
    description: "Fast wireless charger compatible with iPhone 15/14/13, Samsung Galaxy, AirPods, Apple Watch. Foldable design with intelligent LED indicator and overcharge protection.",
    price: 11.29,
    compareAtPrice: 22.99,
    image: "https://cf.cjdropshipping.com/409d441f-542c-4639-9162-281be030d92b.jpg",
    images: [
      "https://cf.cjdropshipping.com/409d441f-542c-4639-9162-281be030d92b.jpg",
    ],
    category: "tech",
    tags: ["bestseller", "new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSJ1601466",
      costPrice: 11.29,
      shippingDays: "5-10",
    },
  },
  {
    title: "LED Rechargeable Desk Lamp",
    description: "Touch-controlled LED desk lamp with 3 color temperatures, USB rechargeable, eye-care flicker-free light. Weighted base for stability.",
    price: 12.11,
    compareAtPrice: 24.99,
    image: "https://cf.cjdropshipping.com/2187c755-f027-4e90-87be-89d63adc0da1.jpg",
    images: [
      "https://cf.cjdropshipping.com/2187c755-f027-4e90-87be-89d63adc0da1.jpg",
    ],
    category: "home",
    tags: ["trending"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJSN1852848",
      costPrice: 12.11,
      shippingDays: "5-10",
    },
  },
  {
    title: "MT61 AMOLED Smart Watch",
    description: "AMOLED display smart watch with BT calls, gesture control, AI voice assistant, heart rate monitoring, and 15-21 day battery life.",
    price: 16.83,
    compareAtPrice: 34.99,
    image: "https://cf.cjdropshipping.com/quick/product/c27d4de9-6202-414c-beff-ee734608c50c.jpg",
    images: [
      "https://cf.cjdropshipping.com/quick/product/c27d4de9-6202-414c-beff-ee734608c50c.jpg",
    ],
    category: "tech",
    tags: ["bestseller", "new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJX2389472",
      costPrice: 16.83,
      shippingDays: "5-10",
    },
  },
  {
    title: "Flame Aroma Diffuser",
    description: "Ultrasonic aromatherapy humidifier with flame effect, timer options (1H/3H/6H/ON), auto shut-off, and silent operation.",
    price: 9.59,
    compareAtPrice: 19.99,
    image: "https://cf.cjdropshipping.com/22785577-c43f-445c-8c20-7c41c99cdcc5.jpg",
    images: [
      "https://cf.cjdropshipping.com/22785577-c43f-445c-8c20-7c41c99cdcc5.jpg",
    ],
    category: "wellness",
    tags: ["new", "trending"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1790763",
      costPrice: 9.59,
      shippingDays: "5-10",
    },
  },
  {
    title: "Vintage Crazy Horse Leather Wallet",
    description: "Genuine cowhide leather bifold wallet with RFID protection, multiple card slots, photo window, and cash compartment.",
    price: 10.80,
    compareAtPrice: 21.99,
    image: "https://cf.cjdropshipping.com/1614837398784.jpg",
    images: [
      "https://cf.cjdropshipping.com/1614837398784.jpg",
    ],
    category: "style",
    tags: ["bestseller"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJQB1028281",
      costPrice: 10.80,
      shippingDays: "5-10",
    },
  },
  {
    title: "Smart Digital Thermal Bottle",
    description: "Vacuum insulated stainless steel water bottle 450ml with LED temperature display. Keeps cold 24h / hot 12h. Leak-proof lid.",
    price: 7.00,
    compareAtPrice: 16.99,
    image: "https://oss-cf.cjdropshipping.com/product/2024/09/23/05/a95f5faa-d965-4622-ab3a-6a910dfc2633.jpg",
    images: [
      "https://oss-cf.cjdropshipping.com/product/2024/09/23/05/a95f5faa-d965-4622-ab3a-6a910dfc2633.jpg",
    ],
    category: "home",
    tags: ["new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJT1926768",
      costPrice: 7.00,
      shippingDays: "5-10",
    },
  },
  {
    title: "USB Portable Blender 350ml",
    description: "USB-rechargeable portable blender with 4 stainless steel blades, 350ml capacity, crushes ice and frozen fruit. Travel lid doubles as cup.",
    price: 10.00,
    compareAtPrice: 22.99,
    image: "https://cf.cjdropshipping.com/c179a293-c7db-47dd-b67b-74b0b6f081cc.png",
    images: [
      "https://cf.cjdropshipping.com/c179a293-c7db-47dd-b67b-74b0b6f081cc.png",
    ],
    category: "wellness",
    tags: ["bestseller", "new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJJD1123188",
      costPrice: 10.00,
      shippingDays: "5-10",
    },
  },
  {
    title: "Magnetic Wireless Portable Power Bank",
    description: "8400mAh magnetic wireless power bank, slim 10mm profile, lithium polymer battery, supports wireless and wired charging.",
    price: 12.95,
    compareAtPrice: 25.99,
    image: "https://cf.cjdropshipping.com/1612508751624.jpg",
    images: [
      "https://cf.cjdropshipping.com/1612508751624.jpg",
    ],
    category: "tech",
    tags: ["bestseller", "new"],
    supplier: {
      source: "cj-dropshipping",
      sku: "CJCD1007159",
      costPrice: 12.95,
      shippingDays: "5-10",
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

  const sku = `${source === "cj-dropshipping" ? "CJ" : "AE"}${idMatch[1]}`;
  const existing = findBySku(sku);

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
