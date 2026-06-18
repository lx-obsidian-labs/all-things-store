import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { reviewRequestEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { email, name, orderNumber, productName, productUrl } = await req.json();

    if (!email || !orderNumber || !productName || !productUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "All Things <onboarding@resend.dev>",
      to: email,
      subject: `How's your ${productName}? Share your review`,
      html: reviewRequestEmail({ name: name || "", orderNumber, productName, productUrl }),
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
