# Arrivio

**Move smart. Not far.**

Arrivio is a Chrome extension that shows drive times to your important places — work, family, gym, daycare — directly on real estate listing pages. No more switching between tabs to check commutes.

## How it works

1. **Save your places** — Add the addresses you visit regularly
2. **Browse listings** — Shop for homes on any of 40+ supported sites
3. **See ETAs instantly** — A small widget appears with color-coded drive times

## Supported sites

### National
Zillow · Redfin · Realtor.com · Trulia · Apartments.com

### Regional & state MLS portals
ARMLS (AZ) · CRMLS (CA) · REcolorado (CO) · Bright MLS (DE/MD/VA/DC) · Stellar MLS (FL) · Georgia MLS · HAR (TX) · MRED (IL) · NWMLS (WA) · StreetEasy (NY) · and 25+ more across every state.

## Features

- **Traffic-aware ETAs** — Real-time traffic data from MapBox
- **Color-coded times** — Green (≤15 min), amber (≤30 min), red (30+ min)
- **Privacy first** — All data stays in your browser. No accounts, no tracking
- **Lightweight** — Under 200KB, loads instantly
- **Unlimited places** — Save as many locations as you need

## Setup

### Prerequisites
- Node.js 18+

### Development

```bash
npm install
npm run dev
```

Load the extension in Chrome:
1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder

### Production build

Create a `.env` file in the project root with your MapBox token:

```
VITE_MAPBOX_TOKEN=pk.eyJ1Ijoi...
```

Then build:

```bash
npm run build
```

The built extension will be in the `dist` folder.

### Getting started

1. Install the extension
2. Click the Arrivio icon → Open Settings
3. Add your places (work, gym, etc.)
4. Browse any supported listing site — ETAs appear automatically

## Tech stack

- **TypeScript** + **React 18** — Options page, popup, and ETA widget
- **Vite** + **@crxjs/vite-plugin** — Build and HMR for Chrome extensions
- **MapBox APIs** — Geocoding and traffic-aware directions
- **Shadow DOM** — Widget styles isolated from host pages
- **Chrome Storage API** — Local data persistence with ETA caching

## Project structure

```
src/
├── assets/icons/        # Extension icons (16, 48, 128px)
├── background/          # Service worker — API calls, caching, message handling
├── content/
│   ├── sites/           # Per-site address extractors + generic fallback
│   ├── widget/          # React ETA widget (Shadow DOM)
│   └── index.tsx        # Content script entry point
├── options/             # Settings page (React)
├── popup/               # Toolbar popup (React)
└── shared/              # Types, storage, MapBox client, cache
landing/                 # Marketing landing page (static HTML/CSS/JS)
```

## License

[MIT](LICENSE)
