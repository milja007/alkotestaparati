import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Dr Promil",
  description: "Aplikacija za upravljanje alkotest aparatima",
  icons: {
    icon: "/assets/DrPromilLogoWithTitle.webp",
    shortcut: "/assets/DrPromilLogoWithTitle.webp",
    apple: "/assets/DrPromilLogoWithTitle.webp",
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
