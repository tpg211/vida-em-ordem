import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GarminConnect } from 'garmin-connect';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_FILE = join(__dirname, '..', 'strava-tokens.json');
const GARMIN_CACHE = join(__dirname, '..', 'garmin-data.json');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, PORT } = process.env;

// ── Token persistence ──────────────────────────────────────────────────────────
function loadTokens() {
  if (existsSync(TOKENS_FILE)) return JSON.parse(readFileSync(TOKENS_FILE, 'utf-8'));
  return null;
}
function saveTokens(tokens) {
  writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

// ── Auto-refresh Strava token if expired ──────────────────────────────────────
async function getFreshToken() {
  const tokens = loadTokens();
  if (!tokens) return null;
  const now = Math.floor(Date.now() / 1000);
  if (tokens.expires_at > now + 300) return tokens.access_token;

  const res = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: tokens.refresh_token,
    }),
  });
  const data = await res.json();
  if (data.access_token) { saveTokens(data); return data.access_token; }
  return null;
}

// ── Auth routes ────────────────────────────────────────────────────────────────
app.get('/auth/status', (req, res) => res.json({ authenticated: !!loadTokens() }));

app.get('/auth/strava', (req, res) => {
  const url = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(STRAVA_REDIRECT_URI)}&response_type=code&scope=activity:read_all,profile:read_all&approval_prompt=auto`;
  res.redirect(url);
});

app.get('/auth/strava/callback', async (req, res) => {
  const { code, error } = req.query;
  if (error) return res.send(`<h2>Auth error: ${error}</h2>`);
  try {
    const tokenRes = await fetch('https://www.strava.com/api/v3/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: STRAVA_CLIENT_ID, client_secret: STRAVA_CLIENT_SECRET, code, grant_type: 'authorization_code' }),
    });
    const data = await tokenRes.json();
    if (data.access_token) {
      saveTokens(data);
      res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h2>Strava connected! ✅</h2>
        <p>Welcome, ${data.athlete?.firstname}! You can close this tab.</p>
        <script>setTimeout(()=>window.close(),2000)</script>
      </body></html>`);
    } else {
      res.send(`<h2>Token error</h2><pre>${JSON.stringify(data)}</pre>`);
    }
  } catch (err) { res.send(`<h2>Error: ${err.message}</h2>`); }
});

app.post('/auth/logout', (req, res) => {
  if (existsSync(TOKENS_FILE)) writeFileSync(TOKENS_FILE, '');
  res.json({ ok: true });
});

// ── Strava API proxy ──────────────────────────────────────────────────────────
app.get('/api/strava/athlete', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  res.json(await (await fetch('https://www.strava.com/api/v3/athlete', { headers: { Authorization: `Bearer ${token}` } })).json());
});

app.get('/api/strava/stats/:id', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  res.json(await (await fetch(`https://www.strava.com/api/v3/athletes/${req.params.id}/stats`, { headers: { Authorization: `Bearer ${token}` } })).json());
});

app.get('/api/strava/activities', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const params = new URLSearchParams();
  if (req.query.after) params.set('after', req.query.after);
  if (req.query.before) params.set('before', req.query.before);
  params.set('per_page', req.query.per_page || '30');
  params.set('page', req.query.page || '1');
  res.json(await (await fetch(`https://www.strava.com/api/v3/athlete/activities?${params}`, { headers: { Authorization: `Bearer ${token}` } })).json());
});

app.get('/api/strava/activity/:id', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  res.json(await (await fetch(`https://www.strava.com/api/v3/activities/${req.params.id}?include_all_efforts=false`, { headers: { Authorization: `Bearer ${token}` } })).json());
});

app.get('/api/strava/zones', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  res.json(await (await fetch('https://www.strava.com/api/v3/athlete/zones', { headers: { Authorization: `Bearer ${token}` } })).json());
});

// Weekly aggregated analysis
app.get('/api/strava/weekly-analysis', async (req, res) => {
  const token = await getFreshToken();
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const weeks = parseInt(req.query.weeks) || 8;
  const now = Math.floor(Date.now() / 1000);
  const after = now - (weeks * 7 * 24 * 60 * 60);
  try {
    let allActivities = [], page = 1;
    while (true) {
      const r = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await r.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allActivities = allActivities.concat(data);
      if (data.length < 200) break;
      page++;
    }
    const weekMap = {};
    allActivities.forEach(act => {
      const d = new Date(act.start_date_local);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(d.getFullYear(), d.getMonth(), diff);
      const weekKey = monday.toISOString().slice(0, 10);
      if (!weekMap[weekKey]) weekMap[weekKey] = { weekStart: weekKey, activities: [], totalMinutes: 0, totalCalories: 0, totalDistance: 0, avgHR: 0, maxHR: 0, daysActive: new Set(), types: {} };
      const w = weekMap[weekKey];
      w.activities.push(act);
      w.totalMinutes += Math.round((act.moving_time || 0) / 60);
      w.totalCalories += act.calories || 0;
      w.totalDistance += act.distance || 0;
      if (act.average_heartrate) w.avgHR += act.average_heartrate;
      if (act.max_heartrate && act.max_heartrate > w.maxHR) w.maxHR = act.max_heartrate;
      w.daysActive.add(d.toISOString().slice(0, 10));
      w.types[act.type] = (w.types[act.type] || 0) + 1;
    });
    const weeklyData = Object.values(weekMap).map(w => ({
      ...w,
      daysActive: w.daysActive.size,
      avgHR: w.activities.filter(a => a.average_heartrate).length > 0 ? Math.round(w.avgHR / w.activities.filter(a => a.average_heartrate).length) : 0,
      activityCount: w.activities.length,
      activities: w.activities.map(a => ({ id: a.id, name: a.name, type: a.type, date: a.start_date_local, minutes: Math.round((a.moving_time || 0) / 60), distance: a.distance, calories: a.calories || 0, avgHR: a.average_heartrate || 0, maxHR: a.max_heartrate || 0, sufferScore: a.suffer_score || 0, avgSpeed: a.average_speed || 0, hasHeartrate: a.has_heartrate || false })),
    })).sort((a, b) => b.weekStart.localeCompare(a.weekStart));
    res.json({ weeks: weeklyData, totalActivities: allActivities.length, period: { from: new Date(after * 1000).toISOString(), to: new Date().toISOString() } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── Garmin Connect ─────────────────────────────────────────────────────────────
let garminClient = null;

async function getGarmin() {
  if (garminClient) return garminClient;
  const { GARMIN_EMAIL, GARMIN_PASSWORD } = process.env;
  const garminTokenFile = join(__dirname, '..', 'garmin-token.json');
  try {
    if (existsSync(garminTokenFile)) {
      const savedToken = JSON.parse(readFileSync(garminTokenFile, 'utf-8'));
      garminClient = new GarminConnect({ username: savedToken.oauth1?.oauth_token || 'token', password: 'token' });
      garminClient.loadToken(savedToken);
      console.log('   ✅ Garmin loaded from saved token');
      return garminClient;
    }
    if (!GARMIN_EMAIL || !GARMIN_PASSWORD) { console.log('   ⚠️ No Garmin credentials or token'); return null; }
    garminClient = new GarminConnect({ username: GARMIN_EMAIL, password: GARMIN_PASSWORD });
    await garminClient.login();
    const token = garminClient.exportToken();
    if (token) writeFileSync(garminTokenFile, JSON.stringify(token, null, 2));
    console.log('   ✅ Garmin authenticated & token saved');
    return garminClient;
  } catch (err) {
    console.error('   ❌ Garmin login failed:', err.message);
    return null;
  }
}

// Sync Garmin data and auto-upload to Vercel Blob
app.get('/api/garmin/sync', async (req, res) => {
  const gc = await getGarmin();
  if (!gc) return res.status(401).json({ error: 'Garmin not configured' });
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const [sleep, sleepDur, steps, hr, weight, hydration, userInfo] = await Promise.allSettled([
      gc.getSleepData(now), gc.getSleepDuration(now), gc.getSteps(now),
      gc.getHeartRate(now), gc.getDailyWeightData(today),
      gc.getDailyHydration(today), gc.getUserProfile(),
    ]);
    const data = {
      lastSync: new Date().toISOString(), date: today,
      sleep: sleep.status === 'fulfilled' ? sleep.value : null,
      sleepDuration: sleepDur.status === 'fulfilled' ? sleepDur.value : null,
      steps: steps.status === 'fulfilled' ? steps.value : null,
      heartRate: hr.status === 'fulfilled' ? hr.value : null,
      weight: weight.status === 'fulfilled' ? weight.value : null,
      hydration: hydration.status === 'fulfilled' ? hydration.value : null,
      userInfo: userInfo.status === 'fulfilled' ? userInfo.value : null,
    };
    writeFileSync(GARMIN_CACHE, JSON.stringify(data, null, 2));

    // Auto-upload to Vercel Blob for mobile access
    try {
      const vercelUrl = process.env.VERCEL_URL;
      const syncSecret = process.env.SYNC_SECRET;
      if (syncSecret && vercelUrl) {
        await fetch(`https://${vercelUrl}/api/garmin-upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-sync-secret': syncSecret },
          body: JSON.stringify(data),
        });
        console.log('   ✅ Garmin data uploaded to Vercel Blob');
      }
    } catch (uploadErr) {
      console.log('   ⚠️ Failed to upload to Vercel:', uploadErr.message);
    }
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/garmin/data', (req, res) => {
  if (existsSync(GARMIN_CACHE)) res.json(JSON.parse(readFileSync(GARMIN_CACHE, 'utf-8')));
  else res.json({ error: 'No cached data. Call /api/garmin/sync first.' });
});

app.get('/api/garmin/status', (req, res) => {
  res.json({
    configured: existsSync(join(__dirname, '..', 'garmin-token.json')) || !!process.env.GARMIN_EMAIL,
    cached: existsSync(GARMIN_CACHE),
    lastSync: existsSync(GARMIN_CACHE) ? JSON.parse(readFileSync(GARMIN_CACHE, 'utf-8')).lastSync : null,
  });
});

app.listen(PORT, () => {
  console.log(`\n🏃 Server running on http://localhost:${PORT}`);
  console.log(`   Strava auth: http://localhost:${PORT}/auth/strava`);
  const tokens = loadTokens();
  console.log(tokens ? '   ✅ Strava authenticated' : '   ⚠️  Strava not connected — open the URL above to authenticate');
});
