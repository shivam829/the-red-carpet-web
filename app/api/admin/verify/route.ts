import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    verifyAdmin();
    await dbConnect();

    const { reference }: { reference: string } = await req.json();

    if (!reference) {
      return NextResponse.json({
        success: false,
        status: "INVALID",
        message: "Reference required",
      });
    }

    // ✅ NO lean() → real Mongoose document
    const booking = await Booking.findOne({ reference });

    if (!booking) {
      return NextResponse.json({
        success: false,
        status: "INVALID",
        message: "Invalid ticket",
      });
    }

    if (booking.isUsed) {
      return NextResponse.json({
        success: false,
        status: "USED",
        message: "Ticket already used",
        booking,
      });
    }

    booking.isUsed = true;
    booking.usedAt = new Date();
    await booking.save();

    return NextResponse.json({
      success: true,
      status: "VALID",
      message: "Entry verified",
      booking,
    });
  } catch (err) {
    console.error("ADMIN VERIFY ERROR:", err);
    return NextResponse.json({
      success: false,
      status: "INVALID",
      message: "Unauthorized",
    });
  }
}
