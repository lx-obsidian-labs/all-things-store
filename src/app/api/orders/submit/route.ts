import { NextRequest, NextResponse } from "next/server";
import { createCJOrder } from "@/lib/sourcing";

const LOGISTICS_MAP: Record<string, string> = {
  standard: "CJ Registered Air Mail",
  express: "CJ Express",
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
        { success: false, message: result.message, data: result },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        cjOrderId: result.cjOrderId,
        cjOrderNumber: result.cjOrderNumber,
        orderAmount: result.orderAmount,
        postageAmount: result.postageAmount,
        orderStatus: result.orderStatus,
        usedBalancePayment: result.usedBalancePayment,
        cjPayUrl: result.cjPayUrl,
        message: result.message,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
