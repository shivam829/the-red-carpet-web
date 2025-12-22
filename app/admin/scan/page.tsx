"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import jsQR from "jsqr";
import { useEffect, useRef, useState } from "react";

type ResultState = {
  status: "VALID" | "USED" | "INVALID";
  message: string;
  booking?: any;
};

export default function AdminScanPage() {
  const scannerRef = useRef<any>(null);
  const [reference, setReference] = useState("");
  const [fileRef, setFileRef] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 260 },
      false
    );

    scannerRef.current.render(onScanSuccess, () => {});
    return () => scannerRef.current.clear();
  }, []);

  async function verify(ref: string) {
    if (!ref) return;

    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ reference: ref }),
    });

    const data = await res.json();
    setResult(data);

    // Auto reset after animation
    setTimeout(() => setResult(null), 3000);
  }

  function onScanSuccess(decodedText: string) {
    try {
      const parsed = JSON.parse(decodedText);
      verify(parsed.reference);
    } catch {
      verify(decodedText);
    }
  }

  /* FILE UPLOAD */
  const handleFile = async (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qr = jsQR(imageData.data, imageData.width, imageData.height);

      if (qr) {
        try {
          const parsed = JSON.parse(qr.data);
          setFileRef(parsed.reference);
        } catch {
          setFileRef(qr.data);
        }
      } else {
        setResult({
          status: "INVALID",
          message: "QR not detected in file",
        });
        setTimeout(() => setResult(null), 3000);
      }
    };
  };

  return (
    <div className="relative min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl text-gold mb-6">QR Verification</h1>

      <div id="qr-reader" className="mb-6" />

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Enter Reference ID"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="p-2 bg-black border border-white/20"
        />
        <button
          onClick={() => verify(reference)}
          className="bg-gold px-4 py-2 text-black rounded"
        >
          Verify
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
        <button
          onClick={() => verify(fileRef || "")}
          disabled={!fileRef}
          className="bg-gold px-4 py-2 text-black rounded disabled:opacity-50"
        >
          Verify Uploaded File
        </button>
      </div>

      {/* 🔥 RESULT OVERLAY */}
      {result && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center
          transition-all duration-300
          ${
            result.status === "VALID"
              ? "bg-green-600/90"
              : "bg-red-600/90"
          }`}
        >
          <div className="text-center animate-scale-in">
            <h2 className="text-6xl font-bold mb-4">
              {result.status === "VALID" ? "✅ VALID PASS" : "❌ INVALID"}
            </h2>

            <p className="text-xl mb-2">{result.message}</p>

            {result.booking && (
              <div className="mt-4 text-lg space-y-1">
                <p><b>Name:</b> {result.booking.name}</p>
                <p><b>Pass:</b> {result.booking.passName}</p>
                <p><b>Qty:</b> {result.booking.quantity}</p>
                <p><b>Ref:</b> {result.booking.reference}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
