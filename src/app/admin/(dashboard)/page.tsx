import Link from "next/link";
import { getAllProjects } from "@/lib/projects-store";
import { ProjectsList } from "./ProjectsList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects | EyeCatch Admin" };

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <div>
      <div
        className="flex flex-wrap items-end justify-between gap-4"
        style={{ marginBottom: "32px" }}
      >
        <div>
          <p
            className="uppercase text-white/55"
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            Projects
          </p>
          <h1
            className="text-white"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-black transition-opacity hover:opacity-90"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          + New project
        </Link>
      </div>

      {!blobConfigured && (
        <div
          className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/[0.06] p-4 text-yellow-100"
          style={{ fontSize: "14px", lineHeight: 1.5 }}
        >
          <strong>Blob storage not configured.</strong> Add{" "}
          <code className="rounded bg-black/30 px-1.5 py-0.5">
            BLOB_READ_WRITE_TOKEN
          </code>{" "}
          to <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code>{" "}
          to enable uploads and persistent edits. Showing seed data only.
        </div>
      )}

      <ProjectsList projects={projects} />
    </div>
  );
}
