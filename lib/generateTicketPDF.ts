// lib/generateTicketPDF.ts
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export async function generateTicketPDF(ticket: {
  name: string;
  passName: string;
  quantity: number;
  amount: number;
  reference: string;
}) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const buffers: Buffer[] = [];

  doc.on("data", buffers.push.bind(buffers));

  const qr = await QRCode.toDataURL(ticket.reference);

  // 🎨 Background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");

  doc.fillColor("#C9A24D")
    .fontSize(26)
    .text("THE RED CARPET", { align: "center" });

  doc.moveDown();
  doc.fillColor("white").fontSize(16);

  doc.text(`Name: ${ticket.name}`);
  doc.text(`Pass: ${ticket.passName}`);
  doc.text(`Quantity: ${ticket.quantity}`);
  doc.text(`Total Paid: ₹${ticket.amount}`);
  doc.moveDown();

  doc.fillColor("#C9A24D").text(`Reference: ${ticket.reference}`);
  doc.moveDown(2);

  doc.image(qr, {
    fit: [150, 150],
    align: "center",
  });

  doc.moveDown(2);
  doc
    .fillColor("white")
    .fontSize(12)
    .text(
      "Thank you for booking with The Red Carpet.\nNew Year’s Eve awaits you ✨",
      { align: "center" }
    );

  doc.end();

  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });
}
