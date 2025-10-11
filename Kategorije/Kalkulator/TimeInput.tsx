"use client";

import styles from "./Kalkulator.module.css";

interface TimeInputProps {
  timeSinceFirstDrinkHours: number | "";
  setTimeSinceFirstDrinkHours: (time: number | "") => void;
  timeSinceFirstDrinkMinutes: number | "";
  setTimeSinceFirstDrinkMinutes: (time: number | "") => void;
  showError?: boolean;
}

export default function TimeInput({
  timeSinceFirstDrinkHours,
  setTimeSinceFirstDrinkHours,
  timeSinceFirstDrinkMinutes,
  setTimeSinceFirstDrinkMinutes,
  showError = false,
}: TimeInputProps) {
  return (
    <section className={styles.glassCard}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.stepNumber}>4</span>
        Vremenski okvir
      </h2>
      <p className={styles.inputLabel}>
        Unesite vrijeme koje je prošlo od kada ste popili prvo piće
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
        }}
        className="sm:grid-cols-2"
      >
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="timeHours">
            Sati
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="timeHours"
              name="timeHours"
              type="text"
              inputMode="numeric"
              className={styles.input}
              placeholder="2"
              value={timeSinceFirstDrinkHours}
              onChange={(e) =>
                setTimeSinceFirstDrinkHours(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              autoComplete="off"
            />
            <span className={styles.inputUnit}>h</span>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="timeMinutes">
            Minute
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="timeMinutes"
              name="timeMinutes"
              type="text"
              inputMode="numeric"
              className={styles.input}
              placeholder="30"
              value={timeSinceFirstDrinkMinutes}
              onChange={(e) =>
                setTimeSinceFirstDrinkMinutes(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              autoComplete="off"
            />
            <span className={styles.inputUnit}>min</span>
          </div>
        </div>
      </div>
      {showError && (
        <p
          role="alert"
          aria-live="polite"
          style={{
            color: "#dc2626",
            fontSize: "0.875rem",
            marginTop: "0.5rem",
          }}
        >
          ⚠️ Molimo unesite važeće vrijeme (barem sati ili minute)
        </p>
      )}
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
          💡 Mjerenje unutar 15 minuta od zadnjeg pića može biti nepouzdano i
          često pokazuje više vrijednosti zbog zadržavanja alkohola u
          ustima(isto je i sa policijskim dregerom).
        </p>
      </div>
    </section>
  );
}
