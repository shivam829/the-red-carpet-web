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

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then(setPasses)
      .catch(() => setPasses([]));
  }, []);

  const startPayment = async (pass: any, form: any) => {
    try {
      setLoading(true);

      // 1️⃣ Create order + booking
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

      // ✅ CRITICAL: handle non-200 safely
      if (!res.ok) {
        const text = await res.text();
        console.error("ORDER API ERROR:", text);
        alert("Unable to initiate payment");
        return;
      }

      const data = await res.json();

      // 2️⃣ Ensure Razorpay is loaded
      if (!window.Razorpay) {
        alert("Payment SDK not loaded. Refresh and try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: "INR",
        name: "The Red Carpet",
        description: pass.name,
        order_id: data.orderId,

        // 3️⃣ PAYMENT SUCCESS HANDLER (SAFE)
        handler: async function (response: any) {
          try {
            console.log("✅ Payment success", response);

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

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              window.location.href = `/ticket/${data.bookingId}`;
            } else {
              alert("Payment done, but verification failed");
            }
          } catch (err) {
            console.error("VERIFY HANDLER ERROR:", err);
            alert("Payment done, but verification error");
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
