export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    // 🔐 ENV SUPER ADMIN
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        admin = await Admin.create({
          email,
          password: await bcrypt.hash(password, 10),
          role: "SUPER",
        });
      }

      const token = jwt.sign(
        { adminId: admin._id, role: admin.role },
        process.env.JWT_ADMIN_SECRET!,
        { expiresIn: "7d" }
      );

      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      });

      return res;
    }

    // 🔐 DB ADMIN
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_ADMIN_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
