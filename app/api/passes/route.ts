export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fetch ALL passes safely
    const passes = await Pass.find({}).lean();

    const normalized = passes.map((pass: any) => {
      let remainingCount = pass.remainingCount;

      if (remainingCount == null) {
        if (pass.name === "Classic") remainingCount = 250;
        if (pass.name === "VIP") remainingCount = 280;
        if (pass.name === "VVIP") remainingCount = 170;
      }

      return {
        ...pass,
        remainingCount: remainingCount ?? 0,
      };
    });

    return NextResponse.json(normalized);
  } catch (err) {
    console.error("PASSES API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch passes" },
      { status: 500 }
    );
  }
}
