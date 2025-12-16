import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();

  const bookings = await Booking.find()
  .where("status").equals("PAID")
  .sort({ createdAt: -1 })
  .lean();


  return NextResponse.json(bookings);
}
