import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "ec_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 1 week

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET env var must be set to a string of at least 16 characters.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminSession(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyAdminSession(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function checkAdminPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (submitted.length !== expected.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= submitted.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
