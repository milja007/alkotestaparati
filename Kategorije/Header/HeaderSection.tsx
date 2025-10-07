import { Button } from "@/components/ui/button";
import { MapPin, Calculator, Euro, Clock, Shield } from "lucide-react";
import styles from "./HeaderSection.module.css";
import Sova from "@/components/Sova";

export default function HomePage() {
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
    <div className={styles.hero}>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <h1 className={styles.titleFirst}>Testiraj,</h1>
            <h1 className={styles.titleSecond}>nauči i odluči!</h1>
          </div>

          <div className={styles.sovaContainer}>
            <Sova imageName="DrLogoNew.webp" />
          </div>

          <p className={styles.subtitle}>
            Ubaci kovanicu, puhni kao na dregeru i rezultat usporedi s našim
            online kalkulatorom. Bez nagađanja — samo brojke koje pomažu
            donijeti pametnu odluku.
          </p>

          <div className={styles.ctaContainer}>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection("OnlineKalkulator")}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Naš Online kalkulator
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={() => scrollToSection("MojeLokacije")}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Moje lokacije
            </Button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Euro className={styles.featureIcon} />
              <span className={styles.featureText}>1 ili 2 € po testu</span>
            </div>
            <div className={styles.feature}>
              <Shield className={styles.featureIcon} />
              <span className={styles.featureText}>Higijenske slamke</span>
            </div>
            <div className={styles.feature}>
              <Clock className={styles.featureIcon} />
              <span className={styles.featureText}>
                Par sekundi do rezultata
              </span>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong className={styles.disclaimerStrong}>
                Rezultat je informativan.
              </strong>{" "}
              Nikad ne vozite pod utjecajem alkohola.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
