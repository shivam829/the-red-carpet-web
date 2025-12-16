export const dynamic = "force-dynamic";


import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

import Pass from "@/models/Pass";

export async function GET() {
  await dbConnect();

  const passes = await Pass.find().where("visible").equals(true).exec();
  return NextResponse.json(passes);
}
