import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  try {
    await dbConnect();

    const passes = await Pass.find({ visible: true }).lean();

    return NextResponse.json(passes);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}
