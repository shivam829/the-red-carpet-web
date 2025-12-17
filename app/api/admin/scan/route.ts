import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  await dbConnect();
  const { bookingId } = await req.json();

  const booking = await Booking.findOne(bookingId);

  if (!booking || booking.status !== "PAID")
    return NextResponse.json({ message: "Invalid ticket" }, { status: 400 });

  if (booking.isUsed)
    return NextResponse.json({ message: "Already scanned" }, { status: 409 });

  booking.isUsed = true;
  booking.usedAt = new Date();
  await booking.save();

  return NextResponse.json({ message: "Entry Allowed", booking });
}
