"use client";

import { Button } from "@/components/ui/button";

const MainContentClient = () => {
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
    <div className="space-y-6">
      <div className="text-lg lg:text-xl text-foreground leading-relaxed">
        <span className="font-semibold text-primary">
          Ja sam dr. Promil i sova sam koja čini noćni život odgovornijim.
        </span>{" "}
        Postavljam svoje alkotest aparate u ugostiteljske objekte diljem
        Hrvatske — pogledajte
        <Button
          size="sm"
          className="ml-2 bg-gradient-to-r from-primary to-primary/80 lg:hover:from-primary/90 lg:hover:to-primary text-primary-foreground shadow-lg lg:hover:shadow-xl transition-all duration-300 transform lg:hover:scale-105"
          onClick={() => scrollToSection("MojeLokacije")}
        >
          Moje lokacije
        </Button>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Dovoljan je jedan aparat u vašem lokalu da gosti u trenu donesu pravu
        odluku. Aparat je uvijek spreman i jednostavan, a redovno servisiran i
        kalibriran.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Dobivate kompletno rješenje &quot;ključ u ruke&quot; i transparentnu
        podjelu zarade — besplatno i bez brige oko održavanja.
      </p>

      <div className="text-lg text-foreground leading-relaxed">
        <span className="font-semibold text-secondary">
          Imate kafić, pub ili restoran?
        </span>{" "}
        Kliknite gumb
        <Button
          size="sm"
          variant="outline"
          className="ml-2 border-2 border-secondary text-secondary lg:hover:bg-secondary lg:hover:text-secondary-foreground shadow-lg lg:hover:shadow-xl transition-all duration-300 transform lg:hover:scale-105 bg-transparent"
          onClick={() => scrollToSection("PostaniPartner")}
        >
          Postanite moj partner
        </Button>{" "}
        i kontaktirajte me.
      </div>
    </div>
  );
};

export default MainContentClient;
