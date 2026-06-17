import { readFileSync } from "fs";
const files = [
  "src/lib/cheap-products.ts",
  "src/lib/clothing-gadgets.ts",
  "src/lib/winter-products.ts",
  "src/lib/clothing-more.ts",
];
let t = 0;
for (const f of files) {
  const c = readFileSync(f, "utf-8");
  const m = c.match(/id:\s*"\d+"/g);
  t += m ? m.length : 0;
}
console.log("Imported:", t, "+ 30 premium =", t + 30);
