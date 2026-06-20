import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { getCJToken } from "@/lib/sourcing";

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const RATE_LIMIT_MS = 1200;

/**
 * GET /api/cj-sync
 *
 * Syncs price, inventory, and VID/PID mappings for all CJ-sourced products.
 * Uses the centralized CJ auth token from sourcing.ts.
 *
 * Query params:
 *   ?mode=prices      — sync prices only (default)
 *   ?mode=inventory   — sync inventory only
 *   ?mode=full        — sync prices, inventory, and VID/PID mappings
 *   ?limit=N          — max products to sync (default: all)
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "full";
    const limitParam = url.searchParams.get("limit");

    const token = await getCJToken();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Failed to authenticate with CJ" },
        { status: 502 }
      );
    }

    const cjProducts = products.filter(
      (p) => p.supplier.source === "cj-dropshipping" && p.supplier.sku
    );

    const limit = limitParam ? parseInt(limitParam, 10) : cjProducts.length;
    const toSync = cjProducts.slice(0, limit);

    if (toSync.length === 0) {
      return NextResponse.json({ success: false, error: "No CJ products to sync" });
    }

    const results: {
      sku: string;
      name?: string;
      price?: number;
      inventory?: number;
      vid?: string;
      pid?: string;
      cjSellPrice?: number;
      status: string;
    }[] = [];

    for (const [idx, product] of toSync.entries()) {
      if (idx > 0) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));

      const sku = product.supplier.sku as string;

      try {
        const res = await fetch(
          `${CJ_BASE}/product/query?productSku=${encodeURIComponent(sku)}`,
          { headers: { "CJ-Access-Token": token } }
        );
        const data = await res.json();

        if (data.success && data.data) {
          const p = data.data;
          const entry: typeof results[number] = {
            sku,
            name: p.productNameEn || p.productName || undefined,
            status: "synced",
          };

          // Price sync
          if (mode === "prices" || mode === "full") {
            entry.cjSellPrice = parseFloat(p.sellPrice) || undefined;
            entry.price = parseFloat(p.sellPrice) || undefined;
          }

          // Inventory sync
          if (mode === "inventory" || mode === "full") {
            const stock =
              p.variants?.[0]?.stock ??
              p.warehouseInventoryNum ??
              undefined;
            entry.inventory = typeof stock === "number" ? stock : undefined;
          }

          // VID/PID mapping sync
          if (mode === "full") {
            if (p.variants?.length > 0) {
              entry.vid = p.variants[0].vid;
            } else if (p.vid) {
              entry.vid = p.vid;
            }
            entry.pid = p.pid || undefined;
          }

          results.push(entry);
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
      mode,
      synced: results.filter((r) => r.status === "synced").length,
      notFound: results.filter((r) => r.status === "not_found").length,
      errors: results.filter((r) => r.status === "error").length,
      total: toSync.length,
      products: results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Sync failed" },
      { status: 500 }
    );
  }
}

