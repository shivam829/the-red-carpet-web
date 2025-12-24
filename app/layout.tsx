import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative text-white">
        {/* ORIGINAL HERO BACKGROUND */}
        <div
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="fixed inset-0 -z-10 bg-black/40" />

        <Analytics />
        {children}
      </body>
    </html>
  );
}
