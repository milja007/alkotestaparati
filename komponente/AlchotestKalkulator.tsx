"use client";

import { useMemo, useState } from "react";

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
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-1">Kalkulator promila (procjena)</h1>

      {/* 1) Spol */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1) Spol</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`rounded-2xl border p-4 transition hover:shadow ${
              gender === "male"
                ? "border-blue-500 ring-2 ring-blue-500"
                : "border-gray-700"
            }`}
            aria-pressed={gender === "male"}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">👨</span>
              <div>
                <div className="font-medium">Muškarac</div>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`rounded-2xl border p-4 transition hover:shadow ${
              gender === "female"
                ? "border-pink-500 ring-2 ring-pink-500"
                : "border-gray-700"
            }`}
            aria-pressed={gender === "female"}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">👩</span>
              <div>
                <div className="font-medium">Žena</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 2) Težina */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2) Težina</h2>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label
              className="block text-sm text-gray-300 mb-1"
              htmlFor="weightKg"
            >
              Težina (kg)
            </label>
            <input
              id="weightKg"
              type="number"
              min={1}
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-700 bg-black/30 p-3 outline-none focus:border-gray-500"
              placeholder="npr. 75"
              value={weightKg}
              onChange={(e) =>
                setWeightKg(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
        </div>
      </section>

      {/* 3) Pića */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3) Pića</h2>
        <p className="text-xs text-gray-400 mb-3">
          Kliknite +/− za broj pića. Volumen i jačinu možete prilagoditi u
          &ldquo;Napredne postavke&rdquo;.
        </p>
        <div className="grid gap-3">
          <DrinkRow
            emoji="🍺"
            title={`Pivo (${beerMl} mL  ${beerPercent}% )`}
            gramsEach={gramsOfAlcohol(beerMl, beerPercent)}
            count={beerCount}
            setCount={setBeerCount}
          />
          <DrinkRow
            emoji="🍷"
            title={`Vino (${wineMl} mL  ${winePercent}% )`}
            gramsEach={gramsOfAlcohol(wineMl, winePercent)}
            count={wineCount}
            setCount={setWineCount}
          />
          <DrinkRow
            emoji="🥃"
            title={`Jako piće (${spiritMl} mL  ${spiritPercent}% )`}
            gramsEach={gramsOfAlcohol(spiritMl, spiritPercent)}
            count={spiritCount}
            setCount={setSpiritCount}
          />
        </div>

        {/* Napredne postavke */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            className="text-sm underline text-gray-300 hover:text-white"
          >
            {advancedOpen
              ? "Sakrij napredne postavke"
              : "Prikaži napredne postavke"}
          </button>
          {advancedOpen && (
            <div className="mt-3 grid gap-4 rounded-2xl border border-gray-800 p-4">
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
                label="Jako piće"
                ml={spiritMl}
                setMl={setSpiritMl}
                percent={spiritPercent}
                setPercent={setSpiritPercent}
                quickMl={[20, 30, 100]}
              />
            </div>
          )}
        </div>

        {/* Sažetak grama + kalorije */}
        <div className="mt-4 text-sm text-gray-300 space-y-0.5">
          <div>
            Ukupno procijenjenih grama alkohola (7 kcal/g za fitness fanatike):{" "}
            <span className="font-semibold"> {totalGrams.toFixed(1)} g</span>
          </div>
          <div>
            ≈ Kalorije iz čistog alkohola:
            <span className="font-semibold"> {Math.round(totalKcal)} kcal</span>
          </div>
        </div>
      </section>

      {/* 4) Vrijeme */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">4) Vrijeme</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm text-gray-300 mb-1"
              htmlFor="elapsedH"
            >
              Vrijeme od prvog pića (h)
            </label>
            <input
              id="elapsedH"
              type="number"
              min={0}
              step={0.25}
              className="w-full rounded-xl border border-gray-700 bg-black/30 p-3 outline-none focus:border-gray-500"
              placeholder="npr. 2.5"
              value={timeSinceFirstDrinkH}
              onChange={(e) =>
                setTimeSinceFirstDrinkH(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-300 mb-1" htmlFor="elim">
            Brzina razgradnje (‰/h)
          </label>
          <div className="flex items-center gap-2">
            <select
              id="elim"
              className="rounded-xl border border-gray-700 bg-black/30 p-2"
              value={elimRate}
              onChange={(e) => setElimRate(Number(e.target.value))}
            >
              <option value={0.1}>0.10 ‰/h (sporije)</option>
              <option value={0.2}>0.20 ‰/h (brže)</option>
            </select>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Napomena: Mjerenje unutar 15 minuta od zadnjeg pića je nepouzdano i
            često pokazuje više vrijednosti.
          </p>
        </div>
      </section>

      {/* 5) Submit */}
      <section className="mb-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!formValid}
            className="rounded-xl bg-white/10 px-5 py-3 font-semibold backdrop-blur transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Izračunaj
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
            className="rounded-xl border border-gray-700 px-5 py-3 font-semibold text-gray-200 hover:bg-white/5"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Rezultat */}
      {submitted && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Rezultat</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Procjena sada (‰)"
              value={afterElimPermille.toFixed(2)}
              highlight
            />
            <StatCard
              label="Početno (‰)"
              value={initialBACpermille.toFixed(2)}
            />
            <StatCard label="Do 0.0‰" value={formatHoursToZero(hoursToZero)} />
          </div>

          <ul className="mt-4 space-y-1 text-sm text-gray-300">
            <li>
              • Eliminacija računa: {elimRate.toFixed(2)} ‰/h ×{" "}
              {elapsedH.toFixed(2)} h
            </li>
            <li>
              • Ukupno alkohola: {totalGrams.toFixed(1)} g (
              {Math.round(totalKcal)} kcal)
            </li>
            <li>
              • Faktor raspodjele (r):{" "}
              {gender ? R_VALUES[gender].toFixed(2) : "—"}
            </li>
          </ul>

          <div className="mt-4 rounded-2xl border border-gray-800 p-4 text-sm text-gray-300">
            <p className="mb-2 font-semibold">Važno:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Ovo je procjena i može odstupati (hrana, zdravlje, lijekovi,
                tempo konzumacije).
              </li>
              <li>
                Za pouzdanije mjerenje pričekajte barem 15 minuta nakon zadnjeg
                pića.
              </li>
            </ul>
          </div>
        </section>
      )}
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
    <div className="flex items-center justify-between rounded-2xl border border-gray-800 p-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-400">
            ≈ {gramsEach.toFixed(1)} g po piću
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCount(Math.max(0, count - 1))}
          className="h-9 w-9 rounded-lg border border-gray-700 text-xl leading-none hover:bg-white/5"
          aria-label="Smanji"
        >
          −
        </button>
        <div className="min-w-[2.5rem] text-center font-semibold">{count}</div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="h-9 w-9 rounded-lg border border-gray-700 text-xl leading-none hover:bg-white/5"
          aria-label="Povećaj"
        >
          +
        </button>
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
    <div className="grid md:grid-cols-2 gap-3">
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          {label} — volumen (mL)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            className="w-full rounded-xl border border-gray-700 bg-black/30 p-2 outline-none focus:border-gray-500"
            value={ml}
            onChange={(e) => setMl(Number(e.target.value))}
          />
          {quickMl.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setMl(q)}
              className="rounded-lg border border-gray-700 px-3 text-sm hover:bg-white/5"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          {label} — jačina (%)
        </label>
        <input
          type="number"
          min={0}
          step={0.1}
          className="w-full rounded-xl border border-gray-700 bg-black/30 p-2 outline-none focus:border-gray-500"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? "border-emerald-500" : "border-gray-800"
      }`}
    >
      <div className="text-sm text-gray-400">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}
