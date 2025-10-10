"use client";

import styles from "./Kalkulator.module.css";

interface WeightInputProps {
  weightKg: number | "";
  setWeightKg: (weight: number | "") => void;
}

export default function WeightInput({
  weightKg,
  setWeightKg,
}: WeightInputProps) {
  return (
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
            name="weightKg"
            type="text"
            inputMode="decimal"
            className={styles.input}
            placeholder="75"
            value={weightKg}
            onChange={(e) =>
              setWeightKg(e.target.value === "" ? "" : Number(e.target.value))
            }
            autoComplete="off"
          />
          <span className={styles.inputUnit}>kg</span>
        </div>
      </div>
    </section>
  );
}
