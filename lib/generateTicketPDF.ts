import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export async function generateTicketPDF(booking: any) {
  const doc = new PDFDocument();
  const buffers: any[] = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  const qr = await QRCode.toDataURL(booking.reference);

  doc.fontSize(20).text("🎟 THE RED CARPET NYE", { align: "center" });
  doc.moveDown();
  doc.text(`Name: ${booking.name}`);
  doc.text(`Reference: ${booking.reference}`);
  doc.text(`Quantity: ${booking.quantity}`);
  doc.image(qr, { width: 150 });

  doc.end();

  return Buffer.concat(buffers);
}
