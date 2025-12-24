"use client";

import { useEffect, useState } from "react";

export default function TicketPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          setError(data?.message || "Failed to load ticket");
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
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading ticket...
      </div>
    );
  }

  const ticketUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/ticket/${ticket._id}`
      : "";

  const message = `🎉 THE RED CARPET – New Year Eve 2025 🎉

Name: ${ticket.name}
Pass: ${ticket.passName}
Quantity: ${ticket.quantity}
Reference: ${ticket.reference}

🎟 View / Download Ticket:
${ticketUrl}
`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="ticket-card max-w-md w-full rounded-3xl p-6 shadow-2xl text-white bg-gradient-to-br from-red-900 to-black">

        {/* LOGO */}
        <div className="text-center mb-6">
          <img src="/logo1.png" className="h-40 mx-auto mb-4" />
          <h1 className="text-xl font-bold">THE RED CARPET</h1>
          <p className="text-sm opacity-80">Official Entry Pass</p>
        </div>

        {/* DETAILS */}
        <div className="space-y-1 mb-4 text-sm">
          <p><b>Name:</b> {ticket.name}</p>
          <p><b>Pass:</b> {ticket.passName}</p>
          <p><b>Quantity:</b> {ticket.quantity}</p>
          <p><b>Reference:</b> {ticket.reference}</p>
        </div>

        {/* QR */}
        <div className="flex justify-center my-6">
          <img
            src={ticket.qrCode}
            className="w-44 h-44 bg-white p-3 rounded-xl"
          />
        </div>

        {/* PAGE BREAK */}
        <div className="print-page-break" />

        {/* RECEIPT */}
        <div className="mt-6 text-sm">
          <h2 className="text-lg font-bold text-gold mb-3 text-center">
            Payment Receipt
          </h2>

          <p>Base Amount: ₹{ticket.baseAmount}</p>
          <p>Booking Fee (3%): ₹{ticket.bookingFee}</p>
          <p className="font-bold text-gold">
            Total Paid: ₹{ticket.amount}
          </p>
          <p>Status: {ticket.status}</p>
        </div>

        {/* ACTIONS (HIDDEN IN PRINT) */}
        <div className="ticket-actions space-y-2 mt-6">

          {/* SAVE PDF */}
          <button
            onClick={() => window.print()}
            className="w-full bg-black py-3 rounded-lg"
          >
            Save Pass & Receipt as PDF
          </button>

          {/* WHATSAPP */}
          <button
            onClick={() => {
              const url =
                "https://wa.me/?text=" + encodeURIComponent(message);
              window.open(url, "_blank");
            }}
            className="w-full bg-green-600 py-3 rounded-lg font-semibold"
          >
            Send via WhatsApp
          </button>

          {/* EMAIL */}
          <button
            onClick={() => {
              const subject = "Your Ticket – THE RED CARPET NYE 2025";
              const body = encodeURIComponent(message);
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
            className="w-full bg-blue-600 py-3 rounded-lg font-semibold"
          >
            Send via Email
          </button>

          {/* BACK */}
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
