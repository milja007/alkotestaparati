"use client";

import { useMemo, useState } from "react";
import styles from "./AlchotestKalkulator.module.css";

/**
 * BAC (promile) kalkulator — Next.js + TypeScript + Tailwind
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

// ---- Tipovi ----

type Gender = "male" | "female";

// ---- Konstante ----

const ETHANOL_DENSITY = 0.789; // g/mL
const KCAL_PER_GRAM_ALC = 7; // kcal po 1 g čistog alkohola
const R_VALUES: Record<Gender, number> = { male: 0.68, female: 0.55 };

// Default volumeni i jačine
const DEFAULTS = {
  beerMl: 500, // 0.5 L
  beerPercent: 5,
  wineMl: 100, // 1 dL
  winePercent: 11,
  spiritMl: 30, // 0.03 L (3 cL)
  spiritPercent: 35,
};

// ---- Util funkcije ----

function gramsOfAlcohol(volumeMl: number, percent: number): number {
  return volumeMl * (percent / 100) * ETHANOL_DENSITY; // g
}

function clamp(n: number, min = 0, max = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(n, min), max);
}

export default function AlchotestKalkulator() {
  // Ulazi
  const [gender, setGender] = useState<Gender | null>(null);
  const [weightKg, setWeightKg] = useState<number | "">("");

  const [beerCount, setBeerCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);
  const [spiritCount, setSpiritCount] = useState(0);

  const [timeSinceFirstDrinkH, setTimeSinceFirstDrinkH] = useState<number | "">(
    ""
  );

  // Razgradnja alkohola (‰/h) — samo 0.10 (sporije) i 0.20 (brže)
  const [elimRate, setElimRate] = useState(0.1);

  // Napredne postavke volumena/postotka (prilagodivo)
  const [beerMl, setBeerMl] = useState(DEFAULTS.beerMl);
  const [beerPercent, setBeerPercent] = useState(DEFAULTS.beerPercent);
  const [wineMl, setWineMl] = useState(DEFAULTS.wineMl);
  const [winePercent, setWinePercent] = useState(DEFAULTS.winePercent);
  const [spiritMl, setSpiritMl] = useState(DEFAULTS.spiritMl);
  const [spiritPercent, setSpiritPercent] = useState(DEFAULTS.spiritPercent);

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Izračuni
  const totalGrams = useMemo(() => {
    const gBeer = beerCount * gramsOfAlcohol(beerMl, beerPercent);
    const gWine = wineCount * gramsOfAlcohol(wineMl, winePercent);
    const gSpirit = spiritCount * gramsOfAlcohol(spiritMl, spiritPercent);
    return gBeer + gWine + gSpirit;
  }, [
    beerCount,
    wineCount,
    spiritCount,
    beerMl,
    beerPercent,
    wineMl,
    winePercent,
    spiritMl,
    spiritPercent,
  ]);

  const totalKcal = useMemo(() => totalGrams * KCAL_PER_GRAM_ALC, [totalGrams]);

  const initialBACpermille = useMemo(() => {
    if (!gender || !weightKg || weightKg <= 0) return 0;
    const r = R_VALUES[gender];
    // Widmark u promilima (‰): C0 ≈ A (g) / (r * masa(kg))
    return totalGrams / (r * (weightKg as number));
  }, [gender, weightKg, totalGrams]);

  const elapsedH =
    typeof timeSinceFirstDrinkH === "number" ? timeSinceFirstDrinkH : 0;
  const afterElimPermille = clamp(initialBACpermille - elimRate * elapsedH, 0);

  const hoursToZero = afterElimPermille > 0 ? afterElimPermille / elimRate : 0;

  // Formatiraj sate i minute
  const formatHoursToZero = (hours: number): string => {
    if (hours === 0) return "0 min";
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (wholeHours === 0) {
      return `${minutes} min`;
    } else if (minutes === 0) {
      return `${wholeHours} sat${
        wholeHours === 1 ? "" : wholeHours < 5 ? "a" : "i"
      }`;
    } else {
      return `${wholeHours} sat${
        wholeHours === 1 ? "" : wholeHours < 5 ? "a" : "i"
      } ${minutes} min`;
    }
  };

  const formValid =
    gender !== null &&
    typeof weightKg === "number" &&
    weightKg > 0 &&
    beerCount + wineCount + spiritCount > 0 &&
    typeof timeSinceFirstDrinkH === "number" &&
    timeSinceFirstDrinkH >= 0;

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Kalkulator Promila</h1>
          <p className={styles.heroSubtitle}>
            Moderna procjena razine alkohola u krvi pomoću Widmarkove jednadžbe
          </p>
          <div className={styles.heroWarning}>
            <p>⚠️ Samo za procjenu • Ne koristiti za vožnju</p>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Main Form */}
          <div className={styles.formSection}>
            {/* 1) Spol */}
            <section className={styles.glassCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNumber}>1</span>
                Spol
              </h2>
              <div className={styles.genderGrid}>
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`${styles.genderButton} ${
                    gender === "male" ? styles.selected : ""
                  }`}
                  aria-pressed={gender === "male"}
                >
                  <div className={styles.genderContent}>
                    <span className={styles.genderEmoji}>👨</span>
                    <div className={styles.genderText}>
                      <div className={styles.genderTitle}>Muškarac</div>
                      <div className={styles.genderSubtitle}>Faktor: 0.68</div>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`${styles.genderButton} ${
                    gender === "female" ? styles.selected : ""
                  }`}
                  aria-pressed={gender === "female"}
                >
                  <div className={styles.genderContent}>
                    <span className={styles.genderEmoji}>👩</span>
                    <div className={styles.genderText}>
                      <div className={styles.genderTitle}>Žena</div>
                      <div className={styles.genderSubtitle}>Faktor: 0.55</div>
                    </div>
                  </div>
                </button>
              </div>
            </section>

            {/* 2) Težina */}
            <section className={styles.glassCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNumber}>2</span>
                Težina
              </h2>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="weightKg">
                  Tjelesna težina
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="weightKg"
                    type="number"
                    min={1}
                    inputMode="decimal"
                    className={styles.input}
                    placeholder="75"
                    value={weightKg}
                    onChange={(e) =>
                      setWeightKg(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                  <span className={styles.inputUnit}>kg</span>
                </div>
              </div>
            </section>

            {/* 3) Pića */}
            <section className={styles.glassCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNumber}>3</span>
                Konzumirana pića
              </h2>
              <p className={styles.inputLabel}>
                Odaberite broj pića koje ste konzumirali. Možete prilagoditi
                volumen i jačinu u naprednim postavkama.
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
                      transform: advancedOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
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
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      textAlign: "center",
                    }}
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
                        Kalorije
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 4) Vrijeme */}
            <section className={styles.glassCard}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNumber}>4</span>
                Vremenski okvir
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                }}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="elapsedH">
                    Vrijeme od prvog pića
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="elapsedH"
                      type="number"
                      min={0}
                      step={0.25}
                      className={styles.input}
                      placeholder="2.5"
                      value={timeSinceFirstDrinkH}
                      onChange={(e) =>
                        setTimeSinceFirstDrinkH(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                    <span className={styles.inputUnit}>h</span>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="elim">
                    Brzina razgradnje
                  </label>
                  <select
                    id="elim"
                    className={styles.input}
                    value={elimRate}
                    onChange={(e) => setElimRate(Number(e.target.value))}
                  >
                    <option value={0.1}>0.10 ‰/h (sporije)</option>
                    <option value={0.2}>0.20 ‰/h (brže)</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  💡 Mjerenje unutar 15 minuta od zadnjeg pića može biti
                  nepouzdano i često pokazuje više vrijednosti.
                </p>
              </div>
            </section>

            {/* 5) Submit */}
            <section className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                disabled={!formValid}
                className={styles.primaryButton}
              >
                🧮 Izračunaj promile
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender(null);
                  setWeightKg("");
                  setBeerCount(0);
                  setWineCount(0);
                  setSpiritCount(0);
                  setTimeSinceFirstDrinkH("");
                  setElimRate(0.1);
                  setAdvancedOpen(false);
                  setSubmitted(false);
                  setBeerMl(DEFAULTS.beerMl);
                  setBeerPercent(DEFAULTS.beerPercent);
                  setWineMl(DEFAULTS.wineMl);
                  setWinePercent(DEFAULTS.winePercent);
                  setSpiritMl(DEFAULTS.spiritMl);
                  setSpiritPercent(DEFAULTS.spiritPercent);
                }}
                className={styles.secondaryButton}
              >
                🔄 Reset
              </button>
            </section>
          </div>

          {/* Results Sidebar */}
          <div>
            {submitted && (
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
                          <span className={styles.detailLabel}>
                            Eliminacija:
                          </span>
                          <span className={styles.detailValue}>
                            {elimRate.toFixed(2)} ‰/h × {elapsedH.toFixed(2)} h
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            Ukupno alkohola:
                          </span>
                          <span className={styles.detailValue}>
                            {totalGrams.toFixed(1)} g
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Kalorije:</span>
                          <span className={styles.detailValue}>
                            {Math.round(totalKcal)} kcal
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            Faktor (r):
                          </span>
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
                              • Procjena može odstupati ovisno o hrani, zdravlju
                              i lijekovima
                            </li>
                            <li>
                              • Pričekajte 15+ minuta nakon zadnjeg pića za
                              pouzdanije mjerenje
                            </li>
                            <li>
                              • Nikad ne vozite nakon konzumacije alkohola
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Podkomponente ----

function DrinkRow({
  emoji,
  title,
  gramsEach,
  count,
  setCount,
}: {
  emoji: string;
  title: string;
  gramsEach: number;
  count: number;
  setCount: (n: number) => void;
}) {
  return (
    <div className={styles.drinkRow}>
      <div className={styles.drinkContent}>
        <div className={styles.drinkInfo}>
          <span className={styles.drinkEmoji}>{emoji}</span>
          <div>
            <div className={styles.drinkTitle}>{title}</div>
            <div className={styles.drinkSubtitle}>
              ≈ {gramsEach.toFixed(1)} g po piću
            </div>
          </div>
        </div>
        <div className={styles.drinkControls}>
          <button
            type="button"
            onClick={() => setCount(Math.max(0, count - 1))}
            className={styles.drinkButton}
            aria-label="Smanji"
          >
            −
          </button>
          <div className={styles.drinkCount}>{count}</div>
          <button
            type="button"
            onClick={() => setCount(count + 1)}
            className={styles.drinkButton}
            aria-label="Povećaj"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function VolumePercentRow({
  label,
  ml,
  setMl,
  percent,
  setPercent,
  quickMl = [],
}: {
  label: string;
  ml: number;
  setMl: (n: number) => void;
  percent: number;
  setPercent: (n: number) => void;
  quickMl?: number[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <h4 style={{ fontWeight: "600", fontSize: "1.125rem" }}>{label}</h4>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Volumen (mL)
          </label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              type="number"
              min={1}
              style={{
                width: "100%",
                borderRadius: "0.75rem",
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(10px)",
                border: "2px solid transparent",
                padding: "0.75rem",
                fontWeight: "600",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              value={ml}
              onChange={(e) => setMl(Number(e.target.value))}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {quickMl.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setMl(q)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.5rem",
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid transparent",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Jačina (%)
          </label>
          <input
            type="number"
            min={0}
            step={0.1}
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              border: "2px solid transparent",
              padding: "0.75rem",
              fontWeight: "600",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}
