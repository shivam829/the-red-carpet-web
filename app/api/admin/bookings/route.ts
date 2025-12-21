import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    verifyAdmin();
    await dbConnect();

    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
