// lib/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  pdfBuffer?: Buffer
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    attachments: pdfBuffer
      ? [
          {
            filename: "Red-Carpet-Ticket.pdf",
            content: pdfBuffer,
          },
        ]
      : [],
  });
}
