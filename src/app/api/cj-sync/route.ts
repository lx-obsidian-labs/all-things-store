import { NextResponse } from "next/server";
import { products } from "@/lib/products";

async function getCJToken(): Promise<string | null> {
  try {
    const res = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appKey: "CJ5522804",
        appSecret: "88cceb0cd69a4fbc8b43b77d1e05febd",
      }),
    });
    const data = await res.json();
    const token = data?.data?.accessToken;
    if (!token) return null;
    return `API@CJ5522804@CJ:${token}`;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const token = await getCJToken();
    if (!token) {
      return NextResponse.json({ success: false, error: "Failed to authenticate with CJ" });
    }

    const skus = products
      .filter((p) => p.supplier.source === "cj-dropshipping" && p.supplier.sku)
      .map((p) => p.supplier.sku as string);

    if (skus.length === 0) {
      return NextResponse.json({ success: false, error: "No CJ products to sync" });
    }

    const results: { sku: string; price?: number; inventory?: number; status: string }[] = [];

    for (const sku of skus) {
      try {
        const res = await fetch(
          `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?keyWord=${sku}&page=1&size=1&features=enable_description`,
          { headers: { "CJ-Access-Token": token } }
        );
        const data = await res.json();
        const p = data.data?.content?.[0]?.productList?.[0];

        if (p) {
          results.push({
            sku,
            price: parseFloat(p.sellPrice) || undefined,
            inventory: p.warehouseInventoryNum ?? undefined,
            status: "synced",
          });
        } else {
          results.push({ sku, status: "not_found" });
        }
      } catch {
        results.push({ sku, status: "error" });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      synced: results.filter((r) => r.status === "synced").length,
      total: skus.length,
      products: results,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
