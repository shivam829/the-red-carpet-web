import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const { bookingId, email } = await req.json();

    await dbConnect();

    // Get booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/ticket/${booking._id}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "The Red Carpet <noreply@redcarpet.com>",
      to: email,
      subject: "🎉 Your Red Carpet New Year Pass",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%); color: #ffffff; padding: 40px; border-radius: 12px;">
          <h1 style="color: #c9a24d; text-align: center; margin-bottom: 30px;">
            🎊 THE RED CARPET 2025 🎊
          </h1>
          
          <div style="background: rgba(0,0,0,0.3); border: 1px solid #c9a24d; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #c9a24d; margin-bottom: 15px;">Your Pass Details</h2>
            <p><strong>Reference:</strong> ${booking.reference}</p>
            <p><strong>Pass Type:</strong> ${booking.passName}</p>
            <p><strong>Quantity:</strong> ${booking.quantity} ticket(s)</p>
            <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${ticketUrl}" style="background: #c9a24d; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              VIEW YOUR PASS
            </a>
          </div>

          <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
            See you at the biggest New Year celebration in Central India!
          </p>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              For any queries, contact us at support@redcarpet.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}