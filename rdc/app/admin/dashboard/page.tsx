"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setBookings(data.recentBookings || []);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link href="/admin/bookings">
              <button className="px-4 py-2 bg-gold/20 border border-gold rounded-lg hover:bg-gold/30 transition text-gold">
                View All Bookings
              </button>
            </Link>
            <Link href="/">
              <button className="px-4 py-2 bg-white/10 border border-gold/30 rounded-lg hover:bg-white/20 transition text-white">
                ← Back to Site
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-xl p-6">
            <div className="text-blue-400 text-3xl mb-2">📊</div>
            <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{stats?.totalBookings || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 rounded-xl p-6">
            <div className="text-green-400 text-3xl mb-2">💰</div>
            <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-white">₹{stats?.totalRevenue?.toLocaleString() || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/40 to-black border border-yellow-500/30 rounded-xl p-6">
            <div className="text-yellow-400 text-3xl mb-2">🎟️</div>
            <p className="text-gray-400 text-sm mb-1">Tickets Sold</p>
            <p className="text-3xl font-bold text-white">{stats?.ticketsSold || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black border border-red-500/30 rounded-xl p-6">
            <div className="text-red-400 text-3xl mb-2">⏳</div>
            <p className="text-gray-400 text-sm mb-1">Pending Payments</p>
            <p className="text-3xl font-bold text-white">{stats?.pendingPayments || 0}</p>
          </div>
        </div>

        {/* Pass-wise Breakdown */}
        <div className="bg-black/50 border border-gold/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gold mb-4">Pass Distribution</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {stats?.passSales?.map((pass: any) => (
              <div key={pass.passName} className="bg-black/40 border border-gold/20 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">{pass.passName}</p>
                <p className="text-2xl font-bold text-white mb-2">{pass.count} sold</p>
                <p className="text-gold text-sm">₹{pass.revenue?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-black/50 border border-gold/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-4 text-gold">Reference</th>
                  <th className="text-left py-3 px-4 text-gold">Name</th>
                  <th className="text-left py-3 px-4 text-gold">Pass</th>
                  <th className="text-left py-3 px-4 text-gold">Qty</th>
                  <th className="text-left py-3 px-4 text-gold">Amount</th>
                  <th className="text-left py-3 px-4 text-gold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-gold/10">
                    <td className="py-3 px-4 text-gray-300">{booking.reference}</td>
                    <td className="py-3 px-4 text-gray-300">{booking.name}</td>
                    <td className="py-3 px-4 text-gray-300">{booking.passName}</td>
                    <td className="py-3 px-4 text-gray-300">{booking.quantity}</td>
                    <td className="py-3 px-4 text-gray-300">₹{booking.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "PAID" 
                          ? "bg-green-600 text-white"
                          : booking.status === "PENDING"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}