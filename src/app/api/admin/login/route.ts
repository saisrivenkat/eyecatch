import { NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/session";
import { startAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await startAdminSession();
  return NextResponse.json({ ok: true });
}
