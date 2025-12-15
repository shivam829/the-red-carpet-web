import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  await connectDB();

  const passes = await Pass.find({ visible: true } as any).sort({
    phase: 1,
    price: 1,
  });

  return NextResponse.json(passes);
}
