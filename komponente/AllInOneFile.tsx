"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  Children,
  useLayoutEffect,
  HTMLAttributes,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiShield, FiClock, FiMapPin } from "react-icons/fi";
import {
  AlertTriangle,
  Scale,
  Clock,
  Car,
  Zap,
  Mail,
  Phone,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox access token
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWlsamEwMDciLCJhIjoiY21ld3Rncm9oMGp1dTJqcjFvOTkzaHB2MiJ9.ts703Zeabqe9IVm7beTAKw";

// ---- AlchotestKalkulator komponenta ----
type Gender = "male" | "female";
const ETHANOL_DENSITY = 0.789;
const KCAL_PER_GRAM_ALC = 7;
const R_VALUES: Record<Gender, number> = { male: 0.68, female: 0.55 };

const DEFAULTS = {
  beerMl: 500,
  beerPercent: 5,
  wineMl: 100,
  winePercent: 11,
  spiritMl: 30,
  spiritPercent: 35,
};

function gramsOfAlcohol(volumeMl: number, percent: number): number {
  return volumeMl * (percent / 100) * ETHANOL_DENSITY;
}

function clamp(n: number, min = 0, max = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(n, min), max);
}

function AlchotestKalkulator() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [beerCount, setBeerCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);
  const [spiritCount, setSpiritCount] = useState(0);
  const [timeSinceFirstDrinkH, setTimeSinceFirstDrinkH] = useState<number | "">(
    ""
  );
  const [elimRate, setElimRate] = useState(0.1);
  const [beerMl, setBeerMl] = useState(DEFAULTS.beerMl);
  const [beerPercent, setBeerPercent] = useState(DEFAULTS.beerPercent);
  const [wineMl, setWineMl] = useState(DEFAULTS.wineMl);
  const [winePercent, setWinePercent] = useState(DEFAULTS.winePercent);
  const [spiritMl, setSpiritMl] = useState(DEFAULTS.spiritMl);
  const [spiritPercent, setSpiritPercent] = useState(DEFAULTS.spiritPercent);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const elapsedH =
    typeof timeSinceFirstDrinkH === "number" ? timeSinceFirstDrinkH : 0;
  const afterElimPermille = clamp(initialBACpermille - elimRate * elapsedH, 0);
  const hoursToZero = afterElimPermille > 0 ? afterElimPermille / elimRate : 0;

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

// ---- AlcoholInfoSection komponenta ----
function AlcoholInfoSection() {
  const alcoholLevels = [
    {
      level: "0.2-0.3 ‰",
      effect: "Lagana euforija, opuštenost",
      color: "bg-green-100 text-green-800",
    },
    {
      level: "0.4-0.6 ‰",
      effect: "Osjećaj topline, smanjen oprez",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      level: "0.7-0.9 ‰",
      effect: "Problemi s ravnotežom i govorom",
      color: "bg-orange-100 text-orange-800",
    },
    {
      level: "1.0-1.5 ‰",
      effect: "Značajne motoričke poteškoće",
      color: "bg-red-100 text-red-800",
    },
    {
      level: "≥ 2.0 ‰",
      effect: "Dezorijentacija, rizik nesvjestice",
      color: "bg-red-200 text-red-900",
    },
  ];

  const penalties = [
    { range: "0.5-1.0 ‰", fine: "400-700 €" },
    { range: "1.0-1.5 ‰", fine: "700-2.000 €" },
    { range: "> 1.5 ‰", fine: "do 2.700 €" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 bg-black text-white">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-balance">
          Promili alkohola u krvi
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Razumijevanje razine alkohola u krvi ključno je za sigurnu vožnju.
          Saznajte što znače promili i kako utječu na vaše sposobnosti.
        </p>
      </div>

      {/* What is Promil Section */}
      <Card className="border-2 bg-black border-gray-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-white" />
            <div>
              <CardTitle className="text-2xl text-white">
                Što je promil (‰)?
              </CardTitle>
              <CardDescription className="text-base text-gray-300">
                Razina alkohola u krvi izražava se u promilima
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed text-white">
            Promil predstavlja grame alkohola na tisuću kubičnih centimetara
            krvi (g/1000 cm³). Na primjer, 0,5 ‰ znači da se u litri krvi nalazi
            0,5 g alkohola.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="font-semibold text-white">Važno za razumjeti:</p>
            <p className="text-gray-300">
              Iako se 0,5 ‰ često uzima kao &quot;sigurnosna&quot; granica,
              sposobnosti su već narušene na toj razini.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alcohol Levels Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Drink Amounts */}
        <Card className="bg-black border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-6 h-6 text-white" />
              Količina pića za određenu razinu
            </CardTitle>
            <CardDescription className="text-gray-300">
              Grube procjene za osobu od ~70 kg
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="font-semibold text-white">0,5 ‰</span>
                <span className="text-sm text-gray-300">
                  1-1,5 piva ili 1 čaša vina
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="font-semibold text-white">1,0 ‰</span>
                <span className="text-sm text-gray-300">
                  2 čaše vina ili ~1L piva
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="font-semibold text-white">2,0 ‰</span>
                <span className="text-sm text-gray-300">
                  1L vina ili 3-4 čaše jakog pića
                </span>
              </div>
            </div>
            <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
              <p className="text-sm text-red-400 font-medium">
                ⚠️ Stvarna razina ovisi o tjelesnoj masi, spolu, brzini
                ispijanja, hrani i metabolizmu.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time to Clear */}
        <Card className="bg-black border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-6 h-6 text-white" />
              Koliko dugo alkohol ostaje u krvi?
            </CardTitle>
            <CardDescription className="text-gray-300">
              Brzina razgradnje alkohola u organizmu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-gray-800 rounded-lg border-2 border-gray-600">
              <div className="text-3xl font-bold text-white">0,15-0,20 ‰</div>
              <div className="text-sm text-gray-300">razgradnja po satu</div>
            </div>
            <div className="space-y-2">
              <p className="text-white">
                <strong>Jedno pivo:</strong> nestaje za par sati
              </p>
              <p className="text-white">
                <strong>Više čaša vina:</strong> 5-6 sati ili dulje
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong>Napomena:</strong> Voda, hrana i vrijeme pomažu
                oporavku, ali ništa ne &quot;skida&quot; promile trenutno.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Effects by Level */}
      <Card className="bg-black border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-6 h-6 text-white" />
            Učinci po razinama promila
          </CardTitle>
          <CardDescription className="text-gray-300">
            Kako različite razine alkohola utječu na organizam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {alcoholLevels.map((level, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800"
              >
                <Badge className={level.color} variant="secondary">
                  {level.level}
                </Badge>
                <span className="text-sm flex-1 ml-4 text-white">
                  {level.effect}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Croatian Penalties */}
      <Card className="border-red-500/20 bg-black text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Car className="w-6 h-6" />
            Kazne za vožnju pod utjecajem (Hrvatska)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Trenutno važeći propisi - informativno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {penalties.map((penalty, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-red-900/20 border border-red-500/20 rounded-lg"
              >
                <span className="font-semibold text-white">
                  {penalty.range}
                </span>
                <span className="text-red-400 font-bold">{penalty.fine}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300">
              * Iznosi i pragovi mogu se mijenjati. Uvijek provjerite važeće
              propise.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Factors Affecting BAC */}
      <Card className="bg-black border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-white">Što utječe na promile?</CardTitle>
          <CardDescription className="text-gray-300">
            Faktori koji određuju razinu alkohola u krvi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Tjelesna masa</h4>
                  <p className="text-sm text-gray-300">
                    Veća masa obično znači manju koncentraciju
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Spol</h4>
                  <p className="text-sm text-gray-300">
                    Žene postižu više promile pri istoj količini
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Metabolizam</h4>
                  <p className="text-sm text-gray-300">
                    Brzina razgradnje varira među osobama
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Hrana i tempo</h4>
                  <p className="text-sm text-gray-300">
                    Hrana usporava apsorpciju alkohola
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Snaga pića</h4>
                  <p className="text-sm text-gray-300">
                    Veći ABV i veće porcije = brži rast promila
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white">Genetika</h4>
                  <p className="text-sm text-gray-300">
                    Nasljedni faktori utječu na metabolizam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is Promil - Additional Section */}
      <Card className="bg-black border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Scale className="w-6 h-6 text-white" />
            Detaljnije o promilima
          </CardTitle>
          <CardDescription className="text-gray-300">
            Dodatne informacije o mjerenju alkohola u krvi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Kako se mjeri?
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    <strong>Krvni test:</strong> Najpreciznija metoda mjerenja
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    <strong>Alkotest aparat:</strong> Mjeri alkohol u izdahnutom
                    zraku
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300 text-sm">
                    <strong>Urin test:</strong> Manje precizan, ali dostupan
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Zakonski pragovi
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-white font-semibold">Hrvatska: 0.5‰</p>
                  <p className="text-gray-300 text-sm">
                    Maksimalna dozvoljena razina
                  </p>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-white font-semibold">
                    Novački vozači: 0.0‰
                  </p>
                  <p className="text-gray-300 text-sm">Stroži za početnike</p>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-white font-semibold">
                    Profesionalni vozači: 0.2‰
                  </p>
                  <p className="text-gray-300 text-sm">Za kamione i autobuse</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h4 className="text-lg font-semibold text-white mb-3">
              Važne napomene
            </h4>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                • <strong>Individualne razlike:</strong> Ista količina alkohola
                može dati različite rezultate
              </p>
              <p className="text-gray-300 text-sm">
                • <strong>Vremenski faktor:</strong> Alkohol se apsorbira i
                metabolizira tijekom vremena
              </p>
              <p className="text-gray-300 text-sm">
                • <strong>Zdravlje:</strong> Bolesti jetre i lijekovi mogu
                utjecati na metabolizam
              </p>
              <p className="text-gray-300 text-sm">
                • <strong>Hrana:</strong> Puna želudac usporava apsorpciju
                alkohola
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-6 bg-gray-800 p-8 rounded-2xl border-2 border-gray-600">
        <h2 className="text-2xl font-bold text-white">
          Sigurnost je prioritet
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Alkotest aparati pomažu u procjeni razine alkohola, ali najbolji
          savjet je: ako pijete, ne vozite. Koristite javni prijevoz ili
          pozovite taksi.
        </p>
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
          Saznajte više o alkotest aparatima
        </Button>
      </div>
    </div>
  );
}

// ---- Map komponenta ----
function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Koordinate za Zagreb centar i 3 bliska lokacije s poboljšanim podacima
  const locations = useMemo(
    () => [
      {
        id: 0,
        name: "Harat's Pub",
        coordinates: [15.9776849, 45.8148249] as [number, number],
        description: "Harat's Irish Pub kod trznice Dolac uz veliki izbor piva",
        rating: 4.2,
        reviewCount: 127,
        businessType: "Irish Pub",
        avgSpending: "11-16 €",
        photos: [
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
        ],
        address: "Dolac 2, 10000 Zagreb",
        phone: "+385 1 4814 899",
        googleMapsUrl:
          "https://www.google.com/maps/place/Harat's+Pub/@45.8148286,15.9751046,17z/data=!4m14!1m7!3m6!1s0x4765d70271927e99:0x8cd74ff66755eca3!2sHarat's+Pub!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_!3m5!1s0x4765d70271927e99:0x8cd74ff66755eca3!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Attraction_Review-g294454-d10449134-Reviews-Harat_s_Irish_Pub-Zagreb_Central_Croatia.html",
      },
      {
        id: 1,
        name: "OUT Bunker Nightclub",
        coordinates: [15.9710048, 45.8133541] as [number, number],
        description:
          "OUT Bunker Nightclub na Ilici - mjesto za mladu populaciju",
        rating: 4.0,
        reviewCount: 89,
        businessType: "Nightclub",
        avgSpending: "13-20 €",
        photos: [
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        ],
        address: "Ilica 242, 10000 Zagreb",
        phone: "+385 1 4833 444",
        googleMapsUrl:
          "https://www.google.com/maps/place/OUT+Bunker+Nightclub/@45.8133639,15.9551473,15z/data=!3m1!4b1!4m6!3m5!1s0x4765d7c25fd45d5f:0x2f8a716d8e37bd76!8m2!3d45.8133504!4d15.9735797!16s%2Fg%2F11j7btnp1b?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Attraction_Review-g294454-d25788815-Reviews-OUT_Bunker-Zagreb_Central_Croatia.html",
      },
      {
        id: 2,
        name: "The Old Pharmacy",
        coordinates: [15.9724083, 45.8089789] as [number, number],
        description: "The Old Pharmacy Pub - mjesto za odmor, rad i zabavu",
        rating: 4.5,
        reviewCount: 203,
        businessType: "Cocktail Bar",
        avgSpending: "12-17 €",
        photos: [
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
        ],
        address: "Tkalčićeva 58, 10000 Zagreb",
        phone: "+385 1 4811 300",
        googleMapsUrl:
          "https://www.google.com/maps/place/The+Old+Pharmacy/@45.808983,15.9723891,17z/data=!3m1!4b1!4m6!3m5!1s0x4765d6fbeedc063b:0x3f9e8c4eee9c5cd7!8m2!3d45.8089793!4d15.9749694!16s%2Fg%2F1tg4k56r?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Restaurant_Review-g294454-d2645920-Reviews-Old_Pharmacy_Pub-Zagreb_Central_Croatia.html",
      },
      {
        id: 3,
        name: "cONLee BAR",
        coordinates: [15.6553596, 45.6740704] as [number, number],
        description: "cONLee BAR - mjesto za rad dobro pivo i zabavu",
        rating: 5.0,
        reviewCount: 6,
        businessType: "Bar",
        avgSpending: "5-10 €",
        photos: [
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
        ],
        address: "Ul. Antuna Mihanovića 14, 10450, Jastrebarsko",
        phone: "09123003400",
        googleMapsUrl:
          "https://www.google.com/maps/place/cONLee+BAR/@45.6740471,15.6553774,19.4z/data=!4m6!3m5!1s0x4764338e1ebff2f9:0xf22b7db73d6def56!8m2!3d45.6740313!4d15.6555191!16s%2Fg%2F11xk_lcqf9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.facebook.com/people/cONLee-BAR/61577259976283/#",
      },
    ],
    []
  );

  // Funkcija za navigaciju kroz slike
  useEffect(() => {
    // Dodaj globalnu funkciju za navigaciju kroz slike
    (
      window as unknown as {
        changeImage: (locationId: number, direction: number) => void;
      }
    ).changeImage = (locationId: number, direction: number) => {
      const popupContent = document.querySelector(
        `[data-location-id="${locationId}"]`
      );
      if (!popupContent) return;

      const location = locations.find((loc) => loc.id === locationId);
      if (!location) return;

      const mainImage = popupContent.querySelector(
        ".main-image"
      ) as HTMLImageElement;

      if (!mainImage) return;

      // Dohvati trenutni indeks iz data atributa ili postavi na 0
      let currentIndex = parseInt(
        popupContent.getAttribute("data-current-image") || "0"
      );
      currentIndex += direction;

      // Wrap around
      if (currentIndex < 0) currentIndex = location.photos.length - 1;
      if (currentIndex >= location.photos.length) currentIndex = 0;

      // Ažuriraj sliku i indeks
      mainImage.src = location.photos[currentIndex];
      popupContent.setAttribute("data-current-image", currentIndex.toString());

      // Prikaži/sakrij strelice ovisno o poziciji
      const prevBtn = popupContent.querySelector(
        ".prev-btn"
      ) as HTMLButtonElement;
      const nextBtn = popupContent.querySelector(
        ".next-btn"
      ) as HTMLButtonElement;
      const imageNav = popupContent.querySelector(
        ".image-nav"
      ) as HTMLDivElement;

      if (prevBtn) {
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
      }
      if (nextBtn) {
        nextBtn.style.display = "flex"; // Uvijek prikaži desnu strelicu
      }

      // Promijeni CSS klasu za pozicioniranje
      if (imageNav) {
        if (currentIndex === 0) {
          imageNav.className = "image-nav right-only";
        } else {
          imageNav.className = "image-nav both-arrows";
        }
      }
    };
  }, [locations]);

  useEffect(() => {
    if (map.current) return; // Inicijaliziraj mapu samo jednom

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [15.9734885, 45.813173],

        zoom: 9,
        accessToken: MAPBOX_ACCESS_TOKEN,
      });

      // Dodaj navigation kontrole
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "top-left"
      );

      // Dodaj markere za sve lokacije
      locations.forEach((location) => {
        // Kreiraj custom marker element s vašom ikonom
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.innerHTML = `<img src="/assets/location-pin.png" alt="${location.name}" />`;

        // Dodaj marker na mapu
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .addTo(map.current!);

        // Dodaj kompaktni popup s jednom slikom
        const popup = new mapboxgl.Popup({
          offset: [0, -10], // Otvara se odozgo
          maxWidth: "240px",
          className: "compact-popup",
        }).setHTML(`
            <div class="compact-popup-content" data-location-id="${
              location.id
            }" data-current-image="0" data-google-maps-url="${
          location.googleMapsUrl
        }" style="cursor: pointer;">
              <!-- Glavna slika s navigacijom -->
              <div class="popup-image-container">
                <img src="${location.photos[0]}" alt="${
          location.name
        }" class="main-image" style="width: 100%; height: 100%; object-fit: cover;" />
                <div class="image-nav right-only">
                  <button class="nav-btn prev-btn" onclick="event.stopPropagation(); changeImage(${
                    location.id
                  }, -1)">‹</button>
                  <button class="nav-btn next-btn" onclick="event.stopPropagation(); changeImage(${
                    location.id
                  }, 1)">›</button>
                </div>

              </div>
              
              <!-- Sadržaj -->
              <div class="popup-body">
                <div class="popup-main">
                  <h3 class="popup-title">${location.name}</h3>
                  <div class="popup-rating">
                    <div class="stars">
                      ${Array.from(
                        { length: 5 },
                        (_, i) =>
                          `<span class="star ${
                            i < Math.floor(location.rating) ? "filled" : ""
                          }">★</span>`
                      ).join("")}
                    </div>
                    <span class="rating-text">${location.rating} (${
          location.reviewCount
        })</span>
                    <span class="directions-icon">⤴️</span>
                  </div>
                  <div class="business-info">
                    <span class="business-type">${location.businessType}</span>
                    <span class="avg-spending">${location.avgSpending}</span>
                  </div>
                </div>
              </div>
            </div>
          `);

        marker.setPopup(popup);

        // Postavi početno stanje strelica kada se popup otvori
        marker.getElement().addEventListener("click", () => {
          setTimeout(() => {
            const popupContent = document.querySelector(
              `[data-location-id="${location.id}"]`
            );
            if (popupContent) {
              const prevBtn = popupContent.querySelector(
                ".prev-btn"
              ) as HTMLButtonElement;
              const nextBtn = popupContent.querySelector(
                ".next-btn"
              ) as HTMLButtonElement;

              if (prevBtn) prevBtn.style.display = "none";
              if (nextBtn) nextBtn.style.display = "flex";

              // Dodaj event listener za klik na popup (osim na strelice)
              const handlePopupClick = (e: Event) => {
                const target = e.target as HTMLElement;
                // Ako je klik na strelicu ili unutar image-nav, ne otvaraj Google Maps
                if (
                  target.closest(".image-nav") ||
                  target.closest(".nav-btn")
                ) {
                  return;
                }
                // Otvori Google Maps
                const googleMapsUrl = popupContent.getAttribute(
                  "data-google-maps-url"
                );
                if (googleMapsUrl) {
                  window.open(googleMapsUrl, "_blank");
                }
              };

              // Ukloni postojeći event listener ako postoji
              popupContent.removeEventListener("click", handlePopupClick);
              // Dodaj novi event listener
              popupContent.addEventListener("click", handlePopupClick);
            }
          }, 100);
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [locations]);

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <div ref={mapContainer} className="map" />
      </div>

      {/* Minijaturne lokacije ispod mape */}
      <div className="mini-locations-grid">
        {locations.map((location) => (
          <div
            key={location.id}
            className="mini-location-card"
            onClick={() => window.open(location.googleMapsUrl, "_blank")}
            style={{ cursor: "pointer" }}
          >
            <div className="mini-popup-image-container">
              <Image
                src={location.photos[0]}
                alt={location.name}
                className="mini-main-image"
                width={200}
                height={100}
                priority={location.id === 0}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="mini-popup-body">
              <div className="mini-popup-main">
                <h3 className="mini-popup-title">{location.name}</h3>
                <div className="mini-popup-rating">
                  <div className="mini-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`mini-star ${
                          i < Math.floor(location.rating) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="mini-rating-text">
                    {location.rating} ({location.reviewCount})
                  </span>
                  <span className="mini-directions-icon">⤴️</span>
                </div>
                <div className="mini-business-info">
                  <span className="mini-business-type">
                    {location.businessType}
                  </span>
                  <span className="mini-avg-spending">
                    {location.avgSpending}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .map-container {
          padding: 20px;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .map-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .map {
          width: 100%;
          height: 500px;
        }

        /* Minijaturne lokacije grid ispod mape */
        .mini-locations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .mini-location-card {
          background: #000000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 200px;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .mini-location-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 0, 0, 0.3);
        }

        .mini-popup-image-container {
          position: relative;
          width: 100%;
          height: 80px;
          overflow: hidden;
        }

        .mini-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mini-popup-body {
          padding: 6px;
        }

        .mini-popup-main {
          margin-bottom: 2px;
        }

        .mini-popup-title {
          margin: 0 0 3px 0;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.2;
        }

        .mini-popup-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 2px;
          justify-content: flex-start;
        }

        .mini-stars {
          display: flex;
          gap: 1px;
        }

        .mini-star {
          color: #ddd;
          font-size: 8px;
        }

        .mini-star.filled {
          color: #ffc107;
        }

        .mini-rating-text {
          color: #cccccc;
          font-size: 7px;
          font-weight: 500;
        }

        .mini-business-info {
          display: flex;
          gap: 3px;
          margin-bottom: 2px;
        }

        .mini-business-type {
          background: rgba(255, 255, 255, 0.15);
          color: #e0e0e0;
          padding: 1px 3px;
          border-radius: 2px;
          font-size: 6px;
          font-weight: 500;
        }

        .mini-avg-spending {
          background: rgba(255, 0, 0, 0.2);
          color: #ff6666;
          padding: 1px 3px;
          border-radius: 2px;
          font-size: 6px;
          font-weight: 500;
        }

        .mini-directions-icon {
          font-size: 10px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Custom marker stilovi */
        :global(.custom-marker) {
          cursor: pointer;
        }

        :global(.custom-marker img) {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        /* Mapbox popup stilovi */
        :global(.mapboxgl-popup-content) {
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding: 16px !important;
          background: #000000 !important;
        }

        :global(.mapboxgl-popup-close-button) {
          font-size: 20px !important;
          color: #ffffff !important;
          padding: 10px !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          background-color: rgba(255, 0, 0, 0.8) !important;
          border: 2px solid #ffffff !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: bold !important;
        }

        :global(.mapboxgl-popup-close-button:hover) {
          color: #ffffff !important;
          background-color: #ff0000 !important;
          border-color: #ffffff !important;
          transform: scale(1.1) !important;
          box-shadow: 0 2px 8px rgba(255, 0, 0, 0.4) !important;
        }

        :global(.mapboxgl-ctrl-group) {
          border: 2px solid rgba(0, 0, 0, 0.2) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
          border-radius: 8px !important;
        }

        :global(.mapboxgl-ctrl-group button) {
          border: none !important;
          background: white !important;
          color: #333 !important;
        }

        :global(.mapboxgl-ctrl-group button:hover) {
          background: #f8f9fa !important;
        }

        /* Kompaktni popup stilovi */
        :global(.compact-popup .mapboxgl-popup-content) {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          overflow: hidden !important;
          max-width: 240px !important;
          background: #000000 !important;
        }

        :global(.compact-popup-content) {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          color: #ffffff;
        }

        :global(.popup-image-container) {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }

        :global(.main-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          max-width: 100%;
          max-height: 100%;
        }

        :global(.image-nav) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 0 8px;
          pointer-events: none;
        }

        :global(.nav-btn) {
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.2s ease;
          pointer-events: all;
        }

        :global(.image-nav.both-arrows) {
          justify-content: space-between;
        }

        :global(.image-nav.right-only) {
          justify-content: flex-end;
        }

        :global(.nav-btn:hover) {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        :global(.popup-body) {
          padding: 8px;
        }

        :global(.popup-main) {
          margin-bottom: 4px;
        }

        :global(.popup-title) {
          margin: 0 0 4px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        :global(.popup-rating) {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 3px;
          justify-content: flex-start;
        }

        :global(.stars) {
          display: flex;
          gap: 1px;
        }

        :global(.star) {
          color: #ddd;
          font-size: 12px;
        }

        :global(.star.filled) {
          color: #ffc107;
        }

        :global(.rating-text) {
          color: #cccccc;
          font-size: 10px;
          font-weight: 500;
        }

        :global(.business-info) {
          display: flex;
          gap: 6px;
          margin-bottom: 4px;
        }

        :global(.business-type) {
          background: rgba(255, 255, 255, 0.1);
          color: #cccccc;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 500;
        }

        :global(.avg-spending) {
          background: rgba(255, 0, 0, 0.2);
          color: #ff6666;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 500;
        }

        :global(.directions-icon) {
          font-size: 20px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Stari popup stilovi za kompatibilnost */
        :global(.popup-content h3) {
          margin: 0 0 8px 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }

        :global(.popup-content p) {
          margin: 0;
          color: #cccccc;
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

// ---- Stepper komponenta ----
interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  finalContent?: ReactNode;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

// Hook za praćenje veličine ekrana
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">(
    "medium"
  );

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("small");
      } else if (width < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
}

// Funkcija za odabir originalne slike
function getResponsiveImage(stepNumber: number): string {
  const baseImageName = `${stepNumber}.korak`;
  // Koristi samo originalne slike za sve veličine ekrana
  return `/assets/${baseImageName}.png`;
}

interface RenderStepIndicatorProps {
  step: number;
  currentStep: number;
  onStepClick: (clicked: number) => void;
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  finalContent,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const screenSize = useScreenSize();
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className={`outer-container responsive-${screenSize}`} {...rest}>
      <div
        className={`step-circle-container responsive-${screenSize} ${stepCircleContainerClassName}`}
        style={{ border: "1px solid #222" }}
      >
        <div className={`step-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {!isCompleted ? (
          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            screenSize={screenSize}
            className={`step-content-default ${contentClassName}`}
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>
        ) : (
          finalContent && (
            <motion.div
              className={`step-content-default ${contentClassName}`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {finalContent}
            </motion.div>
          )
        )}

        {!isCompleted && (
          <div className={`footer-container ${footerClassName}`}>
            <div
              className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`back-button ${
                    currentStep === 1 ? "inactive" : ""
                  }`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="next-button"
                {...nextButtonProps}
              >
                {isLastStep ? "Complete" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  screenSize: "small" | "medium" | "large";
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  screenSize,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            screenSize={screenSize}
            currentStep={currentStep}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  screenSize: "small" | "medium" | "large";
  currentStep: number;
  onHeightReady: (h: number) => void;
}

function SlideTransition({
  children,
  direction,
  screenSize,
  currentStep,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            stepNumber: currentStep,
            screenSize: screenSize,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)
        : children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

interface StepProps {
  stepNumber?: number;
  screenSize?: "small" | "medium" | "large";
}

function Step({
  stepNumber,
  screenSize = "medium",
}: StepProps): React.ReactElement {
  const imageSrc = stepNumber ? getResponsiveImage(stepNumber) : null;

  return (
    <div className={`step-default responsive-${screenSize}`}>
      {imageSrc && (
        <div className="step-image-container">
          <Image
            src={imageSrc}
            alt={`Korak ${stepNumber}`}
            className="step-image stepper-image"
            width={780}
            height={780}
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 780px"
            priority
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "780px",
              margin: "0 auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (step: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="step-indicator"
      animate={status}
      initial={false}
    >
      <motion.div
        initial={{ scale: 1, backgroundColor: "#222", color: "#a3a3a3" }}
        variants={{
          inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
          active: { scale: 1, backgroundColor: "#ff0000", color: "#ffffff" },
          complete: { scale: 1, backgroundColor: "#ff0000", color: "#ffffff" },
        }}
        transition={{ duration: 0.3 }}
        className="step-indicator-inner"
      >
        {status === "complete" ? (
          <CheckIcon className="check-icon" />
        ) : status === "active" ? (
          <div className="active-dot" />
        ) : (
          <span className="step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "rgba(0, 0, 0, 0)" },
    complete: { width: "100%", backgroundColor: "#ff0000" },
  };

  return (
    <div className="step-connector">
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

type CheckIconProps = React.SVGProps<SVGSVGElement>;

function CheckIcon(props: CheckIconProps) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ---- PartnerFooter komponenta ----
function PartnerFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Postanite Naš Partner!
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Imate <strong>kafić</strong> ili <strong>restoran</strong>?
            Postanite naš partner i postavite
            <strong> alkotest aparat</strong> u vašem lokalu!
          </p>
        </div>

        <div className="space-y-12">
          {/* Information Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-balance text-white mb-4">
                Što nudimo?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Ako vam se naša ideja sviđa, imate mjesta na zidu i želite vašem
                lokalu dodati <strong>zanimljivost</strong> i novi razlog
                dolaska, nakon razgovora i dogovora nudimo vama i vašem lokalu
                naš <strong>alkotest aparat</strong> i po uvjetima ambijenta{" "}
                <strong>personalizirani neonski znak</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Kolika je cijena?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Cijena postavljanja i sami aparat su <strong>besplatni</strong>,
                a novac koji aparat proizvede ćemo podijeliti po postotku tako
                da nema rizika za obje strane. Naš model poslovanja je zasnovan
                na
                <strong> zajedničkom uspjehu</strong> - što više korisnika
                imate, to više zarađujemo oboje.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Održavanje?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    Što se tiče vašeg dijela, samo nam osigurajte mjesto na
                    zidu, a redovan servis i vađenje kovanica održavamo jednom
                    mjesečno. Trebamo samo nadodati slamke, mijenjati senzore,
                    kablove, baterije, računalo i očistiti ga. To sve traje
                    maksimalno sat vremena mjesečno (uglavnom zadnji dan u
                    mjesecu).
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/assets/dimenzije.svg"
                    alt="Alkotest aparat dimenzije"
                    width={200}
                    height={200}
                    className="object-contain"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      filter: "brightness(0.8) contrast(1.2)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Kako da znate da smo pošteni?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Svako korištenje aparata evidentirano je brojkom koju pokazujemo
                fotografijom ili videom na kraju mjeseca da nema zabune o
                brojnom stanju. Transparentnost je ključ našeg partnerstva.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Zašto baš mi?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Naši aparati su <strong>profesionalno kalibrirani</strong> i
                održavani, pružajući točne rezultate. Imamo iskustvo u
                <strong> gastroindustriji</strong> i razumijemo potrebe vaših
                gostiju. Naš tim je dostupan 24/7 za podršku.
              </p>
            </div>
          </div>

          {/* Contact & Social Section - Bottom */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Kontakt</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a
                    href="mailto:alkotestaparat@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    alkotestaparat@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a
                    href="tel:+385994171467"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +385 99 4171 467
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Pratite nas na društvenim mrežama
              </h3>
              <div className="flex gap-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-blue-600 hover:border-blue-600 text-blue-500 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-blue-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-600 text-pink-500 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-pink-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-black hover:border-gray-400 text-gray-300 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z" />
                    </svg>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Alkotest Partner Program. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}

// ---- Glavna Home komponenta ----
export default function Home() {
  return (
    <div className="page-background">
      {/* Hero Section */}
      <section className="hero-bg-home relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left flex flex-col gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-50 leading-tight">
                  <span className="block md:inline">Provjeri</span>
                  <span className="block md:inline">
                    {" "}
                    i vozi{" "}
                    <span className="text-red-500 relative">
                      sigurno
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                    </span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-50 leading-relaxed">
                  Pronađi najbliži profesionalni alkotester aparat u svom gradu.
                  Jednostavno, brzo i pouzdano.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-x-3 text-gray-50">
                  <div className="w-10 h-10 bg-red-600/30 rounded-lg flex items-center justify-center">
                    <FiShield className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium ml-2">
                    Profesionalno
                  </span>
                </div>

                <div className="flex items-center gap-x-3 text-gray-50">
                  <div className="w-10 h-10 bg-red-600/30 rounded-lg flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium ml-2">Brzo</span>
                </div>

                <div className="flex items-center gap-x-3 text-gray-50">
                  <div className="w-10 h-10 bg-red-600/30 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium ml-2">Pouzdano</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="ctaWrap pt-2 mt-3 md:mt-4 lg:mt-6 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() =>
                    document
                      .getElementById("lokacije")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <FiMapPin className="w-5 h-5 mr-2" />
                  Pronađi Lokacije
                </Button>
              </div>
            </div>

            {/* Right Content - Device Image */}
            <div className="flex justify-center">
              <Image
                src="/assets/drunkyet.svg"
                alt="Profesionalni alkotester aparat"
                width={600}
                height={700}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>

      {/* O nama sekcija */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Tekst sadržaj */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                  O nama
                </h2>
                <p className="text-lg text-white leading-relaxed">
                  Naša misija je osigurati sigurnost na cestama kroz dostupnost
                  profesionalnih alkotester aparata. Vjerujemo da svatko
                  zaslužuje jednostavan i pouzdan način provjere prije vožnje.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Naši aparati su profesionalno kalibrirani i održavani,
                  pružajući točne rezultate koji vam pomažu donijeti odgovornu
                  odluku o vožnji. Sigurnost je naš prioritet.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Imate lokal ili restoran i razmišljate da i vi postavite naš
                  aparat? Kliknite na gumb i{" "}
                  <Button
                    onClick={() =>
                      document
                        .getElementById("partner-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Postanite naš Partner
                  </Button>
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-400">
                      Profesionalno
                    </h3>
                    <p className="text-white">Kalibrirani aparati</p>
                  </div>
                </div>
              </div>

              {/* Slika aparata */}
              <div>
                <Image
                  src="/assets/dimenzije.svg"
                  alt="Profesionalni alkotester aparat"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    filter: "brightness(0.8) contrast(1.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcija 2: Mapa s Lokacijama */}
      <section id="lokacije" className="section-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Naše Lokacije
          </h2>
          <div className="max-w-4xl mx-auto">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* Sekcija 3: Upute za korištenje */}
      <section id="upute" className="section-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Kako Koristiti naš Aparat?
          </h2>
          <div className="max-w-4xl mx-auto">
            <Stepper
              initialStep={1}
              contentClassName="stepper-content"
              aria-label="Upute koraci"
              finalContent={
                <div className="step-image-container">
                  <Image
                    width={780}
                    height={780}
                    src="/assets/completeKorak.png"
                    alt="Final"
                    className="stepper-image"
                  />
                </div>
              }
            >
              <Step />
              <Step />
              <Step />
              <Step />
              <Step />
              <Step />
            </Stepper>
          </div>
        </div>
      </section>

      {/* Sekcija 4: Informacije o alkoholu i kalkulator */}
      <section className="py-16 bg-black">
        <AlcoholInfoSection />
        <AlchotestKalkulator />
      </section>

      {/* Sekcija 5: Sigurnost je prioritet - Fun Fact */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl shadow-2xl border-2 border-green-500/20">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <span className="text-3xl">😎</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Kako Nadmudriti Aparat??
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-lg text-green-100 leading-relaxed">
                  Osim što se nakon konzumacije alkohola preporučuje dobar obrok
                  i bezalkoholna pića, istraživanjem,korištenjem aparata i
                  slušanjem na satima kemije došao sam do otkrića. Ključni
                  element je – mast. Nije važno koje je porijeklo masti ili
                  ulja, kemijski gledano, mast na sebe veže alkohol. Ako
                  pojedete nešto masnije, dio alkohola iz usne šupljine neće
                  dospjeti do pluća, već će završiti u želucu. Isto tako, ako
                  imate maslinovo ulje, pa čak i melem ili labelo, možete to
                  protresti u ustima i dobit ćete niži rezultat. Iako nećete
                  postići 0.0 promila, rezultat će se značajno smanjiti. No,
                  važno je napomenuti da vas ovo neće otrijezniti, već samo
                  utjecati na mjerenje.
                </p>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <p className="text-sm text-green-100 font-medium">
                    💡 Za pravo snižavanje promila u krvi i glavi, ključni su
                    hrana, voda i, najvažnije od svega – vrijeme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcija 6: Kontakt i Partnerstvo */}
      <section
        id="partner-section"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <PartnerFooter />
      </section>
    </div>
  );
}
