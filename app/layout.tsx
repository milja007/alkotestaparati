import type { Metadata } from "next";
import "./globals.css";
import BubbleMenu from "../components/BubbleMenu";

export const metadata: Metadata = {
  title: "Alkotest Aparati",
  description: "Aplikacija za upravljanje alkotest aparatima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body>
        <BubbleMenu
          logo="Alkotest Aparati"
          useFixedPosition={true}
          menuBg="#000000"
          menuContentColor="#ffffff"
        />
        {children}
      </body>
    </html>
  );
}
