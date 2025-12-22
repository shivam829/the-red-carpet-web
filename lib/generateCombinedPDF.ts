import PDFDocument from "pdfkit";

/**
 * Generates a single PDF:
 * Page 1 → Event Pass
 * Page 2 → Payment Receipt
 */
export async function generateCombinedPDF(booking: any) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const buffers: Buffer[] = [];

  doc.on("data", (d) => buffers.push(d));
  doc.on("end", () => {});

  /* ================= PASS PAGE ================= */

  doc
    .fontSize(22)
    .text("🎟 THE RED CARPET – ENTRY PASS", { align: "center" });

  doc.moveDown(1.5);

  doc.fontSize(14);
  doc.text(`Name: ${booking.name}`);
  doc.text(`Pass Type: ${booking.passName}`);
  doc.text(`Quantity: ${booking.quantity}`);
  doc.text(`Reference: ${booking.reference}`);

  doc.moveDown(1);

  if (booking.qrCode) {
    const qrBuffer = Buffer.from(
      booking.qrCode.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    doc.image(qrBuffer, { width: 180, align: "center" });
  }

  doc.moveDown(2);
  doc
    .fontSize(10)
    .text("Scan this QR at entry. Valid for single use only.", {
      align: "center",
    });

  /* ================= RECEIPT PAGE ================= */

  doc.addPage();

  doc
    .fontSize(22)
    .text("🧾 PAYMENT RECEIPT", { align: "center" });

  doc.moveDown(1.5);

  doc.fontSize(14);
  doc.text(`Name: ${booking.name}`);
  doc.text(`Reference: ${booking.reference}`);
  doc.text(`Payment Status: ${booking.status}`);
  doc.text(`Payment ID: ${booking.paymentId || "N/A"}`);
  doc.text(`Paid On: ${new Date(booking.paidAt).toLocaleString()}`);

  doc.moveDown(1);

  doc.fontSize(13);
  doc.text(`Base Amount: ₹${booking.baseAmount}`);
  doc.text(`Booking Fee (3%): ₹${booking.bookingFee}`);
  doc
    .moveDown(0.5)
    .fontSize(15)
    .text(`Total Paid: ₹${booking.amount}`, { underline: true });

  doc.moveDown(2);
  doc
    .fontSize(10)
    .text(
      "This is a system-generated receipt. Booking charges are non-refundable.",
      { align: "center" }
    );

  doc.end();

  return Buffer.concat(buffers);
}
