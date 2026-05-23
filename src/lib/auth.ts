import "server-only";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_TTL_SECONDS,
  signAdminSession,
  verifyAdminSession,
} from "@/lib/session";

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifyAdminSession(token);
}

export async function startAdminSession(): Promise<void> {
  const token = await signAdminSession();
  const store = await cookies();
  store.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endAdminSession(): Promise<void> {
  const store = await cookies();
  store.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
