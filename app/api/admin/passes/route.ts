export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    verifyAdmin();
    await dbConnect();

    const passes = Pass.find().where("visible").equals(true).lean();

    return NextResponse.json(passes);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}
