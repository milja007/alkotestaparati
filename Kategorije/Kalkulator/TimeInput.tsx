"use client";

import styles from "./Kalkulator.module.css";

interface TimeInputProps {
  timeSinceFirstDrinkHours: number | "";
  setTimeSinceFirstDrinkHours: (time: number | "") => void;
  timeSinceFirstDrinkMinutes: number | "";
  setTimeSinceFirstDrinkMinutes: (time: number | "") => void;
}

export default function TimeInput({
  timeSinceFirstDrinkHours,
  setTimeSinceFirstDrinkHours,
  timeSinceFirstDrinkMinutes,
  setTimeSinceFirstDrinkMinutes,
}: TimeInputProps) {
  return (
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
          <fieldset>
            <legend className={styles.inputLabel}>Vrijeme od prvog pića</legend>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
              className="sm:grid-cols-2"
            >
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
          </fieldset>
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
          💡 Mjerenje unutar 15 minuta od zadnjeg pića može biti nepouzdano i
          često pokazuje više vrijednosti zbog zadržavanja alkohola u
          ustima(isto je i sa policijskim dregerom).
        </p>
      </div>
    </section>
  );
}
