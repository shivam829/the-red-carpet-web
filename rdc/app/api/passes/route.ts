export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    const passes = await Pass.find({}).lean();

    const normalized = passes.map((p: any) => ({
      ...p,
      remainingCount:
        typeof p.remainingCount === "number"
          ? p.remainingCount
          : p.name === "Classic"
          ? 250
          : p.name === "VIP"
          ? 280
          : p.name === "VVIP"
          ? 170
          : 0,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("🔥 PASSES API CRASH:", error);
    return NextResponse.json(
      { error: "Failed to fetch passes" },
      { status: 500 }
    );
  }
}
