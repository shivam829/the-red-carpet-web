import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    verifyAdmin();
    await dbConnect();

    const { reference } = await req.json();
    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findOne({ reference });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Invalid pass" },
        { status: 404 }
      );
    }

    if (booking.isUsed) {
      return NextResponse.json(
        { success: false, message: "Pass already used" },
        { status: 409 }
      );
    }

    booking.isUsed = true;
    booking.usedAt = new Date();
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Pass verified successfully",
      booking,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
