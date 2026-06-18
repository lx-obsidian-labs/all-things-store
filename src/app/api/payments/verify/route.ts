import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const PAYSTACK_API = "https://api.paystack.co";

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ success: false, message: "Missing reference" }, { status: 400 });
    }

    const res = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, message: data.message ?? "Verification failed" },
        { status: 502 },
      );
    }

    const tx = data.data;
    const verified =
      tx.status === "success" && tx.gateway_response === "Successful";

    return NextResponse.json({
      success: verified,
      reference: tx.reference,
      amount: tx.amount / 100,
      currency: tx.currency,
      status: tx.status,
      gatewayResponse: tx.gateway_response,
      paidAt: tx.paid_at,
      channel: tx.channel,
      cardType: tx.authorization?.card_type ?? null,
      last4: tx.authorization?.last4 ?? null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}
