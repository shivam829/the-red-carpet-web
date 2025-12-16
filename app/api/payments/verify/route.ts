import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import QRCode from "qrcode";
import { sendEmail } from "@/lib/sendEmail";
import sendWhatsApp from "@/lib/sendWhatsApp";
import { generateTicketPDF } from "@/lib/generateTicketPDF";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await req.json();

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

    // ✅ Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

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

    // ✅ Fetch booking (correct usage)
    const booking = await Booking.findOne(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // ✅ Generate QR payload
    const qrPayload = JSON.stringify({
      bookingId: booking._id.toString(),
      reference: booking.reference,
    });

    const qrCode = await QRCode.toDataURL(qrPayload);

    // ✅ Update booking
    booking.status = "PAID";
    booking.paymentId = razorpay_payment_id;
    booking.qrCode = qrCode;
    await booking.save();

    // ✅ Generate PDF ticket
    const pdfBuffer = await generateTicketPDF({
      name: booking.name,
      passName: booking.passName,
      quantity: booking.quantity,
      amount: booking.amount,
      reference: booking.reference,
    });

    // ✅ Send email
    await sendEmail(
      booking.email,
      "🎟 Your Red Carpet NYE Ticket",
      `
        <h2>Thank you for booking, ${booking.name}! 🥂</h2>
        <p>Your New Year’s Eve pass is confirmed.</p>
        <p><b>Reference:</b> ${booking.reference}</p>
        <p>Please find your ticket attached.</p>
        <p>✨ See you on the red carpet ✨</p>
      `,
      pdfBuffer
    );

    // ✅ Send WhatsApp (TYPE-SAFE)
    await sendWhatsApp({
      phone: booking.phone,
      message: `🎟 Your Red Carpet Ticket Confirmed!

Name: ${booking.name}
Reference: ${booking.reference}

See you at the event ✨`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
