export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Booking from "@/models/Booking";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();
    
    const user = await User.findById(decoded.userId).populate("bookings");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Get all bookings for this user
    const bookings = await Booking.find({ phone: user.phone })
      .where("status").equals("PAID")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error: any) {
    console.error("FETCH BOOKINGS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}