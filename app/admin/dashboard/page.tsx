import { getAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
  const admin = getAdminSession();
  if (!admin) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-3xl text-gold font-bold mb-6">
        Admin Dashboard
      </h1>

      <a
        href="/admin/passes"
        className="block p-6 bg-black/50 border border-gold/30 rounded-xl"
      >
        Pass & Phase Management
      </a>
    </div>
  );
}
