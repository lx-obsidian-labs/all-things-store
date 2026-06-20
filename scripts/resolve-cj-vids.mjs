/**
 * resolve-cj-vids.mjs
 *
 * One-time script that queries CJ's product API for every CJ SKU found in the
 * product source files, resolves the variant ID (vid) and product ID (pid),
 * then optionally patches the source files in-place.
 *
 * Usage:
 *   node scripts/resolve-cj-vids.mjs            # dry-run — report only
 *   node scripts/resolve-cj-vids.mjs --patch     # patch source files in-place
 *   node scripts/resolve-cj-vids.mjs --json      # output JSON report to stdout
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_LIB = path.join(ROOT, "src", "lib");
const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const RATE_LIMIT_MS = 1200;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const API_KEY = process.env.CJ_API_KEY;
if (!API_KEY) {
  console.error("ERROR: CJ_API_KEY env var is required.");
  process.exit(1);
}

const args = process.argv.slice(2);
const PATCH_MODE = args.includes("--patch");
const JSON_MODE = args.includes("--json");

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
let tokenCache = null;

async function getToken() {
  if (tokenCache) return tokenCache;
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

// ---------------------------------------------------------------------------
// Product query
// ---------------------------------------------------------------------------
async function queryProduct(token, sku, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(
        `${CJ_BASE}/product/query?productSku=${encodeURIComponent(sku)}`,
        { headers: { "CJ-Access-Token": token } }
      );
      const data = await res.json();
      if (!data.success || !data.data) {
        if (data.code === 1600104) {
          // Rate limited — wait and retry
          await sleep(1500);
          continue;
        }
        return null;
      }
      const product = data.data;
      const pid = product.pid || product.vid;
      let vid = null;
      if (product.variants?.length > 0) {
        vid = product.variants[0].vid;
      } else if (product.vid) {
        vid = product.vid;
      }
      return { vid, pid: pid || null };
    } catch (err) {
      if (attempt < retries - 1) await sleep(1500);
      else return null;
    }
  }
  return null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// File scanning
// ---------------------------------------------------------------------------
const PRODUCT_FILES = [
  "products.ts",
  "cheap-products.ts",
  "clothing-gadgets.ts",
  "clothing-more.ts",
  "winter-products.ts",
  "shoe-products.ts",
  "car-parts.ts",
  "consumer-electronics.ts",
  "pet-supplies.ts",
];

// Also include mass-products-*.ts
const massFiles = fs
  .readdirSync(SRC_LIB)
  .filter((f) => f.startsWith("mass-products-") && f.endsWith(".ts"))
  .sort();

const ALL_FILES = [...PRODUCT_FILES, ...massFiles];

/**
 * Extract all CJ SKUs from a file, along with their line numbers.
 * Returns [{ sku, line }] where line is the 0-based line index of the sku field.
 */
function extractSkus(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const results = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    // Match both "sku": "CJ..."  and sku: "CJ..."
    const m = lines[i].match(/["']?sku["']?\s*:\s*["']([^"']+)["']/);
    if (m && m[1].startsWith("CJ") && !seen.has(m[1])) {
      seen.add(m[1]);
      results.push({ sku: m[1], line: i });
    }
  }
  return results;
}

/**
 * Patch a source file to add cjVariantId and cjProductId after the sku line.
 * Only patches if the fields don't already exist.
 */
function patchFile(filePath, patches) {
  // patches: [{ line, sku, vid, pid }]
  if (patches.length === 0) return false;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let changed = false;

  // Process from bottom to top so line numbers don't shift
  const sortedPatches = [...patches].sort((a, b) => b.line - a.line);

  for (const patch of sortedPatches) {
    const lineIdx = patch.line;
    const line = lines[lineIdx];

    // Check if cjVariantId already exists nearby (within next 5 lines)
    const nearby = lines
      .slice(lineIdx, Math.min(lineIdx + 8, lines.length))
      .join("\n");
    if (nearby.includes("cjVariantId")) continue;

    // Determine indentation from the sku line
    const indent = line.match(/^(\s*)/)[1];
    // Determine if using JSON-style quotes ("sku") or TS-style (sku)
    const useQuotes = line.includes('"sku"') || line.includes("'sku'");

    const vidLine = `${indent}${useQuotes ? '"cjVariantId"' : "cjVariantId"}: "${patch.vid}",`;
    const pidLine = `${indent}${useQuotes ? '"cjProductId"' : "cjProductId"}: "${patch.pid}",`;

    // Insert after the sku line
    lines.splice(lineIdx + 1, 0, vidLine, pidLine);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  }
  return changed;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("CJ VID/PID Resolution Script");
  console.log(`Mode: ${PATCH_MODE ? "PATCH (will modify files)" : "DRY RUN (report only)"}`);
  console.log(`Files: ${ALL_FILES.length}\n`);

  const token = await getToken();
  console.log("CJ token acquired.\n");

  const report = [];
  let totalSkus = 0;
  let totalResolved = 0;
  let totalNotFound = 0;
  let totalErrors = 0;
  let totalPatched = 0;
  let totalAlreadyHad = 0;

  for (const fileName of ALL_FILES) {
    const filePath = path.join(SRC_LIB, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP: ${fileName} (not found)`);
      continue;
    }

    const skus = extractSkus(filePath);
    if (skus.length === 0) continue;

    totalSkus += skus.length;
    if (!JSON_MODE) console.log(`${fileName}: ${skus.length} SKUs`);

    const patches = [];

    for (const { sku, line } of skus) {
      await sleep(RATE_LIMIT_MS);

      try {
        const result = await queryProduct(token, sku);
        if (result && result.vid) {
          totalResolved++;
          const entry = { file: fileName, sku, vid: result.vid, pid: result.pid, status: "resolved" };
          report.push(entry);

          if (PATCH_MODE) {
            patches.push({ line, sku, vid: result.vid, pid: result.pid });
          }

          if (!JSON_MODE) {
            process.stdout.write(`  + ${sku} -> vid=${result.vid}\n`);
          }
        } else {
          totalNotFound++;
          report.push({ file: fileName, sku, vid: null, pid: null, status: "not_found" });
          if (!JSON_MODE) {
            process.stdout.write(`  - ${sku}: NOT FOUND\n`);
          }
        }
      } catch (err) {
        totalErrors++;
        report.push({ file: fileName, sku, vid: null, pid: null, status: "error", error: err.message });
        if (!JSON_MODE) {
          process.stdout.write(`  ! ${sku}: ERROR ${err.message}\n`);
        }
      }
    }

    if (PATCH_MODE && patches.length > 0) {
      const didPatch = patchFile(filePath, patches);
      if (didPatch) {
        totalPatched += patches.length;
        if (!JSON_MODE) console.log(`  => Patched ${patches.length} entries in ${fileName}`);
      }
    }
  }

  // Summary
  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("\n=== Resolution Complete ===");
    console.log(`Total SKUs scanned:  ${totalSkus}`);
    console.log(`Resolved:            ${totalResolved}`);
    console.log(`Not found:           ${totalNotFound}`);
    console.log(`Errors:              ${totalErrors}`);
    if (PATCH_MODE) {
      console.log(`Files patched:       ${totalPatched} entries`);
    } else {
      console.log(`\nRun with --patch to apply changes to source files.`);
    }
  }

  // Write report file
  const reportPath = path.join(ROOT, "cj-vid-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  if (!JSON_MODE) console.log(`\nFull report saved to: ${reportPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
