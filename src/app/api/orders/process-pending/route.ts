import { NextRequest, NextResponse } from "next/server";
import { getPendingOrders } from "@/lib/order-store";
import { enqueueProcessOrder } from "@/lib/queue";

export async function POST(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const pendingOrders = getPendingOrders();
    
    if (pendingOrders.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending orders to process",
        count: 0,
      });
    }

    // Enqueue each pending order for processing
    const enqueued = [];
    for (const order of pendingOrders) {
      await enqueueProcessOrder({
        orderNumber: order.orderNumber,
        retry: order.status === "failed",
      });
      enqueued.push(order.orderNumber);
    }

    return NextResponse.json({
      success: true,
      message: `Enqueued ${enqueued.length} orders for processing`,
      orders: enqueued,
    });
  } catch (err: any) {
    console.error("[Process Pending Orders] Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal error" },
      { status: 500 }
    );
  }
}