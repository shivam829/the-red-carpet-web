export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";



export async function GET() {
  await dbConnect();

  const passes = await Pass.find()
    .where("visible")
    .equals(true)
    .exec();

  /* ---------- AUTO INITIALISE COUNTS (MOCK DB SAFE) ---------- */
  for (const pass of passes) {
    let expectedCount: number | null = null;

    if (pass.name === "Classic") expectedCount = 250;
    if (pass.name === "VIP") expectedCount = 280;
    if (pass.name === "VVIP") expectedCount = 170;

    // ✅ Only set if not already customised
    if (
      expectedCount !== null &&
      (pass.remainingCount === undefined ||
        pass.remainingCount === null ||
        pass.remainingCount === 590)
    ) {
      pass.remainingCount = expectedCount;
      await pass.save();
    }
  }

  return NextResponse.json(passes);
}
