import type { Metadata } from "next";
import localFont from "next/font/local";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const montreal = localFont({
  src: [
    {
      path: "../fonts/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EyeCatch | Design & Branding Agency — Hyderabad & Vijayawada",
  description:
    "EyeCatch is a creative design and branding agency rooted in Hyderabad and Vijayawada, shaping bold, beautiful narratives for brands that refuse to fade into the crowd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montreal.variable} antialiased`}>
      <body className="bg-kota-gray text-white font-montreal">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
