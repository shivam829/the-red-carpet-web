import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin", "true");
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
