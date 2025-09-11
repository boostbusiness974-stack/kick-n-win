import fetch from "node-fetch";

const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE_ID;
const table = process.env.AIRTABLE_TABLE;

async function test() {
  const url = `https://api.airtable.com/v0/${baseId}/${table}?maxRecords=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Réponse Airtable:", data);
}

test().catch(console.error);