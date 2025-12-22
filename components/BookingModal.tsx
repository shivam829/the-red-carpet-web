"use client";

import { useState } from "react";

const BOOKING_FEE_PERCENT = 0.03;

export default function BookingModal({
  pass,
  onClose,
  onSubmit,
}: {
  pass: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState(1);

  const baseAmount = pass.price * qty;
  const bookingFee = Math.round(baseAmount * BOOKING_FEE_PERCENT);
  const finalAmount = baseAmount + bookingFee;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black border border-gold/30 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gold mb-4">
          Book {pass.name}
        </h2>

        <input
          className="w-full mb-3 p-2 bg-black border border-gold/30 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 bg-black border border-gold/30 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 bg-black border border-gold/30 rounded"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-black border border-gold/30 rounded"
          type="number"
          min={1}
          max={10}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        {/* PRICE BREAKDOWN */}
        <div className="text-sm space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Base Amount</span>
            <span>₹{baseAmount}</span>
          </div>
          <div className="flex justify-between text-yellow-400">
            <span>Booking Fee (3%)</span>
            <span>₹{bookingFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gold border-t border-gold/30 pt-2">
            <span>Total Payable</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gold/40 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit({
                name,
                email,
                phone,
                qty,
              })
            }
            className="flex-1 py-2 bg-gold text-black rounded font-semibold"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
