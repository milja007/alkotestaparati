import { Euro, Clock, Shield } from "lucide-react";
import styles from "./HeaderSection.module.css";
import Sova from "@/components/Sova";
import ClientComponent from "./ClientComponent";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <h1 className={styles.titleFirst}>Testiraj,</h1>
            <h1 className={styles.titleSecond}>nauči i odluči!</h1>
          </div>

          <div className={styles.sovaContainer}>
            <Sova imageName="DrLogoNew.webp" priority={true} />
          </div>

          <p className={styles.subtitle}>
            Ubaci kovanicu, puhni kao na dregeru i rezultat usporedi s našim
            online kalkulatorom. Bez nagađanja — samo brojke koje pomažu
            donijeti pametnu odluku.
          </p>
          {/* client component */}
          <ClientComponent />

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
