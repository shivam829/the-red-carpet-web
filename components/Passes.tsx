"use client";

import { useEffect, useState } from "react";
import loadRazorpay from "@/lib/loadRazorpay";

type PassType = {
  _id: string;
  name: string;
  price: number;
  phase: number;
};

export default function Passes() {
  const [passes, setPasses] = useState<PassType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then((data) => {
        setPasses(data);
        setLoading(false);
      });
  }, []);

  async function handlePayment(pass: PassType) {
    console.log("👉 Book Now clicked", pass);

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 1️⃣ Create booking
    const bookingRes = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        phone: "9999999999",
        email: "test@example.com",
        passName: pass.name,
        phase: pass.phase,
        price: pass.price,
      }),
    });

    const booking = await bookingRes.json();

    // 2️⃣ Create Razorpay order
    const orderRes = await fetch("/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: pass.price,
        bookingId: booking._id,
      }),
    });

    const order = await orderRes.json();

    // 3️⃣ Open Razorpay Checkout
    
console.log("🧾 Razorpay Order ID:", order.id);
    const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  order_id: order.id,              // 🔴 MUST EXIST
  amount: order.amount,            // already in paise
  currency: "INR",

  name: "The Red Carpet",
  description: `${pass.name} – Phase ${pass.phase}`,

  handler: async function (response: any) {
  const verifyRes = await fetch("/api/payments/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      bookingId: order.receipt,
    }),
  });

  const result = await verifyRes.json();

  if (result.success) {
    alert("Payment verified! Ticket confirmed 🎉");
  } else {
    alert("Payment verification failed");
  }
}
,

  prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9999999999",
  },

  theme: {
    color: "#b89b5e",
  },
};

    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  if (loading) return <p className="text-white">Loading passes…</p>;

  return (
    <section id="passes" className="py-24 px-6">
      <h2 className="text-4xl text-gold font-bold text-center mb-12">
        Passes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {passes.map((pass) => (
          <div
            key={pass._id}
            className="p-6 bg-black/60 border border-gold/30 rounded-xl text-center"
          >
            <h3 className="text-2xl text-gold mb-4">{pass.name}</h3>
            <p className="mb-2">Phase {pass.phase}</p>
            <p className="mb-6 text-xl">₹{pass.price}</p>

            <button
              onClick={() => handlePayment(pass)}
              className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
