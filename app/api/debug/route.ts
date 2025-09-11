// app/api/debug/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Debug route OK',
    env: {
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID ? 'SET' : 'MISSING',
      AIRTABLE_TOKEN: process.env.AIRTABLE_TOKEN ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV || null,
    },
  });
}