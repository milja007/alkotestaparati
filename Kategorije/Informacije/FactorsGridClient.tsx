"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { TajniKomponent } from "../../components/TajniKomponent";
import { Heart, Brain, Zap, Clock, Scale, Shield } from "lucide-react";

export function FactorsGridClient() {
  const [showTajniKomponent, setShowTajniKomponent] = useState(false);

  const factors = [
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
  ];

  return (
    <>
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
            {factors.map((factor, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border sm:hover:shadow-lg transition-all duration-300 cursor-pointer"
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

      {showTajniKomponent && (
        <TajniKomponent onClose={() => setShowTajniKomponent(false)} />
      )}
    </>
  );
}
