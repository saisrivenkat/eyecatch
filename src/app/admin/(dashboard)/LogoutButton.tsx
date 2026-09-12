"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="rounded-full border border-white/15 px-4 py-2 text-white/75 transition-colors hover:border-white/40 hover:text-white disabled:opacity-50"
      style={{
        fontSize: "12px",
        letterSpacing: "1.2px",
        textTransform: "uppercase",
      }}
    >
      {pending ? "…" : "Log out"}
    </button>
  );
}
