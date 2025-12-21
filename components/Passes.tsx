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
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [selectedPass, setSelectedPass] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // 🔁 REAL-TIME POLLING (5 sec)
  useEffect(() => {
    const fetchPasses = async () => {
      const res = await fetch("/api/passes");
      const data = await res.json();

      setPasses(data);

      const total = data.reduce(
        (sum: number, p: any) => sum + (p.remainingCount || 0),
        0
      );
      setTotalRemaining(total);
    };

    fetchPasses();
    const interval = setInterval(fetchPasses, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.success ? data.user : null))
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
    } finally {
      setLoading(false);
      setSelectedPass(null);
    }
  };

  return (
    <>
      <section id="passes" className="py-24 px-6 bg-black/60">
        <h2 className="text-4xl font-bold text-gold text-center mb-6">
          Passes
        </h2>

        {/* TOTAL AVAILABLE */}
        <div className="text-center mb-10">
          <div className="inline-block bg-red-900/80 border border-gold px-8 py-4 rounded-2xl">
            <p className="text-xl font-bold text-gold">
              🎟️ Available Passes: {totalRemaining}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {passes.map((pass) => (
            <div
              key={pass._id}
              className="border border-gold/30 p-6 rounded-xl text-center bg-black/50 transition hover:scale-105"
            >
              <h3 className="text-2xl font-bold text-gold mb-2">
                {pass.name}
              </h3>

              <p className="text-gray-300 mb-1">
                Available:{" "}
                <span className="text-gold font-semibold">
                  {pass.remainingCount}
                </span>
              </p>

              <p className="text-xl mb-4">₹{pass.price}</p>

              <button
                disabled={pass.remainingCount <= 0}
                onClick={() => handleBookNowClick(pass)}
                className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black transition disabled:opacity-50"
              >
                {pass.remainingCount <= 0 ? "Sold Out" : "Book Now"}
              </button>
            </div>
          ))}
        </div>

        {/* DISTRICT CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://www.district.in/events/the-red-carpet-bhopals-grandest-new-year-celebration-dec31-2025-buy-tickets"
            target="_blank"
            className="flex items-center gap-4 border border-gold px-8 py-4 rounded-xl hover:bg-white/10 transition"
          >
            <span className="text-lg font-semibold text-white">
              Book on District App
            </span>
            <img src="/download.jpg" className="w-10 h-10" />
          </a>
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
