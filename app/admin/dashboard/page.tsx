"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Pass", "Qty", "Ref", "Checked In"],
      ...data.map(b => [
        b.name,
        b.email,
        b.phone,
        b.passName,
        b.quantity,
        b.reference,
        b.checkedIn ? "YES" : "NO",
      ]),
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendees.csv";
    link.click();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <button onClick={exportCSV} className="bg-gold px-4 py-2 mb-4">
        Export CSV
      </button>

      <p>Total Bookings: {data.length}</p>
      <p>Checked In: {data.filter(b => b.checkedIn).length}</p>
    </div>
  );
}
