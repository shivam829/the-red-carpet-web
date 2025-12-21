export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fetch passes safely (old + new docs)
    const passes = await Pass.find({
      $or: [{ visible: true }, { visible: { $exists: false } }],
    }).lean();

    // ✅ Apply defaults WITHOUT mutating DB
    const normalized = passes.map((pass: any) => {
      let defaultCount = pass.remainingCount;

      if (defaultCount == null) {
        if (pass.name === "Classic") defaultCount = 250;
        if (pass.name === "VIP") defaultCount = 280;
        if (pass.name === "VVIP") defaultCount = 170;
      }

      return {
        ...pass,
        remainingCount: defaultCount ?? 0,
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
