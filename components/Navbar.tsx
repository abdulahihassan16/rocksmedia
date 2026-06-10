"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Recent Work", href: "/work" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [logoError, setLogoError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Logo — left */}
        <a href="/" data-nav-logo className="flex items-center shrink-0" onClick={handleLogoClick}>
          {!logoError ? (
            <Image
              src="/images/logo.png"
              alt="Rocks Media"
              width={320}
              height={320}
              className="h-20 w-auto object-contain"
              style={{ filter: "invert(1)" }}
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <span className="text-2xl font-black tracking-tight text-white">
              ROCKS<span className="text-blue-500">MEDIA</span>
            </span>
          )}
        </a>

        {/* Sliding pill nav — center (desktop only) */}
        <ul
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-fit rounded-full border border-white/20 bg-white/5 backdrop-blur-sm p-1"
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          {navLinks.map((link) => (
            <Tab key={link.label} setPosition={setPosition} href={link.href}>
              {link.label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>

        {/* CTAs — right (desktop only) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href="/#contact"
            className="text-sm font-bold text-white hover:text-white/70 transition-colors tracking-wide"
          >
            Get in Touch
          </Link>
          <Link
            href="/#pricing"
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            View Plans
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-white"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Thin separator line */}
      <div className="mx-6 border-b border-white/15" />

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "#050b1f" }}
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-6 py-4">
              <a href="/" onClick={closeMenu} className="flex items-center shrink-0">
                {!logoError ? (
                  <Image
                    src="/images/logo.png"
                    alt="Rocks Media"
                    width={320}
                    height={320}
                    className="h-14 w-auto object-contain"
                    style={{ filter: "invert(1)" }}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-xl font-black tracking-tight text-white">
                    ROCKS<span className="text-blue-500">MEDIA</span>
                  </span>
                )}
              </a>
              <button
                className="flex items-center justify-center w-10 h-10 text-white"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links — stacked vertically */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 text-2xl font-bold text-white/80 hover:text-white border-b border-white/[0.06] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 px-8 pb-10">
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="w-full py-4 text-center text-sm font-bold text-white/60 hover:text-white transition-colors tracking-wide"
              >
                Get in Touch
              </Link>
              <Link
                href="/#pricing"
                onClick={closeMenu}
                className="w-full py-4 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                View Plans
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3.5 py-2 text-xs uppercase font-bold text-white mix-blend-difference tracking-wider"
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-8 rounded-full bg-white md:h-9"
  />
);
