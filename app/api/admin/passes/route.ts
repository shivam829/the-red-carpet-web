import { connectDB } from "@/lib/db";
import Pass from "@/models/Pass";

export async function GET() {
  await connectDB(); // ✅ only runs at request time

  const passes = await Pass.find();
  return Response.json(passes);
}
