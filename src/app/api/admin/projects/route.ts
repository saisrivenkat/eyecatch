import { NextResponse } from "next/server";
import {
  getAllProjects,
  upsertProject,
  type Project,
} from "@/lib/projects-store";
import { normalizeProjectPayload } from "@/lib/project-validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let project: Project;
  try {
    project = normalizeProjectPayload(body);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid payload" },
      { status: 400 },
    );
  }

  try {
    const saved = await upsertProject(project);
    return NextResponse.json({ project: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 400 },
    );
  }
}
