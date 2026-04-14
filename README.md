# Vida em Ordem — Life OS for High Performers

> A personal life operating system built with React + Vercel. Designed for athletes, professionals and high-performers who want to manage training, home, nutrition, health and personal growth in one place — from any device.

**Live demo:** *(deploy your own — see setup below)*

---

## What is this?

**Vida em Ordem** ("Life in Order") is a mobile-first personal dashboard that integrates:

| Module | What it does |
|---|---|
| 🏠 **Home** | Grocery stock tracker, shopping list AI, cleaning checklists, home chat assistant |
| 🏃 **Training** | Multi-sport weekly plan (run/swim/bike/gym), carb cycling meals, Strava integration, run spreadsheet |
| 📊 **Roda da Vida** | 8-axis life wheel (custom SVG radar chart, zero dependencies) |
| ⚡ **GTD Capture** | Inbox + urgency/importance tagging (idea / pending / urgent) |
| ✅ **Atomic Habits** | Weekly habit grid with streak tracking and completion % |
| 🔁 **Weekly Review** | Guided 6-step review with AI analysis (GPT/Claude) |
| 🛡 **Buffers** | Protected time blocks: recovery, couple time, deep work, free time |
| 🩺 **Health** | Blood exam results with status indicators, body composition evolution, healthcare team |
| 📚 **Studies** | Multi-course tracker with lessons, progress and learning journal per course |
| 🙏 **Daily** | Daily devotional + affirmation + spiritual journal |
| ⌚ **Garmin** | Sync Garmin data (sleep, steps, HR, weight) to the web via Vercel Blob |

---

## Architecture

```
┌─────────────────────────────────────┐
│  Browser / Mobile                   │
│  vida-em-ordem.jsx (React, Vite)    │
└──────────┬──────────────────────────┘
           │ fetch
     ┌─────▼──────┐         ┌────────────────────┐
     │  Vercel    │         │  Local Machine      │
     │  /api/*    │◄────────│  server/index.js    │
     │  Blob      │  upload │  (Express + Garmin) │
     └────────────┘         └─────────┬───────────┘
                                      │
                               ┌──────▼──────┐
                               │ Strava API  │
                               │ Garmin API  │
                               └─────────────┘
```

- **Frontend:** Single React component (~2500 lines), no UI library, deployed to Vercel
- **Serverless API:** Vercel functions (`/api`) for Garmin data read/write via Blob
- **Local server:** Express proxy for Strava OAuth + Garmin Connect sync
- **Storage:** `window.localStorage` for personal data, Vercel Blob for Garmin health data
- **No database required**

---

## Reusable Components

These are the most standalone pieces you can extract and use in your own projects:

### `RadarChart` — Roda da Vida SVG
Custom 8-axis radar chart. Zero dependencies. Fully animated.
```jsx
<RadarChart scores={{ treinos:8, casamento:7, trabalho:8, casa:7, nutricao:7, descanso:5, crescimento:6, social:6 }} size={300} />
```

### GTD Capture System
Inbox + urgency classification (💡 ideia / 📌 pendente / ⚡ urgente). Filter, archive, convert to tasks.

### Atomic Habits Grid
Weekly habit matrix with streak counter and % completion. Fully customizable habit list.

### Carb Cycling Meal Planner
6-meal structure that switches between LOW CARB and CARBO days based on training schedule.

### Garmin → Vercel Blob Pipeline
Architecture to sync Garmin Connect data to a web app without exposing credentials:
1. Local Express server authenticates with Garmin
2. Fetches sleep, steps, HR, weight, hydration
3. POSTs to `/api/garmin-upload` (protected by secret)
4. Stored in Vercel Blob private store
5. Frontend reads via `/api/garmin-data`

---

## Setup

### 1. Clone & install
```bash
git clone https://github.com/tpg211/vida-em-ordem.git
cd vida-em-ordem
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

You'll need:
- **Strava API** — create an app at https://www.strava.com/settings/api
- **Garmin Connect** — your Garmin account credentials (stored locally only)
- **Vercel Blob** — create a blob store in your Vercel dashboard
- A random `SYNC_SECRET` string

### 3. Run locally
```bash
# Terminal 1 — Vite frontend
npm run dev

# Terminal 2 — Express backend (Strava + Garmin)
npm run server
```

Open http://localhost:5173

### 4. Connect Strava
Go to http://localhost:3001/auth/strava and authorize.

### 5. Sync Garmin
Hit the sync button in the app, or call `http://localhost:3001/api/garmin/sync`.

### 6. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add your env vars in the Vercel dashboard (Settings → Environment Variables).

---

## Personalization

Edit `vida-em-ordem.jsx` to make it yours:

| Constant | What to change |
|---|---|
| `AFFIRM[]` | Your daily affirmations |
| `DEVO[]` | Bible verses or daily reflections |
| `DEFAULT_TRAININGS` | Your weekly training plan |
| `LOW_CARB_DAYS` / `DIETA_LOW` / `DIETA_CARB` | Your nutrition plan |
| `DEFAULT_HABITS` | Your habit list |
| `WHEEL_AREAS` | Rename life wheel areas |
| `PROFISSIONAIS` | Your healthcare team |
| `BODY_2022` / `BODY_2026` | Your body composition history |
| `EXAMES` | Your lab results |
| `SYSTEM_PROMPT` | Your AI assistant persona |

---

## Tech Stack

- **React 19** + **Vite 6**
- **Express 5** (local backend)
- **@vercel/blob** (health data cloud storage)
- **garmin-connect** (Garmin API)
- Strava API v3 (OAuth 2.0)
- Custom SVG (radar chart — no chart library)
- Vanilla CSS-in-JS (no Tailwind, no styled-components)

---

## About

Built by **[@tpg211](https://github.com/tpg211)** — architect, project manager and triathlete from Brazil.

This is my personal system, open-sourced so others can fork it and build their own Life OS.

---

*MIT License — fork it, adapt it, make it yours.*
