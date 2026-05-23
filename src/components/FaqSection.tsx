"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";

const faqs = [
  {
    question:
      "How much does logo, brochure, web design and development typically cost?",
    answer:
      "Project costs depend on scope and ambition, so pricing varies from engagement to engagement. We\u2019ll scope your project, share a clear quote, and work to fixed costs with agreed milestone payments.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "A typical web design and build runs around 12\u201314 weeks, whereas a full brand-into-website-and-marketing engagement can take 6 months or more.",
  },
  {
    question: "Can your creative agency accommodate tight deadlines?",
    answer:
      "Absolutely. We\u2019re ready to mobilise our design and development teams, prioritising the essentials to turn a fast-approaching deadline into a delivered reality.",
  },
  {
    question: "What does the design process look like?",
    answer:
      "Our process is collaborative and transparent. We start with discovery and strategy, move into design concepts, iterate based on your feedback, then build and launch.",
  },
  {
    question: "Do you offer brand strategy services?",
    answer:
      "Yes. Brand strategy is at the heart of what we do. We help you define your positioning, voice, and visual identity so your brand claims its space.",
  },
  {
    question: "Can you help with SEO and digital marketing?",
    answer:
      "Yes \u2014 our digital marketing team handles SEO, content marketing, social media, and paid campaigns. Data driven, creatively led, results oriented.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        padding: "24px 0",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <span style={{ fontSize: "20px" }}>{question}</span>
        <ChevronDownIcon
          className="shrink-0 transition-transform duration-300"
          style={{
            width: "24px",
            height: "24px",
            marginLeft: "16px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        className="faq-answer"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "16px 0 0" : "0",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            maxWidth: "700px",
            opacity: 0.7,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="text-white" style={{ padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal distance={60}>
          <h2
            style={{
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 400,
              lineHeight: 1.0,
              marginBottom: "40px",
            }}
          >
            FAQ&apos;s
          </h2>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} delay={i * 0.08} distance={20}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
