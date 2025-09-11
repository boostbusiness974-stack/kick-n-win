// app/api/airtable/route.ts
import { NextResponse } from "next/server";

const {
  AIRTABLE_TOKEN,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE,    // nom lisible (ex: "Gestion des Joueurs")
  AIRTABLE_TABLE_ID, // ID de table (ex: "tblXXXXXXXXXXXX")
} = process.env;

/**
 * GET -> renvoie { ok: true, count: number }
 * Utilisé par la landing pour afficher la barre de progression.
 */
export async function GET() {
  try {
    // Vérif env
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || (!AIRTABLE_TABLE && !AIRTABLE_TABLE_ID)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing environment variables",
          needs: {
            AIRTABLE_TOKEN: !!AIRTABLE_TOKEN,
            AIRTABLE_BASE_ID: !!AIRTABLE_BASE_ID,
            oneOf: { AIRTABLE_TABLE: !!AIRTABLE_TABLE, AIRTABLE_TABLE_ID: !!AIRTABLE_TABLE_ID },
          },
        },
        { status: 500 }
      );
    }

    const tablePath = encodeURIComponent(AIRTABLE_TABLE_ID ?? AIRTABLE_TABLE!);
    const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath}`;

    let count = 0;
    let offset: string | undefined = undefined;

    // Itère sur toutes les pages (pageSize=100) pour compter correctement
    do {
      const url: string = offset
  ? `${baseUrl}?pageSize=100&offset=${offset}`
  : `${baseUrl}?pageSize=100`;


      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, status: res.status, airtable: data },
          { status: res.status }
        );
      }

      count += Array.isArray(data.records) ? data.records.length : 0;
      offset = data.offset; // undefined quand il n'y a plus de page
    } while (offset);

    return NextResponse.json({ ok: true, count }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

/**
 * POST -> crée un enregistrement { Pseudo, Email } dans Airtable
 * Body JSON: { pseudo: string, email: string }
 */
export async function POST(req: Request) {
  try {
    // 1) Vérif env
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || (!AIRTABLE_TABLE && !AIRTABLE_TABLE_ID)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing environment variables",
          needs: {
            AIRTABLE_TOKEN: !!AIRTABLE_TOKEN,
            AIRTABLE_BASE_ID: !!AIRTABLE_BASE_ID,
            oneOf: { AIRTABLE_TABLE: !!AIRTABLE_TABLE, AIRTABLE_TABLE_ID: !!AIRTABLE_TABLE_ID },
          },
        },
        { status: 500 }
      );
    }

    // 2) Vérif Content-Type + body
    if (req.headers.get("content-type")?.includes("application/json") !== true) {
      return NextResponse.json(
        { ok: false, error: 'Content-Type must be "application/json"' },
        { status: 415 }
      );
    }
    const { pseudo, email } = await req.json();
    if (!pseudo || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing fields pseudo and/or email" },
        { status: 400 }
      );
    }

    // 3) URL Airtable (privilégier l'ID de table s'il est présent)
    const tablePath = encodeURIComponent(AIRTABLE_TABLE_ID ?? AIRTABLE_TABLE!);
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath}`;

    // 4) Appel Airtable
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
      // renvoie tel quel pour voir 403/422 etc.
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
