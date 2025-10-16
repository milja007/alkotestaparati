import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Sova from "@/components/Sova";

const ZapratiteMe = () => {
  return (
    <div className="grid" id="ZapratiteMe">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-2xl">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Phone
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                Kontaktirajte Nas
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Spremnan sam odgovoriti na sva vaša pitanja
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 lg:mb-8">
              <a
                href="mailto:kontakt@drpromil.com"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-2xl lg:hover:bg-white transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Email
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-primary lg:group-hover:text-accent transition-colors break-all">
                    kontakt@drpromil.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+385994171467"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-2xl lg:hover:bg-white transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Telefon
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-primary lg:group-hover:text-accent transition-colors">
                    +385 99 4171 467
                  </p>
                </div>
              </a>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent lg:hover:from-accent lg:hover:to-primary text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg lg:hover:shadow-xl transform lg:hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              asChild
            >
              <a href="tel:+385994171467">
                <Phone
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  aria-hidden="true"
                />
                Nazovite Odmah!
              </a>
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
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                Zapratite Me
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Budite u toku s najnovijim vijestima
              </p>
            </div>
            <div className="text-center mb-6">
              <Sova imageName="DrSocials.avif" className="mx-auto" />
            </div>

            {/* Social media buttons with custom icons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="mx-auto sm:mx-0">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 border-0 lg:hover:from-blue-600 lg:hover:to-blue-700 text-white lg:hover:text-white group lg:hover:scale-110 transition-all duration-300 shadow-lg lg:hover:shadow-xl rounded-2xl"
                  asChild
                >
                  <a
                    href="https://www.facebook.com/drpromil"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-12 h-12 lg:group-hover:scale-110 transition-transform"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
                  className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 border-0 lg:hover:from-purple-500 lg:hover:to-pink-500 text-white lg:hover:text-white group lg:hover:scale-110 transition-all duration-300 shadow-lg lg:hover:shadow-xl rounded-2xl"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/drpromil.hr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-12 h-12 lg:group-hover:scale-110 transition-transform"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
                  className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black border-0 lg:hover:from-black lg:hover:to-gray-800 text-white lg:hover:text-white group lg:hover:scale-110 transition-all duration-300 shadow-lg lg:hover:shadow-xl rounded-2xl"
                  asChild
                >
                  <a
                    href="https://www.tiktok.com/@drpromil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-12 h-12 lg:group-hover:scale-110 transition-transform"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
              className="w-full border-2 border-accent text-accent lg:hover:bg-accent lg:hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl lg:hover:scale-105 transition-all duration-300 bg-white/80 text-sm sm:text-base"
              asChild
            >
              <a
                href="https://www.instagram.com/drpromil.hr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pridružite Se Zajednici
              </a>
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
  );
};

export default ZapratiteMe;
