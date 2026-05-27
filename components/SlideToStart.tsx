"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface SlideToStartProps {
  onComplete: () => void;
}

const THUMB = 64;
const PAD = 8;

export function SlideToStart({ onComplete }: SlideToStartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(300);
  const [done, setDone] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setMaxDrag(containerRef.current.offsetWidth - THUMB - PAD * 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scaleX = useTransform(x, [0, maxDrag], [0, 1]);
  const labelOpacity = useTransform(x, [0, maxDrag * 0.25], [1, 0]);

  const handleDragEnd = () => {
    if (done) return;
    if (x.get() >= maxDrag * 0.87) {
      animate(x, maxDrag, { duration: 0.15, ease: "easeOut" });
      setDone(true);
      setTimeout(onComplete, 380);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 38 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-white/[0.10] bg-white/[0.05] backdrop-blur-xl select-none"
      style={{
        height: 80,
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      {/* Ambient blue glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 180,
          height: 180,
          background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
          filter: "blur(30px)",
          top: "-65%",
          left: "-5%",
        }}
        animate={{ x: [0, 22, 6, 0], y: [0, 10, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none opacity-50"
        style={{
          width: 110,
          height: 110,
          background: "radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
          bottom: "-50%",
          right: "10%",
        }}
        animate={{ x: [0, -16, 4, 0], y: [0, -8, 10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2.2 }}
      />

      {/* Top edge shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent pointer-events-none z-10" />

      {/* Blue fill track */}
      <motion.div
        className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-blue-600/20 to-blue-400/10 pointer-events-none"
        style={{ scaleX, originX: 0 }}
      />

      {/* Idle label */}
      {!done && (
        <motion.span
          style={{ opacity: labelOpacity }}
          className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-semibold tracking-wide pointer-events-none"
        >
          Slide to start your project &nbsp;›
        </motion.span>
      )}

      {/* Done overlay — tap to re-open the form */}
      {done && (
        <button
          onClick={onComplete}
          className="absolute inset-0 flex items-center justify-center text-white/55 text-sm font-semibold tracking-wide cursor-pointer hover:text-white/80 transition-colors duration-200"
        >
          Tap to edit your submission &nbsp;›
        </button>
      )}

      {/* Draggable thumb */}
      <motion.div
        drag={done ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.06 }}
        style={{
          x,
          position: "absolute",
          left: PAD,
          top: PAD,
          width: THUMB,
          height: THUMB,
          cursor: done ? "default" : "grab",
        }}
        className="flex items-center justify-center z-10 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30"
      >
        {done ? (
          <Check className="w-5 h-5 text-white" />
        ) : (
          <ArrowRight className="w-5 h-5 text-white" />
        )}
      </motion.div>
    </div>
  );
}
