import { NextRequest, NextResponse } from "next/server";
import { retryCJOrderPayment } from "@/lib/sourcing";

export async function POST(req: NextRequest) {
  try {
    const { orderNumber } = await req.json();

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, message: "orderNumber required" },
        { status: 400 }
      );
    }

    const result = await retryCJOrderPayment(orderNumber);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
