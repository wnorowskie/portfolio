import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getSiteConfig } from "@/lib/site";
import "./globals.css";

const bodyFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const site = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Eric Wnorowski — Full-Stack / Backend / Search",
    template: "%s · Eric Wnorowski",
  },
  description: site.summary,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    siteName: site.name,
    type: "website",
    title: "Eric Wnorowski — Full-Stack / Backend / Search",
    description: site.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Wnorowski — Full-Stack / Backend / Search",
    description: site.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-body text-ink antialiased`}>
        <div className="relative min-h-screen bg-canvas">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(104,127,140,0.15),_transparent_60%),radial-gradient(circle_at_20%_60%,_rgba(181,196,207,0.35),_transparent_55%)]" />
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-6 py-12">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
