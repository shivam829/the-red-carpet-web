import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();

  const { phone, otp } = await req.json();

  const user = await User.findOne({
    phone,
    otp,
    otpExpires: { $gt: new Date() }
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
