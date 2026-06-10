"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { SparklesCore } from "@/components/ui/sparkles";
import { SolarSystemScene } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { Check, Star, ChevronRight } from "lucide-react";
import { SlideToStart } from "@/components/SlideToStart";
import { ContactModal } from "@/components/ContactModal";

gsap.registerPlugin(SplitText);

interface HeroSectionProps {
  scrollToPricing: () => void;
  scrollToContact: () => void;
}

const CYCLING_WORDS = ["Rocks", "Converts", "Sells", "Dominates"];
const TYPING_SPEED   = 55;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPE   = 1800;
const PAUSE_AFTER_DELETE = 300;

export function HeroSection({ scrollToPricing, scrollToContact }: HeroSectionProps) {
  const headlineRef    = useRef<HTMLHeadingElement>(null);
  const cyclingWordRef = useRef<HTMLSpanElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const split = new SplitText(el, { type: "lines" });
    const masks: HTMLElement[] = [];

    // Wrap each line in overflow-hidden so text slides up from behind a mask
    split.lines.forEach((line) => {
      const parent = line.parentNode;
      if (!parent) return;
      const mask = document.createElement("div");
      mask.style.overflow = "hidden";
      parent.insertBefore(mask, line);
      mask.appendChild(line);
      masks.push(mask);
    });

    // ZoomOutIntro takes ~2.32s (1.05 swoop + 0.52 hold + 0.75 exit) before
    // the hero is visible — delay so the reveal plays after the overlay lifts.
    const anim = gsap.from(split.lines, {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 2.5,
    });

    return () => {
      anim.kill();
      split.revert();
      // split.revert() moves lines back but leaves empty mask divs — remove them
      masks.forEach((mask) => mask.parentNode?.removeChild(mask));
    };
  }, []);

  // Typing effect — runs after the headline slide-up finishes (~3.65s).
  // Directly mutates textContent so it never triggers a React re-render
  // and cannot conflict with GSAP's SplitText DOM wrappers.
  useEffect(() => {
    let wordIndex  = 0;
    let charIndex  = CYCLING_WORDS[0].length; // "Rocks" is pre-rendered in full
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const span = cyclingWordRef.current;
      if (!span) return;

      const word = CYCLING_WORDS[wordIndex];

      if (isDeleting) {
        charIndex--;
        span.textContent = word.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex  = (wordIndex + 1) % CYCLING_WORDS.length;
          timeoutId  = setTimeout(tick, PAUSE_AFTER_DELETE);
        } else {
          timeoutId = setTimeout(tick, DELETING_SPEED);
        }
      } else {
        charIndex++;
        span.textContent = word.slice(0, charIndex);

        if (charIndex === word.length) {
          isDeleting = true;
          timeoutId  = setTimeout(tick, PAUSE_AFTER_TYPE);
        } else {
          timeoutId = setTimeout(tick, TYPING_SPEED);
        }
      }
    };

    // Wait for the headline to fully appear, then hold on "Rocks" for one
    // PAUSE_AFTER_TYPE beat before the first delete begins.
    const startId = setTimeout(() => {
      isDeleting = true;
      timeoutId  = setTimeout(tick, PAUSE_AFTER_TYPE);
    }, 3600);

    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-start pt-28 pb-20 md:justify-center md:pt-0 md:pb-0 overflow-hidden">
      <style>{`
        @keyframes typewriter-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .typewriter-cursor {
          animation: typewriter-cursor-blink 0.7s step-end infinite;
        }
        .hero-headline { font-size: clamp(2.8rem, 10vw, 4rem); }
        @media (min-width: 769px) {
          .hero-headline { font-size: clamp(2rem, 5.8vw, 5.4rem); }
        }
      `}</style>

      {/* Sparkles — transparent bg so sky canvas midnight gradient shows through */}
      <div className="absolute inset-0 z-10">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={1}
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-white/30 shrink-0" />
          <span className="text-white/85 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium text-center leading-relaxed">
            100% Custom · 100% Personal · 0% Templates
          </span>
          <span className="h-px w-10 bg-white/30 shrink-0" />
        </motion.div>

        {/* Headline — full width, two lines, split by GSAP */}
        <h1
          ref={headlineRef}
          className="hero-headline w-full font-black tracking-tighter text-white leading-none mb-6 md:mb-10 text-center"
        >
          <span className="block">Your Business Deserves</span>
          <span className="block md:inline">a Website That </span>
          <span className="block md:inline">
            <span ref={cyclingWordRef} style={{ color: "#4f8ef7" }}>Rocks</span><span
              className="typewriter-cursor"
              style={{ color: "#4f8ef7", marginLeft: "1px" }}
              aria-hidden="true"
            >|</span>
          </span>
        </h1>

        {/* Two-column: Left CTA area + Right glass explore card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.2 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6 md:mt-0"
        >
          {/* LEFT — subtext + CTA button + stats */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <p className="text-base md:text-[13.5px] text-white leading-relaxed max-w-xs text-center md:text-left">
              Handcrafted personally for you, by someone who actually cares about what happens to your business.
            </p>

            {/* Slide to start your project */}
            <div className="w-full max-w-sm">
              <SlideToStart onComplete={() => setShowModal(true)} />
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl leading-none">50+</span>
                <span className="text-white text-[11px] mt-0.5 uppercase tracking-widest">Sites Launched</span>
              </div>
              <div className="w-px h-9 bg-white/10" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-black text-2xl leading-none">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-white text-[11px] mt-0.5 uppercase tracking-widest">Rating</span>
              </div>
            </div>

            {/* Arrow + lazy CTA */}
            <div className="w-full max-w-sm flex flex-col items-center md:items-end gap-6 md:-mt-16">
              <motion.div
                className="mr-10 hidden md:block"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg width="16" height="160" viewBox="0 0 16 160" fill="none" aria-hidden="true">
                  <line x1="8" y1="4" x2="8" y2="134" stroke="rgba(147,197,253,0.85)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 2 126 L 8 148 L 14 126" stroke="rgba(147,197,253,0.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </motion.div>
              <button
                onClick={scrollToContact}
                className="h-12 w-full md:h-9 md:w-56 rounded-xl flex items-center justify-center cursor-pointer bg-blue-300 hover:bg-blue-200 transition-colors duration-200"
              >
                <span className="text-blue-900 text-xs font-medium tracking-wide whitespace-nowrap">
                  Too tired to drag? Click this.
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT — glass Explore Plans card (desktop only) */}
          <div
            className="hidden md:block relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-7"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.35)" }}
          >
            {/* Drifting violet glow */}
            <motion.div
              className="absolute w-52 h-52 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)", filter: "blur(32px)", top: "-30%", right: "-5%" }}
              animate={{ x: [0, -20, 8, 0], y: [0, 16, -6, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.8 }}
            />
            <motion.div
              className="absolute w-36 h-36 rounded-full pointer-events-none opacity-40"
              style={{ background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)", filter: "blur(22px)", bottom: "0%", left: "5%" }}
              animate={{ x: [0, 14, -6, 0], y: [0, -10, 12, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 3.5 }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Transparent Pricing</span>
            <h3 className="text-[1.4rem] font-black text-white tracking-tight leading-tight mt-2 mb-5">
              Explore Our Plans
            </h3>

            <ul className="flex flex-col gap-3 mb-6">
              {[
                "Handcrafted Personal Designs",
                "Focused on Conversion",
                "Mobile-Optimised & Fast",
                "0% Templates",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-white">
                  <Check className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToPricing}
              className="group w-full rounded-xl border border-white/[0.10] bg-white/[0.05] py-3.5 flex items-center justify-center gap-2 text-[13px] font-semibold text-white/60 hover:bg-white/[0.09] hover:text-white/90 transition-all duration-300 cursor-pointer"
            >
              View Plans &amp; Pricing
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </motion.div>
      </div>

      <ContactModal open={showModal} onClose={() => setShowModal(false)} />

      {/* Orbit — decorative, right side, behind content */}
      <div
        className="absolute inset-y-0 right-0 hidden lg:block pointer-events-none z-[15]"
        style={{ width: "78rem", transform: "translateX(50%)" }}
      >
        <div style={{ width: "100%", height: "100%", transform: "scale(0.62)", transformOrigin: "center center" }}>
          <SolarSystemScene />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-white text-[9px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <div className="relative w-px h-10 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/50"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
