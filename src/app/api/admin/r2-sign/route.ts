import { NextResponse } from "next/server";
import { isR2Configured, presignR2Upload } from "@/lib/r2";

const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-matroska",
]);

const MAX_VIDEO_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

export async function POST(request: Request) {
  if (!isR2Configured()) {
    return NextResponse.json(
      {
        error:
          "R2 is not configured on the server. Add R2_* env vars to enable video uploads.",
      },
      { status: 503 },
    );
  }

  let body: { filename?: unknown; contentType?: unknown; size?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const filename =
    typeof body.filename === "string" ? body.filename.trim() : "";
  const contentType =
    typeof body.contentType === "string" ? body.contentType.trim() : "";
  const size = typeof body.size === "number" ? body.size : 0;

  if (!filename) {
    return NextResponse.json({ error: "filename is required" }, { status: 400 });
  }
  if (!ALLOWED_VIDEO_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: `Unsupported video type: ${contentType || "unknown"}` },
      { status: 400 },
    );
  }
  if (size > MAX_VIDEO_BYTES) {
    return NextResponse.json(
      { error: "Video too large (limit 2 GB)" },
      { status: 400 },
    );
  }

  try {
    const result = await presignR2Upload({ filename, contentType });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to sign upload" },
      { status: 500 },
    );
  }
}
