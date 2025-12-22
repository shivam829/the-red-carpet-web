import PDFDocument from "pdfkit";

/**
 * booking must contain:
 * - name
 * - passName
 * - quantity
 * - baseAmount
 * - bookingFee
 * - amount (final amount paid)
 * - reference
 * - qrCode (base64 data URL)
 */
export async function generateTicketPDF(booking: any) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const buffers: Buffer[] = [];

  doc.on("data", (chunk) => buffers.push(chunk));
  doc.on("end", () => {});

  /* ------------------ HEADER ------------------ */

  doc
    .fontSize(22)
    .text("🎟 THE RED CARPET NYE 2025", {
      align: "center",
    });

  doc
    .moveDown(0.5)
    .fontSize(14)
    .text("Official Entry Pass", { align: "center" });

  doc.moveDown(2);

  /* ------------------ BOOKING DETAILS ------------------ */

  doc.fontSize(14).fillColor("black");

  doc.text(`Name: ${booking.name}`);
  doc.text(`Pass Type: ${booking.passName}`);
  doc.text(`Quantity: ${booking.quantity}`);

  doc.moveDown(1);

  /* ------------------ PRICE BREAKDOWN ------------------ */

  doc.fontSize(13);

  if (booking.baseAmount != null) {
    doc.text(`Base Amount: ₹${booking.baseAmount}`);
  }

  if (booking.bookingFee != null) {
    doc.text(`Booking Charge (3%): ₹${booking.bookingFee}`);
  }

  doc
    .moveDown(0.5)
    .fontSize(15)
    .text(`Total Paid: ₹${booking.amount}`, {
      underline: true,
    });

  doc.moveDown(1.5);

  /* ------------------ REFERENCE ------------------ */

  doc
    .fontSize(13)
    .text(`Reference Code: ${booking.reference}`, {
      bold: true,
    });

  doc.moveDown(2);

  /* ------------------ QR CODE ------------------ */

  if (booking.qrCode) {
    const base64Data = booking.qrCode.replace(
      /^data:image\/png;base64,/,
      ""
    );

    const qrBuffer = Buffer.from(base64Data, "base64");

    doc
      .fontSize(14)
      .text("Scan this QR code at entry:", {
        align: "left",
      });

    doc.moveDown(1);

    doc.image(qrBuffer, {
      width: 160,
      align: "center",
    });
  } else {
    doc
      .fontSize(12)
      .fillColor("red")
      .text("QR Code not available", { align: "center" })
      .fillColor("black");
  }

  doc.moveDown(3);

  /* ------------------ FOOTER ------------------ */

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Please carry this ticket (digital or printed) to the venue.\nQR code is valid for single entry only.\nBooking charge is non-refundable.",
      {
        align: "center",
      }
    );

  doc.end();

  return Buffer.concat(buffers);
}
