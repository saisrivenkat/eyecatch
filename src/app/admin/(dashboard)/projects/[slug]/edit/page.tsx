import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectBySlug } from "@/lib/projects-store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit project | EyeCatch Admin" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-block text-white/55 transition-colors hover:text-white"
        style={{
          fontSize: "12px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        ← Back to projects
      </Link>

      <h1
        className="text-white"
        style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          marginBottom: "8px",
        }}
      >
        Edit project
      </h1>
      <p
        className="text-white/55"
        style={{ fontSize: "14px", marginBottom: "40px" }}
      >
        {project.title} · /work/{project.slug}
      </p>

      <ProjectForm mode="edit" initial={project} />
    </div>
  );
}
