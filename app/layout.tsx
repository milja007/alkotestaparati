import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Promil - Alkotest Aparati i Besplatni Online Kalkulator Promila",
  description:
    "Testirajte razinu alkohola u krvi za samo 1-2€ na našim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila prije izlaska ili usporedite rezultate s aparatom.",
  openGraph: {
    title:
      "Dr. Promil - Alkotest Aparati i Besplatni Online Kalkulator Promila",
    description:
      "Testirajte razinu alkohola u krvi za samo 1-2€ na našim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Koristite besplatni online kalkulator promila prije izlaska ili usporedite rezultate s aparatom. Higijenski, brzo i precizno. Vlasnici lokala - pridružite se našem programu besplatno! Zajedno činimo noćni život odgovornijim.",
    type: "website",
    locale: "hr_HR",
    siteName: "Dr. Promil",
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
