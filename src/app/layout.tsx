import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ad Metrics Calculator",
    template: "%s | Ad Metrics Calculator",
  },
  description:
    "A clean marketing calculator suite for ROAS, CPA, CPM, CTR, conversion rate, and more.",
  openGraph: {
    title: "Ad Metrics Calculator",
    description:
      "Instant marketing calculators for paid media, performance marketing, and email ROI.",
    url: siteUrl,
    siteName: "Ad Metrics Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Metrics Calculator",
    description:
      "Instant marketing calculators for ROAS, CPA, CPM, CTR, conversion rate, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
