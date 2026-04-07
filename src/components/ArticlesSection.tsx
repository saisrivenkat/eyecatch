"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const articles = [
  {
    title: "Branding inspiration: design trends for 2026",
    tags: ["Expertise", "Inspiration"],
  },
  {
    title: "Design with guts: KOTA\u2019s manifesto for creative bravery",
    tags: ["Expertise", "Inspiration"],
  },
  {
    title: "KOTA wins a Lovie award for Best Web Design \u2013 Aesthetic!",
    tags: ["Culture", "Our work"],
  },
  {
    title: "Brand-First vs Dev-First: What actually sets KOTA apart",
    tags: ["Expertise"],
  },
  {
    title: "10 creative websites to inspire your next design (2025 update)",
    tags: ["Inspiration"],
  },
  {
    title: "Web design inspiration: 50 sites to bookmark",
    tags: ["Inspiration"],
  },
  {
    title: "Clutch names KOTA a 2024 Global Winner",
    tags: ["Culture"],
  },
  {
    title: "KOTA earns 2025 Great Place to Work Certification",
    tags: ["Culture"],
  },
  {
    title: "What your 2026 website brief should include",
    tags: ["Expertise"],
  },
];

export function ArticlesSection() {
  return (
    <section className="bg-black text-white" style={{ padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal distance={60}>
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: "60px" }}
          >
            <div>
              <p style={{ fontSize: "14px", marginBottom: "8px" }}>Our</p>
              <h2
                style={{
                  fontSize: "clamp(48px, 5vw, 60px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                }}
              >
                Articles
              </h2>
            </div>
            <a
              href="#"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2"
              style={{
                fontSize: "16px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "10px 24px",
              }}
            >
              View all articles
              <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.06} distance={30}>
              <a
                href="#"
                className="group block"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  padding: "24px 0",
                }}
              >
                <h3
                  className="transition-opacity duration-300 group-hover:opacity-70"
                  style={{ fontSize: "20px", fontWeight: 400, marginBottom: "8px" }}
                >
                  {article.title}
                </h3>
                <div className="flex gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontSize: "13px", opacity: 0.5 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
