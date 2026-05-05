"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FooterRow {
  id: string;
  label: string;
  content: React.ReactNode;
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/55 transition-colors duration-200 hover:text-white"
    >
      {children}
    </a>
  );
}

const HYDERABAD =
  "Plot No. 710, Road No. 36, Aditya Enclave, Venkatagiri, Jubilee Hills, Hyderabad, Telangana 500033.";
const VIJAYAWADA =
  "MG Rd, Behind Kalaniketan, Mogalrajapuram, Sidhartha Nagar, Labbipet, Vijayawada, Andhra Pradesh 520010.";

export function Footer() {
  const [openRow, setOpenRow] = useState<string | null>(null);

  const rows: FooterRow[] = [
    {
      id: "email",
      label: "Email",
      content: (
        <a
          href="mailto:hello@eyecatch.in"
          className="text-base text-white/75 transition-colors duration-200 hover:text-white"
        >
          hello@eyecatch.in
        </a>
      ),
    },
    {
      id: "offices",
      label: "Offices",
      content: (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-semibold text-white">Hyderabad</p>
            <p className="text-sm leading-6 text-white/65">{HYDERABAD}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-white">Vijayawada</p>
            <p className="text-sm leading-6 text-white/65">{VIJAYAWADA}</p>
          </div>
        </div>
      ),
    },
    {
      id: "social",
      label: "Social",
      content: (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Facebook", href: "#" },
            { label: "Instagram", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Email", href: "mailto:hello@eyecatch.in" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      ),
    },
    {
      id: "copyright",
      label: "Copyright",
      content: (
        <p className="text-sm leading-6 text-white/65">
          © EyeCatch {new Date().getFullYear()}. All Rights Reserved. All
          content, designs, and branding on this site are the property of
          EyeCatch Branding and Advertising.
        </p>
      ),
    },
  ];

  return (
    <footer
      className="text-white"
      style={{ position: "relative", zIndex: 2, backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "0" }}>
        {/* Top region: addresses + logo + pages, divided by a vertical rule */}
        <div className="grid gap-10 pb-14 md:grid-cols-[1fr_auto_minmax(180px,220px)] md:gap-14 md:pb-16">
          {/* Left + center: logo on top (centered above address columns), then two address blocks */}
          <div className="relative">
            {/* Centered logo */}
            <div className="flex justify-center">
              <Image
                src="/images/logo-eyecatch.svg"
                alt="EyeCatch"
                width={220}
                height={56}
                className="h-[52px] w-auto opacity-90"
              />
            </div>

            {/* Address columns */}
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold text-white">
                  Hyderabad
                </p>
                <p
                  className="text-white/65"
                  style={{ fontSize: "14px", lineHeight: "22px", maxWidth: "320px" }}
                >
                  {HYDERABAD}
                </p>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-white">
                  Vijayawada
                </p>
                <p
                  className="text-white/65"
                  style={{ fontSize: "14px", lineHeight: "22px", maxWidth: "360px" }}
                >
                  {VIJAYAWADA}
                </p>
              </div>
            </div>

            {/* Centered social icons */}
            <div className="mt-12 flex justify-center gap-6 text-white/55">
              <SocialIcon href="#" label="Facebook">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="mailto:hello@eyecatch.in" label="Email">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Vertical divider — only visible on md+ */}
          <div
            aria-hidden
            className="hidden md:block"
            style={{
              width: "1px",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          />

          {/* Right: Pages */}
          <div>
            <p
              className="mb-5 text-white"
              style={{ fontSize: "20px", fontWeight: 500 }}
            >
              Pages
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/branding"
                  className="text-sm uppercase tracking-[1.2px] text-white/65 transition-colors duration-200 hover:text-white"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="text-sm uppercase tracking-[1.2px] text-white/65 transition-colors duration-200 hover:text-white"
                >
                  PROJECTS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Expandable rows: Email / Offices / Social / Copyright */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => {
            const isOpen = openRow === row.id;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setOpenRow(isOpen ? null : row.id)}
                aria-expanded={isOpen}
                className="group relative flex flex-col items-stretch border-t border-white/10 bg-transparent text-left transition-colors duration-300 hover:bg-white/[0.02]"
                style={{ padding: "26px 18px 28px" }}
              >
                <span className="flex items-center justify-between">
                  <span
                    className="text-white/85 transition-colors duration-200 group-hover:text-white"
                    style={{ fontSize: "15px", letterSpacing: "0.2px" }}
                  >
                    {row.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-white/55 transition-transform duration-300 ease-out"
                    style={{
                      fontSize: "16px",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </span>
                <span
                  className="overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "320px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease 0.05s, margin-top 0.35s ease",
                    marginTop: isOpen ? "16px" : "0px",
                  }}
                >
                  <span className="block">{row.content}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-3 border-t border-white/10 sm:flex-row sm:items-center sm:justify-between"
          style={{ padding: "22px 0", marginTop: "0" }}
        >
          <p className="text-xs text-white/45">
            © EyeCatch {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <p className="text-xs text-white/45">
            Designed by{" "}
            <span className="text-white/70">
              EyeCatch Branding and Advertising.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
