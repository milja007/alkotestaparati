// ==========================================
// PODACI O LOKACIJAMA - KLIJENTI
// ==========================================

export const locationsData = {
  hero: {
    title: "Moje Lokacije",
    subtitle:
      "Otkrijte moje partnere u Zagrebu i okolici. Svaka lokacija nudi jedinstveno iskustvo s odličnim pićem, zabavom i naravno mojim alkotest aparatom.",
    stats: {
      count: "4+",
      label: "Lokacije",
    },
  },
  mapConfig: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    defaultCenter: [15.9734885, 45.813173],
    defaultZoom: 9,
    styles: {
      streets: "mapbox://styles/mapbox/streets-v12",
      satellite: "mapbox://styles/mapbox/satellite-streets-v12",
      light: "mapbox://styles/mapbox/light-v11",
      dark: "mapbox://styles/mapbox/dark-v11",
    },
  },
  locations: [
    {
      id: 0,
      name: "OUT Bunker Nightclub",
      coordinates: [15.9710048, 45.8133541],
      description: "OUT Bunker Nightclub na Ilici - mjesto za mladu populaciju",
      businessType: "Nightclub",
      avgSpending: "13-20 €",
      photo: "/assets/Bunker.webp",
      photoAvif: "/assets/Bunker.avif",
      address: "Ilica 242, 10000 Zagreb",
      googleMapsUrl:
        "https://www.google.com/maps/place/OUT+Bunker+Nightclub/@45.8133639,15.9551473,15z/data=!3m1!4b1!4m6!3m5!1s0x4765d7c25fd45d5f:0x2f8a716d8e37bd76!8m2!3d45.8133504!4d15.9735797!16s%2Fg%2F11j7btnp1b?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
      apparatusImage: "/assets/BunkerAparat.avif",
      upute:
        "Kada gledate ravno u wc, krenite lijevo i hodajte ravno dok sa desne strane ne vidite ulaz u prostoriju gdje se nalazi aparat sa vase lijeve strane.",
    },
    {
      id: 1,
      name: "Harat's Pub",
      coordinates: [15.9776849, 45.8148249],
      description: "Harat's Irish Pub kod trznice Dolac uz veliki izbor piva",
      businessType: "Irish Pub",
      avgSpending: "11-16 €",
      photo: "/assets/Harats.webp",
      photoAvif: "/assets/Harats.avif",
      address: "Dolac 2, 10000 Zagreb",
      googleMapsUrl:
        "https://www.google.com/maps/place/Harat's+Pub/@45.8148286,15.9751046,17z/data=!4m14!1m7!3m6!1s0x4765d70271927e99:0x8cd74ff66755eca3!2sHarat's+Pub!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_!3m5!1s0x4765d70271927e99:0x8cd74ff66755eca3!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
      apparatusImage: "/assets/HaratsAparat.avif",
      upute:
        "Nakon šanka desno hodate ravno dok sa desne strane ne vidite game room u kojem se nalazi aparat pored pikada.",
    },
    {
      id: 2,
      name: "The Old Pharmacy",
      coordinates: [15.9724083, 45.8089789],
      description: "The Old Pharmacy Pub - mjesto za odmor, rad i zabavu",
      businessType: "Cocktail Bar",
      avgSpending: "12-17 €",
      photo: "/assets/Pharmacy.webp",
      photoAvif: "/assets/Pharmacy.avif",
      address: "Tkalčićeva 58, 10000 Zagreb",
      googleMapsUrl:
        "https://www.google.com/maps/place/The+Old+Pharmacy/@45.808983,15.9723891,17z/data=!3m1!4b1!4m6!3m5!1s0x4765d6fbeedc063b:0x3f9e8c4eee9c5cd7!8m2!3d45.8089793!4d15.9749694!16s%2Fg%2F1tg4k56r?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
      apparatusImage: "/assets/PharmacyAparat.avif",
      upute:
        "Kad uočite šank, skrenete desno pa hodajte ravno prema wcu i po putu će biti na zidu sa desne strane.",
    },
    {
      id: 3,
      name: "cONLee BAR",
      coordinates: [15.6553596, 45.6740704],
      description: "cONLee BAR - mjesto za rad dobro pivo i zabavu",
      businessType: "Bar",
      avgSpending: "5-10 €",
      photo: "/assets/Conlee.webp",
      photoAvif: "/assets/Conlee.avif",
      address: "Ul. Antuna Mihanovića 14, 10450, Jastrebarsko",
      googleMapsUrl:
        "https://www.google.com/maps/place/cONLee+BAR/@45.6740471,15.6553774,19.4z/data=!4m6!3m5!1s0x4764338e1ebff2f9:0xf22b7db73d6def56!8m2!3d45.6740313!4d15.6555191!16s%2Fg%2F11xk_lcqf9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
      apparatusImage: "/assets/ConleeAparat.avif",
      upute:
        "Kada vidite šank odma ga vidite na zidu lijevo izmedu wc-a i tv-a.",
    },
  ],
  mapButton: {
    showMore: "Pronađi u objektu",
  },
};
