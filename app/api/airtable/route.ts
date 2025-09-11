// app/api/airtable/route.ts
import { NextResponse } from "next/server";

// Forcer l’exécution côté Node (pas Edge), pas de cache ISR
export const runtime = "nodejs";
export const revalidate = 0;

const {
  AIRTABLE_TOKEN,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE, // ex: "Gestion des Joueurs"
  AIRTABLE_TABLE_ID, // ex: "tblXXXXXXXXXXXX"
} = process.env;

// --- Types Airtable minimalistes ---
interface AirtableRecord<T = any> {
  id: string;
  createdTime?: string;
  fields: T;
}
interface AirtableListResponse<T = any> {
  records: AirtableRecord<T>[];
  offset?: string;
}
interface AirtableCreateRequest<T = any> {
  records: Array<{ fields: T }>;
}
type LeadFields = { Pseudo: string; Email: string };

// --- Helpers ---
function tablePath(): string {
  return encodeURIComponent(AIRTABLE_TABLE_ID ?? AIRTABLE_TABLE ?? "");
}
function baseUrl(): string {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tablePath()}`;
}
function authHeaders() {
  return {
    Authorization: `Bearer ${AIRTABLE_TOKEN as string}`,
    "Content-Type": "application/json",
  };
}

// GET -> { ok, count }
export async function GET() {
  try {
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

    let count = 0;
    let offset: string | undefined = undefined;

    // Pagination : on compte toutes les pages (100 par page)
    do {
      const listUrl: string = offset
        ? `${baseUrl()}?pageSize=100&offset=${offset}`
        : `${baseUrl()}?pageSize=100`;

      const res = await fetch(listUrl, {
        headers: authHeaders(),
        cache: "no-store",
      });

      const data = (await res.json()) as AirtableListResponse<LeadFields>;
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, status: res.status, airtable: data },
          { status: res.status }
        );
      }

      count += Array.isArray(data.records) ? data.records.length : 0;
      offset = data.offset;
    } while (offset);

    return NextResponse.json({ ok: true, count }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// POST -> crée {Pseudo, Email}
export async function POST(req: Request) {
  try {
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

    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: 'Content-Type must be "application/json"' },
        { status: 415 }
      );
    }

    const body = (await req.json()) as { pseudo?: string; email?: string };
    const pseudo = body.pseudo?.trim();
    const email = body.email?.trim();

    if (!pseudo || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing fields pseudo and/or email" },
        { status: 400 }
      );
    }

    const payload: AirtableCreateRequest<LeadFields> = {
      records: [{ fields: { Pseudo: pseudo, Email: email } }],
    };

    const res = await fetch(baseUrl(), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = (await res.json()) as AirtableListResponse<LeadFields>;
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, status: res.status, airtable: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, airtable: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

