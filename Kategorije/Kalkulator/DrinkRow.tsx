"use client";

import styles from "./Kalkulator.module.css";

interface DrinkRowProps {
  emoji: string;
  title: string;
  gramsEach: number;
  count: number;
  setCount: (n: number) => void;
}

export default function DrinkRow({
  emoji,
  title,
  gramsEach,
  count,
  setCount,
}: DrinkRowProps) {
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
