import { NextRequest, NextResponse } from "next/server";
import { createCJOrder } from "@/lib/sourcing";

const LOGISTICS_MAP: Record<string, string> = {
  standard: "CJPacket",
  express: "CJPacket Fast Line",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderNumber,
      shippingCountry,
      shippingProvince,
      shippingCity,
      shippingPhone,
      shippingCustomerName,
      shippingAddress,
      shippingAddress2,
      shippingZip,
      email,
      remark,
      shippingMethod,
      products,
      isSandbox,
    } = body;

    if (!orderNumber || !shippingCountry || !shippingCity || !shippingCustomerName || !shippingAddress || !products?.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const logisticName =
      LOGISTICS_MAP[shippingMethod as string] || "CJPacket";

    const result = await createCJOrder({
      orderNumber,
      shippingCountry,
      shippingProvince,
      shippingCity,
      shippingPhone,
      shippingCustomerName,
      shippingAddress,
      shippingAddress2,
      shippingZip,
      email,
      remark,
      logisticName,
      products,
      isSandbox: isSandbox === true,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
