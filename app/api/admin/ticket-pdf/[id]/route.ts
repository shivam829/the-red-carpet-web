export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { generateTicketPDF } from "@/lib/generateTicketPDF";
import { generateReceiptPDF } from "@/lib/generateReceiptPDF";
import { verifyAdmin } from "@/lib/adminAuth";
import PDFDocument from "pdfkit";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    verifyAdmin();
    await connectDB();

    const booking: any = await Booking.findById(params.id).lean();

    if (!booking || booking.status !== "PAID") {
      return NextResponse.json(
        { message: "Ticket not available" },
        { status: 404 }
      );
    }

    // ✅ CREATE ONE PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers: Buffer[] = [];

    doc.on("data", (chunk) => buffers.push(chunk));

    // 🎟 PAGE 1 — PASS
    await generateTicketPDF(booking, doc);

    // 🧾 PAGE 2 — RECEIPT
    doc.addPage();
    await generateReceiptPDF(booking, doc);

    doc.end();

    const pdfBuffer = Buffer.concat(buffers);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Pass+Receipt-${booking.reference}.pdf`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("ADMIN PDF DOWNLOAD ERROR:", err);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
