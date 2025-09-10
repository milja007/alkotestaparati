"use client";
import styles from "./page.module.css";
import Map from "../komponente/Map";
import Stepper, { Step } from "../components/Stepper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiShield, FiClock, FiMapPin } from "react-icons/fi";

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
                  <span className="block lg:block">Provjeri</span>
                  <span className="block lg:block">
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
            <div className="relative flex justify-center">
              <div className="relative z-10">
                <div
                  className={`${styles.deviceImageContainer} bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-500/20`}
                >
                  <Image
                    src="/assets/1.korak.png"
                    alt="Profesionalni alkotester aparat"
                    width={300}
                    height={300}
                    className="w-3/4 h-3/4 object-contain rounded-lg"
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
      <section id="lokacije" className={`${styles.section} section-background`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Naše Lokacije</h2>
          <div className={styles.mapContainer}>
            <Map />
          </div>
        </div>
      </section>

      {/* Sekcija 3: Upute za korištenje */}
      <section id="upute" className={`${styles.section} section-background`}>
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
      <section id="savjeti" className={`${styles.section} section-background`}>
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
      <section id="kontakt" className={`${styles.section} section-background`}>
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
