import { NextRequest, NextResponse } from "next/server";
import { getCJOrderStatus } from "@/lib/sourcing";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { success: false, message: "orderId query param required" },
      { status: 400 }
    );
  }

  const result = await getCJOrderStatus(orderId);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, data: result });
}
