"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "We loved how the intro just pulled everything together, the design honestly exceeded what we expected.",
    name: "C&N Window & Home Services",
    initials: "CW",
    color: "#60a5fa",
  },
  {
    text: "The illustrations on our site are something else, it feels like the whole vibe of our shop just came to life on screen.",
    name: "Krazy Kuts",
    initials: "KK",
    color: "#f472b6",
  },
  {
    text: "We went from 12 customers a day to 55 after the site launched, we genuinely did not see that coming.",
    name: "Cell City",
    initials: "CC",
    color: "#34d399",
  },
  {
    text: "More repairs coming in every month since the site went live, customers are actually finding us now.",
    name: "Cell Doctor",
    initials: "CD",
    color: "#fb923c",
  },
  {
    text: "Our cars finally look the way they deserve to online, people are pulling up to the lot after seeing the site and that says everything.",
    name: "E & S Auto Sales Inc",
    initials: "ES",
    color: "#a78bfa",
  },
  {
    text: "The site actually shows the quality of our work instead of just talking about it, our clients notice the difference before we even meet them.",
    name: "Juneja Renovation & Construction Inc",
    initials: "JR",
    color: "#facc15",
  },
];

const firstColumn  = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn  = testimonials.slice(4, 6);

export function TrustedBy() {
  return (
    <section className="w-full py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: about copy ── */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-widest text-white uppercase mb-6">
              About Us
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] text-foreground mb-8 whitespace-nowrap">
              Who is Rocks Media?
            </h2>

            <p className="text-white text-lg sm:text-xl leading-relaxed max-w-xl mb-12">
              Founded in 2025, Rocks Media is a Canadian web studio built entirely around local
              businesses. In a short time we&apos;ve already made an impact on hundreds of people —
              helping owners across Canada finally have a website that works as hard as they do.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-white/90 active:scale-[0.98] transition-all duration-150 shadow-[0_0_48px_0px_rgba(255,255,255,0.10)]"
              >
                More About Rocks Media
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/15 text-white font-bold text-lg hover:bg-white/[0.05] active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                See Our Work
              </button>
            </div>
          </div>

          {/* ── Right: scrolling review columns ── */}
          <div className="flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white text-2xl font-black tracking-tighter"
            >
              The{" "}
              <span
                style={{
                  color: "#4f8ef7",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                impact
              </span>{" "}
              we made...
            </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[580px] overflow-hidden"
          >
            <TestimonialsColumn testimonials={firstColumn}  duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn}  className="hidden xl:block" duration={17} />
          </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
