"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

export function BrandingAuditSection() {
  return (
    <section
      className="relative"
      style={{ padding: "120px 0", zIndex: 2 }}
    >
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <ScrollReveal
            distance={50}
            className="md:col-span-6"
          >
            <p
              className="uppercase text-white/55"
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                marginBottom: "20px",
              }}
            >
              Quick check
            </p>

            <h2
              className="text-white"
              style={{
                fontSize: "clamp(40px, 5.6vw, 72px)",
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Audit your brand
              <br />
              in minutes.
            </h2>

            <p
              className="text-white/70"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                maxWidth: "460px",
                marginBottom: "32px",
              }}
            >
              A short, honest read on where the brand is firing — and where it
              is leaking. We send the report back the same week.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Request a brand audit
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal
            distance={50}
            delay={0.1}
            className="md:col-span-6"
          >
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "1 / 1",
                background:
                  "radial-gradient(circle at 30% 25%, #f5d6c1 0%, transparent 55%), radial-gradient(circle at 75% 80%, #b9a4ff 0%, transparent 55%), linear-gradient(135deg, #1a1a1a 0%, #262626 100%)",
              }}
            >
              <div
                aria-hidden
                className="testimonial-orb-1 absolute"
                style={{
                  top: "18%",
                  left: "20%",
                  width: "55%",
                  height: "55%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,200,170,0.55) 0%, rgba(255,200,170,0) 65%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                aria-hidden
                className="testimonial-orb-2 absolute"
                style={{
                  bottom: "10%",
                  right: "12%",
                  width: "45%",
                  height: "45%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(180,160,255,0.55) 0%, rgba(180,160,255,0) 65%)",
                  filter: "blur(24px)",
                }}
              />
              <div
                aria-hidden
                className="testimonial-ring absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  width: "70%",
                  height: "70%",
                  marginTop: "-35%",
                  marginLeft: "-35%",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              />

              <div
                className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-8 text-white/85"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-light">A+</div>
                  <div className="mt-1 text-white/55 uppercase tracking-widest">
                    Strategy
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-light">B</div>
                  <div className="mt-1 text-white/55 uppercase tracking-widest">
                    Voice
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-light">A</div>
                  <div className="mt-1 text-white/55 uppercase tracking-widest">
                    Identity
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
