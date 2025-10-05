import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Sova from "../../components/Sova";
import {
  AlertTriangle,
  Scale,
  Clock,
  Car,
  Zap,
  Shield,
  Heart,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { TajniKomponent } from "../../components/TajniKomponent";
import "./Info.css";

export function Info() {
  const [showTajniKomponent, setShowTajniKomponent] = useState(false);

  const alcoholLevels = [
    {
      level: "0.2-0.3 ‰",
      effect: "Lagana euforija, opuštenost",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      intensity: "20%",
    },
    {
      level: "0.4-0.6 ‰",
      effect: "Osjećaj topline, smanjen oprez",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      intensity: "40%",
    },
    {
      level: "0.7-0.9 ‰",
      effect: "Problemi s ravnotežom i govorom",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      intensity: "60%",
    },
    {
      level: "1.0-1.5 ‰",
      effect: "Značajne motoričke poteškoće",
      color: "bg-red-100 text-red-800 border-red-200",
      intensity: "80%",
    },
    {
      level: "≥ 2.0 ‰",
      effect: "Dezorijentacija, rizik nesvjestice",
      color: "bg-red-200 text-red-900 border-red-300",
      intensity: "100%",
    },
  ];

  const penalties = [
    { range: "0.5-1.0 ‰", fine: "400-700 €", severity: "low" },
    { range: "1.0-1.5 ‰", fine: "700-2.000 €", severity: "medium" },
    { range: "> 1.5 ‰", fine: "do 2.700 €", severity: "high" },
  ];

  return (
    <div
      id="Informacije"
      className="min-h-screen py-24 px-4 bg-gradient-to-br from-muted/30 via-card to-background"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div
          className="relative overflow-hidden rounded-3xl p-12 text-center space-y-6"
          style={{
            background:
              "linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #8b5cf6 100%)",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="inline-block mb-4 floating-icon">
              <Scale className="w-16 h-16 text-white/90" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-balance mb-4">
              Informacije o promilima,
              <br />
              alkoholu i kaznama
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed">
              Razumijevanje razine alkohola u krvi ključno je za sigurnu vožnju.
              Saznajte što znače promili i kako utječu na vaše sposobnosti.
            </p>
          </div>
        </div>

        <Card className="border-2 border-primary/20 bg-card shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-full">
                <Scale className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-3xl text-primary">
                  Što je promil (‰)?
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Razina alkohola u krvi izražava se u promilima
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <p className="text-lg leading-relaxed text-foreground">
              Promil predstavlja grame alkohola na tisuću kubičnih centimetara
              krvi (g/1000 cm³). Na primjer, 0,5 ‰ znači da se u litri krvi
              nalazi 0,5 g alkohola.
            </p>
            <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 p-6 rounded-xl border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-destructive mb-2">
                    Važno za razumjeti:
                  </p>
                  <p className="text-foreground">
                    Iako se 0,5 ‰ često uzima kao &quot;sigurnosna&quot;
                    granica, sposobnosti su već narušene na toj razini.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Drink Amounts */}
          <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-secondary">
                <div className="p-2 bg-secondary rounded-lg">
                  <Zap className="w-6 h-6 text-secondary-foreground" />
                </div>
                Količina pića za određenu razinu
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Grube procjene za osobu od ~70 kg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 gap-2 sm:gap-0">
                  <span className="font-bold text-emerald-800 text-base sm:text-lg text-center sm:text-left">
                    0,5 ‰
                  </span>
                  <span className="text-emerald-700 font-medium text-sm sm:text-base text-center sm:text-right">
                    1-1,5 piva ili 1 čaša vina
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 gap-2 sm:gap-0">
                  <span className="font-bold text-yellow-800 text-base sm:text-lg text-center sm:text-left">
                    1,0 ‰
                  </span>
                  <span className="text-yellow-700 font-medium text-sm sm:text-base text-center sm:text-right">
                    2 čaše vina ili ~1L piva
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 gap-2 sm:gap-0">
                  <span className="font-bold text-red-800 text-base sm:text-lg text-center sm:text-left">
                    2,0 ‰
                  </span>
                  <span className="text-red-700 font-medium text-sm sm:text-base text-center sm:text-right">
                    1L vina ili 3-4 čaše jakog pića
                  </span>
                </div>
              </div>
              <div className="  p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sova imageName="DrPijani.webp" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ Stvarna razina ovisi o tjelesnoj masi, spolu, brzini
                    ispijanja, hrani i metabolizmu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time to Clear */}
          <Card className="bg-gradient-to-br from-primary/5 to-chart-1/5 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <div className="p-2 bg-primary rounded-lg">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                Koliko dugo alkohol ostaje u krvi?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Brzina razgradnje alkohola u organizmu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20 pulse-border">
                <div className="text-4xl font-bold text-primary mb-2">
                  0,15-0,20 ‰
                </div>
                <div className="text-muted-foreground font-medium">
                  razgradnja po satu
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <p className="text-foreground">
                    <strong>Jedno pivo:</strong> nestaje za par sati
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <p className="text-foreground">
                    <strong>Više čaša vina:</strong> 5-6 sati ili dulje
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Napomena:</strong> Voda, hrana i vrijeme pomažu
                  oporavku, ali ništa ne &quot;skida&quot; promile trenutno.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card shadow-xl border-2 border-border">
          <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-destructive">
              <div className="p-2 bg-destructive rounded-lg">
                <Brain className="w-6 h-6 text-destructive-foreground" />
              </div>
              Učinci po razinama promila
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Kako različite razine alkohola utječu na organizam
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-3 sm:gap-4">
              {alcoholLevels.map((level, index) => (
                <div
                  key={index}
                  className={`level-indicator flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 rounded-xl border-2 ${level.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg gap-3 sm:gap-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <Badge
                      className="text-sm sm:text-lg px-3 sm:px-4 py-2 font-bold w-fit"
                      variant="secondary"
                    >
                      {level.level}
                    </Badge>
                    <div className="w-full sm:w-32 bg-white/30 rounded-full h-2">
                      <div
                        className="bg-current h-2 rounded-full transition-all duration-1000"
                        style={{ width: level.intensity }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-medium flex-1 sm:ml-6 text-center sm:text-left">
                    {level.effect}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-destructive">
              <div className="p-3 bg-destructive rounded-full">
                <Car className="w-6 h-6 text-destructive-foreground" />
              </div>
              Kazne za vožnju pod utjecajem (Hrvatska)
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Trenutno važeći propisi - informativno
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-3 sm:gap-4">
              {penalties.map((penalty, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] gap-3 sm:gap-0 ${
                    penalty.severity === "low"
                      ? "bg-yellow-50 border-yellow-200"
                      : penalty.severity === "medium"
                      ? "bg-orange-50 border-orange-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <span className="font-bold text-lg sm:text-xl text-foreground text-center sm:text-left">
                    {penalty.range}
                  </span>
                  <span
                    className={`font-bold text-lg sm:text-xl text-center sm:text-right ${
                      penalty.severity === "low"
                        ? "text-yellow-700"
                        : penalty.severity === "medium"
                        ? "text-orange-700"
                        : "text-red-700"
                    }`}
                  >
                    {penalty.fine}
                  </span>
                </div>
              ))}
              <div className="flex justify-center items-center p-4 sm:p-6 rounded-xl h-auto">
                <Sova imageName="DrTuzni.webp" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">
                * Iznosi i pragovi mogu se mijenjati. Uvijek provjerite važeće
                propise.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/30 shadow-xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">
              Što utječe na promile?
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Faktori koji određuju razinu alkohola u krvi
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Tjelesna masa",
                  desc: "Veća masa obično znači manju koncentraciju",
                  color: "text-red-500",
                },
                {
                  icon: Brain,
                  title: "Spol",
                  desc: "Žene postižu više promile pri istoj količini",
                  color: "text-purple-500",
                },
                {
                  icon: Zap,
                  title: "Metabolizam",
                  desc: "Brzina razgradnje varira među osobama",
                  color: "text-yellow-500",
                },
                {
                  icon: Clock,
                  title: "Hrana i tempo",
                  desc: "Hrana usporava apsorpciju alkohola",
                  color: "text-blue-500",
                },
                {
                  icon: Scale,
                  title: "Snaga pića",
                  desc: "Veći ABV i veće porcije = brži rast promila",
                  color: "text-green-500",
                },
                {
                  icon: Shield,
                  title: "Genetika",
                  desc: "Nasljedni faktori utječu na metabolizam",
                  color: "text-indigo-500",
                },
              ].map((factor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (factor.title === "Hrana i tempo") {
                      setShowTajniKomponent(!showTajniKomponent);
                    }
                  }}
                >
                  <div
                    className={`p-3 rounded-full bg-muted/50 mb-4 ${factor.color}`}
                  >
                    <factor.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">
                    {factor.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {factor.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-12 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="inline-block mb-4 floating-icon">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Sigurnost je prioritet
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
              Alkotest aparati pomažu u procjeni razine alkohola, ali najbolji
              savjet je: ako pijete, ne vozite. Koristite javni prijevoz ili
              pozovite taksi.
            </p>
          </div>
        </div>
      </div>

      {showTajniKomponent && (
        <TajniKomponent onClose={() => setShowTajniKomponent(false)} />
      )}
    </div>
  );
}
