"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Resets on every hard refresh (module re-evaluates).
// Stays true across client-side navigation (module singleton persists).
let introHasPlayed = false;

const SWOOP_EASE = [0.16, 1, 0.3, 1] as const;
const LOCK_EASE = [0.76, 0, 0.24, 1] as const;

type Phase = "swoop" | "hold" | "exit" | "done";

export function ZoomOutIntro() {
  // Start as "done" so nothing renders before the effect runs.
  // The effect is the gatekeeper — it reads the module flag and decides
  // whether to start the animation or stay hidden.
  const [phase, setPhase] = useState<Phase>("done");
  const [logoError, setLogoError] = useState(false);
  const [exitAnim, setExitAnim] = useState({ x: 0, y: 0, scale: 1 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introHasPlayed) return;
    introHasPlayed = true;
    document.body.style.overflow = "hidden";
    setPhase("swoop");
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const triggerExit = () => {
    const navLogoEl = document.querySelector("[data-nav-logo]");
    const logoEl = logoRef.current;

    if (navLogoEl && logoEl) {
      const navRect = navLogoEl.getBoundingClientRect();
      const logoRect = logoEl.getBoundingClientRect();
      const dx = navRect.left + navRect.width / 2 - (logoRect.left + logoRect.width / 2);
      const dy = navRect.top + navRect.height / 2 - (logoRect.top + logoRect.height / 2);
      const scale = navRect.height / logoRect.height;
      setExitAnim({ x: dx, y: dy, scale });
      if (navLogoEl instanceof HTMLElement) navLogoEl.style.opacity = "0";
    }

    setPhase("exit");
  };

  const onExitComplete = () => {
    const navLogoEl = document.querySelector("[data-nav-logo]");
    if (navLogoEl instanceof HTMLElement) {
      navLogoEl.style.transition = "opacity 0.2s ease";
      navLogoEl.style.opacity = "1";
    }
    document.body.style.overflow = "";
    setPhase("done");
  };

  if (phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <div className="fixed inset-0 z-[200]">
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={isExiting ? { duration: 0.75, ease: "easeOut" } : { duration: 0 }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          ref={logoRef}
          initial={{ y: "110vh" }}
          animate={
            isExiting
              ? { y: exitAnim.y, x: exitAnim.x, scale: exitAnim.scale }
              : { y: 0, x: 0 }
          }
          transition={
            isExiting
              ? { duration: 0.75, ease: LOCK_EASE }
              : { duration: 1.05, ease: SWOOP_EASE }
          }
          onAnimationComplete={() => {
            if (phase === "swoop") {
              setPhase("hold");
              setTimeout(triggerExit, 520);
            } else if (phase === "exit") {
              onExitComplete();
            }
          }}
        >
          {!logoError ? (
            <Image
              src="/images/logo.png"
              alt="Rocks Media"
              width={500}
              height={500}
              priority
              className="w-64 md:w-80 lg:w-96 h-auto object-contain"
              style={{ filter: "invert(1)" }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              ROCKS<span className="text-blue-400">MEDIA</span>
            </span>
          )}
        </motion.div>

        <motion.p
          className="mt-6 text-white/40 text-xs uppercase tracking-[0.35em] font-medium select-none"
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Custom Websites. Real People.
        </motion.p>
      </div>
    </div>
  );
}
