export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    key: process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing",
    secret: process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing",
  });
}
