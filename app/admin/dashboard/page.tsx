"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
  });

  useEffect(() => {
    fetch("/api/admin/bookings", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const bookings = data.bookings || [];
        setStats({
          total: bookings.length,
          checkedIn: bookings.filter((b: any) => b.isUsed).length,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-gold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-black/60 p-6 rounded">
          <p>Total Bookings</p>
          <h2 className="text-3xl">{stats.total}</h2>
        </div>

        <div className="bg-black/60 p-6 rounded">
          <p>Checked In</p>
          <h2 className="text-3xl">{stats.checkedIn}</h2>
        </div>
      </div>
    </div>
  );
}
