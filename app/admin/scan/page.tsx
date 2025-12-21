"use client";

import { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";

export default function AdminScanPage() {
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("Scan a ticket QR");
  const [scanning, setScanning] = useState(true);

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (!scanning) return;
    if (!detectedCodes || detectedCodes.length === 0) return;

    const rawValue = detectedCodes[0].rawValue;
    if (!rawValue) return;

    setScanning(false); // 🔒 stop multiple scans

    try {
      const payload = JSON.parse(rawValue);

      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: payload.bookingId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid ticket");
        setTimeout(() => setScanning(true), 3000);
        return;
      }

      setResult(data);
      setMessage("✅ Entry Allowed");
    } catch {
      setMessage("Invalid QR code");
      setTimeout(() => setScanning(true), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">
        🎟 Admin Entry Scan
      </h1>

      <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden">
        <Scanner
          onScan={handleScan}
          onError={(error) => console.error(error)}
          constraints={{ facingMode: "environment" }}
          styles={{
            container: { width: "100%" },
            video: { width: "100%" },
          }}
        />
      </div>

      <p className="mt-6 text-lg">{message}</p>

      {result && (
  <div className="mt-4 bg-green-500 text-black p-4 rounded-lg text-center">
    <p><b>Name:</b> {result.name}</p>
    <p><b>Pass:</b> {result.pass}</p>
    <p><b>Quantity:</b> {result.quantity}</p>
    <p><b>Reference:</b> {result.reference}</p>
  </div>
)}

    </div>
  );
}
