// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

// Tells the Compose form whether Airtable Lookup mode should be offered.
// Configure AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME in Vercel
// env vars to enable it — until then this returns { available: false } and
// the frontend falls back to Manual Entry only, no error shown.
export default async function handler(_req: Req, res: Res) {
  const available = Boolean(
    process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME
  );
  res.status(200).json({ available });
}
