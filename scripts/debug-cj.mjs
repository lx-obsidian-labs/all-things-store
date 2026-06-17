const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_KEY = "CJ5522804@api@88cceb0cd69a4fbc8b43b77d1e05febd";

async function main() {
  const auth = await fetch(CJ_BASE + "/authentication/getAccessToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: API_KEY }),
  });
  const authData = await auth.json();
  const tok = authData.data.accessToken;

  // Get description with images enabled
  const res = await fetch(CJ_BASE + "/product/listV2?keyWord=cotton+t-shirt+men&page=1&size=1&features=enable_description", {
    headers: { "CJ-Access-Token": tok }
  });
  const data = await res.json();
  if (data.success) {
    const p = data.data?.content?.[0]?.productList?.[0];
    if (p) {
      console.log("Name:", p.nameEn);
      console.log("Image:", p.bigImage);

      // Check for images in description HTML
      const desc = p.description || "";
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      let match;
      let count = 0;
      while ((match = imgRegex.exec(desc)) !== null) {
        count++;
        const url = match[1];
        if (url.startsWith("http") && count <= 5) {
          console.log("Desc img:", url.slice(0, 150));
        }
      }
      console.log("Total images in description:", count);

      // Check variantInventories
      if (p.variantInventories && p.variantInventories.length > 0) {
        console.log("Has variantInventories:", p.variantInventories.length);
        const v = p.variantInventories[0];
        console.log("Variant fields:", JSON.stringify(Object.keys(v)));
        console.log("Variant sample:", JSON.stringify(v).slice(0, 300));
      } else {
        console.log("No variantInventories");
      }

      console.log("Description length:", desc.length);
      console.log("Description (first 300):", desc.slice(0, 300));
    }
  }
}
main().catch(console.error);
