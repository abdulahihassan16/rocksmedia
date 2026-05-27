"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.fps(120);

interface SkyStop { p: number; top: string; bot: string; }
const SKY: SkyStop[] = [
  { p: 0.00, top: "#0b1026", bot: "#1a2444" },
  { p: 0.20, top: "#0b1026", bot: "#1a2444" },
  { p: 0.40, top: "#1b3a5c", bot: "#e8955a" },
  { p: 0.60, top: "#1b3a5c", bot: "#e8743a" },
  { p: 0.75, top: "#5b8db8", bot: "#aed0e6" },
  { p: 0.90, top: "#5b8db8", bot: "#e8743a" },
  { p: 1.00, top: "#2c3e6b", bot: "#0f1829" },
];

function hexRgb(h: string): [number, number, number] {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

function lerpHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexRgb(a);
  const [br, bg, bb] = hexRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}

function skyAt(p: number): { top: string; bot: string } {
  p = Math.max(0, Math.min(1, p));
  let a = SKY[0], b = SKY[SKY.length - 1];
  for (let i = 0; i < SKY.length - 1; i++) {
    if (p >= SKY[i].p && p <= SKY[i + 1].p) { a = SKY[i]; b = SKY[i + 1]; break; }
  }
  const t = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p);
  return { top: lerpHex(a.top, b.top, t), bot: lerpHex(a.bot, b.bot, t) };
}

function cBez(
  t: number,
  p0x: number, p0y: number,
  p1x: number, p1y: number,
  p2x: number, p2y: number,
  p3x: number, p3y: number,
): [number, number] {
  const mt = 1 - t;
  return [
    mt * mt * mt * p0x + 3 * mt * mt * t * p1x + 3 * mt * t * t * p2x + t * t * t * p3x,
    mt * mt * mt * p0y + 3 * mt * mt * t * p1y + 3 * mt * t * t * p2y + t * t * t * p3y,
  ];
}

interface Star { x: number; y: number; r: number; }
interface CloudItem { baseX: number; y: number; w: number; h: number; speed: number; }

function makeStars(w: number, h: number, n = 130): Star[] {
  let s = 42;
  const rng = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return Array.from({ length: n }, () => ({ x: rng() * w, y: rng() * h * 0.72, r: rng() * 1.5 + 0.3 }));
}

function makeClouds(w: number, h: number): CloudItem[] {
  return [
    { baseX: w * 0.12, y: h * 0.22, w: 240, h: 90,  speed: (w + 240) / 65 },
    { baseX: w * 0.42, y: h * 0.40, w: 180, h: 68,  speed: (w + 180) / 80 },
    { baseX: w * 0.67, y: h * 0.19, w: 215, h: 80,  speed: (w + 215) / 55 },
    { baseX: w * 0.88, y: h * 0.33, w: 160, h: 62,  speed: (w + 160) / 72 },
  ];
}

function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  cw: number, ch: number,
  alpha: number,
) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.beginPath();
  const blobs: [number, number, number][] = [
    [x + cw * 0.50, y + ch * 0.55, ch * 0.52],
    [x + cw * 0.28, y + ch * 0.64, ch * 0.44],
    [x + cw * 0.72, y + ch * 0.62, ch * 0.40],
    [x + cw * 0.40, y + ch * 0.36, ch * 0.32],
    [x + cw * 0.62, y + ch * 0.34, ch * 0.30],
  ];
  for (const [bx, by, br] of blobs) {
    ctx.moveTo(bx + br, by);
    ctx.arc(bx, by, br, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.restore();
}

function fillRect(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  halfW: number, halfH: number,
  canvasW: number, canvasH: number,
) {
  const x1 = Math.max(0, cx - halfW), y1 = Math.max(0, cy - halfH);
  const x2 = Math.min(canvasW, cx + halfW), y2 = Math.min(canvasH, cy + halfH);
  if (x2 > x1 && y2 > y1) ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}

function paint(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  p: number,
  stars: Star[],
  clouds: CloudItem[],
  elapsed: number,
  vanishProgress: number,
) {
  const w = canvas.width;
  const h = canvas.height;

  // Sky gradient
  const { top, bot } = skyAt(p);
  const sg = ctx.createLinearGradient(0, 0, 0, h);
  sg.addColorStop(0, top);
  sg.addColorStop(1, bot);
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, w, h);

  // Stars — fade from full at 0% to zero by 35%
  const sa = Math.max(0, 1 - p / 0.35);
  if (sa > 0) {
    ctx.fillStyle = `rgba(255,255,255,${(sa * 0.85).toFixed(3)})`;
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Moon — fades in on load (time-based), vanishes on first scroll (time-based)
  if (vanishProgress < 1) {
    const mx = w * 0.78;
    const my = h * 0.13;

    // Fade in: 0 → 1 over 1.2 s
    const fadeIn = Math.min(1, elapsed / 1.2);
    // Bubble-pop: expand slightly, then snap to zero
    let scale: number, fadeOut: number;
    if (vanishProgress < 0.30) {
      // Stretch phase — bubble grows before it pops
      scale = 1 + (vanishProgress / 0.30) * 0.38;
      fadeOut = 1;
    } else {
      // Pop phase — collapses with ease-in so it feels snappy
      const t = (vanishProgress - 0.30) / 0.70;
      const eased = t * t;
      scale = Math.max(0.01, 1.38 * (1 - eased));
      fadeOut = Math.max(0, 1 - eased);
    }
    const ma = fadeIn * fadeOut;

    if (ma > 0.005) {
      const moonR = 20 * scale;
      const glowR = 70 * scale;

      const mg = ctx.createRadialGradient(mx, my, 0, mx, my, glowR);
      mg.addColorStop(0, `rgba(215,232,255,${(ma * 0.28).toFixed(3)})`);
      mg.addColorStop(1, "rgba(200,222,255,0)");
      ctx.fillStyle = mg;
      fillRect(ctx, mx, my, glowR, glowR, w, h);

      ctx.beginPath();
      ctx.arc(mx, my, moonR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228,240,255,${ma.toFixed(3)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mx, my, moonR * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248,253,255,${(ma * 0.75).toFixed(3)})`;
      ctx.fill();
    }
  }

  // Sun — cubic bezier, rises from below at 40%, peaks midday, descends to 100%
  if (p >= 0.36) {
    const st = Math.max(0, Math.min(1, (p - 0.40) / 0.60));
    const sf = p < 0.47 ? Math.max(0, (p - 0.36) / 0.11) : 1.0;
    const [sx, sy] = cBez(
      st,
      w * 0.50, h + 90,
      w * 0.47, h * -0.12,
      w * 0.53, h * -0.10,
      w * 0.50, h * 0.85,
    );
    // Glow radius grows 60→120 as sun rises, shrinks back 120→60 as it sets
    const gr = 60 + 60 * Math.sin(st * Math.PI);
    const gb = gr * 2.4;
    const gg = ctx.createRadialGradient(sx, sy, 0, sx, sy, gb);
    gg.addColorStop(0,    `rgba(255,247,214,${(sf * 0.92).toFixed(3)})`);
    gg.addColorStop(0.30, `rgba(255,210,80,${(sf * 0.45).toFixed(3)})`);
    gg.addColorStop(1,    "rgba(255,180,40,0)");
    ctx.fillStyle = gg;
    fillRect(ctx, sx, sy, gb, gb, w, h);
    const dr = 24 + 10 * Math.sin(st * Math.PI);
    ctx.beginPath();
    ctx.arc(sx, sy, dr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,248,195,${sf.toFixed(3)})`;
    ctx.fill();
  }

  // Clouds — continuous right-to-left drift, fade in 58–68% scroll
  const ca = p < 0.58 ? 0 : p < 0.68 ? (p - 0.58) / 0.10 : 1.0;
  if (ca > 0) {
    for (const c of clouds) {
      const wrap = w + c.w;
      const traveled = (elapsed * c.speed) % wrap;
      let cx = c.baseX - traveled;
      if (cx < -c.w) cx += wrap;
      drawCloud(ctx, cx, c.y, c.w, c.h, ca);
    }
  }
}

export function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let clouds: CloudItem[] = [];
    let animStart = gsap.ticker.time;
    let lastP = -1;
    let vanishStart = -1;       // wall-clock time when first scroll was detected
    const VANISH_DUR = 0.75;   // seconds the suck-away lasts at 60 fps

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = makeStars(canvas.width, canvas.height);
      clouds = makeClouds(canvas.width, canvas.height);
      animStart = gsap.ticker.time;
      lastP = -1;
      paint(canvas, ctx, progressRef.current, stars, clouds, 0, vanishStart < 0 ? 0 : 1);
    };

    resize();

    // Debounce resize so rapid window resizes don't thrash canvas dimensions
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const p = progressRef.current;
      const now = gsap.ticker.time;
      const elapsed = now - animStart;

      // Detect first scroll — start the timed vanish
      if (p > 0 && vanishStart < 0) vanishStart = now;

      // vanishProgress: 0 = fully visible, 1 = fully gone
      const vanishProgress = vanishStart < 0
        ? 0
        : Math.min(1, (now - vanishStart) / VANISH_DUR);

      const cloudsVisible = p >= 0.58;
      const moonFadingIn  = elapsed < 1.25;
      const moonVanishing = vanishProgress > 0 && vanishProgress < 1;

      if (p === lastP && !cloudsVisible && !moonFadingIn && !moonVanishing) return;
      lastP = p;
      paint(canvas, ctx, p, stars, clouds, elapsed, vanishProgress);
    };
    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      id: "sky-bg",
      start: 0,
      end: "max",
      scrub: true,
      onUpdate: (self) => { progressRef.current = self.progress; },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
