"use client";

import { upload } from "@vercel/blob/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Project } from "@/data/projects";

type Mode = "create" | "edit";

interface ProjectFormProps {
  mode: Mode;
  initial?: Project;
}

interface FormState {
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  size: "large" | "small";
  servicesText: string;
  videoSrc: string;
  videoPoster: string;
  bannerImage: string;
}

function toFormState(p?: Project): FormState {
  return {
    slug: p?.slug ?? "",
    title: p?.title ?? "",
    category: p?.category ?? "",
    description: p?.description ?? "",
    fullDescription: p?.fullDescription ?? "",
    image: p?.image ?? "",
    size: p?.size ?? "large",
    servicesText: (p?.services ?? []).join(", "),
    videoSrc: p?.videoSrc ?? "",
    videoPoster: p?.videoPoster ?? "",
    bannerImage: p?.bannerImage ?? "",
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type MediaField = "image" | "videoSrc" | "videoPoster" | "bannerImage";

async function uploadImageToBlob(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  const blob = await upload(
    `eyecatch/uploads/${Date.now()}-${file.name}`,
    file,
    {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      onUploadProgress: ({ percentage }) => onProgress(percentage),
    },
  );
  return blob.url;
}

async function uploadVideoToR2(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  const signRes = await fetch("/api/admin/r2-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });
  if (!signRes.ok) {
    const data = (await signRes.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(data.error ?? "Failed to sign video upload");
  }
  const { uploadUrl, publicUrl } = (await signRes.json()) as {
    uploadUrl: string;
    publicUrl: string;
  };

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress((e.loaded / e.total) * 100);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`R2 upload failed (HTTP ${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Network error during R2 upload"));
    xhr.send(file);
  });

  return publicUrl;
}

export function ProjectForm({ mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(toFormState(initial));
  const [uploading, setUploading] = useState<MediaField | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const originalSlug = initial?.slug;

  function patch(partial: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function handleTitleChange(value: string) {
    patch({
      title: value,
      slug: mode === "create" && form.slug === slugify(form.title) ? slugify(value) : form.slug,
    });
  }

  async function handleFileChange(
    field: MediaField,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError(null);
    setUploading(field);
    setUploadProgress(0);

    try {
      const isVideo = file.type.startsWith("video/");
      const url = isVideo
        ? await uploadVideoToR2(file, (pct) => setUploadProgress(pct))
        : await uploadImageToBlob(file, (pct) => setUploadProgress(pct));
      patch({ [field]: url } as Partial<FormState>);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(`Upload failed: ${msg}`);
    } finally {
      setUploading(null);
      setUploadProgress(0);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const slug = slugify(form.slug || form.title);
    if (!slug) {
      setError("Slug is required.");
      return;
    }
    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) {
      setError("Title, category, and short description are required.");
      return;
    }
    if (!form.image.trim()) {
      setError("A main image is required.");
      return;
    }

    const services = form.servicesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Project & { originalSlug?: string } = {
      slug,
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      size: form.size,
      services: services.length > 0 ? services : undefined,
      videoSrc: form.videoSrc.trim() || undefined,
      videoPoster: form.videoPoster.trim() || undefined,
      bannerImage: form.bannerImage.trim() || undefined,
      fullDescription: form.fullDescription.trim() || undefined,
      originalSlug: mode === "edit" ? originalSlug : undefined,
    };

    setSubmitting(true);
    try {
      const url =
        mode === "edit"
          ? `/api/admin/projects/${originalSlug}`
          : "/api/admin/projects";
      const res = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Save failed");
        setSubmitting(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Network error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputClass}
          />
        </Field>
        <Field
          label="Slug"
          hint="URL fragment — letters, numbers, hyphens only."
          required
        >
          <input
            type="text"
            value={form.slug}
            onChange={(e) => patch({ slug: e.target.value })}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Category" required>
          <input
            type="text"
            value={form.category}
            onChange={(e) => patch({ category: e.target.value })}
            required
            placeholder="e.g. Branding, Logo, Campaign"
            className={inputClass}
          />
        </Field>
        <Field label="Card size">
          <select
            value={form.size}
            onChange={(e) =>
              patch({ size: e.target.value as "large" | "small" })
            }
            className={inputClass}
          >
            <option value="large">Large (full-width)</option>
            <option value="small">Small (half-width)</option>
          </select>
        </Field>
      </div>

      <Field
        label="Short description"
        hint="Shown on the card in the Work grid."
        required
      >
        <textarea
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          required
          rows={3}
          className={inputClass}
        />
      </Field>

      <Field
        label="Long-form story"
        hint="Shown on the project detail page under 'The brief'."
      >
        <textarea
          value={form.fullDescription}
          onChange={(e) => patch({ fullDescription: e.target.value })}
          rows={5}
          className={inputClass}
        />
      </Field>

      <Field
        label="Services"
        hint="Comma-separated, e.g. 'Brand identity, Logo design, Visual system'."
      >
        <input
          type="text"
          value={form.servicesText}
          onChange={(e) => patch({ servicesText: e.target.value })}
          className={inputClass}
        />
      </Field>

      <fieldset className="space-y-6 rounded-xl border border-white/10 p-6">
        <legend
          className="px-2 text-white/70"
          style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}
        >
          Media
        </legend>

        <MediaSlot
          label="Main image"
          field="image"
          value={form.image}
          accept="image/*"
          required
          uploading={uploading}
          uploadProgress={uploadProgress}
          onChange={(field, e) => handleFileChange(field, e)}
          onUrlChange={(v) => patch({ image: v })}
        />
        <MediaSlot
          label="Video reel"
          field="videoSrc"
          value={form.videoSrc}
          accept="video/*"
          uploading={uploading}
          uploadProgress={uploadProgress}
          onChange={(field, e) => handleFileChange(field, e)}
          onUrlChange={(v) => patch({ videoSrc: v })}
        />
        <MediaSlot
          label="Video poster (still)"
          field="videoPoster"
          value={form.videoPoster}
          accept="image/*"
          uploading={uploading}
          uploadProgress={uploadProgress}
          onChange={(field, e) => handleFileChange(field, e)}
          onUrlChange={(v) => patch({ videoPoster: v })}
        />
        <MediaSlot
          label="Banner image"
          field="bannerImage"
          value={form.bannerImage}
          accept="image/*"
          uploading={uploading}
          uploadProgress={uploadProgress}
          onChange={(field, e) => handleFileChange(field, e)}
          onUrlChange={(v) => patch({ bannerImage: v })}
        />
      </fieldset>

      {error && (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200"
          style={{ fontSize: "14px" }}
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || uploading !== null}
          className="rounded-full bg-white px-6 py-3 text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ fontSize: "15px", fontWeight: 500 }}
        >
          {submitting
            ? "Saving…"
            : mode === "edit"
              ? "Save changes"
              : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-white/15 px-6 py-3 text-white/75 transition-colors hover:border-white/40 hover:text-white"
          style={{ fontSize: "15px" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-white outline-none transition-colors focus:border-white/45";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-white/70"
        style={{
          fontSize: "12px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span className="text-red-300"> *</span>}
      </span>
      {children}
      {hint && (
        <span
          className="mt-1.5 block text-white/45"
          style={{ fontSize: "12px", lineHeight: 1.5 }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

function MediaSlot({
  label,
  field,
  value,
  accept,
  required,
  uploading,
  uploadProgress,
  onChange,
  onUrlChange,
}: {
  label: string;
  field: MediaField;
  value: string;
  accept: string;
  required?: boolean;
  uploading: MediaField | null;
  uploadProgress: number;
  onChange: (field: MediaField, e: ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (value: string) => void;
}) {
  const isUploading = uploading === field;
  const isImage = accept.startsWith("image/");
  return (
    <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-start">
      <div
        className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
        style={{ aspectRatio: "16 / 10" }}
      >
        {value ? (
          isImage ? (
            <Image
              src={value}
              alt={label}
              fill
              sizes="160px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <video
              src={value}
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-white/35"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            no media
          </div>
        )}
      </div>
      <div>
        <Field label={label} required={required}>
          <input
            type="url"
            value={value}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste a URL or upload below"
            className={inputClass}
          />
        </Field>
        <div className="mt-3 flex items-center gap-3">
          <label
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-white/40 hover:text-white"
            style={{ fontSize: "13px" }}
          >
            <input
              type="file"
              accept={accept}
              hidden
              onChange={(e) => onChange(field, e)}
              disabled={uploading !== null}
            />
            {isUploading
              ? `Uploading ${Math.round(uploadProgress)}%…`
              : value
                ? "Replace file"
                : `Upload ${isImage ? "image" : "video"}`}
          </label>
          {value && !isUploading && (
            <button
              type="button"
              onClick={() => onUrlChange("")}
              className="text-white/55 transition-colors hover:text-white"
              style={{ fontSize: "13px" }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
