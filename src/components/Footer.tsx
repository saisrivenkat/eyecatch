"use client";

import Image from "next/image";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/55 transition-colors duration-200 hover:text-white"
    >
      {children}
    </a>
  );
}

const HYDERABAD =
  "Plot No. 710, Road No. 36, Aditya Enclave, Venkatagiri, Jubilee Hills, Hyderabad, Telangana 500033.";
const VIJAYAWADA =
  "MG Rd, Behind Kalaniketan, Mogalrajapuram, Sidhartha Nagar, Labbipet, Vijayawada, Andhra Pradesh 520010.";

export function Footer() {
  return (
    <footer
      className="text-white"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div
        className="container"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="flex justify-center">
          <Image
            src="/images/logo-eyecatch.svg"
            alt="EyeCatch"
            width={220}
            height={56}
            className="h-[52px] w-auto opacity-90"
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Hyderabad</p>
            <p
              className="text-white/65"
              style={{ fontSize: "14px", lineHeight: "22px", maxWidth: "320px" }}
            >
              {HYDERABAD}
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Vijayawada</p>
            <p
              className="text-white/65"
              style={{ fontSize: "14px", lineHeight: "22px", maxWidth: "360px" }}
            >
              {VIJAYAWADA}
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-white/55">
          <SocialIcon href="#" label="Facebook">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="#" label="Instagram">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </SocialIcon>
          <SocialIcon href="#" label="LinkedIn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="mailto:hello@eyecatch.in" label="Email">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </SocialIcon>
        </div>
      </div>
    </footer>
  );
}
