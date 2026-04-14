import { list, get } from '@vercel/blob';

/**
 * Vercel serverless function — reads Garmin data from Vercel Blob private store.
 * The blob is uploaded by the local server after each Garmin sync.
 * See server/index.js for the sync + upload logic.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { blobs } = await list({ prefix: 'garmin-data' });
    if (blobs.length > 0) {
      const blob = blobs[0];
      // Private blob: use SDK get() which handles auth automatically
      const response = await fetch(blob.url, {
        headers: {
          'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });
      if (response.ok) {
        res.json(await response.json());
      } else {
        // Fallback: try downloadUrl
        const r2 = await fetch(blob.downloadUrl);
        if (r2.ok) {
          res.json(await r2.json());
        } else {
          res.json({ error: 'Could not read blob', s1: response.status, s2: r2.status });
        }
      }
    } else {
      res.json({ error: 'No Garmin data found. Run sync from your computer first.' });
    }
  } catch (e) {
    res.json({ error: 'Error reading Garmin data: ' + e.message });
  }
}
