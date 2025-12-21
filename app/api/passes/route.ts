export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    const passes = await Pass.find({ visible: true }).exec();

    /* ---------- AUTO INITIALISE COUNTS ---------- */
    for (const pass of passes) {
      let expectedCount: number | null = null;

      if (pass.name === "Classic") expectedCount = 250;
      if (pass.name === "VIP") expectedCount = 280;
      if (pass.name === "VVIP") expectedCount = 170;

      if (
        expectedCount !== null &&
        (pass.remainingCount === undefined ||
          pass.remainingCount === null)
      ) {
        pass.remainingCount = expectedCount;
        await pass.save();
      }
    }

    return NextResponse.json(passes);
  } catch (err) {
    console.error("PASSES API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load passes" },
      { status: 500 }
    );
  }
}
