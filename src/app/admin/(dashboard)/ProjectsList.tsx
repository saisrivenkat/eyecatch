"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/data/projects";

export function ProjectsList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/projects/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        alert(data.error ?? "Failed to delete project");
        return;
      }
      router.refresh();
    } finally {
      setDeletingSlug(null);
    }
  }

  if (projects.length === 0) {
    return (
      <div
        className="rounded-xl border border-white/10 text-center text-white/65"
        style={{ padding: "60px 24px", fontSize: "15px" }}
      >
        No projects yet. Create your first one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <ul className="divide-y divide-white/10">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="flex items-center gap-5"
            style={{ padding: "18px 20px" }}
          >
            <div
              className="relative shrink-0 overflow-hidden rounded-lg bg-white/[0.04]"
              style={{ width: "84px", height: "60px" }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="84px"
                  className="object-cover"
                  unoptimized
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-white"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {project.title}
              </p>
              <p
                className="truncate text-white/55"
                style={{ fontSize: "13px", letterSpacing: "0.5px" }}
              >
                {project.category} · /work/{project.slug} ·{" "}
                {project.size === "large" ? "Large card" : "Small card"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/work/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1.5 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                style={{ fontSize: "12px", letterSpacing: "1px" }}
              >
                View
              </Link>
              <Link
                href={`/admin/projects/${project.slug}/edit`}
                className="rounded-full border border-white/15 px-3 py-1.5 text-white/85 transition-colors hover:border-white/40 hover:text-white"
                style={{ fontSize: "12px", letterSpacing: "1px" }}
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(project.slug, project.title)}
                disabled={deletingSlug === project.slug}
                className="rounded-full border border-red-500/30 px-3 py-1.5 text-red-300 transition-colors hover:border-red-400/60 hover:text-red-200 disabled:opacity-50"
                style={{ fontSize: "12px", letterSpacing: "1px" }}
              >
                {deletingSlug === project.slug ? "…" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
