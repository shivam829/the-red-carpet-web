import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function requireAdmin() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin")?.value;

  if (!isAdmin) {
    redirect("/admin/login");
  }
}
