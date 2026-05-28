/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* =========================================================
   Helpers
   ========================================================= */
const SQ = "https://images.squarespace-cdn.com/content/v1/66a5adb7595c5341fd1e053b";
const PHOTOS = [
  { id: 1, src: `${SQ}/86bffa2f-af05-4ffe-872e-5e24fc723251/105949107_183694893171480_2186634352590987570_n.jpg`, code: "RGC-01" },
  { id: 2, src: `${SQ}/d0481b6b-9cbd-493e-9262-7475a52bc958/DSC02345.jpg`, code: "DSC-02345" },
  { id: 3, src: `${SQ}/5f5f2188-15de-4d56-8def-d966a1fc2c7b/436254856_18442244707032757_7211466097664755865_n.jpg`, code: "RGC-03" },
  { id: 4, src: `${SQ}/7792b551-b45d-4c93-8505-d0323764c3e4/209006627_799478140771866_3787021920836686221_n.jpg`, code: "RGC-04" },
  { id: 5, src: `${SQ}/7c744d57-13b1-4913-a2f9-1fd9979ec4d3/333503659_946872079804413_1898804873903611181_n.jpg`, code: "RGC-05" },
  { id: 6, src: `${SQ}/721f5672-a175-43b8-a39f-4ccb160358dd/DSC00822.jpg`, code: "DSC-00822" },
  { id: 7, src: `${SQ}/40eb7f97-ddb0-46a3-85d8-581f4f43f6b5/331456531_1442777116256285_7524765528081551750_n.jpg`, code: "RGC-07" },
  { id: 8, src: `${SQ}/988a6539-093f-410e-8f52-d32b3465dcee/DSC00271.jpg`, code: "DSC-00271" }
];

/* =========================================================
   Top chrome — fixed nav with REC indicator & live clock
   ========================================================= */
function Chrome() {
  const [now, setNow] = useState(new Date());
  const [active, setActive] = useState("00");
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section.scene");
      let cur = "00";
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top <= 200) cur = s.dataset.idx || cur;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const tc = now.toISOString().slice(11,19);
  const links = [
    ["00", "Slate"], ["01", "Schedule"], ["02", "Reel"],
    ["03", "Stills"], ["04", "Cam"], ["05", "Guides"],
    ["06", "AI"], ["07", "Studio"], ["08", "Contact"]
  ];
  return (
    <div className="chrome">
      <div className="brand">
        <span className="rgc-mark">RGC<sup>™</sup></span>
        <span className="rec">REC · {tc}</span>
      </div>
      <nav>
        {links.map(([i, l]) => (
          <a key={i} href={`#s${i}`} className={i === active ? "active" : ""}>
            <span style={{ opacity: .5, marginRight: 6 }}>{i}</span><span className="nav-label">{l}</span>
          </a>
        ))}
      </nav>
      <div className="right">
        <span className="tc">FRAME · {String(Math.floor(now.getTime() / 41.66) % 99999).padStart(5,"0")}</span>
        <span>EST 20–26</span>
      </div>
    </div>
  );
}

function ScrollRail() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => {
      const sc = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setW(max > 0 ? (sc / max) * 100 : 0);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="scroll-rail" style={{ width: `${w}%` }} />;
}

/* =========================================================
   00 HERO — film slate header
   ========================================================= */
function Hero({ onLightning }) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setCount(c => c + 1), 4200);
    return () => clearInterval(t);
  }, []);
  const phrases = [
    "iPhone Rig", "Sony FX3", "Arri Alexa", "RED V-Raptor",
    "DJI Ronin", "BMPCC 6K", "Sigma Cine 24mm"
  ];
  const rigs = [
    "Enhanced Sound Productive", "Secure / Edit / Cut",
    "Gemini 3.5 / Imagine 0 Limit", "Grok Heavy Engine",
    "RAW Data Pipeline", "LLM Advancement"
  ];
  return (
    <section className="scene hero" data-idx="00" id="s00" data-screen-label="00 Slate">
      {/* TV-noise corners */}
      <div className="tv-noise" style={{ top: 60, left: "4vw" }} />
      <div className="tv-noise" style={{ top: 90, right: "5vw" }} />
      <div className="tv-noise" style={{ bottom: 80, left: "6vw" }} />
      <div className="tv-noise" style={{ bottom: 110, right: "8vw" }} />
      <div className="ana-flare" style={{ top: "32%", left: "-10%", right: "-10%" }} />

      {/* TOP ROW — slate meta */}
      <div className="hero-top">
        <div>
          <div className="slate-name">
            Ramon Garza<br/>Creative<span className="reg"> ®</span>
          </div>
        </div>
        <div className="stack">
          <span className="label">Founder</span>
          <span className="val">Ramon Garza</span>
          <span className="label">AI</span>
          <span className="val">AI &amp; RAW Unit · Grok Heavy · Est. 20–26</span>
          <span className="label">LLM</span>
          <span className="val">iPhone Rig</span>
          <span className="label">RAW</span>
          <span className="val">{rigs[count % rigs.length]}</span>
        </div>
        <div className="stack" style={{ gridTemplateColumns: "90px 1fr" }}>
          <span className="label">Studio</span>
          <span className="val">21010 Pacific HB CA</span>
          <span className="label">Sat</span>
          <span className="val">695 Town Center Dr, Costa Mesa CA</span>
          <span className="label">Sat</span>
          <span className="val">11 N Water St, Mobile AL</span>
          <span className="label">Roll</span>
          <span className="val">A · {String(count).padStart(3,"0")} / TK {String((count*3)%99).padStart(2,"0")}</span>
        </div>
      </div>

      {/* CENTER — blackletter glitch wordmark */}
      <div className="hero-center">
        <div className="glitch-blackletter" data-text="rgcreative">
          rgcreative
          <span className="reg-circle">®</span>
        </div>
      </div>

      {/* BOTTOM — bolt + tagline */}
      <div className="hero-bottom">
        <div className="col">
          <span className="ttl">L · Artificially Enhanced</span>
          <span>AI / LLM Enabled</span>
          <span className="ttl" style={{ marginTop: 10 }}>{phrases[count % phrases.length]}</span>
        </div>
        <div className="bolt" onClick={onLightning}>
          <Bolt onClick={onLightning} />
        </div>
        <div className="col right">
          <span className="ttl">R · Edit / Cut</span>
          <span>Ramon Garza Creative</span>
          <span className="ttl" style={{ marginTop: 10 }}>Content, Lightning Fast</span>
        </div>
      </div>

      <div className="scroll-hint">▼ Roll Tape · Scroll</div>
    </section>
  );
}

function Bolt({ onClick }) {
  return (
    <svg viewBox="0 0 60 100" aria-hidden="true" onClick={onClick}>
      <path d="M 32 4 L 14 50 L 28 50 L 18 96 L 46 44 L 32 44 L 40 4 Z" />
    </svg>
  );
}

/* =========================================================
   Lightning Flash overlay — fired by clicking a bolt
   ========================================================= */
function usePaparazzi() {
  const [flashes, setFlashes] = useState([]);
  const fire = useCallback(() => {
    const n = 10 + Math.floor(Math.random() * 5); // 10–14 camera pops per burst
    const base = Date.now();
    const burst = Array.from({ length: n }).map((_, i) => ({
      id: base + i,
      x: 6 + Math.random() * 88,        // % across the viewport
      y: 6 + Math.random() * 88,
      size: 16 + Math.random() * 42,    // vw
      delay: Math.random() * 900,       // ms into the burst
      dur: 150 + Math.random() * 170    // ms per pop
    }));
    setFlashes(burst);
    setTimeout(() => setFlashes([]), 2000);
  }, []);
  return { flashes, fire };
}

function PaparazziOverlay({ flashes }) {
  if (!flashes.length) return null;
  return (
    <div className="paparazzi" aria-hidden="true">
      <div className="pap-grain" />
      <div className="pap-leak" />
      <div className="pap-streak s1" />
      <div className="pap-streak s2" />
      {flashes.map(f => (
        <span
          key={f.id}
          className="pap-pop"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}vw`,
            height: `${f.size}vw`,
            animationDelay: `${f.delay}ms`,
            animationDuration: `${f.dur}ms`
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   Super-8 lightning flash — fired by the hero (00 Slate) bolt.
   ========================================================= */
function useLightning() {
  const [active, setActive] = useState(false);
  const fire = useCallback(() => {
    setActive(false);
    // re-trigger the animation on the next frame
    requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)));
    setTimeout(() => setActive(false), 1700);
  }, []);
  return { active, fire };
}

function LightningOverlay({ active }) {
  const boltSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 100'>
      <path d='M 32 4 L 14 50 L 28 50 L 18 96 L 46 44 L 32 44 L 40 4 Z'
        fill='rgba(255,255,240,0.95)' stroke='rgba(255,255,255,1)' stroke-width='1.5'/>
    </svg>`
  );
  const url = `url("data:image/svg+xml;utf8,${boltSvg}")`;
  return (
    <div className={`lightning-flash ${active ? "active" : ""}`} style={{ "--bolt-url": url }}>
      <div className="lf-leak" />
      <div className="lf-white" />
      <div className="lf-streak s1" />
      <div className="lf-streak s2" />
      <div className="lf-streak s3" />
      <div className="lf-bolt" />
      <div className="lf-grain" />
      <div className="lf-vignette" />
    </div>
  );
}

/* =========================================================
   01 SCHEDULE — production slate with dates
   ========================================================= */
function Schedule({ onLightning }) {
  return (
    <section className="scene" data-idx="01" id="s01" data-screen-label="01 Schedule">
      <div className="scene-label">
        <span className="num">02</span>
        <span>Production Schedule</span>
        <span className="tick">/ Block 04.12 — 06.21</span>
      </div>
      <div className="slate-grid">
        <div className="section-head">
          <h2 className="section-title">Roll<em>tape</em></h2>
          <div className="meta">
            Director of Photography<br/>
            Ramon Garza · 18 Sets · LF 21 Days
          </div>
        </div>

        <div className="slate-rows">
          <div className="slate-row r1">
            <div className="slate-item"><span className="date">04.12</span><span>Principal Photography —</span></div>
            <div className="slate-item"><span className="date">04.27</span><span>Director of Photography — Ramon Garza · 18 Sets · LF 21 Days</span></div>
          </div>
          <div className="slate-row r2">
            <div className="slate-item"><span className="date">05.10</span><span>Gaffer — LED Volume</span></div>
            <div className="slate-item"><span className="date">04.27</span><span>Ramon Garza Scenes</span></div>
            <div className="slate-item"><span className="date">05.10</span><span>Shot List — #1–10</span></div>
          </div>
          <div className="slate-row r3">
            <div className="slate-item"><span className="date">05.10</span><span>LED Volume · 10 Setups</span></div>
            <div className="slate-item"><span className="date">06.07</span><span>Prime Lenses — 13.1 Takes</span></div>
          </div>
          <div className="slate-row r4">
            <div className="slate-item"><span className="date">06.21</span><span>Exposure — ISO 800</span></div>
          </div>
        </div>

        <div className="bolt-wrap">
          <div className="l">
            <div style={{ color: "var(--vy-fg-dim)", fontSize: 11, letterSpacing: ".2em" }}>L · Pole</div>
            Artificially Enhanced<br/>
            AI / LLM Enabled
          </div>
          <div className="bolt" onClick={onLightning}><Bolt onClick={onLightning} /></div>
          <div className="r">
            <div style={{ color: "var(--vy-fg-dim)", fontSize: 11, letterSpacing: ".2em" }}>R · Pole</div>
            Edit / Cut<br/>
            Ramon Garza Creative
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   03 REEL — video grid
   ========================================================= */
function Reel({ onPickPhoto }) {
  const clips = [
    { id: "A", size: "clip-6", img: PHOTOS[1].src, title: "Brand · Olas Mexicanas", tc: "00:00:12:04", typ: "Spec / Spot" },
    { id: "B", size: "clip-6", img: PHOTOS[4].src, title: "Documentary · LF Reel", tc: "00:02:48:11", typ: "Doc · 6K" },
    { id: "C", size: "clip-4", img: PHOTOS[3].src, title: "Music · B-Roll", tc: "00:00:46:22", typ: "Music · 4K" },
    { id: "D", size: "clip-4", img: PHOTOS[6].src, title: "AI · Synthetic Plate", tc: "00:00:11:18", typ: "Synth · Gemini" },
    { id: "E", size: "clip-4", img: PHOTOS[5].src, title: "Live Event", tc: "00:01:22:00", typ: "Multicam" }
  ];
  return (
    <section className="scene" data-idx="02" id="s02" data-screen-label="02 Reel">
      <div className="scene-label">
        <span className="num">02</span>
        <span>Reel · Moving Image</span>
        <span className="tick">/ 24fps · LOG-C</span>
      </div>
      <div className="section-head">
        <h2 className="section-title">Video</h2>
        <div className="meta">
          Roll A · 05 Clips Loaded<br/>
          Codec · ProRes 422 HQ · Color · LOG-C → Rec.709
        </div>
      </div>
      <div className="reel">
        {clips.map((c, i) => (
          <div className={`clip ${c.size}`} key={c.id} onClick={() => onPickPhoto(c.img, c.title)}>
            <img src={c.img} alt={c.title} loading="lazy" />
            <div className="badge">RL-A · CL-{String(i+1).padStart(2,"0")}</div>
            <div className="play">
              <svg viewBox="0 0 12 14"><path d="M 0 0 L 12 7 L 0 14 Z" fill="currentColor"/></svg>
            </div>
            <div className="meta">
              <span>{c.title}</span>
              <span>{c.tc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="timecode-strip">
        <span>TC · 00:00:00:00</span>
        <span>↦ A-Roll · 05 Clips</span>
        <span>Sound · Sync 48k / 24b</span>
        <span>Out · {new Date().toISOString().slice(0,10)}</span>
      </div>
    </section>
  );
}

/* =========================================================
   04 STILLS — photo grid with lightbox
   ========================================================= */
function Stills({ onPickPhoto }) {
  return (
    <section className="scene" data-idx="03" id="s03" data-screen-label="03 Stills">
      <div className="scene-label">
        <span className="num">03</span>
        <span>Stills · Still Photography</span>
        <span className="tick">/ Roll B · 08 Frames</span>
      </div>
      <div className="section-head">
        <h2 className="section-title">Photo</h2>
        <div className="meta">
          Camera · Sony A7 IV · Lens · 24–70 f/2.8 GM<br/>
          Format · RAW + JPEG · ISO 100–6400
        </div>
      </div>
      <div className="photo-grid">
        {PHOTOS.map((p, i) => {
          const cls = `p${i+1}`;
          return (
            <div key={p.id} className={`photo ${cls}`} onClick={() => onPickPhoto(p.src, p.code)}>
              <img src={p.src} alt={p.code} loading="lazy" />
              <span className="ph-num">{String(i+1).padStart(2,"0")} / 08</span>
              <span className="ph-meta"><span className="dot" />{p.code}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   05 FILMCAM — live-canvas web camera, 5 film presets.
   Every effect renders INTO the canvas, never as a CSS overlay
   on top of the <video>, so the preview IS the saved photo (WYSIWYG).
   ========================================================= */

const CAM_W = 540;
const CAM_H = 1170;        // 9 : 19.5 — matches iPhone 17 Pro aspect

const PRESETS = [
  {
    id: "super8",
    name: "Super-8",
    sub: "Warm · light leaks",
    stock: "Ektachrome 100D",
    wb: "5600 K",
    filter: "saturate(1.10) contrast(1.12) brightness(1.04) sepia(.14)",
    overlay(ctx, W, H, grain) {
      ctx.globalCompositeOperation = "screen";
      const tl = ctx.createRadialGradient(W * 0.15, H * 0.08, 0, W * 0.15, H * 0.08, W * 0.85);
      tl.addColorStop(0, "rgba(255,140,60,0.42)");
      tl.addColorStop(0.30, "rgba(255,100,40,0.16)");
      tl.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tl; ctx.fillRect(0, 0, W, H);
      const br = ctx.createRadialGradient(W * 0.95, H * 0.95, 0, W * 0.95, H * 0.95, W * 0.9);
      br.addColorStop(0, "rgba(255,180,100,0.32)");
      br.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = br; ctx.fillRect(0, 0, W, H);
      const fy = H * 0.36;
      const fl = ctx.createLinearGradient(0, fy, W, fy);
      fl.addColorStop(0,    "rgba(120,200,255,0)");
      fl.addColorStop(0.45, "rgba(190,235,255,0.55)");
      fl.addColorStop(0.62, "rgba(220,245,255,0.50)");
      fl.addColorStop(1,    "rgba(120,200,255,0)");
      ctx.fillStyle = fl; ctx.fillRect(0, fy - 5, W, 10);
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.32, W / 2, H / 2, Math.max(W, H) * 0.72);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.7, "rgba(0,0,0,0.30)");
      vg.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, 0.20);
    }
  },
  {
    id: "ektachrome",
    name: "Ektachrome",
    sub: "Vivid · daylight",
    stock: "Ektachrome E100",
    wb: "5500 K",
    filter: "saturate(1.45) contrast(1.18) brightness(1.05) hue-rotate(-3deg)",
    overlay(ctx, W, H, grain) {
      ctx.globalCompositeOperation = "soft-light";
      const tone = ctx.createLinearGradient(0, 0, 0, H);
      tone.addColorStop(0, "rgba(180,220,255,0.10)");
      tone.addColorStop(1, "rgba(255,180,200,0.10)");
      ctx.fillStyle = tone; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.55, W / 2, H / 2, Math.max(W, H) * 0.85);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, 0.08);
    }
  },
  {
    id: "noir",
    name: "Noir",
    sub: "B&W · high contrast",
    stock: "Tri-X 400",
    wb: "—",
    filter: "grayscale(1) contrast(1.45) brightness(.94)",
    overlay(ctx, W, H, grain) {
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.30, W / 2, H / 2, Math.max(W, H) * 0.72);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.6, "rgba(0,0,0,0.45)");
      vg.addColorStop(1, "rgba(0,0,0,0.95)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, 0.16);
    }
  },
  {
    id: "vhs",
    name: "VHS",
    sub: "Tape · chromatic shift",
    stock: "VHS · NTSC",
    wb: "3200 K",
    filter: "saturate(.85) contrast(1.05) brightness(1.04) blur(.3px)",
    overlay(ctx, W, H, grain) {
      // chromatic ghosts (cheap fake) — thin red+blue bands offset horizontally
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = "rgba(255,40,60,0.10)";  ctx.fillRect(3, 0, W, H);
      ctx.fillStyle = "rgba(60,170,255,0.10)"; ctx.fillRect(-3, 0, W, H);
      ctx.globalCompositeOperation = "multiply";
      for (let y = 0; y < H; y += 3) {
        ctx.fillStyle = "rgba(0,0,0,0.16)";
        ctx.fillRect(0, y, W, 1);
      }
      ctx.globalCompositeOperation = "source-over";
      // signal-flicker band, fires occasionally
      if (((Date.now() / 100) | 0) % 7 === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.10)";
        ctx.fillRect(0, Math.random() * H, W, 4);
      }
      drawGrain(ctx, W, H, grain, 0.13);
    }
  },
  {
    id: "cinestill",
    name: "CineStill",
    sub: "Halation · tungsten",
    stock: "CineStill 800T",
    wb: "3200 K",
    filter: "saturate(1.20) contrast(1.08) brightness(1.02) hue-rotate(-7deg)",
    halate: true,                        // drawPreset runs a halation pass for this preset
    overlay(ctx, W, H, grain) {
      ctx.globalCompositeOperation = "soft-light";
      const warm = ctx.createLinearGradient(0, 0, 0, H);
      warm.addColorStop(0, "rgba(255,170,110,0.12)");
      warm.addColorStop(1, "rgba(255,140,80,0.08)");
      ctx.fillStyle = warm; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.55, W / 2, H / 2, Math.max(W, H) * 0.85);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, 0.07);
    }
  }
];

function drawGrain(ctx, W, H, grain, alpha) {
  if (!grain) return;
  ctx.save();
  ctx.globalCompositeOperation = "overlay";
  ctx.globalAlpha = alpha;
  const ox = (Math.random() * 256) | 0;
  const oy = (Math.random() * 256) | 0;
  ctx.translate(-ox, -oy);
  const pat = ctx.createPattern(grain, "repeat");
  ctx.fillStyle = pat;
  ctx.fillRect(ox, oy, W, H);
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

function drawPreset(ctx, tmp, video, preset, W, H, grain) {
  // base video pass — mirror + cover-fit + the preset's CSS filter chain (GPU-accelerated)
  const vw = video.videoWidth, vh = video.videoHeight;
  if (!vw || !vh) return;
  const scale = Math.max(W / vw, H / vh);
  const dw = vw * scale, dh = vh * scale;
  const dx = (W - dw) / 2, dy = (H - dh) / 2;
  ctx.save();
  ctx.filter = preset.filter || "none";
  ctx.translate(W, 0); ctx.scale(-1, 1);
  ctx.drawImage(video, W - dx - dw, dy, dw, dh);
  ctx.restore();
  ctx.filter = "none";

  // CineStill halation: a blurred / brightened / red-tinted re-pass, screened on top
  if (preset.halate && tmp) {
    const t = tmp.getContext("2d");
    t.save();
    t.clearRect(0, 0, W, H);
    t.filter = "blur(10px) brightness(1.55) saturate(2) sepia(.45) hue-rotate(-12deg)";
    t.translate(W, 0); t.scale(-1, 1);
    t.drawImage(video, W - dx - dw, dy, dw, dh);
    t.restore();
    t.filter = "none";
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.55;
    ctx.drawImage(tmp, 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  // preset overlay pass — gradients, scanlines, grain
  preset.overlay(ctx, W, H, grain);
}

function Super8Cam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const tmpRef = useRef(null);
  const grainRef = useRef(null);
  const rafRef = useRef(0);

  const [stream, setStream] = useState(null);
  const [presetIx, setPresetIx] = useState(0);
  const [shots, setShots] = useState([]);
  const [err, setErr] = useState(null);
  const [flash, setFlash] = useState(false);
  const [tc, setTc] = useState("00:00:00:00");
  const [iso, setIso] = useState(400);
  const [saveNote, setSaveNote] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  const preset = PRESETS[presetIx];

  // lock background scroll while the cam popup is open
  useEffect(() => {
    if (fullscreen) document.body.classList.add("cam-fs-open");
    else document.body.classList.remove("cam-fs-open");
    return () => document.body.classList.remove("cam-fs-open");
  }, [fullscreen]);

  // Esc closes the fullscreen popup (and cuts the stream)
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => { if (e.key === "Escape") { setFullscreen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // one-time: build a small noise tile (reused every frame) + a tmp canvas for the halation pass
  useEffect(() => {
    const g = document.createElement("canvas");
    g.width = 256; g.height = 256;
    const c = g.getContext("2d");
    const img = c.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = 128 + ((Math.random() - 0.5) * 110);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
    grainRef.current = g;

    const t = document.createElement("canvas");
    t.width = CAM_W; t.height = CAM_H;
    tmpRef.current = t;
  }, []);

  // running timecode while live
  useEffect(() => {
    if (!stream) return;
    const t0 = Date.now();
    const i = setInterval(() => {
      const e = Date.now() - t0;
      const s = Math.floor(e / 1000);
      const f = Math.floor((e % 1000) / 41.66);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      const ff = String(f).padStart(2, "0");
      setTc(`${hh}:${mm}:${ss}:${ff}`);
    }, 100);
    return () => clearInterval(i);
  }, [stream]);

  // ISO drift for that field-camera feel
  useEffect(() => {
    if (!stream) return;
    const i = setInterval(() => {
      setIso(v => Math.max(200, Math.min(1600, v + (Math.random() - .5) * 120 | 0)));
    }, 1800);
    return () => clearInterval(i);
  }, [stream]);

  // live render loop — draws video into the canvas with the active preset every frame.
  // The canvas IS the preview AND the captured photo (WYSIWYG).
  useEffect(() => {
    if (!stream || !canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    let active = true;
    const tick = () => {
      if (!active) return;
      drawPreset(ctx, tmpRef.current, videoRef.current, preset, CAM_W, CAM_H, grainRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { active = false; cancelAnimationFrame(rafRef.current); };
  }, [stream, presetIx]);

  const start = async () => {
    setErr(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1920 } },
        audio: false
      });
      setStream(s);
      setFullscreen(true);                     // pop into the fullscreen phone view
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      setErr(e.name === "NotAllowedError"
        ? "Camera access denied — allow in browser settings"
        : `Camera unavailable — ${e.message || e.name}`);
    }
  };

  const stop = useCallback(() => {
    setFullscreen(false);                      // exit popup
    setStream(prev => {
      if (prev) prev.getTracks().forEach(t => t.stop());
      return null;
    });
  }, []);

  useEffect(() => () => { if (stream) stream.getTracks().forEach(t => t.stop()); }, []); // eslint-disable-line

  // snap = capture the live canvas exactly as shown.
  // Tries Web Share API first (iOS save sheet → Save to Photos), falls back to download.
  const snap = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 420);

    const url = canvas.toDataURL("image/jpeg", 0.92);
    const id = Date.now();
    setShots(prev => [{ src: url, id, presetId: preset.id, name: preset.name }, ...prev].slice(0, 6));

    try {
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], `RGC-${preset.id}-${id}.jpg`, { type: "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "RGC Filmcam", text: `${preset.name} · RGC` });
        setSaveNote("Shared ✓");
      } else {
        const a = document.createElement("a");
        a.href = url; a.download = file.name; a.click();
        setSaveNote("Saved to downloads ✓");
      }
      setTimeout(() => setSaveNote(""), 2000);
    } catch (e) {
      // user cancelled or share unavailable — frame still lives in the filmstrip
    }
  };

  const download = (s, i) => {
    const a = document.createElement("a");
    a.href = s.src;
    a.download = `RGC-${s.presetId || "frame"}-${String(i + 1).padStart(2, "0")}.jpg`;
    a.click();
  };

  return (
    <section className="scene" data-idx="04" id="s04" data-screen-label="04 Filmcam">
      <div className="scene-label">
        <span className="num">04</span>
        <span>RGC Filmcam · 5 Presets</span>
        <span className="tick">/ Roll D</span>
      </div>
      <div className="section-head">
        <h2 className="section-title">Live<em>cam</em></h2>
        <div className="meta">
          {preset.name} · {preset.sub}<br/>
          WYSIWYG · the canvas is the photo.
        </div>
      </div>

      <div className={`cam-stage ${fullscreen ? "fullscreen" : ""}`}>
        {fullscreen && (
          <button className="cam-fs-close" onClick={stop} aria-label="Close camera">✕</button>
        )}
        {/* iPhone 17 Pro live viewfinder — canvas paints every frame so preview = capture */}
        <div className="iphone-frame">
          <div className="screen">
            <div className="dynamic-island" />
            <div className="cam-video-wrap">
              {stream ? (
                <>
                  <video ref={videoRef} className="cam-video-source" playsInline muted autoPlay />
                  <canvas ref={canvasRef} className="cam-canvas" width={CAM_W} height={CAM_H} />
                  <span className="cam-rec">REC · {preset.name}</span>
                  <span className="cam-tc">{tc}</span>
                  <span className="cam-foot-lbl">RGC · {preset.name} · ISO {iso}</span>
                </>
              ) : (
                <div className="cam-off">
                  <div className="big">Cam</div>
                  <div>Tap Roll Tape to grant<br/>camera access</div>
                </div>
              )}
              <div className={`shutter ${flash ? "flash" : ""}`} />
            </div>
          </div>
        </div>

        {/* Controls + meta */}
        <div className="cam-controls">
          <div className="preset-chips" role="radiogroup" aria-label="Film preset">
            {PRESETS.map((p, i) => (
              <button
                type="button"
                key={p.id}
                role="radio"
                aria-checked={i === presetIx}
                className={`preset-chip ${i === presetIx ? "on" : ""}`}
                onClick={() => setPresetIx(i)}
              >
                <span className="pc-name">{p.name}</span>
                <span className="pc-sub">{p.sub}</span>
              </button>
            ))}
          </div>

          <div className="cam-readout">
            <div><span className="k">Preset</span><span className="v">{preset.name}</span></div>
            <div><span className="k">Frame</span><span className="v">9 : 19.5</span></div>
            <div><span className="k">Stock</span><span className="v">{preset.stock}</span></div>
            <div><span className="k">ISO · Live</span><span className="v">{stream ? iso : "—"}</span></div>
            <div><span className="k">Shutter</span><span className="v">1 / 50</span></div>
            <div><span className="k">WB</span><span className="v">{preset.wb}</span></div>
            <div><span className="k">Lens</span><span className="v">24 mm · f/1.8</span></div>
            <div><span className="k">Frames</span><span className="v">{String(shots.length).padStart(2,"0")} / 06</span></div>
          </div>

          <div className="cam-row">
            {!stream ? (
              <button className="cam-shutter-btn" onClick={start}>
                <span className="ring" />
                Roll Tape · Start Cam
              </button>
            ) : (
              <>
                <button className="cam-shutter-btn" onClick={snap}>
                  <span className="ring" />
                  Snap · {preset.name}
                </button>
                <button className="cam-btn ghost" onClick={stop}>✕ Cut</button>
              </>
            )}
          </div>

          {err && <div className="cam-error">⚠ {err}</div>}
          {saveNote && <div className="cam-note">{saveNote}</div>}

          <div className="cam-strip">
            <div className="cam-strip-head">
              <span>Filmstrip · Last 06 Frames</span>
              <span>{shots.length ? `${shots.length} loaded · click to save` : "Empty"}</span>
            </div>
            <div className="cam-strip-frames">
              {Array.from({ length: 6 }).map((_, i) => {
                const s = shots[i];
                if (!s) return (
                  <div className="cam-strip-frame empty" key={i}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                );
                return (
                  <div className="cam-strip-frame" key={s.id} onClick={() => download(s, i)} title={s.name}>
                    <img src={s.src} alt={`Frame ${i + 1}`} />
                    <span className="dl">↓ Save</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   06 AI TOOLS — Define / Deploy / Scale
   ========================================================= */
function AITools() {
  const cards = [
    {
      n: "01", t: "Define",
      body: "You're building something. A product. A brand. A system. It starts with how you show up—visually, verbally, tactically. This is where clarity begins.",
      chips: ["Brand", "Voice", "Identity", "System"]
    },
    {
      n: "02", t: "Deploy",
      body: "From chat agents to synthetic media, every tool is modular and built to move fast. You don't need a studio. You need a system. Deploy what works.",
      chips: ["Agents", "Synthetic Media", "Modular", "API"]
    },
    {
      n: "03", t: "Scale",
      body: "Automate content. Multiply your presence. Drive reach through storytelling, media, and speed. Growth isn't a guess—it's architecture.",
      chips: ["Automation", "Reach", "Story", "Pipelines"]
    }
  ];
  return (
    <section className="scene" data-idx="06" id="s06" data-screen-label="06 AI Tools">
      <div className="scene-label">
        <span className="num">06</span>
        <span>AI Media · Tools</span>
        <span className="tick">/ Define → Deploy → Scale</span>
      </div>
      <div className="section-head">
        <h2 className="glitch-blackletter ai-glitch" data-text="ai media">ai media</h2>
        <div className="meta">
          Gemini 3.5 Core // RAW Data Pipeline<br/>
          Core · Grok Heavy Engine // LLM Advancement
        </div>
      </div>
      <div className="ai-grid">
        {cards.map(c => (
          <div className="ai-card" key={c.n}>
            <span className="num">{c.n} · Phase</span>
            <h3>{c.t}</h3>
            <p>{c.body}</p>
            <div className="chips">
              {c.chips.map((ch, i) => (
                <span className={`chip ${i === 0 ? "acid" : ""}`} key={ch}>{ch}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ai-cta">
        <div className="stamps">
          <span>RGC // AI</span>
          <span>Stack · GEMINI · GROK</span>
          <span>Patch 26.05</span>
        </div>
        <a className="btn-acid" href="#s08">✦ See Tools · Deploy</a>
      </div>
    </section>
  );
}

/* =========================================================
   06 GUIDES — downloadable PDFs
   ========================================================= */
function Guides() {
  const guides = [
    {
      avail: true,
      tape: "Available · Vol. 01",
      title: "Capture Presets",
      sub: "Field-tested look profiles for the iPhone, FX3 & RED rigs. LUTs, exposure, shutter, frame-rate map.",
      specs: [["File", "PDF / 1.6 MB"], ["Pages", "12"], ["Roll", "RG-CP-01"], ["Rev", "26.05"]],
      edge: ["KODAK", "RGC 5219", "26 · A"],
      href: "downloads/RG-Capture-Presets.pdf"
    },
    {
      avail: false,
      tape: "Coming Soon · Vol. 02",
      title: "Color Grade Kit",
      sub: "LOG-C and S-Log3 grading recipes for spec, doc and music workflows. Including DaVinci powergrades.",
      specs: [["File", ".cube + .drx"], ["Looks", "08"], ["Roll", "RG-CG-02"], ["Drops", "Jun 15 · 2026"]],
      date: "Jun 15 · 2026",
      edge: ["KODAK", "RGC 5213", "26 · B"]
    },
    {
      avail: false,
      tape: "Coming Soon · Vol. 03",
      title: "AI Workflow Map",
      sub: "Wiring Gemini and Grok into a fast production loop: brief → board → cut. Templates included.",
      specs: [["File", "PDF + Notion"], ["Modules", "06"], ["Roll", "RG-AI-03"], ["Drops", "Jun 15 · 2026"]],
      date: "Jun 15 · 2026",
      edge: ["KODAK", "RGC 7219", "26 · C"]
    }
  ];

  return (
    <section className="scene" data-idx="05" id="s05" data-screen-label="05 Guides">
      <div className="scene-label">
        <span className="num">05</span>
        <span>Guides &amp; Downloads</span>
        <span className="tick">/ Roll C · Reference Pack</span>
      </div>
      <div className="section-head">
        <h2 className="section-title"><em>guides</em></h2>
        <div className="meta">
          Practical recipes from the studio.<br/>
          More volumes arriving — subscribe via Contact.
        </div>
      </div>

      <div className="tape-strip">
        <div className="roll">
          {Array(2).fill(0).flatMap((_, k) => [
            <span key={`a${k}`}>RGC · Field Reference Pack</span>,
            <span key={`b${k}`}>Free Download</span>,
            <span key={`c${k}`}>For Educational Use</span>,
            <span key={`d${k}`}>© Ramon Garza Creative</span>,
            <span key={`e${k}`}>Volume One Live</span>,
            <span key={`f${k}`}>More Coming Soon</span>
          ])}
        </div>
      </div>

      <div className="guides-grid">
        {guides.map((g, i) => {
          const Tag = g.avail ? "a" : "div";
          const props = g.avail ? { href: g.href, download: true, target: "_blank", rel: "noopener" } : {};
          return (
            <Tag {...props} className={`guide-card ${g.avail ? "available" : "soon"}`} key={i}>
              <div className="sprockets" />
              <div className="edge-num">
                {g.edge.map((e,j) => <div key={j}>{e}</div>)}
              </div>
              <div className="body">
                <span className="tape">
                  <span className="dot" />{g.tape}
                </span>
                <h4>{g.title}</h4>
                <div className="sub">{g.sub}</div>
                <div className="specs">
                  {g.specs.map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span className="k">{k}</span><span className="v">{v}</span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="dl-row">
                  <span>{g.avail ? "↓ Download PDF" : "○ Notify Me"}</span>
                  <span className="dl">
                    {g.avail ? "Get it ›" : (g.date || "Soon ›")}
                  </span>
                </div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   07 STUDIO — ignite bolt + self-typing build terminal
   The source listing the terminal types out (the site, by hand).
   ========================================================= */
const SITE_SOURCE = `$ whoami
ramon@rgc-studio

$ cd ~/sites/ramongarzacreative
$ git status
On branch main — clean. building from scratch.

$ npm run build
▸ compiling ramongarzacreative.com …


/* ───────────────────────────  index.html  ─────────────────────────── */
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>RGC — Ramon Garza Creative</title>
  <meta name="description" content="Content, lightning fast." />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="app.jsx"></script>
</body>
</html>


/* ───────────────────────────  tokens.css  ─────────────────────────── */
:root {
  --black:   #000000;
  --fg:      #ffffff;
  --acid:    #c8fa3c;   /* CTA + bolt */
  --blue:    #2f2bff;   /* electric iris */
  --flare:   #8ce0ff;   /* anamorphic */
  --display: "Bebas Neue", Impact, sans-serif;
  --mono:    "Space Mono", monospace;
}
html, body { background: var(--black); color: var(--fg); overflow-x: hidden; }
.wordmark { font-family: var(--display); letter-spacing: .18em; }


/* ───────────────────────────  app.jsx  ────────────────────────────── */
function Bolt({ onClick }) {
  return (
    <svg viewBox="0 0 60 100" onClick={onClick}>
      <path d="M 32 4 L 14 50 L 28 50 L 18 96 L 46 44 L 32 44 L 40 4 Z" />
    </svg>
  );
}

function Hero() {
  const rigs = ["Sony FX3", "RED V-Raptor", "Arri Alexa", "iPhone Rig"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => n + 1), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      <h1 className="wordmark">rgcreative</h1>
      <p className="tag">Content, Lightning Fast.</p>
      <p className="rig">{rigs[i % rigs.length]}</p>
      <Bolt />
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Hero />);


▸ bundling stills · reel · guides …
▸ optimizing 8 frames · 5 clips
▸ deploying → rgcreative.com

✓ build complete — site is live.
$ _`;

function CodeTerminal({ onClose }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const boxRef = useRef(null);
  const idx = useRef(0);
  const skip = useRef(false);

  // type the source out one (or a few) chars at a time, like a person typing
  useEffect(() => {
    const src = SITE_SOURCE;
    let timer;
    const tick = () => {
      if (skip.current) {
        idx.current = src.length;
        setOut(src);
        setDone(true);
        return;
      }
      idx.current = Math.min(src.length, idx.current + 1 + Math.floor(Math.random() * 3));
      setOut(src.slice(0, idx.current));
      if (idx.current < src.length) {
        const ch = src[idx.current - 1];
        const delay = ch === "\n" ? 55 + Math.random() * 110 : 7 + Math.random() * 22;
        timer = setTimeout(tick, delay);
      } else {
        setDone(true);
      }
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, []);

  // keep the newest line in view; once the text is long this box scrolls
  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [out]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="code-term">
      <div className="ct-bar">
        <span className="ct-dots"><i className="r" /><i className="y" /><i className="g" /></span>
        <span className="ct-title">rgc — build — zsh</span>
        <div className="ct-actions">
          {!done && <button onClick={() => { skip.current = true; }}>skip ▸</button>}
          <button onClick={onClose}>✕ close</button>
        </div>
      </div>
      <pre className="ct-body" ref={boxRef}>
        <code>{out}<span className="ct-cursor" /></code>
      </pre>
    </div>
  );
}

function Badge() {
  const [phase, setPhase] = useState("badge"); // badge → fading → coding
  const ignite = () => {
    setPhase("fading");
    setTimeout(() => setPhase("coding"), 650);
  };
  return (
    <section className="scene badge-scene compact" data-idx="07" id="s07" data-screen-label="07 Studio">
      <div className="scene-label">
        <span className="num">07</span>
        <span>Studio · Identification</span>
        <span className="tick">/ Engineered Mark</span>
      </div>

      {phase !== "coding" && (
        <div className={`badge-stage ${phase === "fading" ? "fade-out" : ""}`}>
          <div className="ana-flare ana-live" style={{ top: "38%", left: "-12%", right: "-12%" }} />
          <div className="badge-card">
            <div className="side-text l">↓ Engineered by ROC Labs ↓</div>
            <div className="side-text r">↓ Film &amp; Motion Technology ↓</div>

            <button className="ignite-bolt" onClick={ignite} aria-label="Run build">
              <Bolt />
            </button>
            <div className="ignite-hint">▸ Tap the bolt</div>

            <div className="subline" style={{ marginTop: 22 }}>RGC Media · Film Studio</div>

            <div className="badge-table">
              <div>RGC Studio<br/>Los Angeles</div>
              <div>Founded Est.<br/>2026</div>
            </div>
            <div className="badge-rows" style={{ maxWidth: 320 }}>
              <div className="badge-row">Cameras · Sony FX3 · RED V-Raptor · iPhone Rig</div>
              <div className="badge-row">Pipeline · ProRes 422 HQ // LOG-C → Rec.709</div>
            </div>

            <div className="footer-text">
              Los Angeles, California // US<br/>
              <strong>www . rgc . studio</strong>
            </div>
          </div>
        </div>
      )}

      {phase === "coding" && <CodeTerminal onClose={() => setPhase("badge")} />}
    </section>
  );
}

/* =========================================================
   08 CONTACT — rotating credits + form
   ========================================================= */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [eject, setEject] = useState(false);       // patch click → orbs fly off right
  const [returning, setReturning] = useState(false); // …then fade back into the corner
  const patchOut = () => {
    if (eject || returning) return;                // ignore clicks mid-flight
    setEject(true);
    setTimeout(() => { setEject(false); setReturning(true); }, 5000); // reappear after 5s
    setTimeout(() => setReturning(false), 5850);
  };
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", project: "", msg: "" });
    }, 2600);
  };
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // letters arranged in a circle
  const letters = ["R","G","C","R","G","C","R","G","C"];

  return (
    <section className="scene footer-scene compact" data-idx="08" id="s08" data-screen-label="08 Contact">
      <div className={`lens-flare ${eject ? "eject" : returning ? "returning" : ""}`} />
      <div className="scene-label">
        <span className="num">08</span>
        <span>End Credits · Contact</span>
        <span className="tick">/ Roll Out</span>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <span className="dymo-label" style={{ cursor: "pointer" }} onClick={patchOut} title="Patch out">Patch Bay · Comms</span>
          <div style={{ marginTop: 22 }}>
            <span className="lbl">Email</span>
            <a href="mailto:contact@ramongarzacreative.com">contact@ramongarzacreative.com</a>
            <span className="lbl">Phone / SMS</span>
            <a href="sms:7607910284">(760) 791-0284</a>
            <span className="lbl">Studio · West</span>
            695 Town Center Dr.<br/>Costa Mesa, CA
            <span className="lbl">Studio · South</span>
            11 N Water St.<br/>Mobile, AL
            <span className="lbl">Hours</span>
            Mon–Sat · By Appointment
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="row">
            <span className="lbl">Name</span>
            <input value={form.name} onChange={update("name")} placeholder="First, Last" required />
          </div>
          <div className="row">
            <span className="lbl">Email</span>
            <input type="email" value={form.email} onChange={update("email")} placeholder="you@studio.com" required />
          </div>
          <div className="row">
            <span className="lbl">Project</span>
            <input value={form.project} onChange={update("project")} placeholder="Spec / Doc / Music / Brand / AI" />
          </div>
          <div className="row" style={{ alignItems: "start" }}>
            <span className="lbl" style={{ paddingTop: 6 }}>Brief</span>
            <textarea value={form.msg} onChange={update("msg")} placeholder="A line or two — we'll roll from there." />
          </div>
          <div className="submit-row">
            <button type="submit" className={sent ? "sent" : ""}>
              {sent ? "↺ Sending…" : "↦ Make Contact"}
            </button>
          </div>
        </form>
      </div>

      <div className="bottom-bar">
        <span>© 2026 Ramon Garza Creative · All Rolls Reserved</span>
        <div className="socials">
          <a href="http://instagram.com/ramongarzacreative" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.tiktok.com/@ramongarzacreative" target="_blank" rel="noopener">TikTok</a>
          <a href="https://www.facebook.com/profile.php?id=61579057703680" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Lightbox
   ========================================================= */
function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  if (!src) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <span className="lb-close">✕ Close · Esc</span>
      <img src={src} alt={caption} onClick={e => e.stopPropagation()} />
      <div className="lb-meta">{caption} · Frame 01 / 01 · Roll RGC</div>
    </div>
  );
}

/* =========================================================
   Film scratch lines — fixed overlay of three angled hairlines.
   They sway continuously; scrolling into Schedule / Reel / Stills
   (s01 / s02 / s03) fires a one-second anamorphic blue bloom.
   ========================================================= */
function FilmLines() {
  const ref = useRef(null);
  useEffect(() => {
    const targets = ["s01", "s02", "s03"]
      .map(id => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(entries => {
      const el = ref.current;
      if (!el) return;
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        // restart the bloom animation each time a target scrolls in
        el.classList.remove("anamorph");
        void el.offsetWidth; // force reflow so the animation re-fires
        el.classList.add("anamorph");
      });
    }, { threshold: 0.35 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <div className="film-lines" ref={ref} aria-hidden="true">
      {["l1", "l2", "l3"].map(n => (
        <div className={`fl-line ${n}`} key={n}>
          <div className="fl-ray">
            <div className="fl-white" />
            <div className="fl-blue" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   App
   ========================================================= */
function App() {
  const [lb, setLb] = useState({ src: null, cap: "" });
  const pick = (src, cap) => setLb({ src, cap });
  const { flashes, fire: firePaparazzi } = usePaparazzi();
  const { active: lightning, fire: fireLightning } = useLightning();
  return (
    <>
      <FilmLines />
      <Chrome />
      <ScrollRail />
      <Hero onLightning={fireLightning} />
      <Schedule onLightning={firePaparazzi} />
      <Reel onPickPhoto={pick} />
      <Stills onPickPhoto={pick} />
      <Super8Cam />
      <Guides />
      <AITools />
      <Badge />
      <Contact />
      <Lightbox src={lb.src} caption={lb.cap} onClose={() => setLb({ src: null, cap: "" })} />
      <PaparazziOverlay flashes={flashes} />
      <LightningOverlay active={lightning} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
