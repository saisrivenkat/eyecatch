"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

interface Step {
  number: string;
  title: string;
  blurb: string;
  bullets: string[];
  video: string;
  accent: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Ideation",
    blurb:
      "Audience interviews, audits, sharp competitor reads — the messy first weeks where we figure out what the brand truly stands for and where it has room to win.",
    bullets: [
      "Discovery & audits",
      "Competitor & category map",
      "Positioning concepts",
      "Narrative platform",
    ],
    video: "/videos/Short-Preview-homepage.mp4",
    accent: "linear-gradient(135deg, #2a2a2a 0%, #525252 45%, #a3a3a3 100%)",
  },
  {
    number: "02",
    title: "Transformation",
    blurb:
      "Strategy hardens into voice, mark, type, colour, and motion. We pressure-test every direction across the messiest real-world contexts before we hand anything over.",
    bullets: [
      "Voice principles & vocabulary",
      "Logo system & symbol set",
      "Type, colour, motion language",
      "Touchpoint design",
    ],
    video: "/videos/GOAT-FeatureVideo.mp4",
    accent: "linear-gradient(135deg, #0f0f0f 0%, #404040 50%, #8a8a8a 100%)",
  },
  {
    number: "03",
    title: "Handover",
    blurb:
      "A guidelines book your team will actually open, asset kits ready for Monday morning, and a launch script so the brand lands well — inside the building first, then everywhere.",
    bullets: [
      "Brand guidelines",
      "Asset & template kit",
      "Launch playbook",
      "Quarterly stewardship",
    ],
    video: "/videos/isi-vid2-1.mp4",
    accent: "linear-gradient(135deg, #3a3a3a 0%, #737373 45%, #c7c7c7 100%)",
  },
];

function StepRow({ step, reverse }: { step: Step; reverse: boolean }) {
  // Direction values rely on ScrollReveal's mapping:
  // direction="right" starts at -X (i.e. slides in from the LEFT)
  // direction="left"  starts at +X (i.e. slides in from the RIGHT)
  const mediaDirection = reverse ? "left" : "right";
  const textDirection = reverse ? "right" : "left";

  return (
    <ScrollReveal
      as="article"
      distance={80}
      duration={0.9}
      threshold={0.18}
      className={`step-row group grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>:first-child]:order-2" : ""
      }`}
    >
      <ScrollReveal
        direction={mediaDirection}
        distance={90}
        duration={1.1}
        delay={0.05}
      >
        <div
          className="relative overflow-hidden rounded-[28px]"
          style={{
            aspectRatio: "4 / 3",
            backgroundColor: "#161616",
          }}
        >
          <div
            aria-hidden
            className="step-orb pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: step.accent }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          >
            <source src={step.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span
            className="absolute left-7 top-7 text-white/85"
            style={{ fontSize: "13px", letterSpacing: "1.5px" }}
          >
            {step.number} / Step
          </span>
        </div>
      </ScrollReveal>

      <div>
        <ScrollReveal direction={textDirection} distance={60} duration={0.8} delay={0.1}>
          <p
            className="text-white/55 uppercase"
            style={{
              fontSize: "13px",
              letterSpacing: "1.5px",
              marginBottom: "16px",
            }}
          >
            {step.number}
          </p>
        </ScrollReveal>

        <ScrollReveal direction={textDirection} distance={70} duration={0.9} delay={0.18}>
          <h3
            className="font-medium text-white"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            {step.title}.
          </h3>
        </ScrollReveal>

        <ScrollReveal direction={textDirection} distance={50} duration={0.9} delay={0.28}>
          <p
            className="text-white/75"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              maxWidth: "540px",
              marginBottom: "28px",
            }}
          >
            {step.blurb}
          </p>
        </ScrollReveal>

        <ul className="space-y-2">
          {step.bullets.map((b, i) => (
            <ScrollReveal
              key={b}
              as="li"
              direction="up"
              distance={20}
              duration={0.6}
              delay={0.36 + i * 0.07}
              className="flex items-start gap-3 text-white/70"
            >
              <span style={{ fontSize: "15px", lineHeight: "24px", display: "inline-flex", gap: "12px", alignItems: "flex-start" }}>
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/50"
                />
                {b}
              </span>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

export function BrandingPillarsSection() {
  return (
    <section
      id="pillars"
      className="bg-[#0e0e0e] text-white"
      style={{ padding: "120px 0 0", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={60} duration={0.9}>
          <div style={{ marginBottom: "80px", maxWidth: "780px" }}>
            <ScrollReveal direction="right" distance={40} delay={0.1} duration={0.7}>
              <p
                className="uppercase text-white/55"
                style={{
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  marginBottom: "12px",
                }}
              >
                How we work
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={40} delay={0.2} duration={0.9}>
              <h2
                style={{
                  fontSize: "clamp(48px, 7vw, 101px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  marginBottom: "32px",
                }}
              >
                Three steps,
                <br />
                one brand handed over.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={30} delay={0.32} duration={0.9}>
              <p
                className="text-white/70"
                style={{ fontSize: "20px", lineHeight: "28px" }}
              >
                We keep the engagement to three honest phases — Ideation,
                Transformation, and Handover — so the work moves quickly and
                you always know what we&rsquo;re doing this week.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <div className="space-y-[120px]">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.step-row .step-orb) {
          animation: stepOrbDrift 9s ease-in-out infinite;
        }
        @keyframes stepOrbDrift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-18px, 22px) scale(1.08);
          }
        }
      `}</style>
    </section>
  );
}
