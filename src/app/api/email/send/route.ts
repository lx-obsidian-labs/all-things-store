import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, from } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    const fromAddress = from || "All Things <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
