"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KotaLogo, MenuIcon } from "@/components/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-10",
        "flex justify-between items-center",
        "p-[26px]",
        "transition-[background,backdrop-filter] duration-300 ease-in-out",
        scrolled ? "header-scrolled" : "bg-transparent"
      )}
    >
      <div className="flex w-full justify-between items-center">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <KotaLogo className="w-[60px] h-[60px] text-black" />
          </Link>
          <span className="hidden md:inline text-[13px] font-normal uppercase tracking-[1px] text-black">
            Celebrating 13 years : 2013 - 2026
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "group hidden sm:inline-flex items-center gap-2",
              "px-6 py-3.5",
              "bg-black text-white",
              "rounded-full",
              "text-base font-medium",
              "no-underline",
              "hover:opacity-85 transition-opacity duration-200"
            )}
          >
            Hire us
            <span aria-hidden="true" className="btn-arrow">
              &rarr;
            </span>
          </Link>
          <button
            type="button"
            className={cn(
              "w-[52px] h-[52px]",
              "rounded-full",
              "border-[1.5px] border-black",
              "bg-transparent",
              "flex items-center justify-center",
              "cursor-pointer",
              "transition-transform duration-200 hover:scale-95"
            )}
            aria-label="Open menu"
          >
            <MenuIcon className="w-[22px] text-black" />
          </button>
        </div>
      </div>
    </header>
  );
}
