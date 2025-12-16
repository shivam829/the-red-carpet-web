import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/adminAuth";


export async function POST(req: Request) {
  verifyAdmin(req);

  try {
    await dbConnect();

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { message: "Invalid QR" },
        { status: 400 }
      );
    }

    const booking = await Booking.findOne(bookingId);

    if (!booking) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    if (booking.status !== "PAID") {
      return NextResponse.json(
        { message: "Ticket not paid" },
        { status: 400 }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        { message: "❌ Already used" },
        { status: 400 }
      );
    }

    // ✅ Mark entry
    booking.checkedIn = true;
    booking.checkedInAt = new Date();
    await booking.save();

    return NextResponse.json({
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
