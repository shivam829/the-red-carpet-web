export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(_: Request, { params }: any) {
  await connectDB();
  const booking = await Booking.findOne(params.id);
  return NextResponse.json(booking);
}
