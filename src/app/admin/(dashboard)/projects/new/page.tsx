import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "New project | EyeCatch Admin" };

export default function NewProjectPage() {
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
          marginBottom: "40px",
        }}
      >
        New project
      </h1>

      <ProjectForm mode="create" />
    </div>
  );
}
