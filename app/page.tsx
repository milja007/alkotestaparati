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
      <div id="ONama">
        <ONama />
      </div>
      <div id="NašeLokacije">
        <Mapa />
      </div>
      <div id="UputeKorištenja">
        <UsageInstructions />
      </div>
      <div id="Informacije">
        <Info />
      </div>
      <div id="OnlineKalkulator">
        <AlchotestKalkulator />
      </div>
      <div id="PostaniPartner">
        <PartnerFooter />
      </div>
    </div>
  );
}
