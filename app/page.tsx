"use client";
import styles from "./page.module.css";
import Map from "../komponente/Map";
import Stepper, { Step } from "../components/Stepper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div
      className={styles.pageWrapper}
      style={{
        background:
          "linear-gradient(to bottom right, #000000, #374151, #991b1b)",
      }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Main Content */}
            <div className="max-w-4xl space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Provjeri i vozi{" "}
                  <span className="text-red-500 relative">
                    sigurno
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Pronađi najbliži profesionalni alkotester aparat u svom gradu.
                  Jednostavno, brzo i pouzdano.
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-3 bg-red-600/20 rounded-xl">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-lg font-medium">Profesionalno</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-3 bg-red-600/20 rounded-xl">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-lg font-medium">Brzo</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-3 bg-red-600/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-lg font-medium">Pouzdano</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() =>
                    document
                      .getElementById("lokacije")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <MapPin className="w-6 h-6 mr-3" />
                  Pronađi Lokacije
                </Button>
              </div>
            </div>

            {/* Device Image - Below Content */}
            <div className="relative mt-16">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-red-500/20 max-w-md mx-auto">
                  <Image
                    src="/assets/1.korak.png"
                    alt="Profesionalni alkotester aparat"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl"></div>
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
