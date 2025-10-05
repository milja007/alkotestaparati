import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Dr Promil",
  description: "Aplikacija za upravljanje alkotest aparatima",
  icons: {
    icon: "/assets/DrLogoNew.webp",
    shortcut: "/assets/DrLogoNew.webp",
    apple: "/assets/DrLogoNew.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
