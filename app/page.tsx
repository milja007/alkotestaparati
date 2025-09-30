"use client";

import AlchotestKalkulator from "../Kategorije/Kalkulator/Kalkulator";
import { Info } from "../Kategorije/Informacije/Info";
import PartnerFooter from "../Kategorije/PostaniPartner/PartnerFooter";
import HeaderSection from "../Kategorije/Header/HeaderSection";
import BubbleMenu from "../Kategorije/Navbar/BubbleMenu";
import ONama from "../Kategorije/Onama/ONama";
import Mapa from "../Kategorije/NašeLokacije/Mapa";
import { UsageInstructions } from "../Kategorije/UputeKorištenja/UputeKorištenja";

export default function Home() {
  return (
    <div>
      <BubbleMenu />
      <HeaderSection />
      <ONama />
      <Mapa />
      <UsageInstructions />
      <Info />
      <AlchotestKalkulator />
      <PartnerFooter />
    </div>
  );
}
