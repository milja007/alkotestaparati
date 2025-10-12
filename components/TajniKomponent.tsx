import { useEffect } from "react";
import Sova from "./Sova";

interface TajniKomponentProps {
  onClose?: () => void;
}

export function TajniKomponent({ onClose }: TajniKomponentProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 sm:p-6 rounded-xl shadow-2xl border border-green-500/20 max-w-md w-full mx-auto relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 lg:hover:text-white text-2xl sm:text-xl font-bold z-10 bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
        <div className="text-center space-y-3 sm:space-y-4">
          <Sova
            imageName="DrZarulja.avif"
            className="mx-auto w-16 h-16 sm:w-20 sm:h-20"
          />
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-green-100 leading-relaxed text-left sm:text-center">
              Osim što se nakon konzumacije alkohola preporučuje dobar obrok i
              bezalkoholna pića, istraživanjem, korištenjem aparata i slušanjem
              na satima kemije došao sam do otkrića. Ključni element je – mast.
              Nije važno koje je porijeklo masti ili ulja, kemijski gledano,
              mast na sebe veže alkohol. Ako pojedete nešto masnije, dio
              alkohola iz usne šupljine neće dospjeti do pluća, već će završiti
              u želucu. Isto tako, ako imate maslinovo ulje, pa čak i melem ili
              labelo, možete to protresti u ustima i dobit ćete niži rezultat.
              Iako nećete postići 0.0 promila, rezultat će se značajno smanjiti.
              No, važno je napomenuti da vas ovo neće otrijezniti, već samo
              utjecati na mjerenje.
            </p>

            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded border border-white/20">
              <p className="text-xs sm:text-sm text-green-100 font-medium text-left sm:text-center">
                💡 Za pravo snižavanje promila u krvi i glavi, ključni su hrana,
                voda i najvažnije od svega – vrijeme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
