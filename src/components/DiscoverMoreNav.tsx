"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

const links: NavLink[] = [
  { label: "Branding", href: "/services/branding", active: true },
  { label: "Brand strategy", href: "/services/branding#strategy" },
  { label: "Tone of voice", href: "/services/branding#voice" },
  { label: "Visual identity", href: "/services/branding#identity" },
];

export function DiscoverMoreNav() {
  return (
    <section
      className="relative"
      style={{ padding: "60px 0", zIndex: 2 }}
    >
      <div className="container">
        <nav
          className="flex flex-wrap items-center"
          style={{ gap: "8px" }}
          aria-label="Related branding services"
        >
          <span
            className="uppercase text-white/55"
            style={{
              fontSize: "13px",
              letterSpacing: "1.5px",
              marginRight: "12px",
            }}
          >
            Discover more
          </span>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "inline-flex items-center transition-colors duration-200",
                link.active
                  ? "bg-white text-[#0e0e0e] border-white"
                  : "bg-transparent text-white/85 border-white/25 hover:bg-white/10 hover:border-white/50"
              )}
              style={{
                fontSize: "16px",
                lineHeight: 1,
                padding: "10px 18px",
                borderRadius: "33px",
                borderWidth: "1.6px",
                borderStyle: "solid",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
