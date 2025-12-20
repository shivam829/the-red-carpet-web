// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Here, you can revoke the token, clear cookies, or perform other logout actions
  // For now, just return success
  return NextResponse.json({ message: 'Logged out successfully' });
}