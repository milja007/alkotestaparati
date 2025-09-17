import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alko Testić",
  description: "Aplikacija za upravljanje alkotest aparatima",
  icons: {
    icon: "/assets/location-pin.png",
    shortcut: "/assets/location-pin.png",
    apple: "/assets/location-pin.png",
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
