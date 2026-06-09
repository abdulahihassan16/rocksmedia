"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const STATS = [
  {
    value: "81%",
    label: "of consumers research a business online before making a purchase",
  },
  {
    value: "84%",
    label: "of people trust a business with a website more than one with only social media",
  },
  {
    value: "1 in 3",
    label: "shoppers walked away from a small business just because it had no website",
  },
  {
    value: "2x",
    label: "faster revenue growth for businesses that have a website",
  },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: "easeOut" as const, delay },
});

const CONTAINER_W = 280;
const MACHINE_H   = 96;
const LENS_Y      = 74;
const BEAM_H      = 290;
const BEAM_CX     = 140;

function UfoMachine({ bobbing }: { bobbing: boolean }) {
  const ringRx = [116, 99, 82, 65, 49, 33] as const;
  return (
    <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)" }}>
      <style>{`@keyframes ufoEP { 0%,100%{opacity:.72} 50%{opacity:1} }`}</style>
      <motion.svg
        width="280" height="96" viewBox="0 0 280 96"
        fill="none"
        style={{ overflow: "visible" }}
        animate={bobbing ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          bobbing
            ? { duration: 6.5, ease: "easeInOut", repeat: Infinity }
            : { duration: 0.4, ease: "easeOut" }
        }
      >
        <defs>
          <linearGradient id="uBodyTop" x1="140" y1="10" x2="140" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ccd4ec" />
            <stop offset="20%"  stopColor="#9aaace" />
            <stop offset="56%"  stopColor="#6070a4" />
            <stop offset="100%" stopColor="#3a4870" />
          </linearGradient>
          <linearGradient id="uBodyBot" x1="140" y1="68" x2="140" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#3a4870" />
            <stop offset="100%" stopColor="#131b2c" />
          </linearGradient>
          <linearGradient id="uRimGrad" x1="140" y1="62" x2="140" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#8898c2" />
            <stop offset="100%" stopColor="#2c3858" />
          </linearGradient>
          <radialGradient id="uDomeGrad" cx="34%" cy="26%" r="66%">
            <stop offset="0%"   stopColor="rgba(208,228,255,0.94)" />
            <stop offset="36%"  stopColor="rgba(76,116,202,0.70)" />
            <stop offset="70%"  stopColor="rgba(16,36,118,0.85)" />
            <stop offset="100%" stopColor="rgba(5,11,56,0.97)" />
          </radialGradient>
          <radialGradient id="uEmitGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,255,220,1)" />
            <stop offset="32%"  stopColor="rgba(255,210,72,0.96)" />
            <stop offset="68%"  stopColor="rgba(255,138,18,0.70)" />
            <stop offset="100%" stopColor="rgba(255,80,0,0)" />
          </radialGradient>
          <radialGradient id="uBeamGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%"   stopColor="rgba(255,196,56,0.55)" />
            <stop offset="44%"  stopColor="rgba(255,146,22,0.17)" />
            <stop offset="100%" stopColor="rgba(255,100,0,0)" />
          </radialGradient>
          <filter id="uHalo" x="-22%" y="-32%" width="144%" height="165%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6.5" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0.2 0.3 0.9 0 0  0.2 0.3 0.9 0 0  0.5 0.6 0.9 0 0  0 0 0 0.32 0"
              result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="uEmitBlur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter id="uEmitGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g filter="url(#uHalo)">
          <path d="M 22,68 Q 20,84 140,90 Q 260,84 258,68 Z" fill="url(#uBodyBot)" />

          {ringRx.map((rx, i) => (
            <ellipse key={i}
              cx="140" cy="72"
              rx={rx} ry={rx * 0.094}
              fill="none"
              stroke={i % 2 === 0 ? "#586494" : "#34406a"}
              strokeWidth={i === 0 ? 1.4 : 1.0}
              opacity={0.68 - i * 0.06}
            />
          ))}

          <path
            d="M 22,68 C 18,42 96,22 140,20 C 184,22 262,42 258,68 L 258,72 Q 256,84 140,90 Q 24,84 22,72 Z"
            fill="url(#uBodyTop)"
          />

          {([
            { cy: 52, rx: 108, ry: 7 },
            { cy: 43, rx:  86, ry: 5.5 },
            { cy: 36, rx:  64, ry: 4.2 },
            { cy: 30, rx:  44, ry: 3.0 },
          ] as const).map(({ cy, rx, ry }, i) => (
            <ellipse key={i} cx="140" cy={cy} rx={rx} ry={ry}
              fill="none"
              stroke="rgba(255,255,255,0.052)"
              strokeWidth="0.8"
            />
          ))}

          <ellipse cx="108" cy="37" rx="44" ry="9"
            fill="rgba(215,228,255,0.09)" transform="rotate(-5,108,37)" />
          <ellipse cx="120" cy="28" rx="27" ry="5.5"
            fill="rgba(215,228,255,0.065)" />

          <ellipse cx="140" cy="68" rx="120" ry="12"
            fill="none" stroke="#7890ba" strokeWidth="1.4" />
          <ellipse cx="140" cy="68" rx="120" ry="12"
            fill="url(#uRimGrad)" opacity="0.22" />
          <ellipse cx="140" cy="71" rx="118" ry="11"
            fill="none" stroke="rgba(0,0,0,0.40)" strokeWidth="2.2" />

          <path
            d="M 96,48 C 96,18 120,10 140,10 C 160,10 184,18 184,48 Z"
            fill="url(#uDomeGrad)"
            stroke="rgba(58,98,215,0.28)"
            strokeWidth="0.9"
          />
          <ellipse cx="122" cy="24" rx="9" ry="16"
            fill="rgba(185,212,255,0.10)"
            transform="rotate(-18,122,24)" />
          <path d="M 96,48 Q 140,54 184,48"
            fill="none"
            stroke="rgba(78,108,178,0.30)"
            strokeWidth="1.0" />
        </g>

        <ellipse cx="140" cy="80" rx="40" ry="11"
          fill="rgba(255,180,40,0.18)"
          filter="url(#uEmitBlur)" />
        <ellipse cx="140" cy="80" rx="29" ry="8"
          fill="none"
          stroke="rgba(255,206,82,0.80)"
          strokeWidth="4.5"
          filter="url(#uEmitGlow)"
          style={{ animation: "ufoEP 1.7s ease-in-out infinite" }} />
        <ellipse cx="140" cy="80" rx="18" ry="5.2"
          fill="none"
          stroke="rgba(255,248,206,0.95)"
          strokeWidth="2.8"
          style={{ animation: "ufoEP 1.7s ease-in-out infinite" }} />
        <ellipse cx="140" cy="80" rx="10" ry="3.2"
          fill="url(#uEmitGrad)"
          style={{ animation: "ufoEP 1.7s ease-in-out infinite" }} />

        <ellipse cx="140" cy="90" rx="70" ry="28" fill="url(#uBeamGrad)" />
      </motion.svg>
    </div>
  );
}

function SpotlightBeam({ inView }: { inView: boolean }) {
  const topHalf = 10;
  const botHalf = 80;

  return (
    <motion.svg
      width={CONTAINER_W}
      height={BEAM_H}
      viewBox={`0 0 ${CONTAINER_W} ${BEAM_H}`}
      style={{
        position: "absolute",
        left: 0,
        top: LENS_Y + 10,
        pointerEvents: "none",
        mixBlendMode: "screen",
        overflow: "visible",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeIn", delay: 0.1 }}
    >
      <defs>
        <linearGradient id="beamFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,250,228,0.30)" />
          <stop offset="45%"  stopColor="rgba(255,248,218,0.15)" />
          <stop offset="82%"  stopColor="rgba(255,246,212,0.05)" />
          <stop offset="100%" stopColor="rgba(255,246,212,0.00)" />
        </linearGradient>
        <filter id="beamBlur" x="-25%" y="-5%" width="150%" height="115%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
        </filter>
      </defs>
      <polygon
        points={`
          ${BEAM_CX - topHalf},0
          ${BEAM_CX + topHalf},0
          ${BEAM_CX + botHalf},${BEAM_H}
          ${BEAM_CX - botHalf},${BEAM_H}
        `}
        fill="url(#beamFade)"
        filter="url(#beamBlur)"
      />
    </motion.svg>
  );
}

export function StatsSection() {
  const containerRef  = useRef<HTMLDivElement>(null);  // outer positioning div (observer target)
  const ufoFlightRef  = useRef<HTMLDivElement>(null);  // GSAP animates this
  const [landed, setLanded] = useState(false);

  const existRef    = useRef<HTMLSpanElement>(null);
  const existInView = useInView(existRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const el      = ufoFlightRef.current;
    const trigger = containerRef.current;
    if (!el || !trigger) return;

    // Place UFO off-screen left, invisible
    gsap.set(el, {
      x: -1500,
      opacity: 0,
      rotation: 0,
      transformOrigin: `${BEAM_CX}px ${MACHINE_H / 2}px`,
    });

    let tl: gsap.core.Timeline | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        tl = gsap.timeline({ onComplete: () => setLanded(true) });

        // Fade in while still off-screen, then fly across
        tl.to(el, { opacity: 1, duration: 0.15, ease: "none" })
          .to(el, { x: 0, duration: 0.9, ease: "power2.out" }, "-=0.15")
          // Landing swivel: right → left → slight right → settle
          .to(el, { x: 22,  rotation: 5,   duration: 0.30, ease: "power1.out" })
          .to(el, { x: -15, rotation: -4,  duration: 0.25, ease: "power1.inOut" })
          .to(el, { x: 7,   rotation: 1.5, duration: 0.18, ease: "power1.inOut" })
          .to(el, { x: 0,   rotation: 0,   duration: 0.15, ease: "power2.inOut" });
      },
      { threshold: 0.1 }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      tl?.kill();
    };
  }, []);

  return (
    <section className="relative w-full py-48 px-5 md:px-16">
      <style>{`
        @media (min-width: 769px) {
          .ufo-outer { left: calc(50% + 160px) !important; }
        }
      `}</style>

      {/* UFO + beam ── outer div is the IntersectionObserver target */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="ufo-outer"
        style={{
          position: "absolute",
          top: 0,
          left: "calc(50% + 5px)",
          transform: "translateX(-50%)",
          width: `${CONTAINER_W}px`,
          height: `${LENS_Y + 10 + BEAM_H}px`,
          pointerEvents: "none",
          zIndex: 5,
          overflow: "visible",
        }}
      >
        {/* Inner div: GSAP flies this in and swivels it on landing */}
        <div
          ref={ufoFlightRef}
          style={{ position: "absolute", inset: 0 }}
        >
          <UfoMachine bobbing={landed} />
        </div>

        {/* Beam stays anchored to the landing spot — fades in after UFO settles */}
        <SpotlightBeam inView={landed} />
      </div>

      {/* Heading + stats */}
      <div className="w-full flex flex-col items-center">

        <motion.h2
          {...fade(0)}
          className="font-black tracking-tighter text-white text-center leading-tight mb-20 md:mb-28 px-2"
          style={{ fontSize: "clamp(1.6rem, 6vw, 4.5rem)" }}
        >
          If You Can&rsquo;t Be Found Online,
          <br className="hidden md:block" />{" "}
          <span style={{ color: "#CC0000" }}>
            You Don&rsquo;t{" "}
            <span
              ref={existRef}
              className="relative inline-block"
              style={{
                textShadow: `
                  0 4px 8px rgba(0,0,0,0.95),
                  0 10px 28px rgba(0,0,0,0.85),
                  0 18px 55px rgba(0,0,0,0.60)
                `,
              }}
            >
              Exist
              {/* Halo mobile — small, stays as-is */}
              <motion.span
                aria-hidden="true"
                className="md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: existInView ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.75 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -58%)",
                  width: "280px",
                  height: "160px",
                  background: `
                    radial-gradient(ellipse 130px 60px at 50% 58%,
                      rgba(255, 252, 228, 0.07) 0%,
                      rgba(255, 252, 228, 0.04) 42%,
                      rgba(255, 252, 228, 0.00) 65%
                    ),
                    radial-gradient(ellipse 90px 40px at 50% 58%,
                      rgba(255, 252, 235, 0.00) 0%,
                      rgba(255, 252, 235, 0.00) 40%,
                      rgba(255, 252, 228, 0.48) 53%,
                      rgba(255, 250, 222, 0.22) 65%,
                      rgba(255, 248, 218, 0.08) 78%,
                      rgba(255, 248, 218, 0.00) 90%
                    )
                  `,
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                }}
              />
              {/* Halo desktop — larger, focused around "Exist" */}
              <motion.span
                aria-hidden="true"
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: existInView ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.75 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -58%)",
                  width: "640px",
                  height: "320px",
                  background: `
                    radial-gradient(ellipse 300px 140px at 50% 58%,
                      rgba(255, 252, 228, 0.10) 0%,
                      rgba(255, 252, 228, 0.06) 42%,
                      rgba(255, 252, 228, 0.00) 65%
                    ),
                    radial-gradient(ellipse 200px 90px at 50% 58%,
                      rgba(255, 252, 235, 0.00) 0%,
                      rgba(255, 252, 235, 0.00) 40%,
                      rgba(255, 252, 228, 0.55) 53%,
                      rgba(255, 250, 222, 0.26) 65%,
                      rgba(255, 248, 218, 0.08) 78%,
                      rgba(255, 248, 218, 0.00) 90%
                    )
                  `,
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                }}
              />
            </span>
          </span>
        </motion.h2>

        {/* Stats — 2×2 grid on mobile, single row on sm+ */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-start sm:justify-between w-full max-w-[1400px] mx-auto gap-10 sm:gap-0">
          {STATS.map((stat, i) => (
            <div key={i} className="flex sm:flex-1 items-center justify-center">
              <motion.div
                {...fade(0.1 + i * 0.1)}
                className="flex flex-col items-center text-center w-full px-2 md:px-8"
              >
                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-3 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm text-white leading-snug max-w-[140px]">
                  {stat.label}
                </span>
              </motion.div>

              {i < STATS.length - 1 && (
                <div className="hidden sm:block h-5 w-px bg-white/20 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
