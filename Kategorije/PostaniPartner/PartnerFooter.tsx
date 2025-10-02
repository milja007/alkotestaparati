"use client";

import {
  Mail,
  Phone,
  Building2,
  Handshake,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Sova from "@/components/Sova";

export default function PartnerFooter() {
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
              className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
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
              <Sova imageName="DrUgovor.png" className="mx-auto" />
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
                  src="/assets/dimenzije.svg"
                  alt="Alkotest aparat dimenzije"
                  width={300}
                  height={300}
                  className="relative object-contain bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-2xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 lg:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Kontaktirajte Nas
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Spremnan sam odgovoriti na sva vaša pitanja
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-6 lg:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-2xl hover:bg-white transition-colors group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Email
                    </p>
                    <a
                      href="mailto:alkotestaparat@gmail.com"
                      className="text-sm sm:text-base lg:text-lg font-bold text-primary hover:text-accent transition-colors break-all"
                    >
                      alkotestaparat@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-2xl hover:bg-white transition-colors group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Telefon
                    </p>
                    <a
                      href="tel:+385994171467"
                      className="text-sm sm:text-base lg:text-lg font-bold text-primary hover:text-accent transition-colors"
                    >
                      +385 99 4171 467
                    </a>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Nazovite Odmah!
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-0 shadow-2xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 lg:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Pratite Me
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Budite u toku s najnovijim vijestima
                </p>
              </div>
              <div className="text-center mb-6">
                <Sova imageName="DrSocials.png" className="mx-auto" />
              </div>

              {/* Social media buttons with custom icons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="mx-auto sm:mx-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700 text-white hover:text-white group hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl"
                    asChild
                  >
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </Button>
                </div>

                <div className="mx-auto sm:mx-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-500 to-purple-500 border-0 hover:from-purple-500 hover:to-pink-500 text-white hover:text-white group hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl"
                    asChild
                  >
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </Button>
                </div>

                <div className="mx-auto sm:mx-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-800 to-black border-0 hover:from-black hover:to-gray-800 text-white hover:text-white group hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl"
                    asChild
                  >
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:scale-105 transition-all duration-300 bg-white/80 text-sm sm:text-base"
              >
                Pridružite Se Zajednici
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 pt-8 border-t border-primary/20 text-center">
          <p className="text-muted-foreground font-medium text-lg">
            &copy; 2025 Alkotest Partner Program. Sva prava zadržana.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Zajedno gradimo sigurniju budućnost
          </p>
        </div>
      </div>
    </section>
  );
}
