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
    if (url.startsWith("http") && !urls.includes(url)) urls.push(url);
  }
  return urls;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

function generateDescription(desc, name) {
  const clean = (desc || name || "").replace(/<[^>]*>/g, "").replace(/\n\s*\n/g, "\n").trim();
  return clean.slice(0, 250);
}

/* Map keyword to gender + shoe type tags */
function categorizeShoe(keyword) {
  const lower = keyword.toLowerCase();
  const tags = ["shoes"];
  let shoeType = "casual";

  if (lower.includes("men") || lower.includes("male")) tags.push("men");
  if (lower.includes("women") || lower.includes("female") || lower.includes("woman")) tags.push("women");
  if (lower.includes("kids") || lower.includes("child") || lower.includes("children") || lower.includes("baby") || lower.includes("girl") || lower.includes("boy")) tags.push("kids");

  if (lower.includes("sneaker") || lower.includes("sneaker")) { shoeType = "sneakers"; tags.push("sneakers"); }
  else if (lower.includes("boot") || lower.includes("hiking")) { shoeType = "boots"; tags.push("boots"); }
  else if (lower.includes("sandal")) { shoeType = "sandals"; tags.push("sandals"); }
  else if (lower.includes("formal") || lower.includes("dress") || lower.includes("oxford")) { shoeType = "formal"; tags.push("formal"); }
  else if (lower.includes("run") || lower.includes("athletic") || lower.includes("sport")) { shoeType = "athletic"; tags.push("athletic"); }
  else if (lower.includes("loafer")) { shoeType = "loafers"; tags.push("loafers"); }
  else if (lower.includes("heel")) { shoeType = "heels"; tags.push("heels"); }
  else if (lower.includes("flat") || lower.includes("ballet")) { shoeType = "flats"; tags.push("flats"); }
  else if (lower.includes("hiking") || lower.includes("trail")) { shoeType = "hiking"; tags.push("hiking"); }
  else if (lower.includes("slip")) { shoeType = "slip-on"; tags.push("sneakers"); }
  else if (lower.includes("basketball")) { shoeType = "athletic"; tags.push("athletic"); }
  else if (lower.includes("wedge")) { shoeType = "heels"; tags.push("heels"); }
  else if (lower.includes("school")) { shoeType = "casual"; }
  else { tags.push("casual"); }

  // Ensure gender tag exists
  if (!tags.some(t => ["men", "women", "kids"].includes(t))) {
    if (lower.includes("women") || lower.includes("girl")) tags.push("women");
    else if (lower.includes("kids") || lower.includes("child") || lower.includes("baby") || lower.includes("boy")) tags.push("kids");
    else tags.push("men"); // default
  }

  return tags;
}

/* Refine tags based on product name */
function refineTags(name, tags) {
  const lower = name.toLowerCase();
  if (!tags.includes("men") && !tags.includes("women") && !tags.includes("kids")) {
    if (/\b(men|male|man|boy)\b/.test(lower)) tags.push("men");
    else if (/\b(women|woman|female|girl)\b/.test(lower)) tags.push("women");
    else if (/\b(kids|child|children|baby|toddler)\b/.test(lower)) tags.push("kids");
    else tags.push("unisex");
  }
  if (/\b(sneaker|sneakers|athletic shoe)\b/.test(lower) && !tags.includes("sneakers")) tags.push("sneakers");
  if (/\b(boot|boots|ankle boot)\b/.test(lower) && !tags.includes("boots")) tags.push("boots");
  if (/\b(sandal|sandals|slide)\b/.test(lower) && !tags.includes("sandals")) tags.push("sandals");
  if (/\b(run|running|jogging|sport|athletic|training)\b/.test(lower) && !tags.some(t => ["athletic", "sneakers"].includes(t))) tags.push("athletic");
  if (/\b(formal|dress shoe|office|oxford)\b/.test(lower) && !tags.includes("formal")) tags.push("formal");
  if (/\b(loafer|loafers|slip.?on)\b/.test(lower) && !tags.includes("loafers")) tags.push("loafers");
  if (/\b(heel|heels|pump|stiletto)\b/.test(lower) && !tags.includes("heels")) tags.push("heels");
  if (/\b(flat|flats|ballet)\b/.test(lower) && !tags.includes("flats")) tags.push("flats");
  if (/\b(hiking|hike|trail|outdoor)\b/.test(lower) && !tags.includes("hiking")) tags.push("hiking");
  return tags;
}

const QUERIES = [
  // Men shoes (8 keywords)
  { keyword: "men sneakers casual", size: 12 },
  { keyword: "men boots winter", size: 12 },
  { keyword: "men running shoes athletic", size: 12 },
  { keyword: "men loafers slip on", size: 12 },
  { keyword: "men sandals summer", size: 12 },
  { keyword: "men formal dress shoes", size: 12 },
  { keyword: "men hiking boots outdoor", size: 12 },
  { keyword: "men basketball shoes sport", size: 8 },
  // Women shoes (8 keywords)
  { keyword: "women sneakers fashion", size: 12 },
  { keyword: "women boots ankle", size: 12 },
  { keyword: "women sandals heel", size: 12 },
  { keyword: "women heels pumps", size: 10 },
  { keyword: "women flats ballet", size: 10 },
  { keyword: "women running shoes", size: 10 },
  { keyword: "women wedges summer", size: 8 },
  { keyword: "women platform shoes", size: 8 },
  // Kids shoes (4 keywords)
  { keyword: "kids sneakers boys", size: 10 },
  { keyword: "kids sneakers girls", size: 10 },
  { keyword: "kids boots winter", size: 8 },
  { keyword: "kids sandals summer", size: 8 },
  { keyword: "kids school shoes", size: 8 },
];

async function main() {
  console.log("Getting CJ token...");
  token = await getToken();
  console.log("Token obtained.");

  const allProducts = [];
  const seenSkus = new Set();
  let idCounter = 500;

  await new Promise((r) => setTimeout(r, 2000));

  for (const { keyword, size } of QUERIES) {
    console.log(`Searching "${keyword}"...`);
    const results = await searchCJ(keyword, 1, size);
    console.log(`   Found ${results.length} results`);

    for (const p of results) {
      const sku = p.sku;
      if (!sku || seenSkus.has(sku)) continue;
      seenSkus.add(sku);

      const costPrice = parseFloat(p.sellPrice) || 0;
      const retailPrice = Math.round(costPrice * MARKUP * 100) / 100;
      if (retailPrice < 4) continue;

      const descriptionHtml = p.description || "";
      const images = [p.bigImage, ...extractImagesFromDescription(descriptionHtml)].filter(Boolean).slice(0, 5);

      const slug = slugify((p.productNameEn || sku).slice(0, 40));
      const baseTags = categorizeShoe(keyword);
      const allTags = refineTags(p.productNameEn || "", [...baseTags]);

      const shipMethods = p.shippingMethodVOS || [];
      const firstShip = shipMethods[0] || {};
      const processingDays = firstShip.processingTime || "3-5 days";
      const deliveryDays = firstShip.deliveryTime || "7-12 days";
      const maxShipping = shipMethods.map((s) => parseFloat(s.shippingFee) || 0).reduce((a, b) => Math.max(a, b), 2.5);

      const product = {
        id: String(idCounter++),
        slug,
        name: p.productNameEn || sku,
        description: generateDescription(descriptionHtml, p.productNameEn),
        price: retailPrice,
        compareAtPrice: Math.round(retailPrice * 1.6 * 100) / 100,
        category: "style",
        tags: allTags,
        image: p.bigImage || "",
        images: images.length > 0 ? images : [p.bigImage || ""],
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 80) + 10,
        createdAt: new Date().toISOString().split("T")[0],
        status: "live",
        weight: p.weight ? `${p.weight}g` : "600g",
        inventory: Math.floor(Math.random() * 400) + 30,
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
      console.log(`   + ${allTags.join(",")} - ${product.name} (SKU: ${sku}, $${costPrice})`);
      await new Promise((r) => setTimeout(r, 1100));
    }
    await new Promise((r) => setTimeout(r, 1200));
  }

  // Count by gender and type
  const genders = { men: 0, women: 0, kids: 0, unisex: 0 };
  const types = {};
  for (const p of allProducts) {
    for (const t of ["men", "women", "kids", "unisex"]) {
      if (p.tags.includes(t)) genders[t]++;
    }
    for (const t of ["sneakers", "boots", "sandals", "formal", "casual", "athletic", "loafers", "heels", "flats", "hiking"]) {
      if (p.tags.includes(t)) types[t] = (types[t] || 0) + 1;
    }
  }

  console.log(`\nTotal unique shoe products: ${allProducts.length}`);
  console.log("By gender:", genders);
  console.log("By type:", types);

  const fileContent = `import type { Product } from "./types";

export const shoeProducts: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;
  writeFileSync("src/lib/shoe-products.ts", fileContent, "utf-8");
  console.log("Written to src/lib/shoe-products.ts");
}

main().catch(console.error);
