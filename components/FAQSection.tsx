"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "How long does it take to build my website?", a: "Most sites are delivered within 5–10 business days from our discovery call. We move fast because we work on one project at a time, so your site gets our full attention." },
  { q: "Do I own my website?", a: "100%. Once your site is live and payment is complete, you own every file, every line of code, and the domain. Nothing is locked behind our platform." },
  { q: "What if I don't like the design?", a: "We share the design before anything goes live and revisions are included. We don't launch until you're genuinely happy. That's not a policy, it's just how we work." },
  { q: "Do you use templates to build sites?", a: "Never. Every site is built from scratch, personally. No page builders, no pre-made layouts, no templates. That's what makes the quality different." },
  { q: "What's included in the monthly care plan?", a: "Hosting, updates, security monitoring, and direct access to us for any changes. Think of it as having a web team on call, without hiring one full-time." },
  { q: "What if I want changes after the site launches?", a: "Small tweaks are covered under the care plan. For larger additions like a new page, a booking system, or a product catalogue, we scope it out and give you a flat price upfront." },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(prev => prev === i ? null : i);
  }

  return (
    <section id="faq" className="w-full py-24 px-5 md:px-16">

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-white text-lg mt-6">Everything you want to know before getting started.</p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-white/[0.07]">
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full py-6 text-left cursor-pointer group"
                >
                  <span className={`font-semibold text-base md:text-lg transition-colors duration-200 pr-2 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                    {faq.q}
                  </span>
                  <Plus
                    className={`w-6 h-6 text-white shrink-0 ml-2 transition-transform duration-300 ${isOpen ? "rotate-45 text-blue-400" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-white text-base leading-relaxed pb-6 pr-10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

    </section>
  );
}
