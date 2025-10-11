import styles from "./Kalkulator.module.css";
import Sova from "@/components/Sova";
import CalculatorForm from "./CalculatorForm";

/**
 *
 * Model: Widmarkova jednadžba.
 *  - Raspodjelni faktor (r): ~0.68 muškarci, ~0.55 žene
 *  - Gustoća etanola: 0.789 g/mL
 *  - Eliminacija: 0.10–0.20 ‰ po satu (odaberivo)
 *  - Pretpostavljeni volumeni (mogu se prilagoditi u "Napredne postavke"):
 *      • Pivo: 500 mL  5%
 *      • Vino: 100 mL  11%
 *      • Jako piće: 30 mL  35% (rakija/viski)
 *
 * Napomena: Radi se o procjeni. Ne koristiti za medicinsku ili pravnu odluku. Nikad ne vozite nakon konzumacije alkohola.
 */

export default function AlchotestKalkulator() {
  return (
    <div id="OnlineKalkulator" className={styles.container}>
      <div className={styles.maxWidth}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Dr. Promil Online Alkotest Kalkulator
          </h1>
          <Sova imageName="DrKalkulator.avif" className="mx-auto" />
          <p className={styles.heroSubtitle}>
            Moderna procjena razine alkohola u krvi pomoću Widmarkove jednadžbe
            za usporedbu sa mojim aparatom.
          </p>
          <div className={styles.heroWarning}>
            <p>⚠️ Samo za procjenu • Ne koristiti za vožnju</p>
          </div>
        </div>

        {/* Calculator Form - Client Component */}
        <CalculatorForm />
      </div>
    </div>
  );
}
