import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.paypal.com";
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ success: false, message: "Missing orderID" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const captureData = await captureRes.json();

    if (!captureRes.ok) {
      return NextResponse.json(
        { success: false, message: captureData.message || "Failed to capture PayPal order" },
        { status: 502 }
      );
    }

    const status = captureData.status;
    const captureId =
      captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

    return NextResponse.json({
      success: status === "COMPLETED",
      status,
      captureId,
      payerEmail: captureData.payer?.email_address || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
