"use client";

import Stepper, { Step } from "../components/Stepper";
import Image from "next/image";

interface UsageInstructionsProps {
  productName?: string;
}

export function UsageInstructions({}: UsageInstructionsProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-card to-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-32 lg:mb-32">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4 ">
              Upute Korištenja
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center">
          <Stepper
            backButtonText="Nazad"
            nextButtonText="Dalje"
            finalContent={
              <div className="step-default responsive-medium">
                <div className="step-image-container">
                  <Image
                    src="/assets/CompleteKorak.png"
                    alt="Finalni korak"
                    className="step-image stepper-image"
                    width={780}
                    height={780}
                    sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 780px"
                    priority
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "780px",
                      margin: "0 auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
  );
}
