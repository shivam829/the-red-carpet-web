"use client";

import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Passes() {
  const [passes, setPasses] = useState<any[]>([]);
  const [selectedPass, setSelectedPass] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then(setPasses)
      .catch(() => setPasses([]));
  }, []);

  const startPayment = async (pass: any, form: any) => {
    try {
      setLoading(true);

      // 1️⃣ Create booking + Razorpay order
      const res = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passId: pass._id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: form.qty,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("ORDER API ERROR:", text);
        alert("Unable to initiate payment");
        return;
      }

      const data = await res.json();

      if (!window.Razorpay) {
        alert("Payment SDK not loaded. Please refresh.");
        return;
      }

      // 2️⃣ Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount, // already in paise
        currency: "INR",
        name: "The Red Carpet",
        description: pass.name,
        order_id: data.orderId,

        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId: data.bookingId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verify = await verifyRes.json();

            if (verify.success) {
              // ✅ SUCCESS PATH
              setSuccessBookingId(data.bookingId);
              window.location.href = `/ticket/${data.bookingId}`;
            } else {
              alert("Payment completed but verification failed");
            }
          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Payment verification error");
          }
        },

        theme: { color: "#C9A24D" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("START PAYMENT ERROR:", err);
      alert("Payment failed");
    } finally {
      setLoading(false);
      setSelectedPass(null);
    }
  };

  return (
    <>
      <section id="passes" className="py-24 px-6 bg-black/60">
        <h2 className="text-4xl font-bold text-gold text-center mb-12">
          Passes
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {passes.map((pass) => (
            <div
              key={pass._id}
              className="border border-gold/30 p-6 rounded-xl text-center bg-black/50"
            >
              <h3 className="text-2xl font-bold text-gold mb-2">
                {pass.name}
              </h3>

              <p className="text-xl mb-4">₹{pass.price}</p>

              <button
                disabled={loading}
                onClick={() => setSelectedPass(pass)}
                className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedPass && (
        <BookingModal
          pass={selectedPass}
          onClose={() => setSelectedPass(null)}
          onSubmit={(data) => startPayment(selectedPass, data)}
        />
      )}
    </>
  );
}
