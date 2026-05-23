"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  image: string;
  imageAlt: string;
  accent: string;
}

const team: TeamMember[] = [
  {
    name: "Madhu Pulipati",
    role: "Managing Director",
    bio: [
      "A trailblazer and visionary in the realm of phygital advertising and branding, shaping the creative landscape across the two Telugu-speaking states.",
      "Madhu brings a wealth of creative talent and industry experience to EyeCatch. As an accomplished artist, photographer, and visualiser, his leadership inspires the team to push boundaries and deliver exceptional results.",
    ],
    image: "/images/team/madhu-pulipati.jpg",
    imageAlt: "Portrait of Madhu Pulipati, Managing Director of EyeCatch",
    accent: "#d9c4a3",
  },
  {
    name: "Medha Pulipati",
    role: "Creative Head",
    bio: [
      "A visionary creative leader known for blending cultural depth with contemporary design. As Creative Head at EyeCatch, she spearheads conceptualisation, storytelling, and brand aesthetics with a keen eye for detail.",
      "With both a Bachelor's and Master's in Design and Interiors, and a specialisation in Product Design from the Florence Design Academy, Italy — Medha brings poetic resonance and visual clarity to every project she touches.",
    ],
    image: "/images/team/medha-pulipati.jpg",
    imageAlt: "Portrait of Medha Pulipati, Creative Head of EyeCatch",
    accent: "#b9a4ff",
  },
];

function SplitName({ name, visible }: { name: string; visible: boolean }) {
  return (
    <span aria-label={name} className="inline-block">
      {name.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block will-change-transform"
          style={{
            transform: visible ? "translateY(0)" : "translateY(105%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${
              i * 0.035
            }s, opacity 0.6s ease ${i * 0.035}s`,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

function TeamPanel({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { ref: nameRef, isVisible: nameVisible } =
    useScrollReveal<HTMLHeadingElement>({ threshold: 0.35 });

  const imageLeft = index % 2 === 1;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;
    if (!wrapper || !image) return;

    let raf = 0;
    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const factor = -0.06;
      image.style.transform = `translate3d(0, ${(center * factor).toFixed(2)}px, 0) scale(1.06)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={`grid items-center gap-10 md:gap-16 lg:gap-20 md:grid-cols-12 ${
          imageLeft ? "" : ""
        }`}
      >
        {/* Image side */}
        <ScrollReveal
          distance={60}
          duration={0.9}
          className={`md:col-span-5 ${
            imageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            className="team-image group relative overflow-hidden"
            style={{
              borderRadius: "28px",
              aspectRatio: "4 / 5",
              boxShadow:
                "0 30px 80px -40px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div
              ref={imageRef}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={member.image}
                alt={member.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>

            {/* Accent gradient wash that lights up on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${member.accent}33 0%, transparent 55%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Bottom-left index + role chip */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
              <span
                className="text-white"
                style={{
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                — {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[2px] text-white/80 backdrop-blur-md"
              >
                {member.role}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Text side */}
        <div
          className={`md:col-span-7 ${
            imageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Ghost name watermark — large, faint, behind the bio */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 select-none whitespace-nowrap"
              style={{
                fontSize: "clamp(80px, 14vw, 220px)",
                fontWeight: 400,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                transform: "translate(-2%, -22%)",
              }}
            >
              {member.name.split(" ")[0]}
            </div>

            <div className="relative">
              <ScrollReveal distance={40} duration={0.8}>
                <div className="flex items-center gap-3">
                  <span
                    className="block h-[1px] w-10"
                    style={{ backgroundColor: member.accent, opacity: 0.85 }}
                  />
                  <span
                    className="text-white/60"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {member.role}
                  </span>
                </div>
              </ScrollReveal>

              <h3
                ref={nameRef}
                className="mt-4 overflow-hidden text-white"
                style={{
                  fontSize: "clamp(44px, 6.4vw, 92px)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.025em",
                }}
              >
                <span className="block overflow-hidden">
                  <SplitName name={member.name} visible={nameVisible} />
                </span>
              </h3>

              <div
                className="mt-8 h-[1px] w-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0))",
                }}
              />

              <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-8">
                {member.bio.map((paragraph, i) => (
                  <ScrollReveal
                    key={i}
                    distance={30}
                    delay={0.15 + i * 0.12}
                    duration={0.8}
                  >
                    <p
                      className="text-white/75"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.6,
                      }}
                    >
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section
      className="relative text-white"
      style={{ padding: "140px 0 120px", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={40}>
          <p
            className="uppercase text-white/55"
            style={{
              fontSize: "13px",
              letterSpacing: "2px",
              marginBottom: "20px",
            }}
          >
            The team
          </p>
          <h2
            style={{
              fontSize: "clamp(44px, 6.2vw, 96px)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              maxWidth: "880px",
            }}
          >
            The minds behind
            <br />
            the eyecatch.
          </h2>
          <p
            className="mt-6 text-white/65"
            style={{
              fontSize: "18px",
              lineHeight: 1.55,
              maxWidth: "520px",
            }}
          >
            Two creative leaders shaping bold, phygital brand experiences out of
            Hyderabad and Vijayawada.
          </p>
        </ScrollReveal>

        <div className="mt-24 space-y-32 md:mt-32 md:space-y-44">
          {team.map((member, i) => (
            <TeamPanel key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
