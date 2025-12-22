"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import jsQR from "jsqr";
import { useEffect, useRef, useState } from "react";

export default function AdminScanPage() {
  const scannerRef = useRef<any>(null);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [fileRef, setFileRef] = useState<string | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
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
    setMessage(data.message);
  }

  function onScanSuccess(decodedText: string) {
    try {
      const parsed = JSON.parse(decodedText);
      verify(parsed.reference);
    } catch {
      verify(decodedText);
    }
  }

  /* IMAGE / PDF UPLOAD */
  const handleFile = async (file: File) => {
    const buffer = await file.arrayBuffer();
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
        setMessage("QR not detected in file");
      }
    };
  };

  return (
    <div>
      <h1 className="text-3xl text-gold mb-6">QR Scan</h1>

      {/* CAMERA SCAN (AUTO VERIFY) */}
      <div id="qr-reader" className="mb-6" />

      {/* MANUAL VERIFY */}
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

      {/* FILE UPLOAD */}
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

      {message && <p className="mt-4 text-gold">{message}</p>}
    </div>
  );
}
