export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const token = cookies().get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const bookings = await Booking.find({
      userId: decoded.userId,
      status: "PAID",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("FETCH BOOKINGS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
