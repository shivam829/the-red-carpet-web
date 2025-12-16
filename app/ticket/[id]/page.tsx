"use client";

import { useEffect, useState } from "react";

export default function TicketSuccess({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`)
      .then((res) => res.json())
      .then(setTicket);
  }, [params.id]);

  if (!ticket) {
    return <div className="text-white text-center p-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-white text-black p-8 rounded-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">🎉 Booking Confirmed!</h1>

        <p className="mb-4">
          Thank you for booking with <b>The Red Carpet</b>.
        </p>

        <p className="mb-2">
          <b>Reference:</b> {ticket.reference}
        </p>

        <a
          href={`/api/ticket/${params.id}/download`}
          className="block mt-4 py-3 bg-black text-white rounded-lg"
        >
          Download Ticket PDF
        </a>

        <a
          href="/"
          className="block mt-3 text-sm text-gray-600 underline"
        >
          Go back to home
        </a>
      </div>
    </div>
  );
}
