export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { generateReceiptPDF } from "@/lib/generateReceiptPDF";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const booking: any = await Booking.findById(params.id).lean();

  if (!booking || booking.status !== "PAID") {
    return NextResponse.json(
      { message: "Receipt not available" },
      { status: 404 }
    );
  }

  const pdfBuffer = await generateReceiptPDF(booking);

  return new Response(pdfBuffer, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=Receipt-${booking.reference}.pdf`,
    "Content-Length": pdfBuffer.length.toString(),
    "Cache-Control": "no-store",
  },
});
}
