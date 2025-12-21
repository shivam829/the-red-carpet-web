export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { bookingId }: { bookingId: string } = await req.json();

    const booking = await Booking.findById(bookingId).exec();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Invalid ticket" },
        { status: 404 }
      );
    }

    if (booking.isUsed) {
      return NextResponse.json(
        { success: false, message: "Ticket already used" },
        { status: 400 }
      );
    }

    booking.isUsed = true;
    booking.usedAt = new Date();
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Entry allowed",
      booking,
    });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json(
      { success: false, message: "Scan failed" },
      { status: 500 }
    );
  }
}
