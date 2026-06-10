"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Layers, PhoneCall, Search, Images, ShieldCheck,
  MapPin, Newspaper, CreditCard, Brush, Share2,
  PenLine, Utensils, Package, Printer, Check, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const SERVICES_NODES = [
  {
    id: 1,
    icon: Layers,
    title: "Design and Build",
    items: [
      "Custom design built around your brand",
      "Single page or full multi-page website",
      "Mobile optimized on every device",
      "Fast loading and performance tuned",
      "Works on all browsers",
    ],
    relatedIds: [2, 4],
  },
  {
    id: 2,
    icon: PhoneCall,
    title: "Contact and Leads",
    items: [
      "Contact forms for calls, quotes and bookings",
      "Scheduling and booking integration",
      "Google Maps embed",
      "Click to call buttons",
    ],
    relatedIds: [1, 3],
  },
  {
    id: 3,
    icon: Search,
    title: "Search and Visibility",
    items: [
      "On-page SEO setup so Google can find you",
      "Page titles, descriptions and headers all done right",
      "Google Business Profile guidance",
      "Image optimization for faster search ranking",
    ],
    relatedIds: [2, 4],
  },
  {
    id: 4,
    icon: Images,
    title: "Content and Media",
    items: [
      "Photo gallery and portfolio sections",
      "Blog or news section",
      "Social media links",
      "Testimonials and reviews section",
    ],
    relatedIds: [1, 3],
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: "After Launch",
    items: [
      "Revision rounds included",
      "30 to 60 day support window depending on plan",
      "You own everything, no platform lock-in",
      "Hosting guidance included",
    ],
    relatedIds: [1, 2],
  },
];

const ADDONS = [
  { icon: MapPin,    title: "Google Business Profile", desc: "Set up and fully optimized so you show up in local search." },
  { icon: Newspaper, title: "Flyer Design",             desc: "Print-ready flyers built to match your brand." },
  { icon: CreditCard,title: "Business Card Design",     desc: "Clean, professional cards ready to hand out." },
  { icon: Brush,     title: "Logo Design",              desc: "A custom logo that actually looks like a real business." },
  { icon: Share2,    title: "Social Media Graphics",    desc: "Banners and profile images sized for every platform." },
  { icon: PenLine,   title: "Copywriting",              desc: "We write the words for your site so you do not have to." },
  { icon: Utensils,  title: "Menu Design",              desc: "Great for restaurants, cafes and food businesses." },
  { icon: Package,   title: "Brand Kit",                desc: "Logo, colors and fonts packaged together so everything matches." },
  { icon: Printer,   title: "Print Ready Materials",    desc: "Anything that needs to go to print, formatted correctly." },
];

const ONE_PAGE = [
  "One focused offer or service",
  "Limited budget or tight timeline",
  "Barbers, cleaners, handymen, consultants",
  "Landing pages built to capture leads",
  "Fast turnaround, usually under a week",
];

const MULTI_PAGE = [
  "Multiple services or locations to explain",
  "Restaurants, dealerships, sports clubs",
  "Businesses that need room for galleries or menus",
  "Better for long-term SEO growth",
  "More space to build trust before they reach out",
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #5b8db8 0%, #aed0e6 40%, #dbedf7 65%, #edf6fc 82%, #f8fbff 100%)",
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-5 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black uppercase mb-6">
              Services
            </span>
            <h1
              className="font-black tracking-tighter text-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
            >
              Everything your website needs,<br className="hidden md:block" /> built personally for you.
            </h1>
            <p className="text-black text-xl leading-relaxed max-w-2xl mb-10">
              From the first design to the day it goes live, every piece is handled by hand. No outsourcing, no page builders, no guesswork.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-white font-bold text-base hover:bg-black/80 active:scale-[0.98] transition-all duration-150"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Features — Orbital */}
      <section className="border-t border-black/10">
        <div className="max-w-5xl mx-auto px-5 md:px-16 pt-20 pb-10">
          <motion.div {...fade(0)} className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black uppercase mb-4">
              What is Included
            </span>
            <h2
              className="font-black tracking-tighter text-black leading-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
            >
              Built to cover every part of your online presence.
            </h2>
            <p className="text-black text-base">
              Tap any node to see what is included in that category.
            </p>
          </motion.div>
          <RadialOrbitalTimeline nodes={SERVICES_NODES} large />
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-24 px-5 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0)} className="mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black uppercase mb-4">
              Add-Ons
            </span>
            <h2
              className="font-black tracking-tighter text-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
            >
              Bolt on what your<br className="hidden md:block" /> business actually needs.
            </h2>
            <p className="text-black text-lg max-w-xl">
              These can be added to any plan. Just mention it when you reach out and we will work it into the project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADDONS.map((addon, i) => (
              <motion.div
                key={addon.title}
                {...fade(0.04 + i * 0.06)}
                className="rounded-2xl border border-black/10 bg-white/50 backdrop-blur-sm p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 mt-0.5">
                  <addon.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">{addon.title}</h3>
                  <p className="text-sm text-black leading-snug">{addon.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Page vs Multi-Page */}
      <section className="py-24 px-5 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0)} className="mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-semibold tracking-widest text-black uppercase mb-4">
              Which One Is Right For You
            </span>
            <h2
              className="font-black tracking-tighter text-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
            >
              One page or multiple pages?
            </h2>
            <p className="text-black text-lg max-w-xl">
              Not sure which fits your business? Here is a simple breakdown. If you still cannot decide, just call and we will sort it out together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fade(0.05)} className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm p-8">
              <div className="mb-6">
                <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
                  One Page
                </span>
                <h3 className="text-2xl font-black text-black tracking-tight">Simple, focused, fast.</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {ONE_PAGE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-black">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade(0.1)} className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm p-8">
              <div className="mb-6">
                <span className="inline-flex px-3 py-1 rounded-full bg-black/8 text-black text-xs font-bold uppercase tracking-widest mb-4">
                  Multi Page
                </span>
                <h3 className="text-2xl font-black text-black tracking-tight">More room to tell your story.</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {MULTI_PAGE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-black">
                    <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-5 md:px-16 border-t border-black/10 text-center">
        <motion.div
          {...fade(0)}
          className="max-w-2xl mx-auto"
        >
          <h2
            className="font-black tracking-tighter text-black leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            Not sure what you need?
          </h2>
          <p className="text-black text-xl leading-relaxed mb-10">
            Call us and we will figure it out together. No pressure, no sales pitch, just a straight conversation about your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+16475135490"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-black/15 bg-white/60 text-black font-bold text-base hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
            >
              <PhoneCall className="w-4 h-4" />
              647-513-5490
            </a>
            <Link
              href="/#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-black text-white font-bold text-base hover:bg-black/80 active:scale-[0.98] transition-all duration-150"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer light />
    </main>
  );
}
