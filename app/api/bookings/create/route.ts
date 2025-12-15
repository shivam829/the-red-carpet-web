import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const booking = await Booking.create({
    name: body.name,
    phone: body.phone,
    email: body.email,
    passName: body.passName,
    phase: body.phase,
    price: body.price,
  });

  return NextResponse.json(booking);
}
