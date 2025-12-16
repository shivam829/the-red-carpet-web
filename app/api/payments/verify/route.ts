import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
    } = await req.json();

    // ✅ Validate input
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    // ✅ Update booking
    await Booking.findByIdAndUpdate(
      bookingId as any,
      {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
