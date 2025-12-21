"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyTicketsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (!data.success) {
        router.push("/");
        return;
      }

      setUser(data.user);
      fetchBookings();
    } catch (error) {
      router.push("/");
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/user/bookings");
      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading your tickets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gold mb-2">My Tickets</h1>
            <p className="text-gray-300">Welcome back, {user?.name}!</p>
          </div>
          
          <Link href="/">
            <button className="bg-white/10 border border-gold/30 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
              ← Back to Home
            </button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-black/40 border border-gold/30 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎟️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Tickets Yet
            </h2>
            <p className="text-gray-400 mb-6">
              You haven't booked any tickets yet. Get your pass now!
            </p>
            <Link href="/#passes">
              <button className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                Browse Passes
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-red-900/40 to-black border border-gold/30 rounded-2xl p-6 hover:border-gold/60 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gold">
                    {booking.passName}
                  </h3>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <p><strong>Reference:</strong> {booking.reference}</p>
                  <p><strong>Quantity:</strong> {booking.quantity} tickets</p>
                  <p><strong>Amount:</strong> ₹{booking.amount}</p>
                  <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3">
                  <Link href={`/ticket/${booking._id}`} className="flex-1">
                    <button className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                      View Ticket
                    </button>
                  </Link>
                  
                  <button
                    onClick={() => {
                      window.open(`/ticket/${booking._id}`, '_blank');
                    }}
                    className="bg-white/10 border border-gold/30 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition"
                    title="Print"
                  >
                    🖨️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}