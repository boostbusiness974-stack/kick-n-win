// app/api/airtable/route.ts
import { NextResponse } from "next/server";

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE, AIRTABLE_TABLE_ID } = process.env;

function tablePath() {
  return encodeURIComponent(AIRTABLE_TABLE_ID || AIRTABLE_TABLE || "");
}

export async function POST(req: Request) {
  try {
    // Vérif env
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !(AIRTABLE_TABLE || AIRTABLE_TABLE_ID)) {
      return NextResponse.json({ ok: false, error: "Missing env" }, { status: 500 });
    }

    // Vérif content-type + corps JSON
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Content-Type must be application/json" }, { status: 415 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { pseudo, email } = body;
    if (!pseudo || !email) {
      return NextResponse.json({ ok: false, error: "Missing fields pseudo/email" }, { status: 400 });
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath()}`;
    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: { Pseudo: pseudo, Email: email } }],
      }),
      cache: "no-store",
    });

    const data = await airtableRes.json().catch(() => ({}));
    if (!airtableRes.ok) {
      return NextResponse.json(
        { ok: false, status: airtableRes.status, airtable: data },
        { status: airtableRes.status }
      );
    }

    return NextResponse.json({ ok: true, airtable: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  // Ping/healthcheck
  return NextResponse.json({ ok: true, hint: "POST { pseudo, email }" });
}
