"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h1 className="text-gold text-xl font-bold mb-8">
          THE RED CARPET
        </h1>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/bookings">Bookings</Link>
          <Link href="/admin/scan">QR Scan</Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", {
              method: "POST",
              credentials: "include",
            });
            window.location.href = "/admin/login";
          }}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
