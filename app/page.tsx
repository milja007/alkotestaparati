"use client";
import styles from "./page.module.css";
import Map from "../komponente/Map";
import FaultyTerminal from "../components/FaultyTerminal";
import Stepper, { Step } from "../components/Stepper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      {/* FaultyTerminal animacija pozadina */}
      <FaultyTerminal
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#ff0000"
        mouseReact={true}
        mouseStrength={0.5}
        pageLoadAnimation={true}
        brightness={0.6}
        style={{
          backgroundColor: "#000000",
        }}
      />

      {/* Novi Hero Section */}
      <section className="relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 z-10">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
                  Provjeri i vozi{" "}
                  <span className="text-red-500 relative">
                    sigurno
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-pretty">
                  Pronađi najbliži profesionalni alkotester aparat u svom gradu.
                  Jednostavno, brzo i pouzdano.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium">Profesionalno</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium">Brzo</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium">Pouzdano</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() =>
                    document
                      .getElementById("lokacije")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Pronađi Lokacije
                </Button>
              </div>
            </div>

            {/* Right Content - Device Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-red-500/20">
                  <Image
                    src="/assets/1.korak.png"
                    alt="Profesionalni alkotester aparat"
                    width={400}
                    height={400}
                    className="w-full h-auto max-w-md mx-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>

      {/* Sekcija 2: Mapa s Lokacijama */}
      <section id="lokacije" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Naše Lokacije</h2>
          <div className={styles.mapContainer}>
            <Map />
          </div>
        </div>
      </section>

      {/* Sekcija 3: Upute za korištenje */}
      <section id="upute" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Upute Korištenja</h2>
          <div className={styles.uputeHighlights}>
            <div className={styles.highlightChip}>
              <span className={styles.highlightIcon}>✨</span>
              Brzo i intuitivno
            </div>
            <div className={styles.highlightChip}>
              <span className={styles.highlightIcon}>🧪</span>7 vizualnih koraka
            </div>
            <div className={styles.highlightChip}>
              <span className={styles.highlightIcon}>✅</span>
              Bez teksta — samo slike
            </div>
          </div>

          <div className={styles.uputeStepper}>
            <Stepper
              initialStep={1}
              contentClassName={styles.stepperContent}
              aria-label="Upute koraci"
              finalContent={
                <div className="step-image-container">
                  <Image
                    width={780}
                    height={780}
                    src="/assets/completeKorak.png"
                    alt="Final"
                    className={styles.stepperImage}
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

      {/* Sekcija 4: Edukativni Sadržaj */}
      <section id="savjeti" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Vozi Odgovorno: Što Trebaš Znati
          </h2>
          <div className={styles.adviceContainer}>
            <div className={styles.adviceCard}>
              <div className={styles.adviceIcon}>✅</div>
              <h3>Do 0.5‰</h3>
              <p>
                Zakonski dozvoljeno, ali oprez je i dalje nužan. Svaki organizam
                je drugačiji.
              </p>
            </div>

            <div className={styles.adviceCard}>
              <div className={styles.adviceIcon}>⚠️</div>
              <h3>Iznad 0.5‰</h3>
              <p>
                Ne sjedajte za volan. Pozovite taksi ili prijatelja. Sigurnost
                je na prvom mjestu.
              </p>
            </div>

            <div className={styles.adviceCard}>
              <div className={styles.adviceIcon}>💡</div>
              <h3>Važna Napomena</h3>
              <p>
                Aparat je tu kao pomoć, a ne kao zakonska osnova. Uvijek
                koristite zdrav razum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcija 5: Kontakt i Partnerstvo */}
      <section id="kontakt" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Kontaktirajte Nas ili Postanite Naš Partner
          </h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h3>Kontakt</h3>
              <p>📧 info@vasafirma.hr</p>
              <p>📱 +385 1 234 567</p>

              <h3>Društvene Mreže</h3>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  📱 Instagram
                </a>
                <a href="#" className={styles.socialIcon}>
                  🎵 TikTok
                </a>
                <a href="#" className={styles.socialIcon}>
                  📘 Facebook
                </a>
              </div>
            </div>

            <div className={styles.partnershipInfo}>
              <h3>Postanite Naš Partner</h3>
              <p>
                Imate kafić ili restoran? Postanite naš partner i postavite
                alkotest aparat u vašem lokalu!
              </p>
              <button className={styles.partnershipButton}>
                Kontaktirajte Nas
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
