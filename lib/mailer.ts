import nodemailer from "nodemailer";

export const sendEmailOtp = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"Red Carpet" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`,
  });
};
