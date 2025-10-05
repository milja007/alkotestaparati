import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sova from "@/components/Sova";

export default function ONamaPage() {
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div
      id="OOmeni"
      className="min-h-screen bg-gradient-to-br from-background via-card to-muted"
    >
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Title */}
            <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-20">
              <div className="space-y-4 text-center xl:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                  O meni
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto xl:mx-0"></div>
              </div>
              <div className="hidden xl:block">
                <Sova imageName="DrOmeni.webp" />
              </div>
            </div>

            {/* Sova for smaller screens - shown below title */}
            <div className="flex justify-center xl:hidden">
              <Sova imageName="DrOmeni.webp" />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                <span className="font-semibold text-primary">
                  Ja sam dr. Promil i sova sam koja čini noćni život
                  odgovornijim.
                </span>{" "}
                Postavljam svoje alkotest aparate u ugostiteljske objekte diljem
                Hrvatske — pogledajte
                <Button
                  size="sm"
                  className="ml-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => scrollToSection("MojeLokacije")}
                >
                  Moje lokacije
                </Button>
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Dovoljan je jedan aparat u vašem lokalu da gosti u trenu donesu
                pravu odluku. Aparat je uvijek spreman i jednostavan, a redovno
                servisiran i kalibriran.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Dobivate kompletno rješenje &quot;ključ u ruke&quot; i
                transparentnu podjelu zarade — besplatno i bez brige oko
                održavanja.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                <span className="font-semibold text-secondary">
                  Imate kafić, pub ili restoran?
                </span>{" "}
                Kliknite gumb
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
                  onClick={() => scrollToSection("PostaniPartner")}
                >
                  Postanite moj partner
                </Button>{" "}
                i kontaktirajte me.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-card to-accent/10 rounded-3xl p-8 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10"></div>

              {/* Main image container */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                <Image
                  src="/assets/BunkerAparat.webp"
                  alt="Aparat za mjerenje alkohola"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />

                <div className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Kalibriran
                </div>
              </div>

              {/* Feature highlights */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Korisno</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">200%</div>
                  <div className="text-sm text-muted-foreground">Zabavno</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
