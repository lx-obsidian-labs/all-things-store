import { writeFileSync } from "fs";

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_KEY = process.env.CJ_API_KEY || "CJ5522804@api@88cceb0cd69a4fbc8b43b77d1e05febd";
const MARKUP = 2.5;

let token = null;

async function getToken() {
  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: API_KEY }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(`Auth failed: ${data.message}`);
  return data.data.accessToken;
}

async function searchCJ(keyword, page = 1, size = 10) {
  if (!token) token = await getToken();
  const url = `${CJ_BASE}/product/listV2?keyWord=${encodeURIComponent(keyword)}&page=${page}&size=${size}&features=enable_description`;
  const res = await fetch(url, { headers: { "CJ-Access-Token": token } });
  const data = await res.json();
  if (!data.success) return [];
  return data.data?.content?.[0]?.productList ?? [];
}

function extractImagesFromDescription(desc) {
  if (!desc) return [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const urls = [];
  let match;
  while ((match = imgRegex.exec(desc)) !== null) {
    const url = match[1];
    if (url.startsWith("http") && !urls.includes(url)) {
      urls.push(url);
    }
  }
  return urls;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function generateDescription(desc, name) {
  const clean = (desc || name || "").replace(/<[^>]*>/g, "").replace(/\n\s*\n/g, "\n").trim();
  return clean.slice(0, 250);
}

const QUERIES = [
  "winter jacket men",
  "winter jacket women",
  "puffer jacket warm",
  "wool coat winter",
  "down jacket hooded",
  "fleece jacket winter",
  "winter parka men",
  "winter coat women",
];

async function main() {
  console.log("Getting CJ token...");
  token = await getToken();
  console.log("Token obtained.");

  const allProducts = [];
  const seenSkus = new Set();
  let idCounter = 364;

  // Wait 2s after auth before first search, then 1.2s between each
  await new Promise((r) => setTimeout(r, 2000));

  for (const keyword of QUERIES) {
    console.log(`Searching "${keyword}"...`);
    const results = await searchCJ(keyword, 1, 6);
    console.log(`   Found ${results.length} results`);

    for (const p of results) {
      const sku = p.sku;
      if (!sku || seenSkus.has(sku)) continue;
      seenSkus.add(sku);

      const costPrice = parseFloat(p.sellPrice) || 0;
      const retailPrice = Math.round(costPrice * MARKUP * 100) / 100;

      const descriptionHtml = p.description || "";
      const images = [p.bigImage, ...extractImagesFromDescription(descriptionHtml)]
        .filter(Boolean)
        .slice(0, 5);

      const slug = slugify((p.productNameEn || sku).slice(0, 40));

      const shipMethods = p.shippingMethodVOS || [];
      const firstShip = shipMethods[0] || {};
      const shippingFee = parseFloat(firstShip.shippingFee) || 2.5;
      const processingDays = firstShip.processingTime || "3-5 days";
      const deliveryDays = firstShip.deliveryTime || "7-12 days";

      const maxShipping = shipMethods
        .map((s) => parseFloat(s.shippingFee) || 0)
        .reduce((a, b) => Math.max(a, b), shippingFee);

      const product = {
        id: String(idCounter++),
        slug,
        name: p.productNameEn || sku,
        description: generateDescription(descriptionHtml, p.productNameEn),
        price: retailPrice,
        compareAtPrice: Math.round(retailPrice * 1.6 * 100) / 100,
        category: "style",
        tags: ["winter", "new"],
        image: p.bigImage || "",
        images: images.length > 0 ? images : [p.bigImage || ""],
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 80) + 10,
        createdAt: new Date().toISOString().split("T")[0],
        status: "live",
        weight: p.weight ? `${p.weight}g` : "500g",
        inventory: Math.floor(Math.random() * 500) + 50,
        shippingFrom: "China",
        shippingMethods: shipMethods.length > 0
          ? shipMethods.map((s) => ({
              name: s.shippingMethodName || "CJ Registered Air Mail",
              fee: parseFloat(s.shippingFee) || 0,
              processingDays: s.processingTime || "3-5 days",
              deliveryDays: s.deliveryTime || "7-12 days",
              tracking: s.tracking || "Full tracking via CJ number",
            }))
          : [{ name: "CJ Registered Air Mail", fee: 2.5, processingDays: "3-5 days", deliveryDays: "7-12 days", tracking: "Full tracking via CJ number" }],
        totalLandedCost: Math.round((costPrice + maxShipping) * 100) / 100,
        supplier: {
          source: "cj-dropshipping",
          sku,
          costPrice,
          shippingDays: deliveryDays.split("-")[0]?.trim() || "7",
          shippingFee: maxShipping,
          processingTime: processingDays,
        },
      };

      allProducts.push(product);
      console.log(`   + ${product.name} (SKU: ${sku}, $${costPrice})`);

      // Rate limit: 1 req/s per product
      await new Promise((r) => setTimeout(r, 1100));
    }
    // Rate limit: 1.2s between keyword searches
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log(`\nTotal unique products: ${allProducts.length}`);

  const fileContent = `import type { Product } from "./types";

export const winterProducts: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;

  writeFileSync("src/lib/winter-products.ts", fileContent, "utf-8");
  console.log("Written to src/lib/winter-products.ts");
}

main().catch(console.error);
