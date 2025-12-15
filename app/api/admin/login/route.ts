import { NextResponse } from "next/server";
import { authenticateAdmin, setAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admin = authenticateAdmin(email, password);

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    setAdminSession(email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Bad request" },
      { status: 400 }
    );
  }
}
