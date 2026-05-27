"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Check, ArrowLeft } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/40 focus:bg-white/[0.07] transition-all duration-200";

const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-white";

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    bestTime: "",
    date1: "",
    date2: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    // Always mounted — opacity/pointer-events control visibility so form state persists on close
    <motion.div
      initial={false}
      animate={open ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        pointerEvents: open ? "auto" : "none",
        backdropFilter: "blur(16px)",
        background: "rgba(0,0,0,0.72)",
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.96 }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-blue-500/[0.15] bg-blue-900/[0.85] backdrop-blur-2xl p-8 overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.7)" }}
      >
        {/* Top glow edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        {/* Ambient blue orb */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 256,
            height: 256,
            background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
            top: "-40%",
            right: "-10%",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/[0.09] transition-all duration-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/12 border border-blue-500/20 flex items-center justify-center mb-5">
              <Check className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">We&apos;ll be in touch!</h3>
            <p className="text-white text-sm leading-relaxed max-w-xs mb-6">
              Thanks — we&apos;ll reach out around your preferred dates and time.
            </p>
            {/* Let them go back and edit if they made a mistake */}
            <button
              onClick={() => setSubmitted(false)}
              className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/60 transition-colors duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Edit my submission
            </button>
          </motion.div>
        ) : (
          <>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-700">
              Free Consultation
            </span>
            <h3 className="text-[1.35rem] font-black text-white tracking-tight mt-1.5 mb-6">
              Start Your Project
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set("name")}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@yourcompany.com"
                  value={form.email}
                  onChange={set("email")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Type of Business</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fitness Studio, Law Firm, Restaurant…"
                  value={form.businessType}
                  onChange={set("businessType")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Best Time to Reach You</label>
                <select
                  required
                  value={form.bestTime}
                  onChange={set("bestTime")}
                  className={inputClass + " appearance-none"}
                >
                  <option value="" disabled style={{ background: "#080810" }}>
                    Select a time window…
                  </option>
                  <option value="morning" style={{ background: "#080810" }}>
                    Morning — 9am to 12pm
                  </option>
                  <option value="afternoon" style={{ background: "#080810" }}>
                    Afternoon — 12pm to 5pm
                  </option>
                  <option value="evening" style={{ background: "#080810" }}>
                    Evening — 5pm to 8pm
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Preferred Date 1</label>
                  <input
                    type="date"
                    required
                    value={form.date1}
                    onChange={set("date1")}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Preferred Date 2</label>
                  <input
                    type="date"
                    required
                    value={form.date2}
                    onChange={set("date2")}
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-blue-500 py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-white hover:bg-blue-400 active:scale-[0.99] transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
