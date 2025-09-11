import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, pseudo } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const baseId = process.env.AIRTABLE_BASE_ID!;
    const token = process.env.AIRTABLE_TOKEN!;
    const tableName = process.env.AIRTABLE_TABLE || "Joueurs";

    const fields = {
      Email: email,
      Pseudo: pseudo,
    };

    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }] }),
      }
    );

    const data = await res.json();

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      airtable: data,
    });
  } catch (err: any) {
    console.error("Erreur serveur:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Erreur inconnue" },
      { status: 500 }
    );
  }
}