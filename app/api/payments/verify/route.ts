export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";
import QRCode from "qrcode";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await req.json();

    /* ---------- BASIC VALIDATION ---------- */
    if (
      !bookingId ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, message: "Missing payment fields" },
        { status: 400 }
      );
    }

    /* ---------- OBJECT ID SAFETY ---------- */
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return NextResponse.json(
        { success: false, message: "Invalid booking ID" },
        { status: 400 }
      );
    }

    /* ---------- ENV SAFETY (CRITICAL) ---------- */
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY_KEY_SECRET is missing");
      return NextResponse.json(
        { success: false, message: "Payment configuration error" },
        { status: 500 }
      );
    }

    /* ---------- FETCH BOOKING ---------- */
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    /* ---------- VERIFY SIGNATURE ---------- */
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ---------- IDEMPOTENCY ---------- */
    if (booking.status === "PAID") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
      });
    }

    /* ---------- MARK AS PAID ---------- */
    booking.status = "PAID";
    booking.paymentId = razorpay_payment_id;
    booking.orderId = razorpay_order_id;
    booking.paidAt = new Date();

    /* ---------- QR (NON-BLOCKING) ---------- */
    try {
      const qrPayload = JSON.stringify({
        bookingId: booking._id.toString(),
        reference: booking.reference,
      });
      booking.qrCode = await QRCode.toDataURL(qrPayload);
    } catch (qrErr) {
      console.error("QR generation failed (ignored):", qrErr);
    }

    /* ---------- USER LINKING (NON-BLOCKING) ---------- */
    try {
      const token = cookies().get("auth_token")?.value;
      if (token) {
        const payload = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        const user = await User.findById(payload.userId);
        if (user && !user.bookings.includes(booking._id)) {
          booking.userId = user._id;
          user.bookings.push(booking._id);
          await user.save();
        }
      }
    } catch (userErr) {
      console.error("User linking failed (ignored):", userErr);
    }

    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error("VERIFY ROUTE FATAL ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
