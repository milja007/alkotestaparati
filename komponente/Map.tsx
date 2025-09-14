"use client";
import Image from "next/image";
import { useEffect, useRef, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Vaš Mapbox access token
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWlsamEwMDciLCJhIjoiY21ld3Rncm9oMGp1dTJqcjFvOTkzaHB2MiJ9.ts703Zeabqe9IVm7beTAKw";

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Koordinate za Zagreb centar i 3 bliska lokacije s poboljšanim podacima
  const locations = useMemo(
    () => [
      {
        id: 0,
        name: "Harat's Pub",
        coordinates: [15.9776849, 45.8148249] as [number, number],
        description: "Harat's Irish Pub kod trznice Dolac uz veliki izbor piva",
        rating: 4.2,
        reviewCount: 127,
        businessType: "Irish Pub",
        avgSpending: "11-16 €",
        photos: [
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
        ],
        address: "Dolac 2, 10000 Zagreb",
        phone: "+385 1 4814 899",
        googleMapsUrl:
          "https://www.google.com/maps/place/Harat's+Pub/@45.8148286,15.9751046,17z/data=!4m14!1m7!3m6!1s0x4765d70271927e99:0x8cd74ff66755eca3!2sHarat's+Pub!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_!3m5!1s0x4765d70271927e99:0x8cd74ff66755eca3!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Attraction_Review-g294454-d10449134-Reviews-Harat_s_Irish_Pub-Zagreb_Central_Croatia.html",
      },
      {
        id: 1,
        name: "OUT Bunker Nightclub",
        coordinates: [15.9710048, 45.8133541] as [number, number],
        description:
          "OUT Bunker Nightclub na Ilici - mjesto za mladu populaciju",
        rating: 4.0,
        reviewCount: 89,
        businessType: "Nightclub",
        avgSpending: "13-20 €",
        photos: [
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        ],
        address: "Ilica 242, 10000 Zagreb",
        phone: "+385 1 4833 444",
        googleMapsUrl:
          "https://www.google.com/maps/place/OUT+Bunker+Nightclub/@45.8133639,15.9551473,15z/data=!3m1!4b1!4m6!3m5!1s0x4765d7c25fd45d5f:0x2f8a716d8e37bd76!8m2!3d45.8133504!4d15.9735797!16s%2Fg%2F11j7btnp1b?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Attraction_Review-g294454-d25788815-Reviews-OUT_Bunker-Zagreb_Central_Croatia.html",
      },
      {
        id: 2,
        name: "The Old Pharmacy",
        coordinates: [15.9724083, 45.8089789] as [number, number],
        description: "The Old Pharmacy Pub - mjesto za odmor, rad i zabavu",
        rating: 4.5,
        reviewCount: 203,
        businessType: "Cocktail Bar",
        avgSpending: "12-17 €",
        photos: [
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
        ],
        address: "Tkalčićeva 58, 10000 Zagreb",
        phone: "+385 1 4811 300",
        googleMapsUrl:
          "https://www.google.com/maps/place/The+Old+Pharmacy/@45.808983,15.9723891,17z/data=!3m1!4b1!4m6!3m5!1s0x4765d6fbeedc063b:0x3f9e8c4eee9c5cd7!8m2!3d45.8089793!4d15.9749694!16s%2Fg%2F1tg4k56r?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.tripadvisor.com/Restaurant_Review-g294454-d2645920-Reviews-Old_Pharmacy_Pub-Zagreb_Central_Croatia.html",
      },
      {
        id: 3,
        name: "cONLee BAR",
        coordinates: [15.6553596, 45.6740704] as [number, number],
        description: "cONLee BAR - mjesto za rad dobro pivo i zabavu",
        rating: 5.0,
        reviewCount: 6,
        businessType: "Bar",
        avgSpending: "5-10 €",
        photos: [
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
        ],
        address: "Ul. Antuna Mihanovića 14, 10450, Jastrebarsko",
        phone: "09123003400",
        googleMapsUrl:
          "https://www.google.com/maps/place/cONLee+BAR/@45.6740471,15.6553774,19.4z/data=!4m6!3m5!1s0x4764338e1ebff2f9:0xf22b7db73d6def56!8m2!3d45.6740313!4d15.6555191!16s%2Fg%2F11xk_lcqf9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
        tripAdvisorUrl:
          "https://www.facebook.com/people/cONLee-BAR/61577259976283/#",
      },
    ],
    []
  );

  // Funkcija za navigaciju kroz slike
  useEffect(() => {
    // Dodaj globalnu funkciju za navigaciju kroz slike
    (
      window as unknown as {
        changeImage: (locationId: number, direction: number) => void;
      }
    ).changeImage = (locationId: number, direction: number) => {
      const popupContent = document.querySelector(
        `[data-location-id="${locationId}"]`
      );
      if (!popupContent) return;

      const location = locations.find((loc) => loc.id === locationId);
      if (!location) return;

      const mainImage = popupContent.querySelector(
        ".main-image"
      ) as HTMLImageElement;

      if (!mainImage) return;

      // Dohvati trenutni indeks iz data atributa ili postavi na 0
      let currentIndex = parseInt(
        popupContent.getAttribute("data-current-image") || "0"
      );
      currentIndex += direction;

      // Wrap around
      if (currentIndex < 0) currentIndex = location.photos.length - 1;
      if (currentIndex >= location.photos.length) currentIndex = 0;

      // Ažuriraj sliku i indeks
      mainImage.src = location.photos[currentIndex];
      popupContent.setAttribute("data-current-image", currentIndex.toString());

      // Prikaži/sakrij strelice ovisno o poziciji
      const prevBtn = popupContent.querySelector(
        ".prev-btn"
      ) as HTMLButtonElement;
      const nextBtn = popupContent.querySelector(
        ".next-btn"
      ) as HTMLButtonElement;
      const imageNav = popupContent.querySelector(
        ".image-nav"
      ) as HTMLDivElement;

      if (prevBtn) {
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
      }
      if (nextBtn) {
        nextBtn.style.display = "flex"; // Uvijek prikaži desnu strelicu
      }

      // Promijeni CSS klasu za pozicioniranje
      if (imageNav) {
        if (currentIndex === 0) {
          imageNav.className = "image-nav right-only";
        } else {
          imageNav.className = "image-nav both-arrows";
        }
      }
    };
  }, [locations]);

  useEffect(() => {
    if (map.current) return; // Inicijaliziraj mapu samo jednom

    if (mapContainer.current) {
      // Postavi access token globalno
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [15.9734885, 45.813173],
        zoom: 9,
      });

      // Dodaj navigation kontrole
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "top-left"
      );

      // Dodaj markere za sve lokacije
      locations.forEach((location) => {
        // Kreiraj custom marker element s vašom ikonom
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.innerHTML = `<img src="/assets/location-pin.png" alt="${location.name}" />`;

        // Dodaj marker na mapu
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .addTo(map.current!);

        // Dodaj kompaktni popup s jednom slikom
        const popup = new mapboxgl.Popup({
          offset: [0, -10], // Otvara se odozgo
          maxWidth: "240px",
          className: "compact-popup",
        }).setHTML(`
            <div class="compact-popup-content" data-location-id="${
              location.id
            }" data-current-image="0" data-google-maps-url="${
          location.googleMapsUrl
        }" style="cursor: pointer;">
              <!-- Glavna slika s navigacijom -->
              <div class="popup-image-container">
                <img src="${location.photos[0]}" alt="${
          location.name
        }" class="main-image" style="width: 100%; height: 100%; object-fit: cover;" />
                <div class="image-nav right-only">
                  <button class="nav-btn prev-btn" onclick="event.stopPropagation(); changeImage(${
                    location.id
                  }, -1)">‹</button>
                  <button class="nav-btn next-btn" onclick="event.stopPropagation(); changeImage(${
                    location.id
                  }, 1)">›</button>
                </div>

              </div>
              
              <!-- Sadržaj -->
              <div class="popup-body">
                <div class="popup-main">
                  <h3 class="popup-title">${location.name}</h3>
                  <div class="popup-rating">
                    <div class="stars">
                      ${Array.from(
                        { length: 5 },
                        (_, i) =>
                          `<span class="star ${
                            i < Math.floor(location.rating) ? "filled" : ""
                          }">★</span>`
                      ).join("")}
                    </div>
                    <span class="rating-text">${location.rating} (${
          location.reviewCount
        })</span>
                    <span class="directions-icon">⤴️</span>
                  </div>
                  <div class="business-info">
                    <span class="business-type">${location.businessType}</span>
                    <span class="avg-spending">${location.avgSpending}</span>
                  </div>
                </div>
              </div>
            </div>
          `);

        marker.setPopup(popup);

        // Postavi početno stanje strelica kada se popup otvori
        marker.getElement().addEventListener("click", () => {
          setTimeout(() => {
            const popupContent = document.querySelector(
              `[data-location-id="${location.id}"]`
            );
            if (popupContent) {
              const prevBtn = popupContent.querySelector(
                ".prev-btn"
              ) as HTMLButtonElement;
              const nextBtn = popupContent.querySelector(
                ".next-btn"
              ) as HTMLButtonElement;

              if (prevBtn) prevBtn.style.display = "none";
              if (nextBtn) nextBtn.style.display = "flex";

              // Dodaj event listener za klik na popup (osim na strelice)
              const handlePopupClick = (e: Event) => {
                const target = e.target as HTMLElement;
                // Ako je klik na strelicu ili unutar image-nav, ne otvaraj Google Maps
                if (
                  target.closest(".image-nav") ||
                  target.closest(".nav-btn")
                ) {
                  return;
                }
                // Otvori Google Maps
                const googleMapsUrl = popupContent.getAttribute(
                  "data-google-maps-url"
                );
                if (googleMapsUrl) {
                  window.open(googleMapsUrl, "_blank");
                }
              };

              // Ukloni postojeći event listener ako postoji
              popupContent.removeEventListener("click", handlePopupClick);
              // Dodaj novi event listener
              popupContent.addEventListener("click", handlePopupClick);
            }
          }, 100);
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [locations]);

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <div ref={mapContainer} className="map" />
      </div>

      {/* Minijaturne lokacije ispod mape */}
      <div className="mini-locations-grid">
        {locations.map((location) => (
          <div
            key={location.id}
            className="mini-location-card"
            onClick={() => window.open(location.googleMapsUrl, "_blank")}
            style={{ cursor: "pointer" }}
          >
            <div className="mini-popup-image-container">
              <Image
                src={location.photos[0]}
                alt={location.name}
                className="mini-main-image"
                width={200}
                height={100}
                priority={location.id === 0}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="mini-popup-body">
              <div className="mini-popup-main">
                <h3 className="mini-popup-title">{location.name}</h3>
                <div className="mini-popup-rating">
                  <div className="mini-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`mini-star ${
                          i < Math.floor(location.rating) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="mini-rating-text">
                    {location.rating} ({location.reviewCount})
                  </span>
                  <span className="mini-directions-icon">⤴️</span>
                </div>
                <div className="mini-business-info">
                  <span className="mini-business-type">
                    {location.businessType}
                  </span>
                  <span className="mini-avg-spending">
                    {location.avgSpending}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .map-container {
          padding: 20px;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .map-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .map {
          width: 100%;
          height: 500px;
        }

        /* Minijaturne lokacije grid ispod mape */
        .mini-locations-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          margin-top: 20px;
        }

        /* Na md ekranima - 2 kolone */
        @media (min-width: 768px) {
          .mini-locations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
        }

        /* Na lg ekranima - 3-4 kolone */
        @media (min-width: 1024px) {
          .mini-locations-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
        }

        /* Na xl ekranima - 4 kolone */
        @media (min-width: 1280px) {
          .mini-locations-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
          }
        }

        .mini-location-card {
          background: #000000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 200px;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .mini-location-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 0, 0, 0.3);
        }

        .mini-popup-image-container {
          position: relative;
          width: 100%;
          height: 80px;
          overflow: hidden;
        }

        .mini-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mini-popup-body {
          padding: 6px;
        }

        .mini-popup-main {
          margin-bottom: 2px;
        }

        .mini-popup-title {
          margin: 0 0 3px 0;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.2;
        }

        .mini-popup-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 2px;
          justify-content: flex-start;
        }

        .mini-stars {
          display: flex;
          gap: 1px;
        }

        .mini-star {
          color: #ddd;
          font-size: 8px;
        }

        .mini-star.filled {
          color: #ffc107;
        }

        .mini-rating-text {
          color: #cccccc;
          font-size: 7px;
          font-weight: 500;
        }

        .mini-business-info {
          display: flex;
          gap: 3px;
          margin-bottom: 2px;
        }

        .mini-business-type {
          background: rgba(255, 255, 255, 0.15);
          color: #e0e0e0;
          padding: 1px 3px;
          border-radius: 2px;
          font-size: 6px;
          font-weight: 500;
        }

        .mini-avg-spending {
          background: rgba(255, 0, 0, 0.2);
          color: #ff6666;
          padding: 1px 3px;
          border-radius: 2px;
          font-size: 6px;
          font-weight: 500;
        }

        .mini-directions-icon {
          font-size: 10px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Custom marker stilovi */
        :global(.custom-marker) {
          cursor: pointer;
        }

        :global(.custom-marker img) {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        /* Mapbox popup stilovi */
        :global(.mapboxgl-popup-content) {
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding: 16px !important;
          background: #000000 !important;
        }

        :global(.mapboxgl-popup-close-button) {
          font-size: 20px !important;
          color: #ffffff !important;
          padding: 10px !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          background-color: rgba(255, 0, 0, 0.8) !important;
          border: 2px solid #ffffff !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: bold !important;
        }

        :global(.mapboxgl-popup-close-button:hover) {
          color: #ffffff !important;
          background-color: #ff0000 !important;
          border-color: #ffffff !important;
          transform: scale(1.1) !important;
          box-shadow: 0 2px 8px rgba(255, 0, 0, 0.4) !important;
        }

        :global(.mapboxgl-ctrl-group) {
          border: 2px solid rgba(0, 0, 0, 0.2) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
          border-radius: 8px !important;
        }

        :global(.mapboxgl-ctrl-group button) {
          border: none !important;
          background: white !important;
          color: #333 !important;
        }

        :global(.mapboxgl-ctrl-group button:hover) {
          background: #f8f9fa !important;
        }

        /* Kompaktni popup stilovi */
        :global(.compact-popup .mapboxgl-popup-content) {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          overflow: hidden !important;
          max-width: 240px !important;
          background: #000000 !important;
        }

        :global(.compact-popup-content) {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          color: #ffffff;
        }

        :global(.popup-image-container) {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }

        :global(.main-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          max-width: 100%;
          max-height: 100%;
        }

        :global(.image-nav) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 0 8px;
          pointer-events: none;
        }

        :global(.nav-btn) {
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.2s ease;
          pointer-events: all;
        }

        :global(.image-nav.both-arrows) {
          justify-content: space-between;
        }

        :global(.image-nav.right-only) {
          justify-content: flex-end;
        }

        :global(.nav-btn:hover) {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        :global(.popup-body) {
          padding: 8px;
        }

        :global(.popup-main) {
          margin-bottom: 4px;
        }

        :global(.popup-title) {
          margin: 0 0 4px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        :global(.popup-rating) {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 3px;
          justify-content: flex-start;
        }

        :global(.stars) {
          display: flex;
          gap: 1px;
        }

        :global(.star) {
          color: #ddd;
          font-size: 12px;
        }

        :global(.star.filled) {
          color: #ffc107;
        }

        :global(.rating-text) {
          color: #cccccc;
          font-size: 10px;
          font-weight: 500;
        }

        :global(.business-info) {
          display: flex;
          gap: 6px;
          margin-bottom: 4px;
        }

        :global(.business-type) {
          background: rgba(255, 255, 255, 0.1);
          color: #cccccc;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 500;
        }

        :global(.avg-spending) {
          background: rgba(255, 0, 0, 0.2);
          color: #ff6666;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 500;
        }

        :global(.directions-icon) {
          font-size: 20px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Stari popup stilovi za kompatibilnost */
        :global(.popup-content h3) {
          margin: 0 0 8px 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }

        :global(.popup-content p) {
          margin: 0;
          color: #cccccc;
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
