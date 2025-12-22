import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdmin(req?: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No admin token");
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (!decoded || decoded.role !== "admin") {
      throw new Error("Not admin");
    }

    return decoded;
  } catch (err) {
    throw new Error("Invalid admin token");
  }
}
