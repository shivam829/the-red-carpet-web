"use client";

import { useEffect, useState } from "react";

export default function TicketPage({ params }: any) {
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/bookings/${params.id}`)
      .then(res => res.json())
      .then(setTicket);
  }, []);

  if (!ticket) return <p className="text-center mt-20">Loading ticket...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-black border border-gold/30 rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl text-gold mb-4">🎟 THE RED CARPET</h1>

        <img src={ticket.qrCode} className="mx-auto w-48 mb-4" />

        <p className="mb-1">{ticket.name}</p>
        <p className="mb-1">{ticket.passName}</p>
        <p className="mb-4">31st Dec 2025 · Bhopal</p>

        <button
          onClick={() => window.print()}
          className="w-full py-3 bg-gold text-black rounded-lg mb-3"
        >
          Download Ticket
        </button>

        {navigator.share && (
          <button
            onClick={() =>
              navigator.share({
                title: "My Red Carpet Ticket",
                text: "Here is my entry ticket 🎟",
                url: window.location.href,
              })
            }
            className="w-full py-3 bg-redcarpet rounded-lg"
          >
            Share Ticket
          </button>
        )}
      </div>
    </div>
  );
}
