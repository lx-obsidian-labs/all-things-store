import { NextRequest, NextResponse } from "next/server";
import { extractFromUrl } from "@/lib/sourcing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await extractFromUrl(url);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to extract product data" },
      { status: 500 }
    );
  }
}
