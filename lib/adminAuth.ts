import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyAdmin() {
  const token = cookies().get("admin_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const payload = jwt.verify(
    token,
    process.env.JWT_ADMIN_SECRET!
  ) as any;

  return payload;
}

export function verifySuperAdmin() {
  const payload = verifyAdmin();
  if (payload.role !== "SUPER") {
    throw new Error("Forbidden");
  }
  return payload;
}
