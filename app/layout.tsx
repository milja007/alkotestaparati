import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : null;
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || "https://www.drpromil.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Dr. Promil -Alkotest Aparati",
  description:
    "Testirajte razinu alkohola sa našim alkotest aparatima u pubovima, klubovima i kafićima diljem Hrvatskoj. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
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
  authors: [{ name: "Dr. Promil" }],
  creator: "Dr. Promil",
  publisher: "Dr. Promil",
  robots: {
    index: true,
    follow: true,
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
    title: "Dr. Promil -Alkotest Aparati",
    description:
      "Testirajte razinu alkohola u krvi sa našim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
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
      "Testirajte razinu alkohola u krvi sa našim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila nakon izlaska ili usporedite rezultate s aparatom.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Dodaj svoj Google Search Console verification kod ovdje
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
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
        {/* Preconnect za eksterne resurse */}
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        {/* Mapbox CSS */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StructuredData />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
