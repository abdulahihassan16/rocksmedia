"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type MouseEvent,
} from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    name: "Discovery Call",
    label: "Step 1",
    title: "We start with a conversation",
    description:
      "We learn your business, your goals, and what makes you stand out. One call is all it takes — no forms, no questionnaires, just a real conversation.",
  },
  {
    name: "Design",
    label: "Step 2",
    title: "Your site is built by hand",
    description:
      "No templates, no AI shortcuts. Every pixel is crafted specifically around your brand, delivered in days, not weeks.",
  },
  {
    name: "Review",
    label: "Step 3",
    title: "You have full control",
    description:
      "We share the design with you before anything goes live. Your feedback shapes the final result — we don't launch until you're happy.",
  },
  {
    name: "Launch",
    label: "Step 4",
    title: "Go live and start converting",
    description:
      "Your site goes live, customers find you, and your business finally looks the way it deserves to.",
  },
];

// ─── Step illustrations (absolute-positioned inside the card) ─────────────────

function DiscoveryIllustration() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] h-full flex items-center justify-center pointer-events-none select-none">
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
        {/* Speech bubble 1 */}
        <rect x="10" y="20" width="120" height="72" rx="14" fill="rgba(79,142,247,0.12)" stroke="rgba(79,142,247,0.35)" strokeWidth="1.5"/>
        <path d="M30 92 L20 110 L50 92" fill="rgba(79,142,247,0.12)" stroke="rgba(79,142,247,0.35)" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Lines of text inside bubble 1 */}
        <rect x="26" y="38" width="60" height="6" rx="3" fill="rgba(79,142,247,0.40)"/>
        <rect x="26" y="52" width="88" height="6" rx="3" fill="rgba(79,142,247,0.25)"/>
        <rect x="26" y="66" width="72" height="6" rx="3" fill="rgba(79,142,247,0.25)"/>
        {/* Speech bubble 2 */}
        <rect x="50" y="98" width="120" height="52" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <path d="M150 98 L160 82 L130 98" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="66" y="114" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.20)"/>
        <rect x="66" y="127" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.12)"/>
      </svg>
    </div>
  );
}

function DesignIllustration() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] h-full flex items-center justify-center pointer-events-none select-none">
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
        {/* Browser frame */}
        <rect x="10" y="16" width="160" height="128" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        {/* Browser bar */}
        <rect x="10" y="16" width="160" height="28" rx="10" fill="rgba(255,255,255,0.06)"/>
        <rect x="10" y="34" width="160" height="10" fill="rgba(255,255,255,0.06)"/>
        {/* Traffic lights */}
        <circle cx="28" cy="30" r="4" fill="rgba(255,100,100,0.50)"/>
        <circle cx="42" cy="30" r="4" fill="rgba(255,200,50,0.50)"/>
        <circle cx="56" cy="30" r="4" fill="rgba(50,220,100,0.50)"/>
        {/* Hero image block */}
        <rect x="20" y="52" width="140" height="48" rx="5" fill="rgba(79,142,247,0.15)" stroke="rgba(79,142,247,0.25)" strokeWidth="1"/>
        {/* Wireframe lines */}
        <rect x="20" y="110" width="64" height="7" rx="3" fill="rgba(255,255,255,0.15)"/>
        <rect x="20" y="123" width="88" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/>
        {/* Right column block */}
        <rect x="96" y="110" width="64" height="26" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
      </svg>
    </div>
  );
}

function ReviewIllustration() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] h-full flex items-center justify-center pointer-events-none select-none">
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
        {/* Clipboard */}
        <rect x="30" y="24" width="120" height="118" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        {/* Clip */}
        <rect x="66" y="16" width="48" height="18" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5"/>
        {/* Check rows */}
        {[48, 76, 104].map((y, i) => (
          <g key={i}>
            <circle cx="52" cy={y + 8} r="8" fill={i < 2 ? "rgba(79,142,247,0.25)" : "rgba(255,255,255,0.06)"} stroke={i < 2 ? "rgba(79,142,247,0.50)" : "rgba(255,255,255,0.15)"} strokeWidth="1.2"/>
            {i < 2 && (
              <path d={`M${48} ${y+8} l3 3 5.5-5.5`} stroke="rgba(79,142,247,0.90)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            )}
            <rect x="68" y={y + 4} width={i === 0 ? 64 : i === 1 ? 52 : 44} height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
            <rect x="68" y={y + 14} width={i === 0 ? 44 : i === 1 ? 60 : 38} height="5" rx="2.5" fill="rgba(255,255,255,0.07)"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LaunchIllustration() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] h-full flex items-center justify-center pointer-events-none select-none">
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
        {/* Exhaust glow */}
        <ellipse cx="90" cy="138" rx="22" ry="10" fill="rgba(255,160,50,0.25)"/>
        <ellipse cx="90" cy="132" rx="12" ry="6" fill="rgba(255,200,80,0.30)"/>
        {/* Rocket body */}
        <path d="M90 20 C70 40 64 80 68 120 L90 128 L112 120 C116 80 110 40 90 20Z" fill="rgba(79,142,247,0.18)" stroke="rgba(79,142,247,0.45)" strokeWidth="1.5"/>
        {/* Nose cap */}
        <path d="M90 20 C82 28 78 40 78 52 L90 56 L102 52 C102 40 98 28 90 20Z" fill="rgba(79,142,247,0.35)"/>
        {/* Window */}
        <circle cx="90" cy="76" r="11" fill="rgba(255,255,255,0.08)" stroke="rgba(79,142,247,0.50)" strokeWidth="1.5"/>
        <circle cx="90" cy="76" r="6" fill="rgba(79,142,247,0.25)"/>
        {/* Left fin */}
        <path d="M68 120 L48 138 L68 130Z" fill="rgba(79,142,247,0.25)" stroke="rgba(79,142,247,0.35)" strokeWidth="1"/>
        {/* Right fin */}
        <path d="M112 120 L132 138 L112 130Z" fill="rgba(79,142,247,0.25)" stroke="rgba(79,142,247,0.35)" strokeWidth="1"/>
        {/* Stars */}
        <circle cx="24" cy="32" r="2" fill="rgba(255,255,255,0.40)"/>
        <circle cx="152" cy="50" r="1.5" fill="rgba(255,255,255,0.30)"/>
        <circle cx="36" cy="88" r="1.5" fill="rgba(255,255,255,0.25)"/>
        <circle cx="148" cy="100" r="2" fill="rgba(255,255,255,0.35)"/>
        <circle cx="160" cy="28" r="1" fill="rgba(255,255,255,0.20)"/>
      </svg>
    </div>
  );
}

const ILLUSTRATIONS = [DiscoveryIllustration, DesignIllustration, ReviewIllustration, LaunchIllustration];

// ─── Feature card with mouse-tracking glow (from 10.txt) ──────────────────────

type WrapperStyle = React.CSSProperties & { "--x": string; "--y": string };

function FeatureCard({ step }: { step: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(79,142,247,0.07), transparent 40%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Illustration = ILLUSTRATIONS[step];

  return (
    <motion.div
      className="relative w-full rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-tracking glow layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background }}
      />

      <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
        <div className="relative m-6 md:m-14 min-h-[320px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-6 md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-base font-semibold uppercase tracking-wider text-blue-400/80"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {PROCESS_STEPS[step].label}
              </motion.div>

              <motion.h2
                className="text-4xl font-black tracking-tight text-white md:text-5xl"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.10, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {PROCESS_STEPS[step].title}
              </motion.h2>

              <motion.p
                className="text-lg leading-relaxed text-white/50"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {PROCESS_STEPS[step].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Step illustration — desktop only, absolutely positioned on the right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`illus-${step}`}
              className="absolute inset-0 pointer-events-none hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Illustration />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Steps nav (from 10.txt StepsNav) ────────────────────────────────────────

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="h-3.5 w-3.5">
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

function StepsNav({
  current,
  onChange,
}: {
  current: number;
  onChange: (i: number) => void;
}) {
  return (
    <nav aria-label="Progress" className="flex justify-start px-0 overflow-x-auto scrollbar-none">
      <ol className="flex flex-nowrap items-center gap-2" role="list">
        {PROCESS_STEPS.map((step, idx) => {
          const isCompleted = current > idx;
          const isCurrent   = current === idx;
          return (
            <motion.li
              key={step.name}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: isCurrent ? 1 : 0.9, opacity: isCurrent ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => onChange(idx)}
                className={`group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none cursor-pointer ${
                  isCurrent
                    ? "bg-blue-600/80 text-white"
                    : isCompleted
                    ? "bg-blue-600/30 text-blue-300"
                    : "bg-white/[0.06] text-white/50 hover:bg-white/[0.10] hover:text-white/80"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-blue-500 text-white"
                      : isCurrent
                      ? "bg-blue-400 text-blue-900"
                      : "bg-white/[0.10] text-white/40"
                  }`}
                >
                  {isCompleted ? <CheckIcon /> : <span className="text-xs">{idx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Solar system ─────────────────────────────────────────────────────────────

const LOGOS = [
  { name: "C&N Window",      abbr: "C&N", color: "#60a5fa" },
  { name: "Apex Roofing",    abbr: "AR",  color: "#34d399" },
  { name: "Blue Ridge HVAC", abbr: "BR",  color: "#f472b6" },
  { name: "Summit Dental",   abbr: "SD",  color: "#fb923c" },
  { name: "Iron Gate",       abbr: "IG",  color: "#a78bfa" },
  { name: "Harbor View",     abbr: "HV",  color: "#facc15" },
  { name: "Maple Leaf",      abbr: "ML",  color: "#4ade80" },
  { name: "Peak Fitness",    abbr: "PF",  color: "#f87171" },
  { name: "Cornerstone",     abbr: "CL",  color: "#38bdf8" },
  { name: "Blue Sky Co",     abbr: "BS",  color: "#c084fc" },
  { name: "Brick & Stone",   abbr: "B&S", color: "#fbbf24" },
  { name: "Golden Gate",     abbr: "GG",  color: "#6ee7b7" },
];

const ORBIT_COUNT     = 3;
const ORBIT_GAP_REM   = 12;
const ICONS_PER_ORBIT = LOGOS.length / ORBIT_COUNT;

export function SolarSystemScene() {
  const panelRef    = useRef<HTMLDivElement>(null);
  const badgeRefs   = useRef<(HTMLDivElement | null)[][]>(
    Array.from({ length: ORBIT_COUNT }, () => new Array(ICONS_PER_ORBIT).fill(null)),
  );
  const contentRefs = useRef<(HTMLDivElement | null)[][]>(
    Array.from({ length: ORBIT_COUNT }, () => new Array(ICONS_PER_ORBIT).fill(null)),
  );

  useEffect(() => {
    const THRESHOLD = 80;
    let raf: number;
    let lastFrame = 0;
    const prevCX = Array.from({ length: ORBIT_COUNT }, () => new Array(ICONS_PER_ORBIT).fill(0));
    const prevCY = Array.from({ length: ORBIT_COUNT }, () => new Array(ICONS_PER_ORBIT).fill(0));
    let seeded = false;

    function tick(timestamp: number) {
      raf = requestAnimationFrame(tick);
      if (timestamp - lastFrame < 8) return; // ~120 fps
      lastFrame = timestamp;

      if (!panelRef.current) return;
      const viewportRight = window.innerWidth;

      type State = {
        badge: HTMLDivElement; content: HTMLDivElement | null;
        dist: number; vx: number; vy: number;
      };
      const states: State[] = [];

      for (let oi = 0; oi < ORBIT_COUNT; oi++) {
        for (let ii = 0; ii < ICONS_PER_ORBIT; ii++) {
          const badge = badgeRefs.current[oi][ii];
          if (!badge) continue;
          const r  = badge.getBoundingClientRect();
          const cx = r.left + r.width  / 2;
          const cy = r.top  + r.height / 2;
          const vx = seeded ? cx - prevCX[oi][ii] : 0;
          const vy = seeded ? cy - prevCY[oi][ii] : 0;
          prevCX[oi][ii] = cx;
          prevCY[oi][ii] = cy;
          states.push({ badge, content: contentRefs.current[oi][ii], dist: viewportRight - cx, vx, vy });
        }
      }
      seeded = true;

      for (const { badge, content, dist, vx, vy } of states) {
        if (dist < THRESHOLD) {
          const t        = Math.max(0, dist) / THRESHOLD;
          const progress = 1 - t;
          const scale    = Math.max(0.01, t * t);
          badge.style.transform = `scale(${scale})`;
          const glowR = 6 + progress * 24;
          const alpha = 0.15 + progress * 0.80;
          const spd   = Math.sqrt(vx * vx + vy * vy) || 1;
          const tx    = (-vx / spd * progress * 16).toFixed(1);
          const ty    = (-vy / spd * progress * 16).toFixed(1);
          // filter: drop-shadow is GPU-composited, unlike box-shadow which triggers repaints
          badge.style.filter = [
            `drop-shadow(0 0 ${glowR.toFixed(0)}px rgba(210,228,255,${alpha.toFixed(2)}))`,
            `drop-shadow(${tx}px ${ty}px ${(glowR * 1.1).toFixed(0)}px rgba(180,210,255,${(alpha * 0.40).toFixed(2)}))`,
          ].join(" ");
          if (content) content.style.opacity = String(Math.max(0, t * 2 - 1).toFixed(3));
        } else {
          badge.style.transform = "scale(1)";
          badge.style.filter = "";
          if (content) content.style.opacity = "1";
        }
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={panelRef} className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-[78rem] h-[78rem] flex items-center justify-center"
      >
        <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 shadow-lg flex items-center justify-center rm-sun-pulse z-10">
          <img src="/images/logo.png" alt="Rocks Media" className="w-16 h-16 object-contain" />
        </div>

        {[...Array(ORBIT_COUNT)].map((_, orbitIdx) => {
          const size      = `${16 + ORBIT_GAP_REM * (orbitIdx + 1)}rem`;
          const speed     = 10 + orbitIdx * 7;
          const angleStep = (2 * Math.PI) / ICONS_PER_ORBIT;
          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border border-dashed border-white/35"
              style={{ width: size, height: size, animation: `rm-orbit-spin ${speed}s linear infinite` }}
            >
              {LOGOS.slice(orbitIdx * ICONS_PER_ORBIT, orbitIdx * ICONS_PER_ORBIT + ICONS_PER_ORBIT).map((logo, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x     = 50 + 50 * Math.cos(angle);
                const y     = 50 + 50 * Math.sin(angle);
                return (
                  <div key={iconIdx} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                    <div
                      ref={(el) => { badgeRefs.current[orbitIdx][iconIdx] = el; }}
                      className="w-11 h-11 rounded-full border bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                      style={{ borderColor: `${logo.color}55`, willChange: "transform, filter" }}
                    >
                      <div ref={(el) => { contentRefs.current[orbitIdx][iconIdx] = el; }} className="flex flex-col items-center">
                        <span className="text-[9px] font-bold leading-none" style={{ color: logo.color }}>{logo.abbr}</span>
                        <span className="text-[5px] text-white/30 leading-none mt-0.5 px-1 text-center">{logo.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-5 inset-x-0 flex justify-center">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.22em] font-medium">Trusted by local businesses</span>
      </div>

      <style>{`
        @keyframes rm-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rm-sun-pulse { animation: rm-sun-pulse 3s ease-in-out infinite; }
        @keyframes rm-sun-pulse {
          0%, 100% { box-shadow: 0 0 18px 5px rgba(147,197,253,0.20), 0 0 45px 14px rgba(147,197,253,0.08); }
          50%       { box-shadow: 0 0 32px 10px rgba(147,197,253,0.38), 0 0 70px 24px rgba(147,197,253,0.16); }
        }
      `}</style>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface HeroWithImagesProps {
  title?: string;
}

function HeroWithImages({ title = "How We Build Your Site" }: HeroWithImagesProps) {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % PROCESS_STEPS.length);
    }, 5000);
  }, []);

  function handleStepChange(i: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveStep(i);
    startTimer();
  }

  useEffect(() => {
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startTimer]);

  return (
    <div className="w-full py-24 lg:py-40 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4">

        {/* ── Centered one-line title ── */}
        <h2
          className="font-black tracking-tighter text-foreground text-center mb-16"
          style={{ fontSize: "clamp(1.6rem, 3.6vw, 4.5rem)" }}
        >
          {title}
        </h2>

        {/* ── Steps: centered, fills the section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5 max-w-5xl mx-auto w-full"
        >
          <StepsNav current={activeStep} onChange={handleStepChange} />
          <FeatureCard step={activeStep} />

          {/* ── Prev / Next arrows ── */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-full border border-white/[0.10] bg-white/[0.04] text-white/50 text-sm font-medium transition-all duration-200 hover:bg-white/[0.09] hover:text-white/90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>

            <button
              onClick={() => handleStepChange(activeStep + 1)}
              disabled={activeStep === PROCESS_STEPS.length - 1}
              className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-full border border-white/[0.10] bg-white/[0.04] text-white/50 text-sm font-medium transition-all duration-200 hover:bg-white/[0.09] hover:text-white/90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export { HeroWithImages };
