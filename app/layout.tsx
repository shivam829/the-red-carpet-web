import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "THE RED CARPET | New Year Eve 2025 | Bhopal",
  description: "Central India's Biggest Open-Air New Year Celebration"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Razorpay early */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />
      </head>
      <body className="relative text-white">
        {/* GLOBAL BACKGROUND IMAGE */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* LIGHT OVERLAY */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: "rgba(0,0,0,0.35)"
          }}
        />

        {children}
      </body>
    </html>
  );
}