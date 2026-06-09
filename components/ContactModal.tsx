"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

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

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm]     = useState<ContactFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  const reset = () => { setStatus("idle"); setForm(EMPTY_FORM); };

  return (
    <motion.div
      initial={false}
      animate={open ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        pointerEvents: open ? "auto" : "none",
        backdropFilter: "blur(16px)",
        background: "rgba(0,0,0,0.75)",
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.96 }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#080c18]/95 backdrop-blur-2xl overflow-hidden my-auto"
        style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.8)" }}
      >
        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* Blue orb */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
            filter: "blur(50px)",
            top: "-30%",
            right: "-5%",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/[0.09] transition-all duration-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center text-center py-14 px-8"
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
                A confirmation has been sent to{" "}
                <span className="text-white/80 font-medium">{form.email}</span>.
              </p>
              <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-8">
                We&apos;ll be reaching out within{" "}
                <span className="text-blue-400 font-semibold">24 hours</span> to get your project started.
              </p>
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-white/30 text-xs hover:text-white/55 transition-colors duration-200"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Submit another request
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400/80">
                Free Consultation
              </span>
              <h3 className="text-[1.35rem] font-black text-white tracking-tight mt-1.5 mb-6">
                Start Your Project
              </h3>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 mb-5 text-sm text-red-400"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again or contact us directly.
                </motion.div>
              )}

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
                  disabled={status === "sending"}
                  className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 flex items-center justify-center gap-2.5 text-sm font-bold text-white hover:bg-blue-500 active:scale-[0.99] transition-all duration-200 min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
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
    </motion.div>
  );
}
