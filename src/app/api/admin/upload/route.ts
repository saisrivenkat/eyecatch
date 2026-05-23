import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/avif",
          "image/svg+xml",
          "video/mp4",
          "video/webm",
          "video/quicktime",
        ],
        addRandomSuffix: true,
        maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB
      }),
      onUploadCompleted: async () => {
        // No-op — the form stores the returned URL directly.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
