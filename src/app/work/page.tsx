import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GradientBlob } from "@/components/GradientBlob";
import { WorkFilterGrid } from "@/components/WorkFilterGrid";
import { Footer } from "@/components/Footer";
import { getAllProjects } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work | EyeCatch — Hyderabad & Vijayawada",
  description:
    "Every brand EyeCatch has positioned, named, and dressed — logos, identities, and campaigns from our Hyderabad & Vijayawada studios.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <>
      {/* Fixed parallax wave layer — persists across sections, matches home page */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <GradientBlob />
      </div>

      <Header />
      <main className="relative z-2" style={{ backgroundColor: "transparent" }}>
        <section
          className="text-white"
          style={{
            padding:
              "clamp(120px, 26vw, 180px) 0 clamp(64px, 12vw, 120px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="container">
            <p
              className="uppercase text-white/55"
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                marginBottom: "clamp(24px, 5vw, 40px)",
              }}
            >
              Selected work
            </p>

            <WorkFilterGrid projects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
