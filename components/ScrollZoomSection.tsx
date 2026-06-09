"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ROCKS_BG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=85";

export function ScrollZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Core zoom — image grows from 100% to 155% as you scroll through
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.55]);

  // Text lifts and fades out as zoom begins
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -40]);

  // Overlay: lightens slightly in the middle to reveal rock texture, darkens at end
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.72, 1],
    [0.62, 0.42, 0.28, 0.7]
  );

  // Black exit veil fades in near the end — seamless transition to next section
  const exitVeil = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  return (
    // Tall container gives the browser scroll room for the animation
    <div id="scroll-zoom" ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport — stays fixed while the container scrolls past */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Rocks image — the element that zooms */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale }}
        >
          <Image
            src={ROCKS_BG}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Dynamic overlay — opens up to reveal rock detail, then closes for exit */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Text — fades and rises as zoom intensifies */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          <span className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-medium">
              Rocks Media
            </span>
            <span className="h-px w-8 bg-white/30" />
          </span>

          <h2 className="text-white text-5xl md:text-7xl lg:text-[88px] font-black tracking-tighter leading-none mb-6">
            We Build<br />
            <span className="text-blue-400">Digital</span> Monuments
          </h2>

          <p className="text-white/85 text-base md:text-lg max-w-sm leading-relaxed">
            Every site we create is solid, intentional, and built
            by hand, no shortcuts.
          </p>
        </motion.div>

        {/* Exit veil — fades to site background color for a seamless cut */}
        <motion.div
          className="absolute inset-0 bg-[#080808] z-20 pointer-events-none"
          style={{ opacity: exitVeil }}
        />
      </div>
    </div>
  );
}
