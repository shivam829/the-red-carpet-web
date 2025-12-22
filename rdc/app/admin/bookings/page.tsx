"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminBookings() {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/bookings", { credentials: "include" })
      .then((res) => res.json())
      .then((res) => setData(res.bookings || []));
  }, []);

  const safe = (v: any) => (v ?? "").toString().toLowerCase();

  const filtered = data.filter((b) =>
    safe(b.reference).includes(query.toLowerCase()) ||
    safe(b.phone).includes(query.toLowerCase())
  );

  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(
      filtered.map((b) => ({
        Name: b.name,
        Phone: b.phone,
        Reference: b.reference,
        Amount: b.amount,
        Status: b.status,
        Used: b.isUsed ? "YES" : "NO",
        BookedAt: new Date(b.createdAt).toLocaleString(),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Bookings");
    XLSX.writeFile(wb, "bookings.xlsx");
  };

  return (
    <div>
      <h1 className="text-3xl text-gold mb-4">Bookings</h1>

      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search by phone or reference"
          className="p-2 bg-black border border-white/20"
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={exportExcel}
          className="bg-gold px-4 py-2 text-black rounded"
        >
          Download Excel
        </button>
      </div>

      <table className="w-full text-sm border border-white/10">
        <thead className="bg-black/60">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Reference</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Used</th>
            <th>Booked At</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((b) => (
            <tr key={b._id} className="border-t border-white/10 text-center">
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.reference}</td>
              <td>₹{b.amount}</td>
              <td>{b.status}</td>
              <td>{b.isUsed ? "YES" : "NO"}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
