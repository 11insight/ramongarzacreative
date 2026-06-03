# RGC — Ramon Garza Creative

Cinematic Super-8 themed portfolio site for Ramon Garza Creative.

**Live (transitional):** http://98.91.251.162 — EC2 instance, HTTP only
**Target:** https://ramongarzacreative.com via Vercel

## Stack

Single-page static site. No build step.

- `index.html` — entry point, loads React 18 + Babel standalone from CDN
- `app.jsx` — all sections, components, and animations (compiled in-browser by Babel)
- `styles.css` — full design system, imports `assets/vy-tokens.css`
- `assets/` — design tokens + film grain SVG
- `downloads/` — downloadable PDFs surfaced in the Guides section

## Sections

```
00  Slate        — blackletter glitch wordmark, bolt → Super-8 lightning
01  Schedule     — production slate, bolt → paparazzi flash
02  Reel         — clip grid
03  Stills       — photo grid with lightbox
04  Filmcam      — live-canvas camera, 5 presets (Super-8 / Ektachrome / Noir / VHS / CineStill)
05  Guides       — downloadable PDFs (Vol 01 live · Vol 02–03 drop Jun 15, 2026)
06  Hook Lab     — Viral Hook Maker: topic → niche-aware hooks → full retention script
07  AI Media     — Define / Deploy / Scale
08  Studio       — ignite bolt → fades to black, terminal types the site source
09  Contact      — form + Patch Bay (clicking it sends the orbs flying)
```

## Local dev

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

The filmcam in section 04 needs `localhost` or HTTPS — `getUserMedia` is gated by secure context.

## Deploy

Currently nginx on EC2 (will migrate to Vercel). `vercel.json` is already set up with the camera Permissions-Policy header for when the domain is attached.

## Design source

Originated as a Claude Design handoff bundle; the prototype HTML/CSS/JS lives as production code (no compile step).
