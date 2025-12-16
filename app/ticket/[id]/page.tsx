"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function TicketPage({
  params,
}: {
  params: { id: string };
}) {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setLoading(false);
      });
  }, [params.id]);

  const downloadTicket = async () => {
    const node = document.getElementById("ticket");
    if (!node) return;

    const canvas = await html2canvas(node);
    const link = document.createElement("a");
    link.download = "red-carpet-ticket.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading ticket...
      </div>
    );
  }

  if (!ticket || ticket.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid or unpaid ticket
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div
        id="ticket"
        className="bg-white text-black rounded-xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          🎟 The Red Carpet
        </h1>

        <p><b>Name:</b> {ticket.name}</p>
        <p><b>Pass:</b> {ticket.passName}</p>
        <p><b>Quantity:</b> {ticket.quantity}</p>
        <p><b>Total Paid:</b> ₹{ticket.amount}</p>

        <p className="mt-2">
          <b>Reference:</b>{" "}
          <span className="font-mono">{ticket.reference}</span>
        </p>

        <div className="flex justify-center mt-4">
          <img src={ticket.qrCode} alt="QR Code" />
        </div>

        <button
          onClick={downloadTicket}
          className="mt-6 w-full py-3 bg-black text-white rounded-lg"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}
