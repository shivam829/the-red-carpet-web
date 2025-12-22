"use client";

import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Passes() {
  const router = useRouter(); // ✅ HOOK AT TOP LEVEL

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
        if (!res.ok) return;

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
      } catch {}
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
    let mounted = true;
    let interval: any = null;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (mounted && data?.success) setUser(data.user);
        else if (mounted) setUser(null);
      } catch {
        if (mounted) setUser(null);
      }
    };

    checkAuth();
    interval = setInterval(checkAuth, 3000);

    const handleFocus = () => checkAuth();
    const handleUserLoggedIn = () => checkAuth();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("userLoggedIn", handleUserLoggedIn);

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
    };
  }, []);

  const handleBookNowClick = (pass: any) => {
    if (!user) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    setSelectedPass(pass);
  };

  /* ------------------ PAYMENT ------------------ */
  const startPayment = async (pass: any, form: any) => {
    if (!window.Razorpay) {
      alert("Payment system is loading, please try again.");
      return;
    }

    setLoading(true);

    try {
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

      if (!res.ok) throw new Error("Order failed");

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
            setSelectedPass(null); // ✅ CLOSE MODAL AFTER SUCCESS
            router.push(`/ticket/${data.bookingId}`); // ✅ SPA NAVIGATION
          } else {
            alert("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: { color: "#C9A24D" },
      });

      rzp.open(); // ✅ OPEN FIRST
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <section id="passes" className="py-24 px-6 bg-black/60">
        <h2 className="text-4xl font-bold text-gold text-center mb-6">
          Passes
        </h2>

        {showAuthPrompt && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl z-50">
            ⚠️ Please login first to book passes
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

              <p className="text-gray-300">
                Available:{" "}
                <span className="text-gold font-semibold">
                  {pass.remainingCount}
                </span>
              </p>

              <p className="text-xl font-semibold mt-2">
                ₹{pass.price}
              </p>

              <p className="text-sm text-gray-400 mb-4">
                + 3% booking charge
              </p>

              <button
                onClick={() => handleBookNowClick(pass)}
                disabled={pass.remainingCount <= 0}
                className="px-6 py-3 bg-redcarpet rounded-lg hover:bg-gold hover:text-black"
              >
                {pass.remainingCount <= 0 ? "Sold Out" : "Book Now"}
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
