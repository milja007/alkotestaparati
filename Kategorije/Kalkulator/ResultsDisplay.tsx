"use client";

import styles from "./Kalkulator.module.css";
import Sova from "@/components/Sova";
import StatCard from "./StatCard";

type Gender = "male" | "female";

const R_VALUES: Record<Gender, number> = { male: 0.68, female: 0.55 };

interface ResultsDisplayProps {
  afterElimPermille: number;
  hoursToZero: number;
  totalGrams: number;
  totalKcal: number;
  elimRate: number;
  elapsedH: number;
  gender: Gender | null;
  formatHoursToZero: (hours: number) => string;
}

export default function ResultsDisplay({
  afterElimPermille,
  hoursToZero,
  totalGrams,
  totalKcal,
  elimRate,
  elapsedH,
  gender,
  formatHoursToZero,
}: ResultsDisplayProps) {
  return (
    <div className={styles.resultsSticky}>
      <div className={styles.resultsCard}>
        <h2 className={styles.resultsTitle}>📊 Rezultat</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div className={styles.mainResult}>
            <Sova imageName="DrSurprised.avif" className="mx-auto" />
            <div className={styles.mainResultValue}>
              {afterElimPermille.toFixed(2)}
            </div>
            <div className={styles.mainResultLabel}>‰ trenutno</div>
          </div>

          <div className={styles.statsGrid}>
            <StatCard
              label="Do 0.0‰"
              value={formatHoursToZero(hoursToZero)}
              icon="⏰"
            />
            <StatCard
              label="Ukupno"
              value={`${totalGrams.toFixed(1)} g`}
              icon="🧮"
            />
          </div>

          <div className={styles.detailsCard}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Eliminacija:</span>
                <span className={styles.detailValue}>
                  {elimRate.toFixed(2)} ‰/h × {elapsedH.toFixed(2)} h
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Ukupno alkohola:</span>
                <span className={styles.detailValue}>
                  {totalGrams.toFixed(1)} g
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  Kalorije čistog alkohola:
                </span>
                <span className={styles.detailValue}>
                  {Math.round(totalKcal)} kcal
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Faktor (r):</span>
                <span className={styles.detailValue}>
                  {gender ? R_VALUES[gender].toFixed(2) : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.warningCard}>
            <div className={styles.warningContent}>
              <span className={styles.warningIcon}>⚠️</span>
              <div className={styles.warningText}>
                <p className={styles.warningTitle}>Važne napomene:</p>
                <ul className={styles.warningList}>
                  <li>
                    • Procjena može odstupati ovisno o hrani, zdravlju i
                    lijekovima
                  </li>
                  <li>
                    • Pričekajte 15+ minuta nakon zadnjeg pića za precizno
                    mjerenje sa našim aparatom.
                  </li>
                  <li>• Nikad ne vozite nakon konzumacije alkohola</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
