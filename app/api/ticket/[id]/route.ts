import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import BookingModel from "@/models/Booking";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // ✅ Cast model to avoid TS union overload issue
    const Booking = BookingModel as any;

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
