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
    const { amount, currency } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "USD",
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json(
        { success: false, message: orderData.message || "Failed to create PayPal order" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, orderID: orderData.id });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
