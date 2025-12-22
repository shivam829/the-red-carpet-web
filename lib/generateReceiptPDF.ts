import PDFDocument from "pdfkit";

export async function generateReceiptPDF(booking: any) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const buffers: Buffer[] = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  /* ---------- HEADER ---------- */
  doc
    .fontSize(22)
    .text("THE RED CARPET", { align: "center" })
    .moveDown(0.3)
    .fontSize(14)
    .text("Payment Receipt", { align: "center" });

  doc.moveDown(2);

  /* ---------- RECEIPT META ---------- */
  doc.fontSize(11);
  doc.text(`Receipt No: ${booking.reference}`);
  doc.text(`Date: ${new Date(booking.paidAt).toLocaleString()}`);

  doc.moveDown();

  /* ---------- CUSTOMER ---------- */
  doc.fontSize(13).text("Customer Details", { underline: true });
  doc.fontSize(11);
  doc.text(`Name: ${booking.name}`);
  doc.text(`Email: ${booking.email}`);
  doc.text(`Phone: ${booking.phone}`);

  doc.moveDown();

  /* ---------- PASS DETAILS ---------- */
  doc.fontSize(13).text("Pass Details", { underline: true });
  doc.fontSize(11);
  doc.text(`Pass: ${booking.passName}`);
  doc.text(`Quantity: ${booking.quantity}`);

  doc.moveDown();

  /* ---------- PAYMENT BREAKDOWN ---------- */
  doc.fontSize(13).text("Payment Breakdown", { underline: true });
  doc.fontSize(11);
  doc.text(`Base Amount: ₹${booking.baseAmount}`);
  doc.text(`Booking Fee (3%): ₹${booking.bookingFee}`);
  doc.text(`Discount: ₹${booking.discount || 0}`);
  doc
    .fontSize(12)
    .text(`Total Paid: ₹${booking.amount}`, { bold: true });

  doc.moveDown();

  /* ---------- TRANSACTION ---------- */
  doc.fontSize(13).text("Transaction Details", { underline: true });
  doc.fontSize(11);
  doc.text(`Payment Mode: ${booking.paymentMode}`);
  doc.text(`Payment ID: ${booking.paymentId}`);
  doc.text(`Order ID: ${booking.orderId}`);
  doc.text(`Status: ${booking.status}`);

  doc.moveDown(2);

  /* ---------- FOOTER ---------- */
  doc
    .fontSize(9)
    .text(
      "This is a system-generated receipt. No signature required.\nFor support, contact The Red Carpet team.",
      { align: "center" }
    );

  doc.end();

  return Buffer.concat(buffers);
}
