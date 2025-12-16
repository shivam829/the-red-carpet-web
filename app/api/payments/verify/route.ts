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

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false },
        { status: 404 }
      );
    }

    booking.status = "PAID";
    booking.razorpayPaymentId = razorpay_payment_id;

    booking.qrData = JSON.stringify({
      bookingId: booking._id,
      reference: booking.reference,
    });

    await booking.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
