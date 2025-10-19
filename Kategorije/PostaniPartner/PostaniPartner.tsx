import {
  Building2,
  Handshake,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Sova from "@/components/Sova";

export default function PostaniPartner() {
  return (
    <section
      id="PostaniPartner"
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-fade-scale"></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-fade-scale"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/3 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-fade-scale"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-28 h-28 bg-primary/20 rounded-full blur-lg animate-fade-scale"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl py-16">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Partner Program</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight">
            Postanite Moj Partner
          </h1>
          <p className="text-xl md:text-2xl text-foreground max-w-4xl mx-auto leading-relaxed">
            Imate <span className="font-bold text-primary">pub</span> ,
            <span className="font-bold text-primary">klub</span>,
            <span className="font-bold text-primary">kafić</span> ili{" "}
            <span className="font-bold text-primary">restoran</span> u kojem se
            pije? Postanite moj partner i postavite
            <span className="font-bold text-accent"> alkotest aparat</span> u
            vašem lokalu!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: "Sigurnost Prvo",
              desc: "Povećajte sigurnost vaših gostiju s profesionalnim aparatima",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: TrendingUp,
              title: "Dodatni Prihod",
              desc: "Zarađujte bez rizika - dijelimo profit po dogovoru",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              icon: Handshake,
              title: "Pouzdano Partnerstvo",
              desc: "Transparentno poslovanje s redovitim izvještajima",
              gradient: "from-orange-500 to-amber-500",
            },
          ].map((benefit, index) => (
            <Card
              key={index}
              className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg lg:hover:shadow-2xl transition-all duration-500 lg:hover:-translate-y-2 animate-fade-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {benefit.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-16 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Sova imageName="DrUgovor.avif" className="mx-auto" />
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary">
                      Što nudim?
                    </h2>
                  </div>
                  <p className="text-foreground leading-relaxed text-lg">
                    Ako vam se moja ideja sviđa i imate mjesta na zidu. Dodajte
                    vašem lokalu{" "}
                    <span className="font-bold text-accent">zanimljivost</span>{" "}
                    i novi razlog dolaska. Nakon razgovora i dogovora mozda
                    ponudim vama i vašem lokalu moj{" "}
                    <span className="font-bold text-primary">
                      alkotest aparat.
                    </span>{" "}
                    Po uvjetima ambijenta dodajem vam i{" "}
                    <span className="font-bold text-accent">
                      personalizirani neonski znak
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary">
                      Kolika je cijena?
                    </h2>
                  </div>
                  <p className="text-foreground leading-relaxed text-lg">
                    Cijena postavljanja i sami aparat su{" "}
                    <span className="font-bold text-emerald-600">
                      besplatni
                    </span>
                    , a novac koji aparat proizvede ćemo podijeliti po postotku
                    tako da nema rizika za obje strane. Naš model poslovanja je
                    zasnovan na{" "}
                    <span className="font-bold text-accent">
                      zajedničkom uspjehu
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                <Image
                  src="/dimenzije.avif"
                  alt="Tehnički nacrt i dimenzije alkotest aparata"
                  width={300}
                  height={300}
                  className="relative object-contain bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    Održavanje?
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed text-lg">
                  Što se tiče vašeg dijela, samo mi osigurajte mjesto na zidu, a
                  redovan servis i vađenje kovanica održavam jednom mjesečno.
                  Trebam samo nadodati slamke, mijenjati senzore, kablove,
                  baterije, računalo i očistiti ga. To sve traje maksimalno sat
                  vremena mjesečno.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    Kako da znate da sam pošten?
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed text-lg">
                  Ni sove ni doktori ne muljaju u biznisu — a ja sam i sova i
                  doktor, pa nema greške. Uz to svako korištenje uređaja
                  evidentiram brojčano te na kraju mjeseca dostavljam
                  fotografiju ili video stanja, kako ne bi bilo nikakve zabune.
                  Transparentnost je ključ našeg partnerstva.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
