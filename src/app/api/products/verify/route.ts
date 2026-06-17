import { NextRequest, NextResponse } from "next/server";
import { verifyCJProducts } from "@/lib/sourcing";

export async function POST(req: NextRequest) {
  try {
    const { skus } = await req.json();

    if (!Array.isArray(skus) || skus.length === 0) {
      return NextResponse.json(
        { success: false, message: "skus array required" },
        { status: 400 }
      );
    }

    const results = await verifyCJProducts(skus);
    return NextResponse.json({ success: true, data: results });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
