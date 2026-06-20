import { NextRequest, NextResponse } from "next/server";
import {
  parseCJWebhookEvent,
  verifyCJWebhookSignature,
  type CJWebhookPayload,
} from "@/lib/sourcing";
import { addWebhookEvent, getWebhookEvents } from "@/lib/webhook-store";

/**
 * POST /api/cj/webhook
 *
 * Receives real-time shipping and inventory updates from CJ Dropshipping.
 * Configure this URL in CJ's developer dashboard under Webhook Settings:
 *   https://<your-domain>/api/cj/webhook
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const secret = process.env.CJ_WEBHOOK_SECRET || "";

    // --- Signature verification (if secret is configured) ---
    if (secret) {
      const signature =
        req.headers.get("x-cj-signature") ||
        req.headers.get("x-signature") ||
        null;
      if (!verifyCJWebhookSignature(rawBody, signature, secret)) {
        console.warn("[CJ Webhook] Invalid signature — rejecting payload");
        return NextResponse.json(
          { success: false, message: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    // --- Parse the event ---
    let body: Record<string, any>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON" },
        { status: 400 }
      );
    }

    const event = parseCJWebhookEvent(body);

    // --- Store the event (persistent file-based) ---
    addWebhookEvent(event);

    // --- Log for observability ---
    console.log(
      `[CJ Webhook] ${event.event} | order=${event.orderId || "n/a"} | status=${event.orderStatus || "n/a"} | tracking=${event.trackingNumber || "n/a"} | sku=${event.sku || "n/a"} | inv=${event.inventory ?? "n/a"}`
    );

    // --- Handle specific event types ---
    handleEvent(event);

    // CJ expects a 200 response quickly — always acknowledge receipt
    return NextResponse.json({
      success: true,
      message: "Event received",
      event: event.event,
    });
  } catch (err: any) {
    console.error("[CJ Webhook] Error:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cj/webhook
 *
 * Returns recent webhook events — used by the orders page to display
 * real-time shipping and inventory updates.
 */
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50", 10);

  const events = getWebhookEvents(orderId, limit);

  return NextResponse.json({
    success: true,
    count: events.length,
    events,
  });
}

// ---------------------------------------------------------------------------
// Event handler — route events to the appropriate logic
// ---------------------------------------------------------------------------
function handleEvent(event: CJWebhookPayload) {
  const eventType = event.event.toLowerCase();

  // Order status changes (shipped, delivered, cancelled, etc.)
  if (
    eventType.includes("order") ||
    eventType.includes("status") ||
    eventType.includes("shipping") ||
    eventType.includes("tracking")
  ) {
    handleOrderUpdate(event);
  }

  // Inventory / stock changes
  if (
    eventType.includes("inventory") ||
    eventType.includes("stock") ||
    eventType.includes("product")
  ) {
    handleInventoryUpdate(event);
  }
}

function handleOrderUpdate(event: CJWebhookPayload) {
  // In a database-backed setup, you would update the order record here:
  //   await db.orders.update({ cjOrderId: event.orderId }, {
  //     status: event.orderStatus,
  //     trackingNumber: event.trackingNumber,
  //     trackingUrl: event.trackingUrl,
  //   });
  //
  // For now, the event is stored in-memory and logged.
  // The orders page can query GET /api/cj/webhook?orderId=XXX
  // to retrieve the latest status for a specific order.

  if (event.trackingNumber) {
    console.log(
      `[CJ Webhook] Tracking update: ${event.trackingNumber} via ${event.logisticName || "unknown carrier"}`
    );
  }
}

function handleInventoryUpdate(event: CJWebhookPayload) {
  // In a database-backed setup, update product inventory:
  //   await db.products.update({ cjVariantId: event.variantId }, {
  //     inventory: event.inventory,
  //   });

  if (event.sku && event.inventory !== undefined) {
    console.log(
      `[CJ Webhook] Inventory update: ${event.sku} -> ${event.inventory} units`
    );
  }
}
