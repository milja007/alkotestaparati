"use client";

import { Button } from "@/components/ui/button";
import { Calculator, MapPin } from "lucide-react";
import styles from "./HeaderSection.module.css";

const ClientComponent = () => {
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className={styles.ctaContainer}>
      <Button
        size="lg"
        className="bg-secondary sm:hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold"
        onClick={() => scrollToSection("OnlineKalkulator")}
      >
        <Calculator className="w-5 h-5 mr-2" />
        Naš Online kalkulator
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="px-8 py-4 text-lg font-semibold border-primary text-primary sm:hover:bg-primary sm:hover:text-primary-foreground bg-transparent"
        onClick={() => scrollToSection("MojeLokacije")}
      >
        <MapPin className="w-5 h-5 mr-2" />
        Moje lokacije
      </Button>
    </div>
  );
};

export default ClientComponent;
