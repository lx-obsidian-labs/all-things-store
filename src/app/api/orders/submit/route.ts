import { NextRequest, NextResponse } from "next/server";
import { createCJOrder } from "@/lib/sourcing";
import { createOrder, getOrder, updateOrder, type LocalOrder } from "@/lib/order-store";

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
      // For idempotent retry - if order already exists, use stored data
      retry = false,
    } = body;

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, message: "orderNumber is required" },
        { status: 400 }
      );
    }

    // Check if order already exists (idempotency)
    const existingOrder = getOrder(orderNumber);
    if (existingOrder) {
      // If retry flag is set and order is in failed/pending state, allow retry
      if (retry && (existingOrder.status === "failed" || existingOrder.status === "pending_cj")) {
        // Continue to process
      } else {
        // Return existing order data
        return NextResponse.json({
          success: true,
          data: {
            cjOrderId: existingOrder.cjOrderId,
            cjOrderNumber: existingOrder.cjOrderNumber,
            orderAmount: existingOrder.total,
            postageAmount: existingOrder.shipping,
            orderStatus: existingOrder.cjStatus,
            usedBalancePayment: existingOrder.usedBalancePayment,
            cjPayUrl: existingOrder.cjPayUrl,
            message: existingOrder.cjError || "Order already processed",
          },
          alreadyProcessed: true,
        });
      }
    }

    // For new orders or retries, validate required fields
    if (!shippingCountry || !shippingCity || !shippingCustomerName || !shippingAddress || !products?.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields for new order" },
        { status: 400 }
      );
    }

    const logisticName = LOGISTICS_MAP[shippingMethod as string] || "CJPacket";

    // Prepare CJ order params
    const cjParams = {
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
      storeName: process.env.CJ_STORE_NAME || "All Things Store",
    };

    // Create local order record first (for new orders)
    if (!existingOrder) {
      const localOrder: LocalOrder = {
        id: orderNumber,
        orderNumber,
        status: "pending_cj",
        items: products.map((p: any) => ({
          id: p.sku,
          name: p.name || p.sku,
          price: p.unitPrice || 0,
          quantity: p.quantity,
          image: "",
          sku: p.sku,
          vid: p.vid,
          costPrice: p.unitPrice,
        })),
        subtotal: products.reduce((sum: number, p: any) => sum + (p.unitPrice || 0) * p.quantity, 0),
        shipping: 0, // Will be calculated
        shippingMethod: logisticName,
        total: products.reduce((sum: number, p: any) => sum + (p.unitPrice || 0) * p.quantity, 0),
        email,
        shippingAddress: {
          name: shippingCustomerName,
          phone: shippingPhone,
          address: shippingAddress,
          address2: shippingAddress2,
          city: shippingCity,
          province: shippingProvince,
          country: shippingCountry,
          postalCode: shippingZip,
        },
        paymentMethod: "paypal",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
      };
      createOrder(localOrder);
    }

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
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}