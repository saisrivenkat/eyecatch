"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Login failed");
        setSubmitting(false);
        return;
      }
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Network error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span
          className="block text-white/70"
          style={{
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Password
        </span>
        <input
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors focus:border-white/45"
          style={{ fontSize: "16px" }}
        />
      </label>

      {error && (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200"
          style={{ fontSize: "14px" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || password.length === 0}
        className="w-full rounded-full bg-white px-6 py-3 text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ fontSize: "15px", fontWeight: 500 }}
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
