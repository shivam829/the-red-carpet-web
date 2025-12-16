export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import BookingModel from "@/models/Booking";
import QRCode from "qrcode";
import { generateTicketPDF } from "@/lib/generateTicketPDF";
// NOTE: sendEmail & sendWhatsApp are intentionally NOT used
// because env variables are not configured yet

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Avoid Mongoose + TS overload issues
    const Booking = BookingModel as any;

    const {
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await req.json();

    /* ------------------ BASIC VALIDATION ------------------ */

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

    /* ------------------ VERIFY RAZORPAY SIGNATURE ------------------ */

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ------------------ FETCH BOOKING ------------------ */

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    /* ------------------ GENERATE QR CODE ------------------ */

    const qrPayload = JSON.stringify({
      bookingId: booking._id.toString(),
      reference: booking.reference,
    });

    const qrCode = await QRCode.toDataURL(qrPayload);

    /* ------------------ MARK BOOKING AS PAID ------------------ */

    booking.status = "PAID";
    booking.paymentId = razorpay_payment_id;
    booking.qrCode = qrCode;

    await booking.save();

    /* ------------------ OPTIONAL: PDF GENERATION (NO EMAIL SEND) ------------------ */
    // This is safe to keep for future use / testing
    try {
      await generateTicketPDF({
        name: booking.name,
        passName: booking.passName,
        quantity: booking.quantity,
        amount: booking.amount,
        reference: booking.reference,
      });
    } catch (err) {
      console.error("PDF GENERATION FAILED (IGNORED):", err);
      // ❗ Do NOT fail payment
    }

    /* ------------------ FINAL RESPONSE ------------------ */

    return NextResponse.json({
      success: true,
      message: "Payment verified and booking confirmed",
    });
  } catch (err: any) {
    console.error("VERIFY ROUTE FAILED:", err);

    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
