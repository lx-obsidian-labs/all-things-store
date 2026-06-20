import { NextRequest, NextResponse } from "next/server";
import { createCJOrder } from "@/lib/sourcing";
import { getOrder, updateOrder } from "@/lib/order-store";

export async function POST(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderNumber, retry = false } = body;

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, message: "orderNumber is required" },
        { status: 400 }
      );
    }

    const order = getOrder(orderNumber);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Skip if already forwarded
    if (order.status === "forwarded" && !retry) {
      return NextResponse.json({
        success: true,
        message: "Order already forwarded",
        alreadyProcessed: true,
      });
    }

    // Skip if max retries exceeded
    if (order.retryCount >= 3 && !retry) {
      return NextResponse.json(
        { success: false, message: "Max retries exceeded" },
        { status: 429 }
      );
    }

    // Update retry count
    if (retry) {
      // This will be handled by the order store
    }

    // Prepare CJ order params
    const logisticName = order.shippingMethod || "CJ Registered Air Mail";
    
    const cjParams = {
      orderNumber: order.orderNumber,
      shippingCountry: order.shippingAddress.country,
      shippingProvince: order.shippingAddress.province || order.shippingAddress.city,
      shippingCity: order.shippingAddress.city,
      shippingPhone: order.shippingAddress.phone || "",
      shippingCustomerName: order.shippingAddress.name,
      shippingAddress: order.shippingAddress.address,
      shippingAddress2: order.shippingAddress.address2 || "",
      shippingZip: order.shippingAddress.postalCode || "",
      email: order.email,
      remark: "",
      logisticName,
      products: order.items.map((item) => ({
        sku: item.sku || "",
        quantity: item.quantity,
        unitPrice: item.costPrice || 0,
        vid: item.vid,
      })),
      isSandbox: false,
      storeName: process.env.CJ_STORE_NAME || "All Things Store",
    };

    // Submit to CJ
    const result = await createCJOrder(cjParams);

    if (!result.success) {
      // Update local order as failed
      updateOrder(orderNumber, {
        status: "failed",
        cjError: result.message,
      });
      
      return NextResponse.json(
        { success: false, message: result.message, data: result },
        { status: 502 }
      );
    }

    // Update local order with CJ response
    updateOrder(orderNumber, {
      status: "forwarded",
      cjOrderId: result.cjOrderId,
      cjOrderNumber: result.cjOrderNumber,
      cjStatus: result.orderStatus,
      cjPayUrl: result.cjPayUrl,
      usedBalancePayment: result.usedBalancePayment,
      cjError: undefined,
    });

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
    console.error("[Process Order] Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}