export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/adminAuth";
import PDFDocument from "pdfkit";
import { generateTicketPDF } from "@/lib/generateTicketPDF";
import { generateReceiptPDF } from "@/lib/generateReceiptPDF";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 🔐 ADMIN AUTH CHECK
    verifyAdmin();

    await dbConnect();

    const booking: any = await Booking.findById(params.id).lean();

    if (!booking || booking.status !== "PAID") {
      return NextResponse.json(
        { message: "Invalid or unpaid booking" },
        { status: 404 }
      );
    }

    /* 📄 PDF SETUP */
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers: Buffer[] = [];

    doc.on("data", (b) => buffers.push(b));
    doc.on("end", () => {});

    /* 🎟 PASS PAGE */
    await generateTicketPDF(booking, doc);

    /* 🧾 RECEIPT PAGE */
    doc.addPage();
    await generateReceiptPDF(booking, doc);

    doc.end();

    const pdfBuffer = Buffer.concat(buffers);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Ticket-${booking.reference}.pdf`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("ADMIN DOWNLOAD ERROR:", err);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
