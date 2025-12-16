export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { secret } = await req.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "12h" }
  );

  return NextResponse.json({ token });
}
