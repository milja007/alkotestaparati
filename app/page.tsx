"use client";
import styles from "./page.module.css";
import Map from "../komponente/Map";
import Stepper, { Step } from "../components/Stepper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiShield, FiClock, FiMapPin } from "react-icons/fi";
import AlchotestKalkulator from "../komponente/AlchotestKalkulator";
import { AlcoholInfoSection } from "../komponente/Alcohol-info-section";
import PartnerFooter from "../komponente/PartnerFooter";

export default function Home() {
  return (
    <div className="page-background">
      {/* Hero Section */}

      <section
        className={`${styles.hero} hero-bg-home relative overflow-hidden min-h-screen`}
      >
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
              <div className="cta-wrap pt-2 mt-3 md:mt-4 lg:mt-6 mb-8">
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
      <section id="lokacije" className={`${styles.section} section-background`}>
        <div className="container">
          <h2 className="section-title">Naše Lokacije</h2>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </section>

      {/* Sekcija 3: Upute za korištenje */}
      <section id="upute" className={`${styles.section} section-background`}>
        <div className="container">
          <h2 className="section-title">Kako Koristiti naš Aparat?</h2>
          <div className="upute-highlights"></div>

          <div className="upute-stepper">
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
