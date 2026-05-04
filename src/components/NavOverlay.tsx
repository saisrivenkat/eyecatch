"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";

interface NavLink {
  label: string;
  href: string;
  caption?: string;
}

const links: NavLink[] = [
  { label: "Home", href: "/", caption: "Studio overview" },
  { label: "Portfolio", href: "/services/branding", caption: "Branding case studies" },
  { label: "Contact", href: "mailto:hello@eyecatch.in", caption: "Hire EyeCatch" },
];

export function NavOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0"
      style={{
        zIndex: 50,
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Subtle ambient orbs inside the overlay so it doesn't feel flat */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
          filter: "blur(80px)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.6s ease-out 0.1s",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "-15%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(190,200,215,0.07) 0%, rgba(190,200,215,0) 65%)",
          filter: "blur(90px)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.6s ease-out 0.15s",
        }}
      />

      {/* Top bar — eyebrow + close */}
      <div
        className="relative flex items-center justify-between"
        style={{ padding: "26px" }}
      >
        <span
          className="text-white/45"
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
            transform: open ? "translateY(0)" : "translateY(-12px)",
            opacity: open ? 1 : 0,
            transition:
              "opacity 0.45s ease-out 0.15s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.15s",
          }}
        >
          EyeCatch &nbsp;&middot;&nbsp; Menu
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex items-center justify-center transition-transform duration-200 hover:scale-95"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "9999px",
            border: "1.5px solid rgba(255,255,255,0.4)",
            backgroundColor: "transparent",
            cursor: "pointer",
            transform: open ? "translateY(0)" : "translateY(-12px)",
            opacity: open ? 1 : 0,
            transition:
              "opacity 0.45s ease-out 0.15s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.15s, scale 0.2s ease",
          }}
        >
          <CloseIcon className="w-[20px] text-white" />
        </button>
      </div>

      {/* Nav list */}
      <nav
        className="relative mx-auto"
        style={{
          maxWidth: "1180px",
          padding: "60px 26px 0",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                ...(i === links.length - 1
                  ? { borderBottom: "1px solid rgba(255,255,255,0.08)" }
                  : {}),
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.18 + i * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.18 + i * 0.07}s`,
              }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between"
                style={{
                  padding: "32px 8px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  className="text-white transition-colors duration-300 group-hover:text-white/55"
                  style={{
                    fontSize: "clamp(40px, 7vw, 96px)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {link.label}
                </span>

                <div className="flex items-center gap-6">
                  {link.caption && (
                    <span
                      className="hidden md:inline text-white/40"
                      style={{
                        fontSize: "13px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      {link.caption}
                    </span>
                  )}
                  <span
                    aria-hidden
                    className="text-white/45 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-white"
                    style={{
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 200,
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          style={{
            marginTop: "60px",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.18 + links.length * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.18 + links.length * 0.07}s`,
          }}
        >
          <span
            className="text-white/35"
            style={{
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Hyderabad &nbsp;&middot;&nbsp; Vijayawada
          </span>
          <a
            href="mailto:hello@eyecatch.in"
            className="text-white/70 transition-colors duration-200 hover:text-white"
            style={{
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            hello@eyecatch.in
          </a>
        </div>
      </nav>
    </div>
  );
}
