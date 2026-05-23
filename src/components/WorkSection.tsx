import { ScrollReveal } from "@/components/ScrollReveal";
import { WorkGrid } from "@/components/WorkGrid";
import { getAllProjects } from "@/lib/projects-store";

export async function WorkSection() {
  const projects = await getAllProjects();

  return (
    <section
      className="text-white"
      style={{ padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={60}>
          <div style={{ marginBottom: "60px" }}>
            <p
              className="uppercase text-white/55"
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              Related Projects
            </p>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 101px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
              }}
            >
              Brands we&apos;ve
              <br />
              shaped lately.
            </h2>
            <p
              className="text-white/70"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: 400,
                maxWidth: "700px",
              }}
            >
              From boardrooms to billboards — a few of the brands EyeCatch has
              helped position, name, and dress for the room they&rsquo;re walking
              into next.
            </p>
          </div>
        </ScrollReveal>

        <WorkGrid projects={projects} />
      </div>
    </section>
  );
}
