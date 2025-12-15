"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function AdminScanPage() {
  const [status, setStatus] = useState<string>("");

  async function onScan(text: string) {
    try {
      const parsed = JSON.parse(text);

      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: parsed.bookingId }),
      });

      const json = await res.json();
      setStatus(json.message);
    } catch {
      setStatus("Invalid QR");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-gold mb-6">Admin QR Scan</h1>

      <Scanner
        onScan={(result) => result && onScan(result[0].rawValue)}
        onError={(error) => console.error(error)}
      />

      {status && (
        <div className="mt-6 text-xl text-center">
          {status}
        </div>
      )}
    </main>
  );
}
