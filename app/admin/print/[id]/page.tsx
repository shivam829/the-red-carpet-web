"use client";

import { useEffect, useState } from "react";

export default function AdminPrintPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/ticket/${params.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.ticket);
      });
  }, [params.id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="print-container p-10">
      {/* 🎟 TICKET */}
      <div className="ticket-card mb-10">
        <h1 className="text-2xl font-bold mb-2">THE RED CARPET</h1>
        <p><b>Name:</b> {data.name}</p>
        <p><b>Pass:</b> {data.passName}</p>
        <p><b>Quantity:</b> {data.quantity}</p>
        <p><b>Reference:</b> {data.reference}</p>

        <img
          src={data.qrCode}
          className="w-40 h-40 mt-4"
        />
      </div>

      {/* 🧾 RECEIPT */}
      <div className="receipt-card">
        <h2 className="text-xl font-bold mb-2">Payment Receipt</h2>

        <p>Base Amount: ₹{data.baseAmount}</p>
        <p>Booking Fee (3%): ₹{data.bookingFee}</p>
        <p className="font-bold">
          Total Paid: ₹{data.amount}
        </p>
      </div>

      {/* AUTO PRINT */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.onload = () => window.print();`,
        }}
      />
    </div>
  );
}
