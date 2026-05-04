"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon } from "@/components/icons";
import { NavOverlay } from "@/components/NavOverlay";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
            <Link href="/" aria-label="EyeCatch — home" className="flex items-center">
              <Image
                src="/images/logo-eyecatch.svg"
                alt="EyeCatch"
                width={180}
                height={47}
                priority
                className="h-[44px] w-auto"
              />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "w-[52px] h-[52px]",
                "rounded-full",
                "border-[1.5px] border-white/40",
                "bg-transparent",
                "flex items-center justify-center",
                "cursor-pointer",
                "transition-transform duration-200 hover:scale-95"
              )}
            >
              <MenuIcon className="w-[22px] text-white" />
            </button>
          </div>
        </div>
      </header>

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
