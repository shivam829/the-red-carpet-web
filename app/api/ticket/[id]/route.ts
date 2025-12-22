export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // ⛔ Do NOT fight mongoose typings
    const booking: any = await Booking.findById(params.id).lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Ticket not found" },
        { status: 404 }
      );
    }

    // 🔐 Guaranteed values
    const amount = Number(booking.amount || 0);

    // 🔥 Fallback logic for old bookings
    let baseAmount = Number(booking.baseAmount || 0);
    let bookingFee = Number(booking.bookingFee || 0);

    if (baseAmount === 0 && booking.quantity && amount > 0) {
      // Derive base & fee safely from final amount
      baseAmount = Math.round(amount / 1.03);
      bookingFee = amount - baseAmount;
    }

    return NextResponse.json({
      success: true,
      ticket: {
        _id: booking._id?.toString(),
        name: booking.name,
        passName: booking.passName,
        quantity: booking.quantity,
        reference: booking.reference,
        status: booking.status,

        // 💰 PAYMENT BREAKDOWN (ALWAYS FILLED)
        baseAmount,
        bookingFee,
        amount,

        qrCode: booking.qrCode,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error("Ticket fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load ticket" },
      { status: 500 }
    );
  }
}
