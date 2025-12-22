import PDFDocument from "pdfkit";

/**
 * Adds RECEIPT content to an EXISTING PDF document
 */
export async function generateReceiptPDF(
  booking: any,
  doc: PDFDocument
) {
  /* ------------------ HEADER ------------------ */

  doc
    .fontSize(22)
    .text("🧾 PAYMENT RECEIPT", { align: "center" });

  doc.moveDown(1);

  /* ------------------ RECEIPT DETAILS ------------------ */

  doc.fontSize(14);

  doc.text(`Name: ${booking.name}`);
  doc.text(`Pass Type: ${booking.passName}`);
  doc.text(`Quantity: ${booking.quantity}`);
  doc.text(`Reference: ${booking.reference}`);

  doc.moveDown(1);

  /* ------------------ PAYMENT BREAKDOWN ------------------ */

  doc.fontSize(13);

  doc.text(`Base Amount: ₹${booking.baseAmount}`);
  doc.text(`Booking Charge (3%): ₹${booking.bookingFee}`);

  doc
    .moveDown(0.5)
    .fontSize(15)
    .text(`Total Paid: ₹${booking.amount}`, {
      underline: true,
    });

  doc.moveDown(1.5);

  /* ------------------ META ------------------ */

  doc.fontSize(11).fillColor("gray");

  doc.text(
    `Payment Status: ${booking.status}\nPaid At: ${
      booking.paidAt
        ? new Date(booking.paidAt).toLocaleString()
        : "—"
    }\nPayment Mode: Razorpay`,
    { align: "left" }
  );

  doc.fillColor("black");
}
