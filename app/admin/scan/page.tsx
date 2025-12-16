"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(
  () => import("react-qr-reader").then((m) => m.QrReader),
  { ssr: false }
);

export default function AdminScanPage() {
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState<string>("Scan a ticket QR");

  const handleScan = async (data: any) => {
    if (!data?.text) return;

    try {
      const payload = JSON.parse(data.text);

      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: payload.bookingId }),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.message || "Invalid ticket");
        return;
      }

      setResult(result);
      setMessage("✅ Entry Allowed");
    } catch {
      setMessage("Invalid QR");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">
        🎟 Admin Entry Scan
      </h1>

      <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(res) => res && handleScan(res)}
          containerStyle={{ width: "100%" }}
        />
      </div>

      <p className="mt-6 text-lg">{message}</p>

      {result && (
        <div className="mt-4 bg-green-600 text-black p-4 rounded-lg text-center">
          <p><b>Name:</b> {result.name}</p>
          <p><b>Pass:</b> {result.pass}</p>
          <p><b>Qty:</b> {result.quantity}</p>
          <p><b>Ref:</b> {result.reference}</p>
        </div>
      )}
    </div>
  );
}
