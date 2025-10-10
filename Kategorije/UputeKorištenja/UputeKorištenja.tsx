import Stepper, { Step } from "./Stepper";
import Image from "next/image";
import Sova from "../../components/Sova";

interface UsageInstructionsProps {
  productName?: string;
}

export function UsageInstructions({}: UsageInstructionsProps) {
  return (
    <section
      // scroll-mt: da anchor ne zapne ispod sticky headera
      // min-h: definira visinu sekcije (skalirano)
      // py: vertikalni ritam prema susjednim sekcijama
      className="
        relative isolate scroll-mt-24 bg-green-50
        py-24 md:py-28 lg:py-28
        min-h-[65svh] md:min-h-[70svh] 
        bg-gradient-to-br from-background via-card to-muted/50
      "
    >
      <div className="max-w-6xl mx-auto" id="UputeKorištenja">
        {/* Naslov */}
        <div className="text-center mb-12 md:mb-20 lg:mb-12">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
              Upute Korištenja
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </div>

        {/* Hard spacer na desktopu: garantira zračni prostor ispod naslova bez obzira što Stepper radi */}
        <div
          aria-hidden="true"
          className="hidden lg:block h-24 xl:h-28 2xl:h-32"
        />

        {/* Layout: maskota (lijevo) + stepper (desno) */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start
            relative !mt-0
            // daje gridu vlastitu visinu na velikim ekranima
            lg:min-h-[clamp(520px,58svh,860px)]
          "
        >
          {/* MASKOTA */}
          <aside
            className="
              order-1 lg:order-1
              lg:col-span-4
              flex justify-center lg:justify-start
            "
            aria-label="Maskota sekcije"
          >
            <div className="w-full max-w-sm">
              <Sova
                imageName="DrUpute.webp"
                className="w-full h-auto drop-shadow-xl rounded-2xl"
              />
            </div>
          </aside>

          {/* STEPPER */}
          <div className="order-2 lg:order-2 lg:col-span-8">
            {/* Wrapper dobiva min-h i relative da “uhvati” absolute elemente iznutra */}
            <div
              className="
                relative z-10 flex justify-center !mt-0
                min-h-[clamp(520px,60svh,820px)]
              "
            >
              <Stepper
                backButtonText="Nazad"
                nextButtonText="Dalje"
                finalContent={
                  <div className="step-default responsive-medium">
                    <div className="step-image-container">
                      <Image
                        src="/assets/completeKorak.webp"
                        alt="Finalni korak"
                        className="step-image stepper-image"
                        width={780}
                        height={780}
                        sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 780px"
                        priority
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "780px",
                          margin: "0 auto",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                }
              >
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
              </Stepper>
            </div>
          </div>
        </div>

        {/* Dno sekcije — čuva ritam prema idućoj sekciji na velikim ekranima */}
        <div
          aria-hidden="true"
          className="hidden lg:block h-12 xl:h-16 2xl:h-20"
        />
      </div>
    </section>
  );
}
