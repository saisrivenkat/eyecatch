import type { Project } from "@/data/projects";

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function asOptionalString(v: unknown): string | undefined {
  const s = asString(v);
  return s.length > 0 ? s : undefined;
}

export function normalizeProjectPayload(input: unknown): Project {
  if (!input || typeof input !== "object") {
    throw new Error("Body must be an object.");
  }
  const obj = input as Record<string, unknown>;

  const slug = asString(obj.slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "Slug must be lowercase letters, numbers, and hyphens only.",
    );
  }

  const title = asString(obj.title);
  const category = asString(obj.category);
  const description = asString(obj.description);
  const image = asString(obj.image);
  if (!title || !category || !description || !image) {
    throw new Error(
      "title, category, description, and image are required fields.",
    );
  }

  const size = obj.size === "small" ? "small" : "large";

  let services: string[] | undefined;
  if (Array.isArray(obj.services)) {
    services = obj.services
      .map((s) => (typeof s === "string" ? s.trim() : ""))
      .filter((s) => s.length > 0);
    if (services.length === 0) services = undefined;
  }

  return {
    slug,
    title,
    category,
    description,
    image,
    size,
    services,
    videoSrc: asOptionalString(obj.videoSrc),
    videoPoster: asOptionalString(obj.videoPoster),
    bannerImage: asOptionalString(obj.bannerImage),
    fullDescription: asOptionalString(obj.fullDescription),
  };
}
