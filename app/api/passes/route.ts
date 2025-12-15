import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  await connectDB();
  const passes = await Pass.find({ visible: true }).exec();
  return NextResponse.json(passes);
}
