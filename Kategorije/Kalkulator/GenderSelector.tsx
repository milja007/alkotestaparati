"use client";

import styles from "./Kalkulator.module.css";

type Gender = "male" | "female";

interface GenderSelectorProps {
  gender: Gender | null;
  setGender: (gender: Gender) => void;
}

export default function GenderSelector({
  gender,
  setGender,
}: GenderSelectorProps) {
  return (
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
  );
}
