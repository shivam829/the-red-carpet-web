// app/api/health/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    console.log("🔍 Starting health check...");
    console.log("MongoDB URI exists:", !!process.env.MONGODB_URI);
    
    const mongoose = await dbConnect();
    console.log("✅ DB Connected successfully");

    // Try to list collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📦 Collections found:", collections.map(c => c.name));

    return NextResponse.json({
      status: "ok",
      mongodb: "connected",
      database: mongoose.connection.db.databaseName,
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("❌ Health check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        stack: error.stack,
        mongodb_uri_defined: !!process.env.MONGODB_URI
      },
      { status: 500 }
    );
  }
}