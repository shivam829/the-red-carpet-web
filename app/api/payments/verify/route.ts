import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { generateQR } from "@/lib/generateQR";
import { sendEmail } from "@/lib/sendEmail";
import { ticketEmailTemplate } from "@/lib/ticketEmailTemplate";

export async function POST(req: Request) {
  try {
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
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    const qrCode = await generateQR(
      JSON.stringify({
        bookingId: booking._id.toString(),
        paymentId: razorpay_payment_id,
      })
    );

    booking.status = "PAID";
    booking.paymentId = razorpay_payment_id;
    booking.orderId = razorpay_order_id;
    booking.qrCode = qrCode;
    await booking.save();

    await sendEmail(
      booking.email,
      "🎟 Your Red Carpet Ticket",
      ticketEmailTemplate({
        name: booking.name,
        passName: booking.passName,
        qrCode,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
