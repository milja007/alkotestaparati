"use client";

import AlchotestKalkulator from "../komponente/AlchotestKalkulator";
import { Info } from "../komponente/Info";
import PartnerFooter from "../komponente/PartnerFooter";
import HeaderSection from "../komponente/HeaderSection";
import BubbleMenu from "../components/BubbleMenu";
import ONama from "../komponente/ONama";
import Mapa from "../komponente/Mapa";
import { UsageInstructions } from "../komponente/UputeKorištenja";
export default function Home() {
  return (
    <div>
      <BubbleMenu />
      <HeaderSection />
      <ONama />
      <Mapa />
      <UsageInstructions />

      {/* Sekcija 4: Informacije o alkoholu i kalkulator */}

      <Info />
      <AlchotestKalkulator />

      {/* Sekcija 6: Kontakt i Partnerstvo */}
      <section
        id="partner-section"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <PartnerFooter />
      </section>
    </div>
  );
}
