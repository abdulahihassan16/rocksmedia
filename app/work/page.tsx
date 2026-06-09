"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Client data ──────────────────────────────────────────────────────────────

const CLIENTS = [
  {
    id: "fresh-kut",
    label: "Fresh Kut",
    description: "Custom barber and salon site built from scratch.",
    link: "https://fresh-kut-barber-salon.abdulahihassan16.workers.dev/",
  },
  {
    id: "cn-window",
    label: "C&N Window Cleaning",
    description: "Full custom site. Now ranking on Google for Durham Region.",
    link: "https://cnwindowcleaning.ca/",
  },
  {
    id: "victory-ai",
    label: "Victory AI",
    description: "Custom website built for Victory AI.",
    link: "https://thevictory.ai/",
  },
  {
    id: "somali-handyman",
    label: "Somali Handyman GTA",
    description: "Local handyman service built to convert visitors into calls.",
    link: "https://somalihandyman.ca/",
  },
  {
    id: "united-sports",
    label: "United Sports Club",
    description: "Custom sports club site built for the local community.",
    link: null,
  },
  {
    id: "es-auto",
    label: "E&S Auto Sales",
    description: "Auto dealership site built to showcase inventory and drive leads.",
    link: null,
  },
  {
    id: "cell-doctor",
    label: "Cell Doctor",
    description: "Phone repair shop site built to rank locally and book repairs.",
    link: null,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;
const NAVY = "#0b1026";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// ─── Neutral inline SVG icon (browser window) ─────────────────────────────────

function SiteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <circle cx="7.5" cy="6" r="0.5" fill="currentColor" />
      <circle cx="10.5" cy="6" r="0.5" fill="currentColor" />
      <circle cx="13.5" cy="6" r="0.5" fill="currentColor" />
    </svg>
  );
}

// ─── Live iframe preview ───────────────────────────────────────────────────────

function LivePreviewCard({ link, label, isMobile }: { link: string; label: string; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div
        className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-8"
        style={{ background: NAVY }}
      >
        <span className="text-white text-xl font-black tracking-tight text-center leading-snug">
          {label}
        </span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
        >
          View Live Site →
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        src={link}
        title={label}
        style={{
          width: "1280px",
          height: "1600px",
          transform: "scale(0.328)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
          display: "block",
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.10)" }}
      />
    </div>
  );
}

// ─── Coming soon placeholder ──────────────────────────────────────────────────

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{ background: NAVY }}
    >
      <span className="text-white text-xl font-black tracking-tight text-center px-8 leading-snug">
        {label}
      </span>
      <span
        className="absolute top-5 right-5 text-[10px] uppercase tracking-widest font-medium"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Coming Soon
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentIndex = ((step % CLIENTS.length) + CLIENTS.length) % CLIENTS.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + CLIENTS.length) % CLIENTS.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = CLIENTS.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <main
      className="relative min-h-screen text-foreground overflow-x-hidden"
      style={{ background: NAVY }}
    >
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            Our Work
          </span>
          <h1
            className="font-black tracking-tighter text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
          >
            Real Businesses.<br />Real Results.
          </h1>
          <p
            className="text-xl leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            A look at some of what we have built lately.
          </p>
        </motion.div>
      </section>

      {/* ── Carousel ── */}
      <section className="pb-24 px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto md:p-8">
          <div
            className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Left panel — dark navy pill list */}
            <div
              className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16"
              style={{ background: NAVY }}
            >
              {/* Top fade */}
              <div
                className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 z-40 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${NAVY} 0%, transparent 100%)` }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 z-40 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${NAVY} 0%, transparent 100%)` }}
              />

              <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
                {CLIENTS.map((client, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(
                    -(CLIENTS.length / 2),
                    CLIENTS.length / 2,
                    distance
                  );

                  return (
                    <motion.div
                      key={client.id}
                      style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                      animate={{
                        y: wrappedDistance * ITEM_HEIGHT,
                        opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                      }}
                      transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        type="button"
                        onClick={() => handleChipClick(index)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        style={{
                          background: isActive ? "#ffffff" : "transparent",
                          color: isActive ? NAVY : "rgba(255,255,255,0.60)",
                          borderColor: isActive ? "#ffffff" : "rgba(255,255,255,0.20)",
                        }}
                        className="relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left border cursor-pointer"
                      >
                        <div
                          className="flex items-center justify-center transition-colors duration-500"
                          style={{ color: isActive ? NAVY : "rgba(255,255,255,0.40)" }}
                        >
                          <SiteIcon />
                        </div>
                        <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                          {client.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right panel — card display */}
            <div
              className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="relative w-full max-w-[420px] flex items-center justify-center" style={{ aspectRatio: "4/5" }}>
                {CLIENTS.map((client, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === "active";
                  const isPrev = status === "prev";
                  const isNext = status === "next";

                  return (
                    <motion.div
                      key={client.id}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                        opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                        rotate: isPrev ? -3 : isNext ? 3 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                      className="absolute inset-0 overflow-hidden origin-center"
                      style={{
                        borderRadius: "2rem",
                        border: "6px solid #080808",
                        background: NAVY,
                      }}
                    >
                      {/* Live iframe or placeholder */}
                      {client.link ? (
                        <LivePreviewCard link={client.link} label={client.label} isMobile={isMobile} />
                      ) : (
                        <PlaceholderCard label={client.label} />
                      )}

                      {/* Bottom info overlay — active card only */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-x-0 bottom-0 p-8 pt-28 flex flex-col justify-end"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)",
                              pointerEvents: "none",
                            }}
                          >
                            <div
                              className="px-3 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit mb-2"
                              style={{
                                background: "#080808",
                                color: "#fafafa",
                                border: "1px solid #2a2a2a",
                              }}
                            >
                              {index + 1} • {client.label}
                            </div>
                            <p className="text-white font-normal text-lg leading-snug drop-shadow-md tracking-tight mb-3">
                              {client.description}
                            </p>
                            {client.link && (
                              <a
                                href={client.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] uppercase tracking-widest transition-colors duration-200 w-fit"
                                style={{
                                  color: "rgba(255,255,255,0.45)",
                                  pointerEvents: "auto",
                                }}
                                onMouseEnter={(e) =>
                                  ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.80)")
                                }
                                onMouseLeave={(e) =>
                                  ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")
                                }
                              >
                                View Live Site →
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 px-8 md:px-16 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-black tracking-tighter text-white mb-10" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Want to be next?
          </h2>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors duration-150"
          >
            Start Your Project
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
