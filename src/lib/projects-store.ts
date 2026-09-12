import "server-only";
import { list, put } from "@vercel/blob";
import { projects as seedProjects, type Project } from "@/data/projects";

export type { Project };

const STORE_KEY = "eyecatch/projects.json";

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function saveAll(projects: Project[]): Promise<void> {
  if (!hasBlob()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not configured. Enable Vercel Blob and add the token to .env.local before writing projects.",
    );
  }
  await put(STORE_KEY, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function getAllProjects(): Promise<Project[]> {
  if (!hasBlob()) return seedProjects;

  try {
    const { blobs } = await list({ prefix: STORE_KEY });
    const found = blobs.find((b) => b.pathname === STORE_KEY);

    if (!found) {
      await saveAll(seedProjects);
      return seedProjects;
    }

    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch projects.json from Blob:", res.status);
      return seedProjects;
    }
    const data = (await res.json()) as Project[];
    return Array.isArray(data) ? data : seedProjects;
  } catch (err) {
    console.error("Error loading projects from Blob:", err);
    return seedProjects;
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug);
}

export async function upsertProject(
  project: Project,
  originalSlug?: string,
): Promise<Project> {
  const all = await getAllProjects();
  const matchSlug = originalSlug ?? project.slug;
  const idx = all.findIndex((p) => p.slug === matchSlug);

  if (
    originalSlug &&
    originalSlug !== project.slug &&
    all.some((p) => p.slug === project.slug)
  ) {
    throw new Error(`A project with slug "${project.slug}" already exists.`);
  }

  if (idx >= 0) {
    all[idx] = project;
  } else {
    if (all.some((p) => p.slug === project.slug)) {
      throw new Error(`A project with slug "${project.slug}" already exists.`);
    }
    all.unshift(project);
  }

  await saveAll(all);
  return project;
}

export async function deleteProject(slug: string): Promise<void> {
  const all = await getAllProjects();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) return;
  await saveAll(next);
}
