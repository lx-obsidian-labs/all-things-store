import fs from "fs";
let total = 0, highRating = 0, hasTags = 0;
for (let i = 1; i <= 13; i++) {
  const c = fs.readFileSync(`src/lib/mass-products-${i}.ts`, "utf8");
  const ratings = c.match(/"rating":\s*([\d.]+)/g);
  if (ratings) ratings.forEach(x => { total++; const r = parseFloat(x.split(":")[1]); if (r >= 4.5) highRating++; });
  const tags = c.match(/"tags":\s*\[([^\]]+)\]/g);
  if (tags) tags.forEach(x => { if (x.length > 20) hasTags++; });
}
console.log(`Total: ${total}, Rating>=4.5: ${highRating}, Has extra tags: ${hasTags}`);
