"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/admin" },
  { name: "Bookings", href: "/admin/bookings" },
  { name: "QR Scanner", href: "/admin/scan" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-gold/30 p-6">
      <h2 className="text-2xl font-bold text-gold mb-8">
        Admin Panel
      </h2>

      <nav className="space-y-3">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg font-medium transition
                ${
                  active
                    ? "bg-gold text-black"
                    : "text-white hover:bg-white/10"
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
