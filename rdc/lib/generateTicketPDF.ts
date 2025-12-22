import PDFDocument from "pdfkit";

/**
 * booking must contain:
 * - name
 * - passName
 * - quantity
 * - amount
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
    .text("🎟 THE RED CARPET NYE", {
      align: "center",
    });

  doc
    .moveDown(0.5)
    .fontSize(14)
    .text("Official Entry Pass", { align: "center" });

  doc.moveDown(2);

  /* ------------------ DETAILS ------------------ */

  doc.fontSize(14);
  doc.text(`Name: ${booking.name}`);
  doc.text(`Pass: ${booking.passName}`);
  doc.text(`Quantity: ${booking.quantity}`);
  doc.text(`Amount: ₹${booking.amount}`);
  doc.text(`Reference: ${booking.reference}`);

  doc.moveDown(2);

  /* ------------------ QR CODE ------------------ */

  if (booking.qrCode) {
    // Convert base64 data URL → Buffer
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
    .text(
      "Please carry this ticket (digital or printed) to the venue.\nQR code is valid for single entry only.",
      {
        align: "center",
      }
    );

  doc.end();

  return Buffer.concat(buffers);
}
