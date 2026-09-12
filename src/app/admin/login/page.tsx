import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin Login | EyeCatch",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { from } = await searchParams;
  const redirectTo = from && from.startsWith("/admin") ? from : "/admin";

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white"
      style={{ padding: "24px" }}
    >
      <div className="w-full max-w-[400px]">
        <p
          className="uppercase text-white/55"
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            marginBottom: "12px",
          }}
        >
          EyeCatch admin
        </p>
        <h1
          className="text-white"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          Sign in to manage projects.
        </h1>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
