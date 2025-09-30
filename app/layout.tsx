import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Dr Promil",
  description: "Aplikacija za upravljanje alkotest aparatima",
  icons: {
    icon: "/assets/DrPromilSvg.png",
    shortcut: "/assets/DrPromilSvg.png",
    apple: "/assets/DrPromilSvg.png",
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
