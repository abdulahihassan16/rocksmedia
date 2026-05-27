"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Daytime sky background */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, #5b8db8 0%, #aed0e6 50%, #e8955a 100%)" }}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-5 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black/50 uppercase mb-6">
              About Us
            </span>
            <h1 className="font-black tracking-tighter text-black leading-tight mb-8" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
              We build websites<br />for real businesses.
            </h1>
            <p className="text-black/60 text-xl leading-relaxed max-w-2xl">
              Rocks Media is a Canadian web studio that builds custom websites entirely by hand — no templates, no AI shortcuts, no page builders. Just real work, built personally for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-5 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-start"
          >
            <div
              className="rounded-3xl border border-black/10 shadow-md overflow-hidden w-full max-w-xs"
              style={{ maxHeight: 420 }}
            >
              <Image
                src="/images/Professional-Pic-of-Rocks-Media-Founder.jpg"
                alt="Rocks Media Founder"
                width={320}
                height={420}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black/50 uppercase mb-6">
              The Founder
            </span>
            <h2 className="text-4xl font-black tracking-tighter text-black mb-6">
              Built by someone who actually gives a damn.
            </h2>
            <p className="text-black/60 leading-relaxed mb-8">
              I started Rocks Media because I kept seeing great local businesses lose customers every day simply because they could not be found online. I build every website personally because I actually care about what happens to your business after I am done.
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              {[
                "Every site built personally, start to finish.",
                "You get my full attention, not a junior team.",
                "I am still here after launch day.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-black/60">
                  <span className="text-blue-600 font-bold mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <span className="text-black/50 text-sm uppercase tracking-widest">
              Founder, Rocks Media
            </span>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-5 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl font-black tracking-tighter text-black mb-6">Founded in 2025.</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              We started Rocks Media because we kept seeing the same thing — great local businesses losing customers online to competitors with prettier websites. That felt wrong.
            </p>
            <p className="text-black/60 leading-relaxed">
              So we built a studio focused entirely on local businesses. Not enterprise clients, not startups with VC money — just real business owners who deserve a website that works as hard as they do.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h2 className="text-4xl font-black tracking-tighter text-black mb-6">What we believe.</h2>
            <ul className="flex flex-col gap-4">
              {[
                "A website should convert visitors into customers, not just look good.",
                "Every business deserves something built specifically for them.",
                "Speed matters. Most sites should be live in under two weeks.",
                "You should own everything — no platform lock-in, ever.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-black/60">
                  <span className="text-blue-600 font-bold mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-5 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50+", label: "Sites Launched" },
            { value: "5.0", label: "Average Rating" },
            { value: "2025", label: "Founded" },
            { value: "100%", label: "Custom Built" },
          ].map((stat) => (
            <motion.div key={stat.value} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col">
              <span className="text-4xl font-black text-black tracking-tighter">{stat.value}</span>
              <span className="text-black/50 text-sm mt-1 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 md:px-16 text-center border-t border-black/10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-6">
            Ready to get started?
          </h2>
          <p className="text-black/55 text-lg mb-10">
            Let&apos;s talk about your business and build something that actually works.
          </p>
          <a
            href="/"
            className="flex sm:inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-black text-white font-bold text-lg hover:bg-black/80 active:scale-[0.98] transition-all duration-150 min-h-[48px]"
          >
            Back to Home
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
