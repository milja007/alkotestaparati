import type { Metadata } from "next";
import "./globals.css";
import BubbleMenu from "../components/BubbleMenu";
import Image from "next/image";

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
      <body>
        <BubbleMenu
          logo={
            <Image
              src="/assets/alkotesticLogo.jpeg"
              alt="Alkotestic Logo"
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          }
          useFixedPosition={true}
          menuBg="#000000"
          menuContentColor="#ffffff"
        />
        {children}
      </body>
    </html>
  );
}
