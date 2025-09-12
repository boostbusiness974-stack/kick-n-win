// app/api/airtable/count/route.ts
import { NextResponse } from "next/server";

const {
  AIRTABLE_TOKEN,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE,
  AIRTABLE_TABLE_ID,
} = process.env;

export async function GET() {
  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !(AIRTABLE_TABLE || AIRTABLE_TABLE_ID)) {
      return NextResponse.json({ ok: false, error: "Missing env" }, { status: 500 });
    }

    const table = encodeURIComponent(AIRTABLE_TABLE_ID || AIRTABLE_TABLE!);
    // ✅ baseUrl corrigé
    const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`;

    let offset: string | undefined = undefined;
    let total = 0;

    do {
      // ✅ renommer + typer pour éviter l’erreur TS
      const pageUrl: string = offset
        ? `${baseUrl}?pageSize=100&offset=${offset}`
        : `${baseUrl}?pageSize=100`;

      const res = await fetch(pageUrl, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
        cache: "no-store",
      });

      const data = await res.json() as { records?: any[]; offset?: string };

      if (!res.ok) {
        return NextResponse.json(
          { ok: false, status: res.status, airtable: data },
          { status: res.status }
        );
      }

      total += Array.isArray(data?.records) ? data.records.length : 0;
      offset = data?.offset;
    } while (offset);

    return NextResponse.json({ ok: true, count: total });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}