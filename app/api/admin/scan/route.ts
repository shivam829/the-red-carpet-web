import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BookingModel from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const Booking = BookingModel as any;

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { message: "Missing booking ID" },
        { status: 400 }
      );
    }

    // ✅ FIX 1: correct query
    const booking = await Booking.findById(bookingId);

    if (!booking || booking.status !== "PAID") {
      return NextResponse.json(
        { message: "Invalid or unpaid ticket" },
        { status: 400 }
      );
    }

    // ✅ FIX 2: correct field
    if (booking.isUsed) {
      return NextResponse.json(
        { message: "Ticket already used" },
        { status: 409 }
      );
    }

    // ✅ Mark ticket as used
    booking.isUsed = true;
    booking.usedAt = new Date();
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Entry Allowed",
      name: booking.name,
      pass: booking.passName,
      quantity: booking.quantity,
      reference: booking.reference,
    });
  } catch (err) {
    console.error("SCAN ERROR:", err);
    return NextResponse.json(
      { message: "Scan failed" },
      { status: 500 }
    );
  }
}
