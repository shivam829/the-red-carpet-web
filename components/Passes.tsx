"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


export default function Passes() {
  const [passes, setPasses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then(setPasses);
  }, []);

  const bookPass = async (pass: any) => {
    console.log("👉 Book Now clicked", pass);

    // 1️⃣ Create booking in DB
    const bookingRes = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passId: pass._id,
      }),
    });

    if (!bookingRes.ok) {
      alert("Failed to create booking");
      return;
    }

    const bookingData = await bookingRes.json();
    const bookingId = bookingData._id; // ✅ CORRECTLY DEFINED

    // 2️⃣ Create Razorpay order
    const orderRes = await fetch("/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: pass.price,
        bookingId,
      }),
    });

    if (!orderRes.ok) {
      alert("Failed to create payment order");
      return;
    }

    const orderData = await orderRes.json();
    console.log("🧾 Razorpay Order ID:", orderData.id);

    // 3️⃣ Open Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "THE RED CARPET",
      description: pass.name,
      order_id: orderData.id,

      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId, // ✅ NOW VALID
            }),
          });

          const data = await verifyRes.json();

          if (!verifyRes.ok || !data.success) {
            alert("Payment verification failed");
            return;
          }

          // 🎟 Redirect to ticket page
          window.location.href = `/ticket/${bookingId}`;
        } catch (err) {
          console.error(err);
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#b8964b",
      },
    };

    const res = await loadRazorpay();

if (!res) {
  alert("Razorpay SDK failed to load. Check your internet.");
  return;
}

const rzp = new (window as any).Razorpay(options);
rzp.open();

  };

  return (
    <section id="passes" className="py-24 px-6 bg-black text-white">
      <h2 className="text-4xl font-bold text-gold text-center mb-12">
        Entry Passes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {passes.map((pass) => (
          <div
            key={pass._id}
            className="border border-gold/30 rounded-xl p-6 text-center bg-black/40"
          >
            <h3 className="text-2xl mb-2">{pass.name}</h3>
            <p className="text-xl mb-4">₹{pass.price}</p>

            <button
              onClick={() => bookPass(pass)}
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
