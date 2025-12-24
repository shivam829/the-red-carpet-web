import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { phone, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { phone },
    { password: hashed, otp: null, otpExpires: null }
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
