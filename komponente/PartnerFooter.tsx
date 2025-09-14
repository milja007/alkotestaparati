import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PartnerFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Postanite Naš Partner!
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Imate <strong>kafić</strong> ili <strong>restoran</strong>?
            Postanite naš partner i postavite
            <strong> alkotest aparat</strong> u vašem lokalu!
          </p>
        </div>

        <div className="space-y-12">
          {/* Information Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-balance text-white mb-4">
                Što nudimo?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Ako vam se naša ideja sviđa, imate mjesta na zidu i želite vašem
                lokalu dodati <strong>zanimljivost</strong> i novi razlog
                dolaska, nakon razgovora i dogovora nudimo vama i vašem lokalu
                naš <strong>alkotest aparat</strong> i po uvjetima ambijenta{" "}
                <strong>personalizirani neonski znak</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Kolika je cijena?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Cijena postavljanja i sami aparat su <strong>besplatni</strong>,
                a novac koji aparat proizvede ćemo podijeliti po postotku tako
                da nema rizika za obje strane. Naš model poslovanja je zasnovan
                na
                <strong> zajedničkom uspjehu</strong> - što više korisnika
                imate, to više zarađujemo oboje.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Održavanje?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    Što se tiče vašeg dijela, samo nam osigurajte mjesto na
                    zidu, a redovan servis i vađenje kovanica održavamo jednom
                    mjesečno. Trebamo samo nadodati slamke, mijenjati senzore,
                    kablove, baterije, računalo i očistiti ga. To sve traje
                    maksimalno sat vremena mjesečno (uglavnom zadnji dan u
                    mjesecu).
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/assets/dimenzije.svg"
                    alt="Alkotest aparat dimenzije"
                    width={200}
                    height={200}
                    className="object-contain"
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

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Kako da znate da smo pošteni?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Svako korištenje aparata evidentirano je brojkom koju pokazujemo
                fotografijom ili videom na kraju mjeseca da nema zabune o
                brojnom stanju. Transparentnost je ključ našeg partnerstva.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Zašto baš mi?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Naši aparati su <strong>profesionalno kalibrirani</strong> i
                održavani, pružajući točne rezultate. Imamo iskustvo u
                <strong> gastroindustriji</strong> i razumijemo potrebe vaših
                gostiju. Naš tim je dostupan 24/7 za podršku.
              </p>
            </div>
          </div>

          {/* Contact & Social Section - Bottom */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Kontakt</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a
                    href="mailto:alkotestaparat@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    alkotestaparat@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a
                    href="tel:+385994171467"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +385 99 4171 467
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Pratite nas na društvenim mrežama
              </h3>
              <div className="flex gap-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-blue-600 hover:border-blue-600 text-blue-500 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-blue-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-600 text-pink-500 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-pink-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-gray-600 hover:bg-black hover:border-gray-400 text-gray-300 hover:text-white p-4 group"
                  asChild
                >
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z" />
                    </svg>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Alkotest Partner Program. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
