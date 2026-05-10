import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://faizura-trading.sg";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Money Exchange Singapore | Faizura Trading — Best Rates",
    template: "%s | Faizura Trading",
  },
  description:
    "MAS-licensed money exchange & remittance in Singapore. Best USD, SGD, INR, MYR, GBP rates. Zero hidden fees. 50,000+ customers since 2008.",
  keywords: [
    "money exchange Singapore",
    "best forex rates Singapore",
    "currency exchange Singapore",
    "USD to SGD",
    "remittance Singapore",
    "Faizura Trading",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "Faizura Trading",
    title: "Money Exchange Singapore | Faizura Trading",
    description: "MAS-licensed. Best forex rates. Zero hidden fees.",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: "Faizura Trading" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Exchange Singapore | Faizura Trading",
    description: "MAS-licensed. Best forex rates. Zero hidden fees.",
    images: ["/og/og-default.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#org`,
      name: "Faizura Trading",
      url: SITE_URL,
      logo: `${SITE_URL}/og/og-default.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "TBD",
        addressLocality: "Singapore",
        addressRegion: "SG",
        postalCode: "TBD",
        addressCountry: "SG",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#business`,
      name: "Faizura Trading",
      image: `${SITE_URL}/og/og-default.png`,
      priceRange: "$$",
      telephone: "+65-0000-0000",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Singapore",
        addressCountry: "SG",
      },
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <link rel="preload" as="image" href="/frames/frame_001.webp" type="image/webp" />
        <link rel="preconnect" href="https://api.frankfurter.app" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-primary">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
