"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-white">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black border-r border-gold/20 p-6">
        <h1 className="text-2xl text-gold font-bold mb-8">
          THE RED CARPET
        </h1>

        <nav className="space-y-4">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/live">Live Page Editor</Link>
          <Link href="/admin/passes">Passes & Phases</Link>
          <Link href="/admin/bookings">Bookings</Link>
          <Link href="/admin/scan">QR Scan</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
