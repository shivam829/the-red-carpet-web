// app/api/admin/create/route.ts
// ⚠️ USE ONCE THEN DELETE THIS FILE FOR SECURITY

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Get credentials from env
    const email = process.env.ADMIN_EMAIL || "admin@redcarpet.com";
    const password = process.env.ADMIN_PASSWORD || "supersecure123";

    await dbConnect();

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
      role: "SUPER",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error("❌ Create admin error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create admin",
        error: error.message 
      },
      { status: 500 }
    );
  }
}