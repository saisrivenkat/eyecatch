"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const partners = [
  "Jamie-oliver.svg",
  "comptoir-libanais-1.svg",
  "british-red-cross.svg",
  "sym.svg",
  "penguin.svg",
  "raw.svg",
  "penhaligons.svg",
  "stoli.svg",
  "bounce.svg",
  "tangerine.svg",
  "spears.svg",
  "oka.svg",
];

export function PartnersSection() {
  return (
    <section className="text-white" style={{ padding: "80px 0 64px", position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal distance={60}>
          <div style={{ marginBottom: "60px" }}>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>Our</p>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 101px)",
                fontWeight: 400,
                lineHeight: 1.0,
              }}
            >
              Clients
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Marquee container */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          {/* Double the logos for seamless infinite scroll */}
          {[...partners, ...partners].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex items-center justify-center shrink-0"
              style={{ width: "180px", padding: "0 30px" }}
            >
              <Image
                src={`/images/partners/${logo}`}
                alt={logo.replace(/\.svg$/, "").replace(/-/g, " ")}
                width={120}
                height={40}
                unoptimized
                className="invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{ height: "40px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
