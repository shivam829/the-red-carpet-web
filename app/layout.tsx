import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import LimitedPassBanner from "@/components/LimitedPassBanner";

export const metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Red Carpet 2025",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />
      </head>

      <body className="relative text-white">
        {/* 🌄 GLOBAL BACKGROUND */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* LIGHT OVERLAY */}
        <div
          className="fixed inset-0 -z-10"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        />

        {/* 🚨 PUBLIC-ONLY BANNER */}
        <LimitedPassBanner />

        <Analytics />
        {children}
      </body>
    </html>
  );
}
