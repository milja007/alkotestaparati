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
      {/* Development Overlay - Blokira cijelu stranicu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          zIndex: 99999,
          backgroundColor: "#1a1a1a",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center",
          cursor: "not-allowed",
          userSelect: "none",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "40px",
            backgroundColor: "#ff6b6b",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            ⚠️
          </div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: "1.3",
            }}
          >
            STRANICA JE TRENUTNO U DEVELOPMENTU
          </h1>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "normal",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Molimo vas da se vratite za par dana.
            <br />
            Hvala na razumijevanju!
          </p>
        </div>
      </div>

      {/* Sakriveni sadržaj - neće se vidjeti zbog overlay-a */}
      <div style={{ display: "none" }}>
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
      </div>
    </>
  );
}
