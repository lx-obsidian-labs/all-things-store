import { readFileSync } from "fs";

const cats = { tech: 0, home: 0, style: 0, wellness: 0 };
const files = [
  "src/lib/cheap-products.ts",
  "src/lib/clothing-gadgets.ts",
  "src/lib/winter-products.ts",
];
for (const f of files) {
  const content = readFileSync(f, "utf-8");
  const re = /category:\s*"(\w+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) cats[m[1]]++;
}
cats.tech += 8;  // premium tech
cats.home += 5;  // premium home
cats.style += 9; // premium style
cats.wellness += 5; // premium wellness
console.log(cats);
console.log("Total:", Object.values(cats).reduce((a, b) => a + b, 0));
