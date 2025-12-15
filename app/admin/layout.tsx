import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <aside className="w-64 border-r border-gold/30 p-6">
        <h2 className="text-xl font-bold text-gold mb-8">
          The Red Carpet
        </h2>

        <nav className="space-y-4">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/passes">Passes</Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
