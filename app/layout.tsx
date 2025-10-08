import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr Promil",
  description: "Aplikacija za upravljanje alkotest aparatima",
  icons: {
    icon: "/assets/DrGlava.webp",
    shortcut: "/assets/DrGlava.webp",
    apple: "/assets/DrGlava.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
