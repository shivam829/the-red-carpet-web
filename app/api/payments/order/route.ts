// FILE: app/api/payments/order/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Pass from "@/models/Pass";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { passId, name, email, phone, quantity } = await req.json();

    if (!passId || !name || !email || !phone || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pass = await Pass.findById(passId);
    if (!pass) {
      return NextResponse.json({ error: "Pass not found" }, { status: 404 });
    }

    const totalAmount = pass.price * quantity;

    /* ------------------ GET USER FROM COOKIE ------------------ */
    let userId: any = undefined;

    try {
      const token = cookies().get("auth_token")?.value;
      if (token) {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded.userId;
      }
    } catch {
      userId = undefined;
    }

    /* ------------------ CREATE BOOKING ------------------ */
    const booking = await Booking.create({
      userId, // ✅ FIX
      passId: pass._id,
      passName: pass.name,
      name,
      email,
      phone,
      quantity,
      amount: totalAmount,
      status: "PENDING",
      reference: crypto.randomBytes(6).toString("hex").toUpperCase(),
    });

    /* ------------------ CREATE RAZORPAY ORDER ------------------ */
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
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
