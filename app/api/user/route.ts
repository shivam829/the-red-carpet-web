// app/api/user/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate fetching user data
  const user = { name: 'Test User' };
  return NextResponse.json(user);
}