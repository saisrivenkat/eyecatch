"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

interface Phase {
  step: string;
  weeks: string;
  title: string;
  description: string;
  deliverables: string[];
}

const phases: Phase[] = [
  {
    step: "01",
    weeks: "Week 1",
    title: "Discovery",
    description:
      "We get under the hood — interviews with your team, competitor teardown, audit of every touchpoint already out in the wild.",
    deliverables: [
      "Stakeholder interviews",
      "Brand & touchpoint audit",
      "Competitor & category map",
    ],
  },
  {
    step: "02",
    weeks: "Weeks 2–3",
    title: "Strategy",
    description:
      "We sharpen the position. Who you serve, where you fit, what you stand for, and the single line everyone can repeat.",
    deliverables: [
      "Audience & insight summary",
      "Positioning statement",
      "Brand narrative",
    ],
  },
  {
    step: "03",
    weeks: "Week 4",
    title: "Tone of Voice",
    description:
      "Voice principles, vocabulary do's and don'ts, and worked examples for the channels you actually publish on.",
    deliverables: [
      "Voice principles & vocabulary",
      "Channel-specific examples",
      "Editor's checklist",
    ],
  },
  {
    step: "04",
    weeks: "Weeks 5–7",
    title: "Visual Identity",
    description:
      "Marks, typography, colour, and a motion language. Designed in systems, pressure-tested across the messiest real-world contexts.",
    deliverables: [
      "Logo system",
      "Type & colour foundations",
      "Motion principles",
    ],
  },
  {
    step: "05",
    weeks: "Week 8",
    title: "Brand Guidelines",
    description:
      "The book your team and partners will actually use. Concise, illustrated, opinionated where it matters.",
    deliverables: [
      "Identity guidelines",
      "Voice & writing guide",
      "Quick-reference cheat sheet",
    ],
  },
  {
    step: "06",
    weeks: "Weeks 9–10",
    title: "Asset Kit",
    description:
      "Decks, templates, social systems, document furniture — the daily-use kit so the brand survives Monday-morning reality.",
    deliverables: [
      "Presentation templates",
      "Social media system",
      "Stationery & document set",
    ],
  },
  {
    step: "07",
    weeks: "Week 11",
    title: "Launch",
    description:
      "Internal rollout first, then the world. We script the announcement, prep the team, and stage the public moment.",
    deliverables: [
      "Internal launch session",
      "Launch content & assets",
      "Press & comms support",
    ],
  },
  {
    step: "08",
    weeks: "Ongoing",
    title: "Stewardship",
    description:
      "Brands drift. We hold a quarterly review, evolve the system, and stay on call when new contexts appear.",
    deliverables: [
      "Quarterly brand review",
      "Evolution roadmap",
      "On-call brand support",
    ],
  },
];

export function BrandingProcessSection() {
  return (
    <section
      className="bg-[#0e0e0e] text-white"
      style={{ padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={60}>
          <div style={{ marginBottom: "70px", maxWidth: "780px" }}>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>The process</p>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 101px)",
                fontWeight: 400,
                lineHeight: 1.0,
                marginBottom: "32px",
              }}
            >
              Eight steps,
              <br />
              roughly twelve weeks.
            </h2>
            <p
              className="text-white/70"
              style={{ fontSize: "20px", lineHeight: "28px" }}
            >
              No mystery, no theatre. Here is exactly how a brand engagement
              moves from a first call to a launch you'll actually want to
              celebrate.
            </p>
          </div>
        </ScrollReveal>

        <ol className="relative">
          {phases.map((phase, i) => (
            <ScrollReveal key={phase.step} delay={i * 0.04} distance={30}>
              <li
                className="group relative grid gap-8 border-t border-white/10 py-10 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.4fr)] md:items-start last:border-b"
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="font-medium text-white/85"
                    style={{ fontSize: "32px", letterSpacing: "-0.02em" }}
                  >
                    {phase.step}
                  </span>
                  <span className="text-xs uppercase tracking-[1.5px] text-white/45">
                    {phase.weeks}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-medium leading-[1.05]"
                    style={{
                      fontSize: "clamp(28px, 3vw, 38px)",
                      letterSpacing: "-0.015em",
                      marginBottom: "14px",
                    }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    className="text-white/70"
                    style={{ fontSize: "17px", lineHeight: "26px", maxWidth: "440px" }}
                  >
                    {phase.description}
                  </p>
                </div>

                <ul className="space-y-2 md:pt-2">
                  {phase.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-[15px] text-white/75"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
