import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Pass.find().exec());
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const pass = await Pass
    .findOneAndUpdate(
      { name: body.name },
      body,
      { upsert: true, new: true }
    )
    .exec();

  return NextResponse.json(pass);
}
