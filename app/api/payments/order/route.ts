export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Pass from "@/models/Pass";

const BOOKING_FEE_PERCENT = 0.03;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { passId, name, email, phone, quantity } = await req.json();

    if (!passId || !name || !email || !phone || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const pass = await Pass.findById(passId);
    if (!pass) {
      return NextResponse.json({ error: "Pass not found" }, { status: 404 });
    }

    const baseAmount = pass.price * quantity;
    const bookingFee = Math.round(baseAmount * BOOKING_FEE_PERCENT);
    const finalAmount = baseAmount + bookingFee;

    let userId: string | undefined;
    try {
      const token = cookies().get("auth_token")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        userId = decoded.userId;
      }
    } catch {}

    const booking = await Booking.create({
      userId,
      passId: pass._id,
      passName: pass.name,
      name,
      email,
      phone,
      quantity,
      amount: finalAmount,
      bookingFee,
      baseAmount,
      status: "PENDING",
      reference: crypto.randomBytes(6).toString("hex").toUpperCase(),
    });

    const order = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    });

    booking.razorpayOrderId = order.id;
    await booking.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      bookingId: booking._id,
      currency: "INR",
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
