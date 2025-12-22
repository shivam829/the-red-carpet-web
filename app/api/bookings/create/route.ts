import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(req: Request) {
  try {
    // ✅ MUST pass request to verifyAdmin
    await verifyAdmin(req);

    await connectDB();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error("ADMIN BOOKINGS ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
