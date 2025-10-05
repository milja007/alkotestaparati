import MapComponent from "./Map";
import Sova from "../../components/Sova";
export default function Mapa() {
  return (
    <main
      id="MojeLokacije"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
    >
      {/* Hero Section with Locations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className=" mb-16 flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 text-balance">
              Moje Lokacije
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
              Otkrijte moje partnere u Zagrebu i okolici. Svaka lokacija nudi
              jedinstveno iskustvo s odličnim pićem, zabavom i naravno mojim
              alkotest aparatom.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <Sova imageName="DrKarta.webp" />
              </div>
              <div className="text-center mt-18">
                <div className="text-3xl font-bold text-secondary">4+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Lokacije
                </div>
              </div>
            </div>
          </div>

          {/* Map Component with Modern Wrapper */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-xl"></div>

            {/* Map Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative">
                <MapComponent />
              </div>
            </div>
          </div>

          {/* Call to Action */}
        </div>
      </section>
    </main>
  );
}
