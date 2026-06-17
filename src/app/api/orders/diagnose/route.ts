import { NextResponse } from "next/server";
import { diagnoseCJConnection, verifyCJProducts } from "@/lib/sourcing";

export async function GET() {
  const diag = await diagnoseCJConnection();

  // If token works, try verifying some known SKUs
  let productCheck = null;
  if (diag.tokenOk) {
    const testSkus = [
      "CJSJ1601466",
      "CJSN1852848",
      "CJJX2389472",
      "CJJT1790763",
    ];
    productCheck = await verifyCJProducts(testSkus);
  }

  return NextResponse.json({
    ...diag,
    productCheck,
    tip: diag.success
      ? "CJ API is working. Orders should flow through."
      : "CJ API connection has issues. Check the rawResponse for details.",
  });
}
