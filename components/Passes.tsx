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
  const [user, setUser] = useState<any>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    // Load passes
    fetch("/api/passes")
      .then((res) => res.json())
      .then(setPasses)
      .catch(() => setPasses([]));

    // ✅ FIX: include cookies
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleBookNowClick = (pass: any) => {
    if (!user) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    setSelectedPass(pass);
  };

  const startPayment = async (pass: any, form: any) => {
    try {
      setLoading(true);

      const res = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          passId: pass._id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: form.qty,
        }),
      });

      if (!res.ok) {
        alert("Unable to initiate payment");
        return;
      }

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: "INR",
        name: "The Red Carpet",
        description: pass.name,
        order_id: data.orderId,

        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              bookingId: data.bookingId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verify = await verifyRes.json();

          if (verify.success) {
            window.location.href = `/ticket/${data.bookingId}`;
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#C9A24D" },
      };

      new window.Razorpay(options).open();
    } catch {
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

        {showAuthPrompt && (
          <div className="fixed top-24 right-4 bg-red-900 border border-red-500 text-white px-6 py-4 rounded-lg shadow-xl z-50">
            ⚠️ Please Login or Sign Up to book passes!
          </div>
        )}

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
                onClick={() => handleBookNowClick(pass)}
                className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black transition"
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
