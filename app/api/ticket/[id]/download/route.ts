export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import BookingModel from "@/models/Booking";
import QRCode from "qrcode";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const Booking = BookingModel as any;

    const booking = await Booking.findById(params.id);
    if (!booking || booking.status !== "PAID") {
      return NextResponse.json(
        { success: false, message: "Ticket not found or unpaid" },
        { status: 404 }
      );
    }

    // Fallback QR generation (for older bookings)
    if (!booking.qrCode) {
      booking.qrCode = await QRCode.toDataURL(
        JSON.stringify({
          bookingId: booking._id.toString(),
          reference: booking.reference,
        })
      );
      await booking.save();
    }

    return NextResponse.json({
      success: true,
      ticket: {
        name: booking.name,
        passName: booking.passName,
        quantity: booking.quantity,
        reference: booking.reference,
        qrCode: booking.qrCode,
      },
    });
  } catch (err) {
    console.error("FETCH TICKET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load ticket" },
      { status: 500 }
    );
  }
}
