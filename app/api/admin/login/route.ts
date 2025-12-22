import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("🔍 [ADMIN LOGIN] Starting...");
    
    const { email, password } = await req.json();
    console.log("🔍 [ADMIN LOGIN] Email:", email);

    await dbConnect();
    console.log("✅ [ADMIN LOGIN] DB Connected");

    // Find admin by email
    const admin = await Admin.findOne({ email });
    console.log("🔍 [ADMIN LOGIN] Admin found:", !!admin);

    if (!admin) {
      console.log("❌ [ADMIN LOGIN] Admin not found");
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔍 [ADMIN LOGIN] Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ [ADMIN LOGIN] Password mismatch");
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check JWT secret
    if (!process.env.JWT_ADMIN_SECRET) {
      console.error("❌ [ADMIN LOGIN] JWT_ADMIN_SECRET not set!");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "24h" }
    );
    console.log("✅ [ADMIN LOGIN] Token generated");

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
    });

    console.log("✅ [ADMIN LOGIN] Success");
    return response;
  } catch (error: any) {
    console.error("❌ [ADMIN LOGIN] Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error",
        details: error.message 
      },
      { status: 500 }
    );
  }
}