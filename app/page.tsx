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
      {/* Development Banner */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 9999,
          backgroundColor: "#ff6b6b",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
          fontSize: "24px",
          lineHeight: "1.5",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          ⚠️ STRANICA JE TRENUTNO U DEVELOPMENTU ⚠️
          <br />
          <span style={{ fontSize: "18px", fontWeight: "normal" }}>
            Molimo vas da se vratite za par dana. Hvala na razumijevanju!
          </span>
        </div>
      </div>
      <div style={{ marginTop: "120px" }}></div>

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
