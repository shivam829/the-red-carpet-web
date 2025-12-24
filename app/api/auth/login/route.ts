export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Phone/Email and password required" },
        { status: 400 }
      );
    }

    /* 🔐 ADMIN LOGIN */
    if (identifier === "1234567890" && password === "redcarpet@1") {
      const adminToken = jwt.sign(
        { role: "admin", phone: identifier },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      cookies().set("auth_token", adminToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: { name: "Admin", role: "admin" },
        redirect: "/admin/dashboard",
      });
    }

    await connectDB();

    const user = await User.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    cookies().set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
