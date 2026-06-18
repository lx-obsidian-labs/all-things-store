import { NextRequest, NextResponse } from "next/server";
import { generateReference } from "@/lib/paystack";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const PAYSTACK_API = "https://api.paystack.co";

export async function POST(req: NextRequest) {
  try {
    const { email, amount } = await req.json();

    if (!email || !amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid email or amount" }, { status: 400 });
    }

    const reference = generateReference();

    const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        currency: "ZAR",
        reference,
        channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, message: data.message ?? "Paystack initialization failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}
