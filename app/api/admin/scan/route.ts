import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Invalid QR" },
        { status: 400 }
      );
    }

    const booking = await Booking.findOne(bookingId);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Ticket not found" },
        { status: 404 }
      );
    }

    if (booking.status !== "PAID") {
      return NextResponse.json(
        { success: false, message: "Ticket unpaid" },
        { status: 400 }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        { success: false, message: "Already checked in" },
        { status: 409 }
      );
    }

    booking.checkedIn = true;
    await booking.save();

    return NextResponse.json({
      success: true,
      name: booking.name,
      reference: booking.reference,
      pass: booking.passName,
      quantity: booking.quantity,
    });
  } catch (err) {
    console.error("SCAN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Scan failed" },
      { status: 500 }
    );
  }
}
