export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";
import QRCode from "qrcode";
import { generateTicketPDF } from "@/lib/generateTicketPDF";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const Booking = BookingModel as any;
    const User = UserModel as any;

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

    /* ------------------ ASSOCIATE WITH USER ------------------ */

    // Get user from auth token (if logged in)
    try {
      const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];
      
      if (token) {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        
        const user = await User.findById(decoded.userId);
        
        if (user) {
          // Update booking with userId
          booking.userId = user._id;
          await booking.save();
          
          // Add booking to user's bookings array
          if (!user.bookings.includes(booking._id)) {
            user.bookings.push(booking._id);
            await user.save();
          }
        }
      }
    } catch (err) {
      console.log("Could not associate with user (user might not be logged in)");
    }

    // Also try to find/create user by phone (backward compatibility)
    let phoneUser = await User.findOne({ phone: booking.phone });

    if (phoneUser) {
      if (!phoneUser.bookings.includes(booking._id)) {
        phoneUser.bookings.push(booking._id);
        await phoneUser.save();
      }
    }

    /* ------------------ OPTIONAL: PDF GENERATION ------------------ */
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