import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";
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
    const { captureId } = await req.json();

    if (!captureId) {
      return NextResponse.json({ success: false, message: "Missing captureId" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const refundRes = await fetch(`${PAYPAL_API}/v2/payments/captures/${captureId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const refundData = await refundRes.json();

    if (!refundRes.ok) {
      return NextResponse.json(
        { success: false, message: refundData.message || "Refund failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: refundData.status === "COMPLETED",
      status: refundData.status,
      refundId: refundData.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
