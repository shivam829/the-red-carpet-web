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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="ticket-card max-w-md w-full rounded-3xl p-6 shadow-2xl text-white bg-gradient-to-br from-red-900 to-black">
        <div className="text-center mb-4">
          <img src="/logo.png" className="h-14 mx-auto mb-2" />
          <h1 className="text-xl font-bold">THE RED CARPET</h1>
          <p className="text-sm opacity-80">Official Entry Pass</p>
        </div>

        <div className="space-y-1 mb-4 text-sm">
          <p><b>Name:</b> {ticket.name}</p>
          <p><b>Pass:</b> {ticket.passName}</p>
          <p><b>Quantity:</b> {ticket.quantity}</p>
          <p><b>Reference:</b> {ticket.reference}</p>
        </div>

        {/* PAYMENT SUMMARY */}
<div className="bg-black/40 rounded-xl p-4 mb-4 text-sm">
  <h3 className="text-gold font-semibold mb-2">Payment Summary</h3>

  <p>
    Base Amount: ₹{ticket.baseAmount ?? 0}
  </p>

  <p>
    Booking Fee (3%): ₹{ticket.bookingFee ?? 0}
  </p>

  <p className="font-bold text-gold">
    Total Paid: ₹{ticket.amount ?? 0}
  </p>

  <p>
    Status: {ticket.status ?? "PAID"}
  </p>
</div>


        <div className="flex justify-center my-4">
          <img src={ticket.qrCode} className="w-40 h-40 bg-white p-2 rounded" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => window.print()}
            className="w-full bg-black py-3 rounded-lg"
          >
            Print / Save as PDF
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full border py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
