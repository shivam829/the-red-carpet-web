export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    const passes = await Pass.find({
      visible: { $ne: false }, // ✅ includes true + undefined
    }).exec();

    /* ---------- SAFE AUTO INITIALISE COUNTS ---------- */
    for (const pass of passes) {
      let expectedCount: number | null = null;

      if (pass.name === "Classic") expectedCount = 250;
      if (pass.name === "VIP") expectedCount = 280;
      if (pass.name === "VVIP") expectedCount = 170;

      if (
        expectedCount !== null &&
        (typeof pass.remainingCount !== "number" ||
          pass.remainingCount <= 0)
      ) {
        pass.remainingCount = expectedCount;
        await pass.save();
      }
    }

    return NextResponse.json(passes);
  } catch (err) {
    console.error("PASSES API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch passes" },
      { status: 500 }
    );
  }
}
