"use client";

import { useState } from "react";
import Image from "next/image";

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer id="contact" className="border-t border-white/10 py-16 px-5 md:px-4">
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
              Custom websites built personally for your business. No templates.
              No AI shortcuts. Just real, handcrafted work.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {["Services", "Work", "Pricing", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-white hover:text-white transition-colors"
                  >
                    {item}
                  </a>
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
              href="tel:+1234567890"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              (123) 456-7890
            </a>
            <a
              href="mailto:hello@rocksmedia.com"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              hello@rocksmedia.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white">
            &copy; {new Date().getFullYear()} Rocks Media. All rights reserved.
          </p>
          <p className="text-xs text-white">
            Custom websites built with care — one at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
