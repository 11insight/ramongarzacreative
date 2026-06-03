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
    ["06", "Hooks"], ["07", "AI"], ["08", "Studio"], ["09", "Contact"]
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
      {/* hero anamorphic flare removed by request */}

      {/* TOP ROW — slate meta */}
      <div className="hero-top">
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
          <span className="ttl">Artificially Enhanced</span>
          <span>AI / LLM Enabled</span>
          <span className="ttl" style={{ marginTop: 10 }}>{phrases[count % phrases.length]}</span>
        </div>
        <div className="bolt" onClick={onLightning}>
          <Bolt onClick={onLightning} />
        </div>
        <div className="col right">
          <span className="ttl">Edit / Cut</span>
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
            Artificially Enhanced<br/>
            AI / LLM Enabled
          </div>
          <div className="bolt" onClick={onLightning}><Bolt onClick={onLightning} /></div>
          <div className="r">
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
    sub: "Dream · anamorphic",
    stock: "Super 8mm",
    wb: "5600 K",
    halate: true,
    filter: "saturate(1.25) contrast(1.34) brightness(.96) sepia(.20) hue-rotate(-4deg)",
    overlay(ctx, W, H, grain) {
      ctx.globalCompositeOperation = "soft-light";
      const grade = ctx.createLinearGradient(0, 0, 0, H);
      grade.addColorStop(0,   "rgba(255,170,100,.30)");
      grade.addColorStop(.50, "rgba(40,80,130,.18)");
      grade.addColorStop(1,   "rgba(20,60,100,.32)");
      ctx.fillStyle = grade; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";
      const lk1 = ctx.createRadialGradient(W*.10, H*.10, 0, W*.10, H*.10, W*1.0);
      lk1.addColorStop(0, "rgba(255,140,60,.72)");
      lk1.addColorStop(.18, "rgba(255,100,40,.40)");
      lk1.addColorStop(.50, "rgba(200,80,30,.10)");
      lk1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lk1; ctx.fillRect(0, 0, W, H);
      const lk2 = ctx.createRadialGradient(W*.95, H*.95, 0, W*.95, H*.95, W*.9);
      lk2.addColorStop(0, "rgba(255,170,90,.58)");
      lk2.addColorStop(.40, "rgba(255,120,60,.18)");
      lk2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lk2; ctx.fillRect(0, 0, W, H);
      const fy1 = H * 0.32;
      const f1 = ctx.createLinearGradient(0, fy1, W, fy1);
      f1.addColorStop(0, "rgba(80,180,255,0)");
      f1.addColorStop(.15, "rgba(150,210,255,.50)");
      f1.addColorStop(.40, "rgba(210,240,255,.95)");
      f1.addColorStop(.60, "rgba(230,248,255,1)");
      f1.addColorStop(.85, "rgba(150,210,255,.50)");
      f1.addColorStop(1, "rgba(80,180,255,0)");
      ctx.fillStyle = f1; ctx.fillRect(0, fy1 - 16, W, 32);
      const orb = ctx.createRadialGradient(W*.50, fy1, 0, W*.50, fy1, W*.42);
      orb.addColorStop(0, "rgba(230,245,255,.95)");
      orb.addColorStop(.20, "rgba(180,220,255,.58)");
      orb.addColorStop(.55, "rgba(120,180,240,.16)");
      orb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = orb; ctx.fillRect(0, fy1 - W*.42, W, W*.84);
      const fy2 = H * 0.58;
      const f2 = ctx.createLinearGradient(0, fy2, W, fy2);
      f2.addColorStop(0, "rgba(80,180,255,0)");
      f2.addColorStop(.20, "rgba(130,200,255,.34)");
      f2.addColorStop(.50, "rgba(200,230,255,.78)");
      f2.addColorStop(.80, "rgba(130,200,255,.34)");
      f2.addColorStop(1, "rgba(80,180,255,0)");
      ctx.fillStyle = f2; ctx.fillRect(0, fy2 - 10, W, 20);
      const fy3 = H * 0.78;
      const f3 = ctx.createLinearGradient(0, fy3, W, fy3);
      f3.addColorStop(0, "rgba(100,180,255,0)");
      f3.addColorStop(.5, "rgba(195,230,255,.58)");
      f3.addColorStop(1, "rgba(100,180,255,0)");
      ctx.fillStyle = f3; ctx.fillRect(0, fy3 - 5, W, 10);
      const g1 = ctx.createRadialGradient(W*.15, H*.45, 0, W*.15, H*.45, W*.18);
      g1.addColorStop(0, "rgba(180,220,255,.50)");
      g1.addColorStop(.6, "rgba(180,220,255,.10)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1; ctx.fillRect(0, H*.30, W*.36, W*.36);
      const g2 = ctx.createRadialGradient(W*.85, H*.48, 0, W*.85, H*.48, W*.16);
      g2.addColorStop(0, "rgba(255,200,150,.46)");
      g2.addColorStop(.6, "rgba(255,200,150,.10)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(W*.69, H*.32, W*.32, W*.32);
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*.28, W/2, H/2, Math.max(W,H)*.72);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(.55, "rgba(0,8,30,.36)");
      vg.addColorStop(1, "rgba(0,5,25,.92)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, .28);
    }
  },
  {
    id: "cinematic",
    name: "Cinematic",
    sub: "Anamorphic · blue flare",
    stock: "Spielbergian",
    wb: "5200 K",
    filter: "saturate(.78) contrast(1.22) brightness(.93) hue-rotate(8deg)",
    overlay(ctx, W, H, grain) {
      ctx.globalCompositeOperation = "soft-light";
      const wash = ctx.createLinearGradient(0, 0, 0, H);
      wash.addColorStop(0,  "rgba(80,150,220,.32)");
      wash.addColorStop(.5, "rgba(100,170,230,.20)");
      wash.addColorStop(1,  "rgba(60,120,200,.32)");
      ctx.fillStyle = wash; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";
      const fy1 = H * 0.32;
      const f1 = ctx.createLinearGradient(0, fy1, W, fy1);
      f1.addColorStop(0, "rgba(80,180,255,0)");
      f1.addColorStop(.15, "rgba(140,210,255,.32)");
      f1.addColorStop(.40, "rgba(200,240,255,.90)");
      f1.addColorStop(.60, "rgba(220,245,255,.95)");
      f1.addColorStop(.85, "rgba(140,210,255,.32)");
      f1.addColorStop(1, "rgba(80,180,255,0)");
      ctx.fillStyle = f1; ctx.fillRect(0, fy1 - 14, W, 28);
      const orb = ctx.createRadialGradient(W*.50, fy1, 0, W*.50, fy1, W*.38);
      orb.addColorStop(0, "rgba(225,240,255,.85)");
      orb.addColorStop(.20, "rgba(165,215,255,.45)");
      orb.addColorStop(.55, "rgba(110,180,240,.12)");
      orb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = orb; ctx.fillRect(0, fy1 - W*.38, W, W*.76);
      const fy2 = H * 0.58;
      const f2 = ctx.createLinearGradient(0, fy2, W, fy2);
      f2.addColorStop(0, "rgba(80,180,255,0)");
      f2.addColorStop(.20, "rgba(120,200,255,.22)");
      f2.addColorStop(.50, "rgba(190,230,255,.70)");
      f2.addColorStop(.80, "rgba(120,200,255,.22)");
      f2.addColorStop(1, "rgba(80,180,255,0)");
      ctx.fillStyle = f2; ctx.fillRect(0, fy2 - 8, W, 16);
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*.30, W/2, H/2, Math.max(W,H)*.75);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(.55, "rgba(0,8,30,.30)");
      vg.addColorStop(1, "rgba(0,8,28,.88)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      drawGrain(ctx, W, H, grain, .12);
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

  // attach the MediaStream to the <video> AFTER it has mounted.
  // setStream() inside start() schedules a React render — videoRef.current is
  // still null at that point, so doing srcObject in start() silently no-ops.
  useEffect(() => {
    const v = videoRef.current;
    if (!stream || !v) return;
    v.srcObject = stream;
    // ignore play() errors — iOS sometimes throws "AbortError" on rapid mount/unmount
    v.play().catch(() => {});
  }, [stream]);

  // live render loop — draws video into the canvas with the active preset every frame.
  // The canvas IS the preview AND the captured photo (WYSIWYG).
  // Prefer requestVideoFrameCallback (fires on actual decoded frames) and fall
  // back to requestAnimationFrame on browsers that don't support it.
  useEffect(() => {
    if (!stream || !canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    let active = true;
    let rafId = 0;
    let vfcId = 0;

    const paint = () => {
      if (!active) return;
      drawPreset(ctx, tmpRef.current, video, preset, CAM_W, CAM_H, grainRef.current);
    };

    if (typeof video.requestVideoFrameCallback === "function") {
      const vfcLoop = () => { if (!active) return; paint(); vfcId = video.requestVideoFrameCallback(vfcLoop); };
      vfcId = video.requestVideoFrameCallback(vfcLoop);
    } else {
      const rafLoop = () => { if (!active) return; paint(); rafId = requestAnimationFrame(rafLoop); };
      rafLoop();
    }

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (vfcId && video.cancelVideoFrameCallback) {
        try { video.cancelVideoFrameCallback(vfcId); } catch {}
      }
    };
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
      // srcObject + play() are wired up in the useEffect above, after <video> mounts
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
      </div>

      <div className={`cam-stage no-frame ${fullscreen ? "fullscreen" : ""}`}>
        {/* the live camera lives at /cam — main page is now just a launcher card */}
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
            {/* the actual camera lives at /cam — a dedicated full-viewport page
                with no surrounding chrome, back camera by default, and a real
                shutter. The inline section is now a launcher. */}
            <a className="cam-shutter-btn" href="/cam">
              <span className="ring" />
              ▸ Open RGC Filmcam
            </a>
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
    <section className="scene" data-idx="07" id="s07" data-screen-label="07 AI Tools">
      <div className="scene-label">
        <span className="num">07</span>
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
        <a className="btn-acid" href="#s09">✦ See Tools · Deploy</a>
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
   06½ HOOK LAB — Viral Hook Maker (topic → hook → script)
   Brand-themed port of the standalone tool. Pure client-side.
   ========================================================= */
const HM_NICHE_KEYWORDS = {
  fitness: ['fitness','workout','gym','muscle','weight loss','bulk','cut','cardio','lifting','gains','body','exercise','running','diet','calories','protein','training','crossfit','yoga','stretching','abs','squat','deadlift','bench'],
  finance: ['money','finance','investing','stocks','crypto','budget','savings','income','wealth','passive income','side hustle','debt','credit','real estate','trading','portfolio','retire','401k','compound','dividend'],
  relationships: ['dating','relationship','love','marriage','breakup','attachment','partner','attraction','boundaries','toxic','communication','intimacy','trust','heartbreak','romance','ex','situationship'],
  tech: ['coding','programming','ai','software','app','startup','saas','tech','developer','javascript','python','product','ux','design','automation','no-code','chatgpt','machine learning'],
  food: ['cooking','recipe','food','meal prep','restaurant','baking','chef','kitchen','ingredients','flavor','nutrition','healthy eating','vegan','keto'],
  beauty: ['skincare','makeup','beauty','hair','glow','routine','acne','anti-aging','serum','moisturizer','dermatologist','nails','lashes'],
  business: ['business','entrepreneur','marketing','sales','brand','clients','freelance','agency','growth','scale','revenue','funnel','leads','content strategy','social media'],
  mindset: ['mindset','productivity','habits','discipline','motivation','focus','goals','morning routine','journaling','meditation','stoic','self-improvement','confidence','fear']
};

function hmDetectNiche(topic) {
  const lower = topic.toLowerCase();
  let best = 'general', bestScore = 0;
  for (const [niche, keywords] of Object.entries(HM_NICHE_KEYWORDS)) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) { bestScore = score; best = niche; }
  }
  if (bestScore === 0) {
    for (const [niche, keywords] of Object.entries(HM_NICHE_KEYWORDS)) {
      if (keywords.some(kw => kw.includes(lower) || lower.includes(kw))) return niche;
    }
  }
  return best;
}

const HM_HOOKS = {
  fitness: [
    { tag: "Transformation", gen: t => `I did ${t} for 90 days straight. Here's what actually happened to my body.` },
    { tag: "Myth Bust", gen: t => `Your ${t} routine is probably sabotaging your gains. Here's the science.` },
    { tag: "Contrarian", gen: t => `Stop doing ${t} every day. Overtraining is killing your progress.` },
    { tag: "Shortcut", gen: t => `The ${t} hack that got me more results in 2 weeks than 6 months of grinding.` },
    { tag: "Challenge", gen: t => `I replaced my entire ${t} plan with one exercise. The results were insane.` },
    { tag: "Science", gen: t => `A new study just proved everything wrong about ${t}. Coaches are furious.` },
    { tag: "Mistake", gen: t => `The #1 ${t} mistake I see in every gym. Are you doing it too?` },
    { tag: "Before/After", gen: t => `What 6 months of proper ${t} looks like vs. what most people do.` },
    { tag: "Pain Point", gen: t => `If ${t} isn't working for you, it's probably this one thing.` },
    { tag: "Authority", gen: t => `I trained 500+ clients on ${t}. This pattern shows up every single time.` },
    { tag: "Underrated", gen: t => `The most underrated ${t} technique that elite athletes use daily.` },
    { tag: "Warning", gen: t => `${t} injuries are skyrocketing. Here's what nobody is telling beginners.` },
    { tag: "Simplify", gen: t => `Forget everything about ${t}. You only need these 3 things.` },
    { tag: "Comparison", gen: t => `I tested the top 5 ${t} methods. Only one actually worked long-term.` },
    { tag: "Emotional", gen: t => `${t} didn't just change my body. It saved my mental health.` }
  ],
  finance: [
    { tag: "Contrarian", gen: t => `Rich people don't actually do ${t} the way influencers tell you.` },
    { tag: "Math", gen: t => `I ran the numbers on ${t}. Most people are losing money without realizing it.` },
    { tag: "System", gen: t => `The exact ${t} system that took me from broke to $10k/month.` },
    { tag: "Mistake", gen: t => `The ${t} mistake that costs the average person $47,000 over their lifetime.` },
    { tag: "Simplify", gen: t => `${t} is way simpler than gurus make it seem. Here's the 3-step version.` },
    { tag: "Warning", gen: t => `If you're doing ${t} in 2024, you're probably getting scammed.` },
    { tag: "Proof", gen: t => `Here's my actual ${t} results after 12 months. No fluff, real numbers.` },
    { tag: "Secret", gen: t => `Banks don't want you to know this about ${t}. It changes everything.` },
    { tag: "Age-Based", gen: t => `If you're in your 20s and not doing ${t} this way, you're behind.` },
    { tag: "Comparison", gen: t => `${t} vs. what actually builds wealth. Most people pick wrong.` },
    { tag: "Timeline", gen: t => `What happens when you start ${t} at 25 vs. 35. The gap is terrifying.` },
    { tag: "Psychology", gen: t => `The reason you keep failing at ${t} is psychological, not financial.` },
    { tag: "Framework", gen: t => `The 50/30/20 rule is dead. Here's how ${t} actually works now.` },
    { tag: "Unpopular", gen: t => `Unpopular opinion: ${t} is a waste of time for 90% of people.` },
    { tag: "Story", gen: t => `I went from $80k in debt to financial freedom using ${t}. No trust fund.` }
  ],
  relationships: [
    { tag: "Pattern", gen: t => `If your ${t} keeps failing, you're probably attracted to this attachment style.` },
    { tag: "Psychology", gen: t => `The psychological trick that instantly shifts ${t} dynamics in your favor.` },
    { tag: "Story", gen: t => `I ruined my ${t} with one sentence. Don't make this mistake.` },
    { tag: "Harsh Truth", gen: t => `Nobody wants to hear this about ${t}, but you need to.` },
    { tag: "Green Flag", gen: t => `The one ${t} sign that predicts long-term happiness. Most people miss it.` },
    { tag: "Red Flag", gen: t => `If they do this in your ${t}, leave. It never gets better.` },
    { tag: "Reframe", gen: t => `${t} isn't about finding the right person. It's about being the right person.` },
    { tag: "Vulnerability", gen: t => `I was terrified of ${t} until I learned this about myself.` },
    { tag: "Science", gen: t => `Therapists say this about ${t} and it changed how I see everything.` },
    { tag: "Boundary", gen: t => `The ${t} boundary I set that people called "too much" saved my life.` },
    { tag: "Confession", gen: t => `I self-sabotaged every ${t} I had. Here's how I finally stopped.` },
    { tag: "Generational", gen: t => `Our parents got ${t} completely wrong. Here's what healthy actually looks like.` },
    { tag: "Question", gen: t => `Are you actually ready for ${t}, or are you just lonely?` },
    { tag: "Wisdom", gen: t => `After 10 years of studying ${t}, this is the only advice that matters.` },
    { tag: "Counterintuitive", gen: t => `The best ${t} advice sounds backwards: stop trying so hard.` }
  ],
  tech: [
    { tag: "Prediction", gen: t => `${t} is about to make 80% of current methods obsolete. Here's proof.` },
    { tag: "Build", gen: t => `I built a ${t} project in 48 hours that now makes $3k/month.` },
    { tag: "Shortcut", gen: t => `Senior devs use ${t} completely differently than juniors. This is the gap.` },
    { tag: "Contrarian", gen: t => `Hot take: ${t} is overhyped and here's what you should learn instead.` },
    { tag: "Tutorial Hook", gen: t => `The ${t} tutorial nobody made because it's "too simple." It works.` },
    { tag: "Career", gen: t => `Learning ${t} got me a $150k job offer. Here's my exact roadmap.` },
    { tag: "Mistake", gen: t => `I wasted 6 months learning ${t} wrong. Here's the right order.` },
    { tag: "Tool", gen: t => `This free ${t} tool replaced $200/month of software for me.` },
    { tag: "Trend", gen: t => `Companies are quietly replacing their ${t} stack. The shift is happening now.` },
    { tag: "Beginner", gen: t => `If I had to learn ${t} from scratch in 2024, I'd do this.` },
    { tag: "Debug", gen: t => `The ${t} bug that took me 3 days to find was one character.` },
    { tag: "Architecture", gen: t => `Most ${t} projects fail because of this one architectural decision.` },
    { tag: "Speed", gen: t => `I 10x'd my ${t} workflow with this one automation.` },
    { tag: "Reality Check", gen: t => `What ${t} interviews actually test vs. what you're studying.` },
    { tag: "Future", gen: t => `${t} in 2025 will look nothing like today. Start preparing now.` }
  ],
  food: [
    { tag: "Technique", gen: t => `Restaurant chefs do ${t} completely differently. This is their secret.` },
    { tag: "Mistake", gen: t => `You've been doing ${t} wrong your entire life. One fix changes everything.` },
    { tag: "Challenge", gen: t => `I made ${t} every day for 30 days. By day 15, I discovered something.` },
    { tag: "Hack", gen: t => `The lazy ${t} hack that tastes better than the "proper" method.` },
    { tag: "Science", gen: t => `The chemistry behind perfect ${t}. Once you know this, you can't go back.` },
    { tag: "Budget", gen: t => `${t} for $3 that tastes like a $30 restaurant plate.` },
    { tag: "Speed", gen: t => `5-minute ${t} that meal prep influencers don't want you to know about.` },
    { tag: "Cultural", gen: t => `My grandma's ${t} recipe that she never wrote down. Until now.` },
    { tag: "Comparison", gen: t => `I tested 7 viral ${t} recipes. Only 2 are worth making.` },
    { tag: "Ingredient", gen: t => `The one ingredient that transforms ${t} from good to unforgettable.` },
    { tag: "Controversial", gen: t => `I'm going to say it: most ${t} recipes online are terrible.` },
    { tag: "Visual", gen: t => `Watch how ${t} is supposed to look when done right.` }
  ],
  beauty: [
    { tag: "Routine", gen: t => `Dermatologists say this ${t} step is useless. Stop wasting money.` },
    { tag: "Ingredient", gen: t => `The ${t} ingredient that actually works vs. the one brands push.` },
    { tag: "Mistake", gen: t => `Your ${t} is aging you. Here's what to do instead.` },
    { tag: "Dupe", gen: t => `$8 ${t} dupe that outperforms the $80 version. Tested side by side.` },
    { tag: "Order", gen: t => `You're applying ${t} in the wrong order. This changes absorption by 3x.` },
    { tag: "Simplify", gen: t => `I cut my ${t} routine to 3 products. My skin has never looked better.` },
    { tag: "Myth", gen: t => `The biggest ${t} myth that even estheticians still believe.` },
    { tag: "Before/After", gen: t => `30 days of consistent ${t}. The glow-up was insane.` },
    { tag: "Science", gen: t => `The actual science of why ${t} works — and why most people do it wrong.` },
    { tag: "Warning", gen: t => `Stop using ${t} if you notice this. Your skin is telling you something.` },
    { tag: "Pro Tip", gen: t => `MUAs use ${t} this way backstage. Nobody talks about it online.` },
    { tag: "Trend Check", gen: t => `Is the ${t} trend actually worth it? I tested it for 2 weeks.` }
  ],
  business: [
    { tag: "Revenue", gen: t => `The ${t} strategy that 10x'd my revenue in 90 days. Full breakdown.` },
    { tag: "Mistake", gen: t => `I lost $50k making this ${t} mistake. Learn from my failure.` },
    { tag: "Framework", gen: t => `The ${t} framework I use with every client. It works every time.` },
    { tag: "Contrarian", gen: t => `Everyone's doing ${t} wrong. The market shifted and nobody noticed.` },
    { tag: "Case Study", gen: t => `How a no-name brand used ${t} to hit $1M in 8 months.` },
    { tag: "Simplify", gen: t => `${t} doesn't need to be complicated. Here's the 1-page version.` },
    { tag: "Trend", gen: t => `${t} is about to change dramatically. Position yourself now.` },
    { tag: "Psychology", gen: t => `The buyer psychology behind ${t} that doubles conversion rates.` },
    { tag: "Underrated", gen: t => `The most underrated ${t} tactic that outperforms everything on TikTok.` },
    { tag: "System", gen: t => `My exact ${t} system. Steal it. I don't gatekeep.` },
    { tag: "Reality", gen: t => `The truth about ${t} that gurus won't tell you because it doesn't sell courses.` },
    { tag: "Scale", gen: t => `${t} at $1k/month vs. $10k/month looks completely different. Here's how.` },
    { tag: "Client", gen: t => `The ${t} pitch that landed me a $20k client in one DM.` },
    { tag: "Automation", gen: t => `I automated 80% of my ${t} process. Here's the exact stack.` }
  ],
  mindset: [
    { tag: "Identity", gen: t => `${t} isn't a discipline problem. It's an identity problem. Let me explain.` },
    { tag: "Pattern Break", gen: t => `I quit ${t} for 30 days. What happened next rewired my brain.` },
    { tag: "Neuroscience", gen: t => `Your brain is literally wired against ${t}. Here's how to override it.` },
    { tag: "Harsh Truth", gen: t => `You don't need more ${t} motivation. You need less comfort.` },
    { tag: "System", gen: t => `The ${t} system that works even when you have zero willpower.` },
    { tag: "Reframe", gen: t => `What if ${t} isn't about doing more? What if it's about removing?` },
    { tag: "Story", gen: t => `${t} felt impossible until I changed this one belief about myself.` },
    { tag: "Compound", gen: t => `The ${t} habit that seems useless daily but is life-changing over 1 year.` },
    { tag: "Environment", gen: t => `Your ${t} is failing because of your environment, not your effort.` },
    { tag: "Dark Side", gen: t => `The toxic side of ${t} culture nobody talks about.` },
    { tag: "Minimalist", gen: t => `I stripped ${t} down to one daily practice. Everything else was noise.` },
    { tag: "Research", gen: t => `Psychologists discovered why ${t} fails for most people. The fix is simple.` },
    { tag: "Trigger", gen: t => `The moment I stopped romanticizing ${t} and started doing this instead.` }
  ],
  general: [
    { tag: "Contrarian", gen: t => `Everything you've been told about ${t} is designed to keep you average.` },
    { tag: "Story", gen: t => `I spent 3 years obsessed with ${t}. Here's what I wish I knew on day one.` },
    { tag: "Pattern", gen: t => `I studied 100 people who mastered ${t}. They all do this one thing.` },
    { tag: "Warning", gen: t => `If you're approaching ${t} this way, you're wasting your time.` },
    { tag: "Simplify", gen: t => `${t} in 60 seconds. No fluff. No filler. Just what works.` },
    { tag: "Question", gen: t => `Why does nobody talk about the dark side of ${t}?` },
    { tag: "Proof", gen: t => `I tested every popular ${t} method for 6 months. Here's my honest ranking.` },
    { tag: "Confession", gen: t => `I was wrong about ${t} for years. Here's what changed my mind.` },
    { tag: "Framework", gen: t => `The 3-step ${t} framework that works for absolute beginners.` },
    { tag: "Prediction", gen: t => `${t} is about to change completely. Most people aren't ready.` },
    { tag: "Myth", gen: t => `The #1 ${t} myth that's holding you back.` },
    { tag: "Breakdown", gen: t => `Let me break down ${t} the way nobody else does.` },
    { tag: "Challenge", gen: t => `I did ${t} for 30 days. The results surprised even me.` },
    { tag: "Underrated", gen: t => `The most underrated ${t} advice I've ever received.` },
    { tag: "Shortcut", gen: t => `The ${t} shortcut that took me years to discover.` }
  ]
};

const HM_SCRIPTS = {
  fitness: {
    frames: [
      ["Shirtless/sports bra shot showing physique with text overlay of the hook", "Side-by-side transformation photo flash (1 second)", "Close-up of hands gripping a barbell or dumbbells"],
      ["Cut to you mid-rep with intense focus, speaking over the movement", "Show the 'wrong form' first then snap to correct form", "POV shot walking into the gym"],
      ["Slow-mo of the key exercise with text annotation", "Mirror selfie zoom with a stat overlay", "Quick montage: 3 clips of the movement in 1 second"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "State the specific fitness myth or problem. Use their exact frustration." },
      { beat: "Proof/Authority (8-12s)", tip: "Establish credibility fast: 'After training 300+ clients...' or show a quick transformation." },
      { beat: "The Mechanism (12-20s)", tip: "Explain the WHY behind the fix. Reference muscle activation, progressive overload, or biomechanics." },
      { beat: "The Fix (20-27s)", tip: "Show the exact exercise, rep range, or adjustment. Keep it to ONE actionable change." },
      { beat: "Payoff (27-30s)", tip: "Show the result or give a timeline: 'Do this for 4 weeks and DM me your progress.'" }
    ],
    cta: ["Follow for the full training split — dropping it this week.", "Save this before your next workout. Tag your gym partner who needs this.", "Comment 'PLAN' and I'll send you the exact program I used.", "Part 2 breaks down the nutrition side. Don't miss it."]
  },
  finance: {
    frames: [
      ["Screen recording of a brokerage account or bank balance", "Calculator app showing compound interest", "Sitting at desk with laptop — 'let me show you something' energy"],
      ["Whiteboard or iPad sketch of the money concept", "Cut to you holding cash or showing a chart", "Screenshot of actual returns/income proof"],
      ["Split screen: what most people do vs. what works", "Zoom into a specific number on a spreadsheet", "Walking through a nice space — subtle lifestyle proof"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "Start with a specific dollar amount or stat. Make it tangible and painful." },
      { beat: "Context (8-12s)", tip: "Explain WHY this happens — the system, the psychology, or the hidden fee structure." },
      { beat: "Framework (12-22s)", tip: "Break it into numbered steps or a simple formula. Use exact numbers." },
      { beat: "Objection Handling (22-26s)", tip: "Address the #1 excuse and kill it with one sentence." },
      { beat: "Payoff (26-30s)", tip: "End with the transformation. Future-pace them." }
    ],
    cta: ["Follow for the exact accounts and tools I use.", "Comment 'MONEY' and I'll DM you the spreadsheet template.", "Save this. Screenshot it. Start today.", "Part 2 covers the tax optimization side."]
  },
  relationships: {
    frames: [
      ["Direct to camera with soft lighting — vulnerable energy", "Black screen with a provocative quote in white text", "Aesthetic b-roll of couple over your voiceover"],
      ["Close-up face — like telling a secret to a friend", "Split screen showing two text conversations (healthy vs. toxic)", "Sitting on bed or couch — safe space energy"],
      ["Walking outside with voiceover — contemplative mood", "Journal or book in hand", "Eye contact with camera, slight pause before key insight"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "Start with a relatable scenario they'll recognize immediately." },
      { beat: "The Pattern (8-14s)", tip: "Name the attachment pattern or relationship dynamic at play." },
      { beat: "The Why (14-22s)", tip: "Go deeper into the root cause. Reference childhood patterns or nervous system responses." },
      { beat: "The Shift (22-27s)", tip: "Give the reframe or actionable practice. Make it therapeutic." },
      { beat: "Payoff (27-30s)", tip: "End with hope and empowerment." }
    ],
    cta: ["Follow if this hit — I post deep dives on attachment every week.", "Save this for the next time you're spiraling at 2am.", "Comment your attachment style — I'll tell you your biggest blind spot.", "Part 2 covers what secure love actually feels like."]
  },
  tech: {
    frames: [
      ["Screen recording of code running or a live demo", "Terminal/IDE with a satisfying output", "Your face + code split"],
      ["Quick cut through a GitHub repo or project structure", "Before/after of the UI or performance metrics", "Whiteboard diagram of the architecture"],
      ["Live coding the key piece (sped up)", "Browser dev tools showing the performance win", "Deploy button press → live URL reveal"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "State the problem in developer terms. Be specific about the failure mode." },
      { beat: "Context (8-12s)", tip: "Show why the common approach fails. Reference scalability or real-world production issues." },
      { beat: "Solution (12-22s)", tip: "Show the exact implementation. Name the library, pattern, or technique." },
      { beat: "Proof (22-26s)", tip: "Show benchmarks or before/after metrics." },
      { beat: "Payoff (26-30s)", tip: "Give the repo link or next step. Make it immediately actionable." }
    ],
    cta: ["Follow for more dev tips that actually ship to production.", "Comment 'REPO' and I'll share the full source code.", "Save this for your next code review.", "Part 2 covers the deployment and CI/CD setup."]
  },
  food: {
    frames: [
      ["Close-up of sizzling food in a pan — ASMR audio", "Overhead shot of all ingredients laid out", "Your hands cutting an ingredient in slow motion"],
      ["The money shot: plating moment or cheese pull", "Quick-cut of 3 prep steps in 2 seconds", "Taste test reaction — genuine surprise"],
      ["Final dish spinning on a plate — golden hour lighting", "Fork going in, steam rising", "Side-by-side: store-bought vs. homemade"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "Hook them with the result or a bold claim about the dish." },
      { beat: "Technique (8-15s)", tip: "Teach the core technique with specifics: exact temperature, timing, or physical cues." },
      { beat: "The Secret (15-22s)", tip: "Reveal the non-obvious ingredient or step that makes the difference." },
      { beat: "Assembly (22-27s)", tip: "Show final steps with satisfying visuals. Let the food speak." },
      { beat: "Payoff (27-30s)", tip: "Bite shot or taste reaction. One-line verdict." }
    ],
    cta: ["Save this for dinner tonight.", "Comment 'RECIPE' and I'll send the full measurements.", "Follow for more recipes that are actually easy and actually good.", "Tag someone who says they can't cook."]
  },
  beauty: {
    frames: [
      ["Split face: one side done, one side bare", "Close-up of product texture on fingers or skin", "Mirror POV — like doing your routine together"],
      ["Before skin/hair + after, same lighting", "Swatching products on arm in good lighting", "Applying the product in real-time — smooth motions"],
      ["The final look in natural light — glowing", "Product lineup — minimal and curated", "Close-up of skin texture after routine — no filter"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "State the specific skin/hair/beauty concern directly." },
      { beat: "The Science (8-14s)", tip: "Explain the ingredient or technique at a dermatology level." },
      { beat: "Application (14-22s)", tip: "Show exact technique: how much product, what motions, what order." },
      { beat: "Common Mistakes (22-26s)", tip: "Call out what most people do wrong." },
      { beat: "Payoff (26-30s)", tip: "Show the final result and give a timeline for visible change." }
    ],
    cta: ["Follow for ingredient breakdowns that actually make sense.", "Save this for your next shopping trip.", "Comment your skin type and I'll recommend the exact product.", "Full routine video drops tomorrow."]
  },
  business: {
    frames: [
      ["Screen recording of revenue dashboard or analytics", "You in a workspace — laptop, coffee, clean desk", "Client testimonial screenshot or DM proof"],
      ["Whiteboard strategy breakdown or mind map", "Before/after of a funnel or landing page", "Walking and talking — movement adds authority"],
      ["Quick-cut of deliverables or results", "Zoom into a specific metric that jumped", "Split screen: amateur approach vs. your method"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "Lead with a specific result. Make the number contextual and believable." },
      { beat: "Framework (8-15s)", tip: "Break the strategy into a named framework or numbered steps." },
      { beat: "Deep Dive (15-23s)", tip: "Go deep on the most counterintuitive step. Show exact copy or targeting." },
      { beat: "Objection Kill (23-27s)", tip: "Address the skeptic with one powerful reframe." },
      { beat: "Payoff (27-30s)", tip: "End with an aspirational but grounded vision." }
    ],
    cta: ["Follow for more strategies I use with $10k/month+ clients.", "Comment 'FRAMEWORK' and I'll send you the full playbook.", "Save this for your next strategy session.", "Part 2 covers the exact tools and automations."]
  },
  mindset: {
    frames: [
      ["Direct to camera, early morning light", "Walking in nature with voiceover", "Journaling at a desk, then looking up at camera"],
      ["Black screen with a one-line quote that punches", "Time-lapse of your morning routine with voiceover", "Close-up of eyes — intense, honest, vulnerable"],
      ["Sitting in stillness, then speaking one powerful sentence", "Hands writing in a journal — the words are the hook", "POV of your environment: the space you've created intentionally"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "Start with a universal struggle everyone recognizes." },
      { beat: "The Root (8-14s)", tip: "Name the psychological mechanism. Reference specific psychology." },
      { beat: "Reframe (14-22s)", tip: "Flip the narrative with a counterintuitive truth." },
      { beat: "Practice (22-27s)", tip: "Give ONE specific daily practice with clear instructions." },
      { beat: "Payoff (27-30s)", tip: "End with a philosophical anchor they'll want to screenshot." }
    ],
    cta: ["Follow if you're done with surface-level motivation.", "Save this for the days when you're questioning everything.", "Comment what you're working through right now. I read every one.", "Tomorrow's video is about the identity shift that makes discipline effortless."]
  },
  general: {
    frames: [
      ["Direct to camera with high energy — 'I need to tell you something'", "Bold text on screen with a dramatic pause", "Quick montage of 3 clips related to the topic"],
      ["Cut to you explaining with hand gestures — animated and confident", "Show evidence: a screenshot, a stat, a visual proof", "Walking toward camera slowly — builds anticipation"],
      ["React to your own content — split screen commentary", "Zoom in on your face for emphasis", "Quick cut between 2-3 angles to maintain energy"]
    ],
    body: [
      { beat: "Setup (3-8s)", tip: "State the problem in their language. Use 'you' and describe a specific scenario." },
      { beat: "Re-hook (8-12s)", tip: "Drop a pattern interrupt to prevent the scroll." },
      { beat: "Value Drop (12-22s)", tip: "Deliver your main insight using the Rule of 3." },
      { beat: "Tension (22-26s)", tip: "Add stakes and create urgency without being manipulative." },
      { beat: "Payoff (26-30s)", tip: "Land with a memorable one-liner they'll want to screenshot." }
    ],
    cta: ["Follow for more breakdowns like this — no fluff, just signal.", "Save this for later. You'll want to come back to it.", "Comment your biggest takeaway. I respond to all of them.", "Part 2 goes even deeper. Don't miss it."]
  }
};

function HookMaker() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState(null);
  const [hooks, setHooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [shake, setShake] = useState(false);
  const scriptRef = useRef(null);

  const generate = () => {
    const t = topic.trim();
    if (!t) { setShake(true); setTimeout(() => setShake(false), 1400); return; }
    const n = hmDetectNiche(t);
    const set = HM_HOOKS[n] || HM_HOOKS.general;
    const shuffled = [...set].sort(() => Math.random() - 0.5).slice(0, 5)
      .map(h => ({ tag: h.tag, text: h.gen(t) }));
    setNiche(n);
    setHooks(shuffled);
    setSelected(null);
  };

  const build = (hookText) => {
    const n = niche || hmDetectNiche(topic);
    const data = HM_SCRIPTS[n] || HM_SCRIPTS.general;
    const frames = data.frames.map(ideas => ideas[Math.floor(Math.random() * ideas.length)]);
    const cta = [...data.cta].sort(() => Math.random() - 0.5).slice(0, 2);
    setSelected({ hookText, frames, body: data.body, cta });
    setTimeout(() => { if (scriptRef.current) scriptRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
  };

  const copyHook = (text, i) => {
    navigator.clipboard && navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(c => (c === i ? null : c)), 1400);
  };

  const copyScript = () => {
    if (!selected) return;
    const frames = selected.frames.map((f, idx) => `Frame ${idx + 1} (${idx}-${idx + 1}s): ${f}`).join("\n");
    const body = selected.body.map(b => `${b.beat}: ${b.tip}`).join("\n");
    const cta = selected.cta.join("\n");
    const full = `HOOK: "${selected.hookText}"\n\nOPENING FRAMES:\n${frames}\n\nSCRIPT BODY:\n${body}\n\nCTA:\n${cta}`;
    navigator.clipboard && navigator.clipboard.writeText(full);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 1600);
  };

  return (
    <section className="scene" data-idx="06" id="s06" data-screen-label="06 Hook Lab">
      <div className="scene-label">
        <span className="num">06</span>
        <span>Hook Lab · Tools</span>
        <span className="tick">/ Topic → Hook → Script</span>
      </div>
      <div className="section-head">
        <h2 className="section-title">Hook<em>lab</em></h2>
        <div className="meta">
          Enter a topic // Pick a hook<br/>
          Pull a full retention-built script
        </div>
      </div>

      <div className="hook-tool">
        <div className={`hook-bar ${shake ? "shake" : ""}`}>
          <input
            className="hook-input"
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") generate(); }}
            placeholder="Enter video topic…"
            spellCheck={false}
          />
          <button className="btn-acid hook-go" onClick={generate}>Generate ✦</button>
        </div>

        {niche && (
          <div className="hook-niche">
            <span className="dot" />Detected niche · {niche.charAt(0).toUpperCase() + niche.slice(1)}
          </div>
        )}

        {hooks.length > 0 && (
          <div className="hook-grid">
            {hooks.map((h, i) => (
              <div className="hook-card" key={i} style={{ animationDelay: (i * 0.07) + "s" }}>
                <span className="hook-tag">{h.tag}</span>
                <p className="hook-text">{h.text}</p>
                <div className="hook-actions">
                  <button className="hook-use" onClick={() => build(h.text)}>Use This ›</button>
                  <button className="hook-copy" onClick={() => copyHook(h.text, i)}>
                    {copiedIdx === i ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <div className="hook-script" ref={scriptRef}>
            <div className="hook-script-head">
              <h3>Your Viral Script</h3>
              <button className="hook-copyall" onClick={copyScript}>
                {scriptCopied ? "Copied! ✓" : "⧉ Copy Script"}
              </button>
            </div>

            <div className="hook-selected">“{selected.hookText}”</div>

            <div className="hook-block frames">
              <h4 className="hook-block-title">◢ Opening Frames · First 3 Seconds</h4>
              {selected.frames.map((f, idx) => (
                <div className="hook-line" key={idx}>
                  <span className="k">Frame {idx + 1} · {idx}–{idx + 1}s</span>
                  <p>{f}</p>
                </div>
              ))}
            </div>

            <div className="hook-block body">
              <h4 className="hook-block-title">◢ Script Body · Retention Structure</h4>
              {selected.body.map((b, idx) => (
                <div className="hook-line" key={idx}>
                  <span className="k">{b.beat}</span>
                  <p>{b.tip}</p>
                </div>
              ))}
            </div>

            <div className="hook-block cta">
              <h4 className="hook-block-title">◢ Closing CTA</h4>
              {selected.cta.map((c, idx) => (
                <div className="hook-line" key={idx}>
                  <p>{c}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
    <section className="scene badge-scene compact" data-idx="08" id="s08" data-screen-label="08 Studio">
      <div className="scene-label">
        <span className="num">08</span>
        <span>Studio · Identification</span>
        <span className="tick">/ Engineered Mark</span>
      </div>

      {phase !== "coding" && (
        <div className={`badge-stage ${phase === "fading" ? "fade-out" : ""}`}>
          {/* Studio anamorphic flare removed by request */}
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
    <section className="scene footer-scene compact" data-idx="09" id="s09" data-screen-label="09 Contact">
      <div className={`lens-flare ${eject ? "eject" : returning ? "returning" : ""}`} />
      <div className="scene-label">
        <span className="num">09</span>
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
      <HookMaker />
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
