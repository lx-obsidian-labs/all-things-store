import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/sourcing";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { success: false, error: "Search query is required" },
        { status: 400 }
      );
    }

    const results = await searchProducts(query);

    return NextResponse.json({ success: true, products: results });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to search products" },
      { status: 500 }
    );
  }
}
