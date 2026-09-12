import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <header
        className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0e0e]/90 backdrop-blur"
      >
        <div
          className="mx-auto flex max-w-[1200px] items-center justify-between"
          style={{ padding: "18px 28px" }}
        >
          <Link
            href="/admin"
            className="flex items-center gap-3 text-white"
            style={{
              fontSize: "14px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            <span className="text-white/55">EyeCatch</span>
            <span className="text-white/30">/</span>
            <span>Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white/65 transition-colors hover:text-white"
              style={{
                fontSize: "13px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              View site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main
        className="mx-auto"
        style={{ maxWidth: "1200px", padding: "48px 28px 80px" }}
      >
        {children}
      </main>
    </div>
  );
}
