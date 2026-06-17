import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_KEY = process.env.CJ_API_KEY;
const RATE_LIMIT_MS = 1200;
const MASS_DIR = path.resolve(__dirname, "../src/lib");

let tokenCache = null;

async function getToken() {
  if (API_KEY) {
    const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: API_KEY }),
    });
    const data = await res.json();
    if (!data.success) throw new Error("CJ auth failed: " + data.message);
    tokenCache = data.data.accessToken;
    return tokenCache;
  }
  throw new Error("CJ_API_KEY not set");
}

async function queryProduct(token, sku) {
  const res = await fetch(
    `${CJ_BASE}/product/query?productSku=${encodeURIComponent(sku)}`,
    { headers: { "CJ-Access-Token": token } }
  );
  const data = await res.json();
  if (!data.success || !data.data) return null;
  return data.data;
}

function extractSkus(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const skus = [];
  const regex = /"sku":\s*"([^"]+)"/g;
  let match;
  let lineNum = 0;
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/"sku":\s*"([^"]+)"/);
    if (m && m[1].startsWith("CJ")) {
      // Find the { that starts this product and the id within it
      skus.push({ sku: m[1], line: i + 1 });
    }
  }
  return skus;
}

function findProductBlock(lines, skuLine) {
  // Walk backwards from skuLine to find the opening {
  for (let i = skuLine - 2; i >= 0; i--) {
    if (lines[i].trim() === "{" || lines[i].trim().startsWith("{")) {
      return i;
    }
  }
  return -1;
}

async function main() {
  console.log("CJ Price Sync — reading mass product files...");
  const token = await getToken();
  console.log("Token acquired.\n");

  const files = fs.readdirSync(MASS_DIR).filter(f => f.startsWith("mass-products-") && f.endsWith(".ts"));

  let totalChecked = 0;
  let totalChanged = 0;
  let totalErrors = 0;
  let changes = [];

  for (const file of files.sort()) {
    const filePath = path.join(MASS_DIR, file);
    const skus = extractSkus(filePath);
    console.log(`\n${file}: ${skus.length} CJ SKUs found`);
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    for (const { sku, line } of skus) {
      await new Promise(r => setTimeout(r, RATE_LIMIT_MS));
      totalChecked++;

      try {
        const product = await queryProduct(token, sku);
        if (!product) {
          console.log(`  [${totalChecked}] ${sku}: NOT FOUND`);
          totalErrors++;
          continue;
        }

        const cjPrice = parseFloat(product.sellPrice) || 0;
        const cjInventory = product.variants?.[0]?.stock || 0;

        // Find the price and inventory lines in the file
        // The structure is: id, slug, name, description, price, compareAtPrice, ...
        let priceChanged = false;
        let invChanged = false;

        for (let i = Math.max(0, line - 15); i < Math.min(lines.length, line + 5); i++) {
          const priceMatch = lines[i].match(/"price":\s*([\d.]+)/);
          if (priceMatch) {
            const currentPrice = parseFloat(priceMatch[1]);
            const expectedPrice = Math.round(cjPrice * 2.5 * 100) / 100;
            if (Math.abs(currentPrice - expectedPrice) > 0.5) {
              priceChanged = true;
              console.log(`  [${totalChecked}] ${sku}: PRICE ${currentPrice} -> ${expectedPrice}`);
              changes.push({ file, sku, field: "price", from: currentPrice, to: expectedPrice });
            }
            break;
          }
        }
        for (let i = Math.max(0, line - 3); i < Math.min(lines.length, line + 10); i++) {
          const invMatch = lines[i].match(/"inventory":\s*(\d+)/);
          if (invMatch) {
            const currentInv = parseInt(invMatch[1]);
            if (currentInv !== cjInventory) {
              invChanged = true;
              console.log(`  [${totalChecked}] ${sku}: INVENTORY ${currentInv} -> ${cjInventory}`);
              changes.push({ file, sku, field: "inventory", from: currentInv, to: cjInventory });
            }
            break;
          }
        }

        if (!priceChanged && !invChanged) {
          // quiet — no change
          if (totalChecked % 50 === 0) process.stdout.write(".");
        }
      } catch (err) {
        totalErrors++;
        console.log(`  [${totalChecked}] ${sku}: ERROR ${err.message}`);
      }
    }
  }

  console.log("\n\n=== Sync Complete ===");
  console.log(`Checked: ${totalChecked}`);
  console.log(`Changed: ${totalChanged}`);
  console.log(`Errors: ${totalErrors}`);
  if (changes.length > 0) {
    console.log("\nChanges detected:");
    for (const c of changes) {
      console.log(`  ${c.file}:${c.sku} ${c.field} ${c.from} -> ${c.to}`);
    }
  } else {
    console.log("No price/inventory changes detected.");
  }
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
