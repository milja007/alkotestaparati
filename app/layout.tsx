import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || "https://www.drpromil.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Dr. Promil - Alkotest Aparati",
  description:
    "Testirajte razinu alkohola sa mojim alkotest aparatima u pubovima, klubovima i kafićima diljem Hrvatske. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
  keywords: [
    "alkotest",
    "alkotest aparat",
    "kalkulator promila",
    "promili",
    "alkohol u krvi",
    "alkotest Zagreb",
    "testiranje alkohola",
    "alkotest pubovi",
    "alkotest klubovi",
    "online alkotest kalkulator",
    "online kalkulator promila",
    "alkotest aparati Hrvatska",
    "testiranje alkohola Zagreb",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  authors: [{ name: "Dr. Promil" }],
  creator: "Dr. Promil",
  publisher: "Dr. Promil",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: baseUrl,
    siteName: "Dr. Promil",
    title: "Dr. Promil - Alkotest Aparati",
    description:
      "Testirajte razinu alkohola u krvi sa mojim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Promil - Alkotest Aparati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Promil - Alkotest Aparati i Besplatni Online Kalkulator Promila",
    description:
      "Testirajte razinu alkohola u krvi sa mojim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <head>
        {/* Critical inline CSS za brži LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --background: #ecfeff;
            --foreground: #475569;
            --primary: #164e63;
            --secondary: #10b981;
            --muted-foreground: #475569;
            --border: #cbd5e1;
          }
          html {
            scroll-behavior: smooth;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          body {
            background: #ecfeff;
            color: #475569;
            overflow-x: hidden;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          .skip-link {
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: #164e63;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 0 0 8px 8px;
            font-weight: 600;
            font-size: 16px;
            z-index: 9999;
          }
          .skip-link:focus {
            top: 0;
            outline: 4px solid #10b981;
          }
          img {
            content-visibility: auto;
          }
        `,
          }}
        />
        {/* Meta description - eksplicitno za Lighthouse */}
        <meta
          name="description"
          content="Testirajte razinu alkohola sa mojim alkotest aparatima u pubovima, klubovima i kafićima diljem Hrvatske. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom."
        />
        {/* Preconnect za eksterne resurse */}
        <link
          rel="preconnect"
          href="https://api.mapbox.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Preskoči na glavni sadržaj
        </a>
        <StructuredData />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
