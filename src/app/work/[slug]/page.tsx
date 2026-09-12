import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { GradientBlob } from "@/components/GradientBlob";
import { ProjectAmbientBackground } from "@/components/ProjectAmbientBackground";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Footer } from "@/components/Footer";
import { getProjectBySlug } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | EyeCatch" };
  }

  return {
    title: `${project.title} | EyeCatch — Branding & ${project.category}`,
    description: project.fullDescription ?? project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <GradientBlob />
      </div>
      <ProjectAmbientBackground />

      <Header />
      <main
        className="relative"
        style={{ zIndex: 2, backgroundColor: "transparent" }}
      >
        <ProjectDetail project={project} />
      </main>
      <div className="relative" style={{ zIndex: 2 }}>
        <Footer />
      </div>
    </>
  );
}
