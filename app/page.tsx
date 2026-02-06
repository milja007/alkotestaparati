import dynamic from "next/dynamic";
import HeaderSection from "../Kategorije/Header/HeaderSection";
import BubbleMenu from "../Kategorije/Navbar/BubbleMenu";

// Lazy load komponenti ispod fold-a za brži LCP
const OOmeni = dynamic(() => import("../Kategorije/Omeni/OOmeni"), {
  loading: () => null,
});
const Mapa = dynamic(() => import("../Kategorije/MojeLokacije/Mapa"), {
  loading: () => null,
});
const UsageInstructions = dynamic(
  () =>
    import("../Kategorije/UputeKorištenja/UputeKorištenja").then(
      (mod) => mod.UsageInstructions
    ),
  { loading: () => null }
);
const Info = dynamic(
  () =>
    import("../Kategorije/Informacije/Info").then((mod) => ({
      default: mod.Info,
    })),
  { loading: () => null }
);
const AlchotestKalkulator = dynamic(
  () => import("../Kategorije/Kalkulator/Kalkulator"),
  { loading: () => null }
);
const PostaniPartner = dynamic(
  () => import("../Kategorije/PostaniPartner/PostaniPartner"),
  { loading: () => null }
);
const ZapratiteMe = dynamic(
  () => import("@/Kategorije/ZapratiteMe/ZapratiteMe"),
  { loading: () => null }
);

export default function Home() {
  return (
    <>
      <BubbleMenu useFixedPosition={true} />
      <main id="main-content">
        <HeaderSection />
        <OOmeni />
        <Mapa />
        <UsageInstructions />
        <Info />
        <AlchotestKalkulator />
        <PostaniPartner />
        <ZapratiteMe />
      </main>
    </>
  );
}
