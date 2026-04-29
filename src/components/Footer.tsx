"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("hello@eyecatch.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-black text-white py-20" style={{ position: "relative", zIndex: 2 }}>
      <div className="container">
        {/* Top: Email */}
        <ScrollReveal distance={40}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-16">
            <a
              href="mailto:hello@eyecatch.in"
              className="text-3xl md:text-4xl font-normal hover:opacity-80 transition-opacity"
            >
              hello@eyecatch.in
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              {copied ? "Copied!" : "Copy email address"}
            </button>
          </div>
        </ScrollReveal>

        {/* Middle: Grid */}
        <ScrollReveal delay={0.1} distance={40}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Social */}
            <div>
              <ul className="space-y-3">
                {["LinkedIn", "Facebook", "Instagram", "Bluesky"].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="link-underline text-base opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav */}
            <div>
              <ul className="space-y-3">
                {["Contact", "FAQs", "Privacy Policy"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="link-underline text-base opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs uppercase tracking-wider opacity-50 mb-4">
                Sign up to our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-transparent border-b border-white/30 text-white text-sm py-2 flex-1 outline-none placeholder:text-white/40 focus:border-white/70 transition-colors duration-300"
                />
                <button className="text-sm ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none text-white">
                  &rarr;
                </button>
              </div>
            </div>

            {/* Sectors */}
            <div>
              <p className="text-xs uppercase tracking-wider opacity-50 mb-4">
                Our sectors :
              </p>
              <ul className="space-y-2">
                {[
                  "Agencies",
                  "SaaS and Tech",
                  "B2B Transformation",
                  "Healthcare",
                  "Media & Entertainment",
                  "Retail",
                ].map((sector) => (
                  <li key={sector}>
                    <a
                      href="#"
                      className="link-underline text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {sector}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom */}
        <ScrollReveal delay={0.2} distance={20}>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs opacity-40">
              &copy; {new Date().getFullYear()} EyeCatch. All rights reserved.
            </p>
            <p className="text-xs opacity-40">
              Design &amp; Branding Agency &mdash; Hyderabad &amp; Vijayawada
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
