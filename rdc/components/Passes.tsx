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

  /* ------------------ FETCH PASSES ------------------ */
  useEffect(() => {
    let mounted = true;
    let interval: any = null;

    const fetchPasses = async () => {
      try {
        const res = await fetch("/api/passes", { cache: "no-store" });

        if (!res.ok) {
          console.error("Passes API failed:", res.status);
          clearInterval(interval);
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data)) return;

        if (mounted) {
          setPasses(data);
          setTotalRemaining(
            data.reduce(
              (sum: number, p: any) => sum + (p.remainingCount || 0),
              0
            )
          );
        }
      } catch (err) {
        console.error("Fetch passes error:", err);
        clearInterval(interval);
      }
    };

    fetchPasses();
    interval = setInterval(fetchPasses, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* ------------------ FETCH USER ------------------ */
  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        console.log("🔍 User fetch result:", data); // Debug log
        setUser(data?.success ? data.user : null);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        setUser(null);
      });
  }, []);

  const handleBookNowClick = (pass: any) => {
    console.log("🔍 Book Now clicked", { pass, user }); // Debug log
    
    if (!user) {
      console.log("🔍 User not logged in, showing prompt");
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    
    console.log("🔍 Setting selected pass");
    setSelectedPass(pass);
  };

  const startPayment = async (pass: any, form: any) => {
    console.log("🔍 Starting payment", { pass, form }); // Debug log
    
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert("Payment system is loading, please try again in a moment.");
      return;
    }

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
        alert("Failed to create order");
        return;
      }

      const data = await res.json();

      const rzp = new window.Razorpay({
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
      });
      
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
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

        {/* Auth Prompt */}
        {showAuthPrompt && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            ⚠️ Please login first to book passes
          </div>
        )}

        <div className="text-center mb-10">
          <div className="inline-block bg-red-900/80 border border-gold px-8 py-4 rounded-2xl">
            <p className="text-xl font-bold text-gold">
              🎟️ Available Passes: {totalRemaining}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {passes.length === 0 && (
            <p className="col-span-3 text-center text-gray-400">
              Passes will be available shortly.
            </p>
          )}

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
                className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pass.remainingCount <= 0 ? "Sold Out" : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedPass && (
        <BookingModal
          pass={selectedPass}
          onClose={() => {
            console.log("🔍 Closing modal");
            setSelectedPass(null);
          }}
          onSubmit={(data) => startPayment(selectedPass, data)}
        />
      )}
    </>
  );
}