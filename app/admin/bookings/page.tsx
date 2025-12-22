"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminBookings() {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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

  // ✅ AUTHENTICATED DOWNLOAD (PASS + RECEIPT)
  const downloadCombined = async (id: string, reference: string) => {
    try {
      setDownloadingId(id);

      const res = await fetch(`/api/admin/download/${id}`, {
        credentials: "include",
      });

      if (!res.ok) {
        alert("Download failed or unauthorized");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Ticket-${reference}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download file");
    } finally {
      setDownloadingId(null);
    }
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
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((b) => (
            <tr
              key={b._id}
              className="border-t border-white/10 text-center"
            >
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.reference}</td>
              <td>₹{b.amount}</td>
              <td>{b.status}</td>
              <td>{b.isUsed ? "YES" : "NO"}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>

              <td>
                {b.status === "PAID" ? (
                  <button
  onClick={() =>
    window.open(`/admin/print/${b._id}`, "_blank")
  }
  className="px-4 py-1 bg-gold text-black rounded text-xs font-semibold hover:bg-yellow-600 transition"
>
  🖨 Pass + Receipt
</button>

                ) : (
                  <span className="text-gray-500 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
