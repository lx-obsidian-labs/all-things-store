import { readFileSync, writeFileSync } from "fs";

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_KEY = "CJ5522804@api@88cceb0cd69a4fbc8b43b77d1e05febd";

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

async function getProductImages(sku) {
  try {
    const tok = await getToken();
    const url = `${CJ_BASE}/product/listV2?keyWord=${encodeURIComponent(sku)}&page=1&size=1&features=enable_description`;
    const res = await fetch(url, { headers: { "CJ-Access-Token": tok } });
    const data = await res.json();
    if (!data.success) return null;
    const list = data.data?.content?.[0]?.productList ?? [];
    if (!list.length) return null;
    const p = list[0];
    const mainImage = p.bigImage || "";
    const descImages = extractImagesFromDescription(p.description || "");
    const images = [mainImage, ...descImages].filter(Boolean);
    return [...new Set(images)].slice(0, 5);
  } catch {
    return null;
  }
}

// The existing premium products and their SKUs
const existingProducts = [
  { slug: "wireless-charging-dock", sku: "CJSJ1601466", image: "https://cf.cjdropshipping.com/409d441f-542c-4639-9162-281be030d92b.jpg" },
  { slug: "led-desk-lamp", sku: "CJSN1852848", image: "https://cf.cjdropshipping.com/2187c755-f027-4e90-87be-89d63adc0da1.jpg" },
  { slug: "amoled-smart-watch", sku: "CJJX2389472", image: "https://cf.cjdropshipping.com/quick/product/c27d4de9-6202-414c-beff-ee734608c50c.jpg" },
  { slug: "aroma-flame-diffuser", sku: "CJJT1790763", image: "https://cf.cjdropshipping.com/22785577-c43f-445c-8c20-7c41c99cdcc5.jpg" },
  { slug: "vintage-leather-wallet", sku: "CJQB1028281", image: "https://cf.cjdropshipping.com/1614837398784.jpg" },
  { slug: "mini-metal-wallet", sku: "CJNS1489386", image: "https://cf.cjdropshipping.com/8ed35ab2-de91-4c0e-a363-0a8c52f81cac.jpg" },
  { slug: "smart-thermal-bottle", sku: "CJJT1926768", image: "https://oss-cf.cjdropshipping.com/product/2024/09/23/05/a95f5faa-d965-4622-ab3a-6a910dfc2633.jpg" },
  { slug: "portable-blender", sku: "CJJD1123188", image: "https://cf.cjdropshipping.com/c179a293-c7db-47dd-b67b-74b0b6f081cc.png" },
  { slug: "magnetic-power-bank", sku: "CJCD1007159", image: "https://cf.cjdropshipping.com/1612508751624.jpg" },
  { slug: "adjustable-laptop-stand", sku: "CJSJ2467698", image: "https://cf.cjdropshipping.com/e8930315-0d85-4282-b8ab-936276e485b1.jpg" },
  { slug: "outdoor-bluetooth-speaker", sku: "CJYD2187315", image: "https://cf.cjdropshipping.com/quick/product/5f5a8994-3a59-4c41-87e5-7238cf8ede47.jpg" },
  { slug: "laptop-backpack", sku: "CJBJ1157460", image: "https://cf.cjdropshipping.com/1622699825481.jpg" },
  { slug: "mesh-watch-men", sku: "CJYD1015665", image: "https://cf.cjdropshipping.com/1613718193599.jpg" },
  { slug: "wooden-watch", sku: "CJZBNSYD00435", image: "https://cf.cjdropshipping.com/20200404/581684962303.jpg" },
  { slug: "yoga-mat", sku: "CJYD2305306", image: "https://cf.cjdropshipping.com/quick/product/f62c8e43-af7b-432e-97bb-cbd5b763224e.jpg" },
  { slug: "resistance-bands-set", sku: "CJYDQTJM00248", image: "https://cf.cjdropshipping.com/20190915/752951027905.jpg" },
  { slug: "magnetic-cable-clips", sku: "CJYD1978885", image: "https://oss-cf.cjdropshipping.com/product/2024/03/18/08/7ff788b5-f1d2-44c5-8a1e-fa8fff446737.jpg" },
  { slug: "ceramic-flower-pot", sku: "CJYL2550820", image: "https://oss-cf.cjdropshipping.com/product/2025/10/07/01/1a7cc808-181e-472a-9ef6-abf3851ef55b_fine.jpeg" },
  { slug: "wireless-ear-clip-earbuds", sku: "CJYP1841131", image: "https://cf.cjdropshipping.com/0497762e-6c2b-4eea-b8cb-cf78de2b8819_trans.jpeg" },
  { slug: "phone-stand-holder", sku: "CJSJSJSJ01018", image: "https://cf.cjdropshipping.com/20200224/988544465453.jpg" },
  { slug: "braided-usb-c-cable", sku: "CJSM1058128", image: "https://cf.cjdropshipping.com/1616985474298.jpg" },
  { slug: "charging-stand-3-in-1", sku: "CJYD2087178", image: "https://oss-cf.cjdropshipping.com/product/2024/07/18/08/39d76600-32b6-4611-8bb0-7720931f1a49_trans.jpeg" },
  { slug: "modern-wall-clock", sku: "CJJY1167766", image: "https://cf.cjdropshipping.com/1623289640002.jpg" },
  { slug: "smart-led-desk-lamp", sku: "CJSJ2052800", image: "https://oss-cf.cjdropshipping.com/product/2024/06/04/01/c6785eca-f50c-44be-978e-7f24c22a8af8_trans.jpeg" },
  { slug: "nordic-ceramic-planter", sku: "CJJT1178499", image: "https://oss-cf.cjdropshipping.com/product/2024/12/31/07/fb7b254a-dd17-4bfe-b8fc-7fce7b9bf2b0.jpg" },
  { slug: "leather-bracelet-men", sku: "CJYD1067291", image: "https://cf.cjdropshipping.com/1617675346410.jpg" },
  { slug: "woven-leather-bracelet", sku: "CJSL2041539", image: "https://cf.cjdropshipping.com/quick/product/40a6b402-af3a-4911-84d9-0a3fa7d04d35.jpg" },
  { slug: "knitted-beanie-hat", sku: "CJRN1868419", image: "https://cf.cjdropshipping.com/2c57bffd-ce52-45f3-a4fa-8e1a76f2d55f.jpg" },
  { slug: "yoga-block-set", sku: "CJYD2203154", image: "https://oss-cf.cjdropshipping.com/product/2024/11/21/07/94919bd5-f6d0-4fc1-bcaa-9818ac2e58dc_trans.jpeg" },
  { slug: "mini-massage-gun", sku: "CJAM1362673", image: "https://cf.cjdropshipping.com/e52af6a7-f45f-4af0-848d-b4748a6f7e45.jpg" },
];

async function main() {
  console.log("Getting CJ token...");
  await getToken();
  console.log("Token OK\n");

  const results = [];

  for (const { slug, sku, image } of existingProducts) {
    console.log(`Fetching images for ${slug} (${sku})...`);
    const images = await getProductImages(sku);
    if (images && images.length >= 2) {
      console.log(`  Found ${images.length} images`);
      results.push({ slug, images: [...new Set(images)].slice(0, 5) });
    } else {
      // Fallback: just use the main image with some variants
      console.log(`  Only main image available`);
      results.push({ slug, images: [image] });
    }
  }

  // Output as a map
  console.log("\n\n=== IMAGE DATA ===\n");
  console.log("export const EXISTING_IMAGES: Record<string, string[]> = {");
  for (const { slug, images } of results) {
    const json = JSON.stringify(images);
    console.log(`  "${slug}": ${json},`);
  }
  console.log("};");
}

main().catch(console.error);
