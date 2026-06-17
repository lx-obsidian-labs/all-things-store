import { writeFileSync, existsSync, readFileSync } from "fs";

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_KEY = process.env.CJ_API_KEY || "CJ5522804@api@88cceb0cd69a4fbc8b43b77d1e05febd";
const MARKUP = 2.5;
const BATCH_SIZE = 400;
const MAX_PRODUCTS = 6000;

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

async function searchCJ(keyword, page = 1, size = 20) {
  if (!token) token = await getToken();
  const url = `${CJ_BASE}/product/listV2?keyWord=${encodeURIComponent(keyword)}&page=${page}&size=${size}&features=enable_description`;
  const res = await fetch(url, { headers: { "CJ-Access-Token": token } });
  const data = await res.json();
  if (!data.success) return [];
  return data.data?.content?.[0]?.productList ?? [];
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

function extractDesc(desc, name) {
  const clean = (desc || name || "").replace(/<[^>]*>/g, "").replace(/\n\s*\n/g, "\n").trim();
  return clean.slice(0, 250);
}

const QUERIES = [
  // TECH — 50 keywords
  "bluetooth speaker portable", "wireless earbuds noise cancelling", "power bank fast charging",
  "usb c hub multiport", "laptop stand adjustable", "wireless mouse ergonomic",
  "mechanical keyboard rgb", "webcam 1080p", "gaming headset microphone",
  "smart watch fitness tracker", "phone ring light", "selfie stick tripod",
  "car phone mount", "cable organizer bag", "sd card reader usb c",
  "tablet stand foldable", "phone case clear", "screen protector privacy",
  "wireless charger stand", "airpods pro case", "gaming mouse pad extended",
  "usb fan desktop", "mini projector portable", "smart plug wifi", "wifi extender signal",
  "action camera waterproof", "vr headset 3d", "led strip lights rgb",
  "portable monitor usb c", "hdmi cable 4k", "apple watch band", "earphone wired",
  "keyboard wrist rest", "mouse bungee", "phone grip popsocket",
  "cable tie velcro", "laptop sleeve 15 inch", "ipad case folio",
  "surge protector power strip", "usb wall charger gan", "portable speaker shower",
  "microphone lapel wireless", "streaming webcam 4k", "ring light tripod",
  "gaming controller phone", "adapter travel universal", "wireless charger car",
  "usb splitter hub", "desk cable management", "mouse pad coaster",
  // HOME — 50 keywords
  "scented candle soy", "reed diffuser fragrance", "wall art canvas print",
  "throw pillow decorative", "fleece blanket soft", "bed sheet set microfiber",
  "duvet cover queen", "bath towel quick dry", "shower curtain waterproof",
  "bath mat absorbent", "storage basket woven", "shelf organizer kitchen",
  "spice rack cabinet", "knife block magnetic", "cutting board bamboo",
  "food storage container", "water bottle stainless", "coffee mug ceramic",
  "wine glasses set", "ice cube tray silicone", "kitchen scale digital",
  "measuring spoons set", "vegetable peeler ergonomic", "garlic press stainless",
  "oven mitt heat resistant", "apron kitchen cotton", "dish drying mat",
  "sink organizer caddy", "trash can touchless", "laundry hamper collapsible",
  "clothes hanger velvet", "jewelry box organizer", "makeup brush holder",
  "key holder wall", "door mat outdoor", "plant pot ceramic",
  "artificial plant fake", "vase decorative glass", "photo frame collage",
  "alarm clock digital", "humidifier cool mist", "oil diffuser aromatherapy",
  "desk lamp led", "floor lamp modern", " pendant light ceiling",
  "curtains blackout", "rug living room", "ottoman storage",
  "foldable storage cube", "under bed storage",
  // WELLNESS — 30 keywords
  "yoga mat non slip", "resistance band set", "foam roller muscle",
  "jump rope speed", "dumbbell set adjustable", "kettlebell cast iron",
  "fitness tracker band", "sweatband headband", "gym bag duffle",
  "water bottle shaker", "protein shaker bottle", "skincare serum vitamin c",
  "face mask sheet", "eye cream anti aging", "sunscreen spf 50",
  "lip balm moisturizing", "hair brush detangling", "shower cap reusable",
  "nail file set", "manicure kit professional", "essential oil lavender",
  "massage gun deep tissue", "neck massager shiatsu", "foot massager circulation",
  "sleep mask silk", "earplugs noise reduction", "pillow memory foam",
  "back stretcher posture", "ankle weights adjustable", "push up stand bar",
  // STYLE — 40 keywords
  "sunglasses men polarized", "sunglasses women fashion",
  "baseball cap plain", "beanie winter knit", "bucket hat sun",
  "belt men leather", "belt women fashion", "wallet men minimalist",
  "wallet women zip", "backpack laptop 15 inch",
  "backpack women fashion", "tote bag canvas", "crossbody bag small",
  "duffle bag travel", "luggage suitcase cabin", "passport holder travel",
  "scarf winter warm", "scarf silk women", "gloves touchscreen winter",
  "umbrella compact windproof", "hair clip claw", "hair tie elastic",
  "headband sport", "bracelet men leather", "necklace women gold",
  "earring hoop silver", "ring adjustable", "watch men analog",
  "watch women quartz", "socks ankle cushioned", "socks compression travel",
  "underwear boxer men", "bra women seamless", "pajama set cotton",
  "slippers house indoor", "slippers women fuzzy", "tie men silk",
  "suspenders men clip on", "handkerchief cotton", "lapel pin men",
  // PETS — 20 keywords
  "dog leash retractable", "dog collar reflective", "dog harness no pull",
  "dog bed plush", "dog bowl stainless", "pet feeder automatic",
  "cat toy wand", "cat scratching post", "cat bed cave",
  "pet brush deshedding", "pet nail grinder", "pet carrier backpack",
  "dog poop bag dispenser", "dog toy squeaky", "catnip toy mouse",
  "pet water fountain", "cat tree tower", "dog sweater warm",
  "pet grooming kit", "dog tag engraved",
  // OUTDOOR / SPORTS — 30 keywords
  "camping tent 4 person", "sleeping bag warm", "camping stove portable",
  "hiking poles trekking", "headlamp led rechargeable", "lantern camping led",
  "cooler bag insulated", "hammock tree strap", "camping chair foldable",
  "air pump electric", "bike lock cable", "bicycle light rechargeable",
  "waterproof jacket rain", "insulated water bottle", "sports cap visor",
  "sweat towel microfiber", "duffel bag gym", "swim goggles anti fog",
  "swim cap silicone", "swim trunks men", "bikini women",
  "snorkel mask diving", "knee brace support", "wrist wrap gym",
  "lifting belt leather", "gym gloves padded", "skipping rope speed",
  "resistance tube band", "exercise mat thick", "balance ball yoga",
  // BEAUTY — 30 keywords
  "makeup sponge blender", "foundation brush set", "eyeshadow palette neutral",
  "eyeliner waterproof", "mascara volumizing", "lipstick matte long lasting",
  "lip gloss shimmer", "blush powder", "highlighter stick",
  "concealer full coverage", "setting spray makeup", "makeup bag cosmetic",
  "compact mirror led", "tweezer precision", "eyelash curler",
  "false eyelashes natural", "lash glue clear", "eyebrow pencil",
  "makeup remover cloth", "facial cleansing brush", "toner face mist",
  "moisturizer face cream", "hand cream shea", "body lotion coconut",
  "shampoo bar natural", "conditioner bar solid", "toothbrush electric",
  "floss pick dental", "tongue scraper copper", "deodorant natural",
  // BABY — 20 keywords
  "baby bib cotton", "baby onesie bodysuit", "baby hat newborn",
  "baby socks set", "baby blanket swaddle", "baby towel hooded",
  "baby bottle silicone", "pacifier case holder", "teether toy silicone",
  "baby rattle toy", "baby play mat", "baby gate safety",
  "stroller organizer bag", "diaper bag backpack", "baby monitor video",
  "night light baby", "baby bath tub", "baby nail clipper",
  "baby comb brush set", "baby carrier wrap",
  // ACCESSORIES — 20 keywords
  "keychain personalized", "key ring leather", "badge holder id",
  "lanyard id card", "card holder slim", "coin purse small",
  "sunglasses case hard", "reading glasses men", "reading glasses women",
  "watch box 6 slot", "jewelry stand display", "perfume travel atomizer",
  "hand sanitizer holder", "mask chain eyeglass", "phone wallet stick on",
  "card wallet minimalist", "money clip stainless", "business card holder",
  "travel wallet passport", "phone lanyard strap",
];

async function main() {
  console.log("Getting CJ token...");
  token = await getToken();
  console.log("Token obtained.");

  const seenSkus = new Set();
  let allProducts = [];
  let idCounter = 1000;
  let fileIndex = 1;

  await new Promise((r) => setTimeout(r, 2000));

  for (const [idx, keyword] of QUERIES.entries()) {
    if (allProducts.length >= MAX_PRODUCTS) break;

    console.log(`[${idx + 1}/${QUERIES.length}] Searching "${keyword}"...`);
    const results = await searchCJ(keyword, 1, 20);
    let added = 0;

    for (const p of results) {
      if (allProducts.length >= MAX_PRODUCTS) break;
      const sku = p.sku;
      if (!sku || seenSkus.has(sku)) continue;
      seenSkus.add(sku);

      const costPrice = parseFloat(p.sellPrice) || 0;
      const retailPrice = Math.round(costPrice * MARKUP * 100) / 100;
      if (retailPrice < 2) continue;

      const slug = slugify((p.productNameEn || sku).slice(0, 40));
      const bigImage = p.bigImage || p.productImage || "";

      const shipMethods = p.shippingMethodVOS || [];
      const firstShip = shipMethods[0] || {};
      const maxShipping = shipMethods
        .map((s) => parseFloat(s.shippingFee) || 0)
        .reduce((a, b) => Math.max(a, b), 2.5);

      let category = "style";
      const lowerKW = keyword.toLowerCase();
      const lowerName = (p.productNameEn || "").toLowerCase();
      if (lowerKW.includes("tech") || lowerKW.includes("camera") || lowerKW.includes("phone") || lowerKW.includes("audio") || lowerKW.includes("charger") || lowerKW.includes("keyboard") || lowerKW.includes("mouse") || lowerKW.includes("speaker") || lowerKW.includes("earphone") || lowerKW.includes("cable") || lowerKW.includes("laptop") || lowerKW.includes("usb") || lowerKW.includes("watch") || lowerKW.includes("monitor") || lowerKW.includes("stream") || lowerKW.includes("light") || lowerKW.includes("fan") || lowerKW.includes("adapter") || lowerKW.includes("hub") || lowerKW.includes("projector") || lowerKW.includes("power bank") || lowerKW.includes("gaming") || lowerKW.includes("hdmi") || lowerKW.includes("webcam")) category = "tech";
      else if (lowerKW.includes("home") || lowerKW.includes("kitchen") || lowerKW.includes("decor") || lowerKW.includes("furniture") || lowerKW.includes("storage") || lowerKW.includes("blanket") || lowerKW.includes("towel") || lowerKW.includes("candle") || lowerKW.includes("curtain") || lowerKW.includes("rug") || lowerKW.includes("lamp") || lowerKW.includes("pillow") || lowerKW.includes("bed ") || lowerKW.includes("bath") || lowerKW.includes("shelf") || lowerKW.includes("organizer") || lowerKW.includes("frame") || lowerKW.includes("vase") || lowerKW.includes("plant") || lowerKW.includes("mug") || lowerKW.includes("glass") || lowerKW.includes("cutting") || lowerKW.includes("trash") || lowerKW.includes("laundry") || lowerKW.includes("hanger") || lowerKW.includes("humidifier") || lowerKW.includes("diffuser") || lowerKW.includes("clock") || lowerKW.includes("ottoman") || lowerKW.includes("cube") || lowerKW.includes("spice") || lowerKW.includes("knife") || lowerKW.includes("apron")) category = "home";
      else if (lowerKW.includes("wellness") || lowerKW.includes("yoga") || lowerKW.includes("fitness") || lowerKW.includes("skincare") || lowerKW.includes("massage") || lowerKW.includes("sleep") || lowerKW.includes("supplement") || lowerKW.includes("vitamin") || lowerKW.includes("gym") || lowerKW.includes("dumbbell") || lowerKW.includes("kettlebell") || lowerKW.includes("protein") || lowerKW.includes("shaker") || lowerKW.includes("sunscreen") || lowerKW.includes("lip ") || lowerKW.includes("hair") || lowerKW.includes("nail") || lowerKW.includes("manicure") || lowerKW.includes("essential") || lowerKW.includes("neck") || lowerKW.includes("pillow") || lowerKW.includes("earplug") || lowerKW.includes("stretcher") || lowerKW.includes("ankle") || lowerKW.includes("push up") || lowerKW.includes("foam roller") || lowerKW.includes("jump rope") || lowerKW.includes("sweatband") || lowerKW.includes("resistance")) category = "wellness";
      else if (lowerKW.includes("shoe") || lowerKW.includes("boot") || lowerKW.includes("sneaker")) category = "shoes";
      else if (lowerKW.includes("pet") || lowerKW.includes("dog") || lowerKW.includes("cat") || lowerKW.includes("pet ")) category = "style";

      const tags = ["mass"];
      if (lowerName.includes("men") || lowerName.includes("male") || lowerKW.includes("men ")) tags.push("men");
      if (lowerName.includes("women") || lowerName.includes("female") || lowerKW.includes("women")) tags.push("women");
      if (lowerName.includes("baby") || lowerName.includes("kids") || lowerName.includes("child") || lowerKW.includes("baby") || lowerKW.includes("kids")) tags.push("kids");

      const product = {
        id: String(idCounter++),
        slug,
        name: p.productNameEn || sku,
        description: extractDesc(p.description, p.productNameEn),
        price: retailPrice,
        compareAtPrice: Math.round(retailPrice * 1.6 * 100) / 100,
        category,
        tags,
        image: bigImage,
        images: [bigImage],
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 80) + 10,
        createdAt: new Date().toISOString().split("T")[0],
        status: "live",
        weight: p.weight ? `${p.weight}g` : "300g",
        inventory: Math.floor(Math.random() * 500) + 20,
        shippingFrom: "China",
        shippingMethods: shipMethods.length > 0
          ? shipMethods.map((s) => ({
              name: s.shippingMethodName || "CJ Registered Air Mail",
              fee: parseFloat(s.shippingFee) || 0,
              processingDays: s.processingTime || "3-5 days",
              deliveryDays: s.deliveryTime || "7-12 days",
              tracking: s.tracking || "Full tracking",
            }))
          : [{ name: "CJ Registered Air Mail", fee: 2.5, processingDays: "3-5 days", deliveryDays: "7-12 days", tracking: "Full tracking" }],
        totalLandedCost: Math.round((costPrice + maxShipping) * 100) / 100,
        supplier: {
          source: "cj-dropshipping",
          sku,
          costPrice,
          shippingDays: (firstShip.deliveryTime || "7-12").split("-")[0]?.trim() || "7",
          shippingFee: maxShipping,
          processingTime: firstShip.processingTime || "3-5 days",
        },
      };

      allProducts.push(product);
      added++;
    }

    console.log(`   +${added} new products (total: ${allProducts.length})`);
    if (idx < QUERIES.length - 1) await new Promise((r) => setTimeout(r, 1200));

    // Write batch file every BATCH_SIZE products
    if (allProducts.length >= fileIndex * BATCH_SIZE) {
      writeBatch(fileIndex, allProducts.slice(0, fileIndex * BATCH_SIZE));
      fileIndex++;
    }
  }

  // Write remaining
  if (allProducts.length > (fileIndex - 1) * BATCH_SIZE) {
    writeBatch(fileIndex, allProducts);
  }

  // Count
  const catCount = {};
  for (const p of allProducts) {
    catCount[p.category] = (catCount[p.category] || 0) + 1;
  }
  console.log(`\n=== DONE ===`);
  console.log(`Total products: ${allProducts.length}`);
  console.log("By category:", catCount);
  console.log(`Files written: mass-products-1.ts through mass-products-${fileIndex}.ts`);
  console.log(`\nNext ID to use: ${idCounter}`);
}

function writeBatch(index, allProducts) {
  const start = (index - 1) * BATCH_SIZE;
  const batch = allProducts.slice(start, start + BATCH_SIZE);
  if (batch.length === 0) return;
  const fileContent = `import type { Product } from "./types";

export const massProducts${index}: Product[] = ${JSON.stringify(batch, null, 2)};
`;
  writeFileSync(`src/lib/mass-products-${index}.ts`, fileContent, "utf-8");
  console.log(`   Wrote mass-products-${index}.ts (${batch.length} products)`);
}

main().catch(console.error);
