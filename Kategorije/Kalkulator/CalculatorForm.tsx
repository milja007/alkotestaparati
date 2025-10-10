"use client";

import { useMemo, useState } from "react";
import styles from "./Kalkulator.module.css";
import GenderSelector from "./GenderSelector";
import WeightInput from "./WeightInput";
import DrinkSelector from "./DrinkSelector";
import TimeInput from "./TimeInput";
import ResultsDisplay from "./ResultsDisplay";

/**
 * BAC (promile) kalkulator logika
 * Model: Widmarkova jednadžba
 */

// ---- Tipovi ----
type Gender = "male" | "female";

// ---- Konstante ----
const ETHANOL_DENSITY = 0.789; // g/mL
const KCAL_PER_GRAM_ALC = 7; // kcal po 1 g čistog alkohola
const R_VALUES: Record<Gender, number> = { male: 0.68, female: 0.55 };

// Default volumeni i jačine
const DEFAULTS = {
  beerMl: 500,
  beerPercent: 5,
  wineMl: 100,
  winePercent: 11,
  spiritMl: 30,
  spiritPercent: 35,
};

// ---- Util funkcije ----
function gramsOfAlcohol(volumeMl: number, percent: number): number {
  return volumeMl * (percent / 100) * ETHANOL_DENSITY;
}

function clamp(n: number, min = 0, max = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(n, min), max);
}

export default function CalculatorForm() {
  // State za sve ulaze
  const [gender, setGender] = useState<Gender | null>(null);
  const [weightKg, setWeightKg] = useState<number | "">("");

  const [beerCount, setBeerCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);
  const [spiritCount, setSpiritCount] = useState(0);

  const [timeSinceFirstDrinkHours, setTimeSinceFirstDrinkHours] = useState<
    number | ""
  >("");
  const [timeSinceFirstDrinkMinutes, setTimeSinceFirstDrinkMinutes] = useState<
    number | ""
  >("");

  // Fiksna brzina razgradnje alkohola
  const elimRate = 0.2; // ‰/h

  // Napredne postavke
  const [beerMl, setBeerMl] = useState(DEFAULTS.beerMl);
  const [beerPercent, setBeerPercent] = useState(DEFAULTS.beerPercent);
  const [wineMl, setWineMl] = useState(DEFAULTS.wineMl);
  const [winePercent, setWinePercent] = useState(DEFAULTS.winePercent);
  const [spiritMl, setSpiritMl] = useState(DEFAULTS.spiritMl);
  const [spiritPercent, setSpiritPercent] = useState(DEFAULTS.spiritPercent);

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
    return totalGrams / (r * (weightKg as number));
  }, [gender, weightKg, totalGrams]);

  const elapsedH = useMemo(() => {
    const hours =
      typeof timeSinceFirstDrinkHours === "number"
        ? timeSinceFirstDrinkHours
        : 0;
    const minutes =
      typeof timeSinceFirstDrinkMinutes === "number"
        ? timeSinceFirstDrinkMinutes
        : 0;
    return hours + minutes / 60;
  }, [timeSinceFirstDrinkHours, timeSinceFirstDrinkMinutes]);

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
    ((typeof timeSinceFirstDrinkHours === "number" &&
      timeSinceFirstDrinkHours >= 0) ||
      (typeof timeSinceFirstDrinkMinutes === "number" &&
        timeSinceFirstDrinkMinutes >= 0));

  const handleReset = () => {
    setGender(null);
    setWeightKg("");
    setBeerCount(0);
    setWineCount(0);
    setSpiritCount(0);
    setTimeSinceFirstDrinkHours("");
    setTimeSinceFirstDrinkMinutes("");
    setSubmitted(false);
    setBeerMl(DEFAULTS.beerMl);
    setBeerPercent(DEFAULTS.beerPercent);
    setWineMl(DEFAULTS.wineMl);
    setWinePercent(DEFAULTS.winePercent);
    setSpiritMl(DEFAULTS.spiritMl);
    setSpiritPercent(DEFAULTS.spiritPercent);
  };

  return (
    <div className={styles.mainGrid}>
      {/* Main Form */}
      <div className={styles.formSection}>
        <GenderSelector gender={gender} setGender={setGender} />

        <WeightInput weightKg={weightKg} setWeightKg={setWeightKg} />

        <DrinkSelector
          beerCount={beerCount}
          setBeerCount={setBeerCount}
          wineCount={wineCount}
          setWineCount={setWineCount}
          spiritCount={spiritCount}
          setSpiritCount={setSpiritCount}
          beerMl={beerMl}
          setBeerMl={setBeerMl}
          beerPercent={beerPercent}
          setBeerPercent={setBeerPercent}
          wineMl={wineMl}
          setWineMl={setWineMl}
          winePercent={winePercent}
          setWinePercent={setWinePercent}
          spiritMl={spiritMl}
          setSpiritMl={setSpiritMl}
          spiritPercent={spiritPercent}
          setSpiritPercent={setSpiritPercent}
          totalGrams={totalGrams}
          totalKcal={totalKcal}
          gramsOfAlcohol={gramsOfAlcohol}
        />

        <TimeInput
          timeSinceFirstDrinkHours={timeSinceFirstDrinkHours}
          setTimeSinceFirstDrinkHours={setTimeSinceFirstDrinkHours}
          timeSinceFirstDrinkMinutes={timeSinceFirstDrinkMinutes}
          setTimeSinceFirstDrinkMinutes={setTimeSinceFirstDrinkMinutes}
        />

        {/* Submit i Reset Buttons */}
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
            onClick={handleReset}
            className={styles.secondaryButton}
          >
            🔄 Reset
          </button>
        </section>
      </div>

      {/* Results Sidebar */}
      <div>
        {submitted && (
          <ResultsDisplay
            afterElimPermille={afterElimPermille}
            hoursToZero={hoursToZero}
            totalGrams={totalGrams}
            totalKcal={totalKcal}
            elimRate={elimRate}
            elapsedH={elapsedH}
            gender={gender}
            formatHoursToZero={formatHoursToZero}
          />
        )}
      </div>
    </div>
  );
}
