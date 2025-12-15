import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    await connectDB();

    const booking = await Booking.findById(bookingId).exec();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Invalid ticket" },
        { status: 404 }
      );
    }

    if (booking.status !== "PAID") {
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        { success: false, message: "Ticket already used" },
        { status: 409 }
      );
    }

    booking.checkedIn = true;
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Entry allowed",
      passName: booking.passName,
      name: booking.name,
    });

  } catch (error) {
    console.error("QR scan error:", error);
    return NextResponse.json(
      { success: false, message: "Scan failed" },
      { status: 500 }
    );
  }
}
