"use client";

import { useEffect, useState } from "react";

export default function TicketPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message || "Failed to load ticket");
        } else {
          setTicket(data.ticket);
        }
      })
      .catch(() => setError("Failed to load ticket"));
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading ticket...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 print:p-0"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full text-center shadow-2xl print:shadow-none print:rounded-none">

        {/* HEADER */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src="/logo.png"
            alt="The Red Carpet Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            THE RED CARPET NYE
          </h1>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Official Entry Pass
        </p>

        {/* DETAILS */}
        <div className="space-y-1 text-base">
          <p><b>Name:</b> {ticket.name}</p>
          <p><b>Pass:</b> {ticket.passName}</p>
          <p><b>Quantity:</b> {ticket.quantity}</p>
          <p><b>Reference:</b> {ticket.reference}</p>
        </div>

        {/* QR CODE */}
        <div className="my-6 flex justify-center">
          <img
            src={ticket.qrCode}
            alt="QR Code"
            className="w-48 h-48 border p-2 rounded-lg"
          />
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Scan this QR code at the venue entrance
        </p>

        {/* ACTION BUTTONS */}
        <div className="space-y-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="w-full bg-black text-white py-3 rounded-lg font-medium"
          >
            Print / Save as PDF
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full border py-3 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
