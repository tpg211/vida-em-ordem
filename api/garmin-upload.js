import { put } from '@vercel/blob';

/**
 * Vercel serverless function — receives Garmin data from the local server
 * and stores it in Vercel Blob private store.
 *
 * Protected by SYNC_SECRET header to prevent unauthorized uploads.
 * Called automatically by server/index.js after each Garmin sync.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-sync-secret');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const secret = req.headers['x-sync-secret'];
  if (secret !== process.env.SYNC_SECRET) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    await put('garmin-data.json', body, {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
