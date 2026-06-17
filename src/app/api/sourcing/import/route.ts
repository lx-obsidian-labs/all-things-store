import { NextRequest, NextResponse } from "next/server";
import type { ExtractedProduct } from "@/lib/sourcing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products: ExtractedProduct[] = body.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one product is required" },
        { status: 400 }
      );
    }

    const imported = products.map((p, i) => {
      const slug = p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 80);

      const now = new Date().toISOString().split("T")[0];

      return {
        id: `imported-${Date.now()}-${i}`,
        slug,
        name: p.title,
        description: p.description.slice(0, 160),
        longDescription: p.description,
        price: Math.round(p.price * 2.5 * 100) / 100,
        compareAtPrice: p.compareAtPrice
          ? Math.round(p.compareAtPrice * 2.5 * 100) / 100
          : undefined,
        category: p.category,
        tags: p.tags,
        image: p.image,
        images: p.images,
        featured: false,
        rating: undefined,
        reviewCount: 0,
        createdAt: now,
        status: "live",
        supplier: {
          source: p.supplier.source,
          sku: p.supplier.sku,
          costPrice: p.supplier.costPrice,
          shippingDays: p.supplier.shippingDays,
          notes: "Imported via sourcing tool — verify sample before listing",
        },
      };
    });

    return NextResponse.json({
      success: true,
      imported,
      count: imported.length,
      message: `${imported.length} product(s) extracted. Review and confirm to add to your catalog.`,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to import products" },
      { status: 500 }
    );
  }
}
