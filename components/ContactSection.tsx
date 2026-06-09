"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";

const inputClass =
  "w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/40 focus:bg-white/[0.07] transition-all duration-200";

const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-white/70";

const EMPTY_FORM: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  businessType: "",
  bestTime: "",
  date1: "",
  date2: "",
};

export function ContactSection() {
  const [form, setForm]       = useState<ContactFormData>(EMPTY_FORM);
  const [status, setStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");

  const set =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactEmail(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 flex flex-col items-center">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
            Free Consultation
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Start Your Project
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Fill in your details and we&apos;ll reach out within 24 hours to get things moving.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 32px 64px rgba(0,0,0,0.5)" }}
        >
          {/* Top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Blue orb */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320,
              height: 320,
              background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
              filter: "blur(50px)",
              top: "-20%",
              right: "-10%",
            }}
          />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center text-center py-16 px-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-6"
                >
                  <Check className="w-9 h-9 text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-2">You&apos;re all set!</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-2">
                  A confirmation has been sent to <span className="text-white/80 font-medium">{form.email}</span>.
                </p>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-8">
                  We&apos;ll be reaching out within <span className="text-blue-400 font-semibold">24 hours</span> to get your project started.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm(EMPTY_FORM); }}
                  className="text-white/30 text-xs hover:text-white/55 transition-colors duration-200 underline underline-offset-4"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 mb-5 text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try again or email us directly.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        placeholder="+1 647 000 0000"
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
                      <option value="Morning (9am – 12pm)" style={{ background: "#080810" }}>
                        Morning (9am to 12pm)
                      </option>
                      <option value="Afternoon (12pm – 5pm)" style={{ background: "#080810" }}>
                        Afternoon (12pm to 5pm)
                      </option>
                      <option value="Evening (5pm – 8pm)" style={{ background: "#080810" }}>
                        Evening (5pm to 8pm)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    disabled={status === "sending"}
                    className="mt-2 w-full rounded-xl bg-blue-600 py-4 flex items-center justify-center gap-2.5 text-sm font-bold text-white hover:bg-blue-500 active:scale-[0.99] transition-all duration-200 min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send My Request
                      </>
                    )}
                  </button>

                  <p className="text-center text-white/25 text-[11px]">
                    We&apos;ll send a confirmation to your email and follow up within 24 hours.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
