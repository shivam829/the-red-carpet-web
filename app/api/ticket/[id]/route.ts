import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import QRCode from "qrcode";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const booking = await Booking.findOne({ _id: params.id })
      .populate("pass")
      .lean();

    if (!booking || booking.status !== "PAID") {
      return NextResponse.json(
        { error: "Invalid or unpaid ticket" },
        { status: 404 }
      );
    }

    const qrCode = await QRCode.toDataURL(booking.qrData);

    return NextResponse.json({
      name: booking.name,
      passName: booking.pass.name,
      quantity: booking.quantity,
      amount: booking.amount,
      reference: booking.reference,
      qrCode,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
