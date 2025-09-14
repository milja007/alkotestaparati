import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AlertTriangle, Scale, Clock, Car, Zap } from "lucide-react";

export function AlcoholInfoSection() {
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
