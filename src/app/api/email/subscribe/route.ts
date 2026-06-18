import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Add contact to Resend audience (creates audience if it doesn't exist)
    try {
      await resend.contacts.create({
        email,
        firstName: name || "",
        audienceId: "all-things-subscribers",
        unsubscribed: false,
      });
    } catch {
      // Audience may not exist yet — try creating it
      try {
        await resend.audiences.create({ name: "All Things Subscribers" });
        await new Promise((r) => setTimeout(r, 500));
        await resend.contacts.create({
          email,
          firstName: name || "",
          audienceId: "all-things-subscribers",
          unsubscribed: false,
        });
      } catch {
        // Contact storage is best-effort
      }
    }

    // Send welcome email
    const { error } = await resend.emails.send({
      from: "All Things <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to All Things!",
      html: welcomeEmail(name || ""),
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
