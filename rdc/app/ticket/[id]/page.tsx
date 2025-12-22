"use client";

import { useEffect, useState } from "react";

export default function TicketPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) setError(data?.message || "Failed to load ticket");
        else setTicket(data.ticket);
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
      <div className="min-h-screen flex items-center justify-center text-white">
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
      {/* TICKET CARD */}
      <div
        className="ticket-card relative max-w-md w-full rounded-3xl p-6 shadow-2xl text-white print:shadow-none"
        style={{
          background:
            "linear-gradient(135deg, #3b0a0a, #7a1212, #b8860b)",
        }}
      >
        {/* SOFT GLOW OVERLAY */}
        <div className="absolute inset-0 rounded-3xl bg-black/20 pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* LOGO + TITLE (FIXED ALIGNMENT) */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="/logo.png"
              alt="The Red Carpet Logo"
              className="h-16 mb-2"
            />

            <h1 className="text-2xl font-bold tracking-wide">
              THE RED CARPET
            </h1>
            <p className="text-sm tracking-widest opacity-90">
              NEW YEAR EVE
            </p>
          </div>

          <p className="text-sm opacity-90 mb-5">
            Official Entry Pass
          </p>

          {/* DETAILS */}
          <div className="space-y-1 text-base mb-5">
            <p><b>Name:</b> {ticket.name}</p>
            <p><b>Pass:</b> {ticket.passName}</p>
            <p><b>Quantity:</b> {ticket.quantity}</p>
            <p><b>Reference:</b> {ticket.reference}</p>
          </div>

          {/* QR CODE */}
          <div className="my-6 flex justify-center">
            <div className="bg-white p-3 rounded-xl">
              <img
                src={ticket.qrCode}
                alt="QR Code"
                className="w-44 h-44"
              />
            </div>
          </div>

          <p className="text-xs opacity-80 mb-6">
            Scan this QR code at the venue entrance
          </p>

          {/* ACTIONS */}
          <div className="space-y-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="w-full bg-black py-3 rounded-lg font-medium"
            >
              Print / Save as PDF
            </button>

            <button
              className="w-full bg-white/90 text-black py-2 rounded-lg"
              onClick={() => alert("Email sending will be enabled soon")}
            >
              Send to Email
            </button>

            <button
              className="w-full bg-white/90 text-black py-2 rounded-lg"
              onClick={() => alert("WhatsApp sending will be enabled soon")}
            >
              Send to WhatsApp
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full border border-white py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
