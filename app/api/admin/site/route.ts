import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteContent from "@/models/SiteContent";

export async function GET() {
  await connectDB();
  const content = await SiteContent.findOne().exec();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const content = await SiteContent
    .findOneAndUpdate({}, body, { upsert: true, new: true })
    .exec();

  return NextResponse.json(content);
}
