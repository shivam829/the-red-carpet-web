import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOtp(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"The Red Carpet" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`,
  });
}

export async function POST(req: Request) {
  await dbConnect();

  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ success: false, error: "Phone required" }, { status: 400 });
  }

  const user = await User.findOne({
    $or: [{ phone }, { email: phone }],
  });

  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  /* 🔁 GOOGLE USERS → EMAIL OTP */
  if (user.provider === "google" && user.email) {
    await sendEmailOtp(user.email, otp);
  } 
  /* 🔁 PHONE USERS → SMS OTP */
  else {
    await fetch("https://api.msg91.com/api/v5/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authkey: process.env.MSG91_AUTH_KEY!,
      },
      body: JSON.stringify({
        template_id: process.env.MSG91_TEMPLATE_ID!,
        mobile: `91${user.phone}`,
        otp,
      }),
    });
  }

  return NextResponse.json({ success: true });
}
