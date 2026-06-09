"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/about" },
  { label: "Recent Work", href: "/work" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="border-t border-white/10 py-16 px-5 md:px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <a href="/" className="inline-block">
              {!logoError ? (
                <Image
                  src="/images/logo.png"
                  alt="Rocks Media"
                  width={400}
                  height={400}
                  className="h-24 md:h-44 w-auto object-contain"
                  style={{ filter: "invert(1)" }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-2xl font-black tracking-tight text-white">
                  ROCKS<span className="text-blue-500">MEDIA</span>
                </span>
              )}
            </a>
            <p className="text-sm text-white max-w-xs">
              Custom websites built personally for your business. No templates,
              no shortcuts. Just real, handcrafted work.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <p className="text-sm text-white">
              Ready to start? Call or message us directly and we&apos;ll get
              your project going.
            </p>
            <a
              href="tel:+16475135490"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              647-513-5490
            </a>
            <a
              href="mailto:abdulahihassan16@gmail.com"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              abdulahihassan16@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white">
            &copy; {new Date().getFullYear()} Rocks Media. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/50 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
