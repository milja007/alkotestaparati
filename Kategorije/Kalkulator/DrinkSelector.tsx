"use client";

import { useState } from "react";
import styles from "./Kalkulator.module.css";
import DrinkRow from "./DrinkRow";
import VolumePercentRow from "./VolumePercentRow";

interface DrinkSelectorProps {
  beerCount: number;
  setBeerCount: (count: number) => void;
  wineCount: number;
  setWineCount: (count: number) => void;
  spiritCount: number;
  setSpiritCount: (count: number) => void;
  beerMl: number;
  setBeerMl: (ml: number) => void;
  beerPercent: number;
  setBeerPercent: (percent: number) => void;
  wineMl: number;
  setWineMl: (ml: number) => void;
  winePercent: number;
  setWinePercent: (percent: number) => void;
  spiritMl: number;
  setSpiritMl: (ml: number) => void;
  spiritPercent: number;
  setSpiritPercent: (percent: number) => void;
  totalGrams: number;
  totalKcal: number;
  gramsOfAlcohol: (volumeMl: number, percent: number) => number;
}

export default function DrinkSelector({
  beerCount,
  setBeerCount,
  wineCount,
  setWineCount,
  spiritCount,
  setSpiritCount,
  beerMl,
  setBeerMl,
  beerPercent,
  setBeerPercent,
  wineMl,
  setWineMl,
  winePercent,
  setWinePercent,
  spiritMl,
  setSpiritMl,
  spiritPercent,
  setSpiritPercent,
  totalGrams,
  totalKcal,
  gramsOfAlcohol,
}: DrinkSelectorProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <section className={styles.glassCard}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.stepNumber}>3</span>
        Konzumirana pića
      </h2>
      <p className={styles.inputLabel}>
        Odaberite broj pića koje ste konzumirali. Možete prilagoditi volumen i
        jačinu u naprednim postavkama.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <DrinkRow
          emoji="🍺"
          title={`Pivo (${beerMl} mL • ${beerPercent}%)`}
          gramsEach={gramsOfAlcohol(beerMl, beerPercent)}
          count={beerCount}
          setCount={setBeerCount}
        />
        <DrinkRow
          emoji="🍷"
          title={`Vino (${wineMl} mL • ${winePercent}%)`}
          gramsEach={gramsOfAlcohol(wineMl, winePercent)}
          count={wineCount}
          setCount={setWineCount}
        />
        <DrinkRow
          emoji="🥃"
          title={`Žestoko piće (${spiritMl} mL • ${spiritPercent}%)`}
          gramsEach={gramsOfAlcohol(spiritMl, spiritPercent)}
          count={spiritCount}
          setCount={setSpiritCount}
        />
      </div>

      {/* Napredne postavke */}
      <div style={{ marginTop: "2rem" }}>
        <button
          type="button"
          onClick={() => setAdvancedOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--color-primary)",
            fontWeight: "500",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
        >
          <svg
            style={{
              width: "1rem",
              height: "1rem",
              transition: "transform 0.3s ease",
              transform: advancedOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {advancedOpen
            ? "Sakrij napredne postavke"
            : "Prikaži napredne postavke"}
        </button>
        {advancedOpen && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "1rem",
            }}
          >
            <VolumePercentRow
              label="Pivo"
              ml={beerMl}
              setMl={setBeerMl}
              percent={beerPercent}
              setPercent={setBeerPercent}
              quickMl={[300, 500, 1000]}
            />
            <VolumePercentRow
              label="Vino"
              ml={wineMl}
              setMl={setWineMl}
              percent={winePercent}
              setPercent={setWinePercent}
              quickMl={[100, 150, 200]}
            />
            <VolumePercentRow
              label="Žestoko piće"
              ml={spiritMl}
              setMl={setSpiritMl}
              percent={spiritPercent}
              setPercent={setSpiritPercent}
              quickMl={[20, 30, 100]}
            />
          </div>
        )}
      </div>

      {/* Sažetak */}
      {totalGrams > 0 && (
        <div
          style={{
            marginTop: "1.5rem",
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1rem",
              textAlign: "center",
            }}
            className="sm:grid-cols-2"
          >
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "var(--color-primary)",
                }}
              >
                {totalGrams.toFixed(1)}g
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-muted-foreground)",
                }}
              >
                Ukupno alkohola
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "var(--color-secondary)",
                }}
              >
                {Math.round(totalKcal)}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-muted-foreground)",
                }}
              >
                Kalorije čistog alkohola(7kcal/g)
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
