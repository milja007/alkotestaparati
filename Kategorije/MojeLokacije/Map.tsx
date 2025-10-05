"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import type mapboxgl from "mapbox-gl"; // samo tipovi, runtime ide kroz dynamic import
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox access token
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Stilovi
const STYLES = {
  streets: "mapbox://styles/mapbox/streets-v12",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
} as const;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [showApparatusInfo, setShowApparatusInfo] = useState(false);
  const [mapStyle, setMapStyle] = useState<keyof typeof STYLES>("streets");

  const locations = useMemo(
    () => [
      {
        id: 0,
        name: "OUT Bunker Nightclub",
        coordinates: [15.9710048, 45.8133541] as [number, number],
        description:
          "OUT Bunker Nightclub na Ilici - mjesto za mladu populaciju",
        businessType: "Nightclub",
        avgSpending: "13-20 €",
        photo: "/assets/Bunker.webp",
        address: "Ilica 242, 10000 Zagreb",
        googleMapsUrl:
          "https://www.google.com/maps/place/OUT+Bunker+Nightclub/@45.8133639,15.9551473,15z/data=!3m1!4b1!4m6!3m5!1s0x4765d7c25fd45d5f:0x2f8a716d8e37bd76!8m2!3d45.8133504!4d15.9735797!16s%2Fg%2F11j7btnp1b?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        apparatusImage: "/assets/BunkerAparat.webp",
        upute:
          "Kada gledate ravno u wc, krenite lijevo i hodajte ravno dok sa desne strane ne vidite ulaz u prostoriju gdje se nalazi aparat sa vase lijeve strane.",
      },

      {
        id: 1,
        name: "Harat's Pub",
        coordinates: [15.9776849, 45.8148249] as [number, number],
        description: "Harat's Irish Pub kod trznice Dolac uz veliki izbor piva",
        businessType: "Irish Pub",
        avgSpending: "11-16 €",
        photo: "/assets/Harats.webp",
        address: "Dolac 2, 10000 Zagreb",
        googleMapsUrl:
          "https://www.google.com/maps/place/Harat's+Pub/@45.8148286,15.9751046,17z/data=!4m14!1m7!3m6!1s0x4765d70271927e99:0x8cd74ff66755eca3!2sHarat's+Pub!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_!3m5!1s0x4765d70271927e99:0x8cd74ff66755eca3!8m2!3d45.8148249!4d15.9776849!16s%2Fg%2F11b6v6_ms_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        apparatusImage: "/assets/HaratsAparat.webp",
        upute:
          "Nakon šanka desno hodate ravno dok sa desne strane ne vidite game room u kojem se nalazi aparat pored pikada.",
      },
      {
        id: 2,
        name: "The Old Pharmacy",
        coordinates: [15.9724083, 45.8089789] as [number, number],
        description: "The Old Pharmacy Pub - mjesto za odmor, rad i zabavu",
        businessType: "Cocktail Bar",
        avgSpending: "12-17 €",
        photo: "/assets/Pharmacy.webp",
        address: "Tkalčićeva 58, 10000 Zagreb",
        googleMapsUrl:
          "https://www.google.com/maps/place/The+Old+Pharmacy/@45.808983,15.9723891,17z/data=!3m1!4b1!4m6!3m5!1s0x4765d6fbeedc063b:0x3f9e8c4eee9c5cd7!8m2!3d45.8089793!4d15.9749694!16s%2Fg%2F1tg4k56r?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        apparatusImage: "/assets/PharmacyAparat.webp",
        upute:
          "Kad uočite šank, skrenete desno pa hodajte ravno prema wcu i po putu će biti na zidu sa desne strane.",
      },
      {
        id: 3,
        name: "cONLee BAR",
        coordinates: [15.6553596, 45.6740704] as [number, number],
        description: "cONLee BAR - mjesto za rad dobro pivo i zabavu",
        businessType: "Bar",
        avgSpending: "5-10 €",
        photo: "/assets/Conlee.webp",
        address: "Ul. Antuna Mihanovića 14, 10450, Jastrebarsko",
        googleMapsUrl:
          "https://www.google.com/maps/place/cONLee+BAR/@45.6740471,15.6553774,19.4z/data=!4m6!3m5!1s0x4764338e1ebff2f9:0xf22b7db73d6def56!8m2!3d45.6740313!4d15.6555191!16s%2Fg%2F11xk_lcqf9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
        apparatusImage: "/assets/ConleeAparat.webp",
        upute:
          "Kada vidite šank odma ga vidite na zidu lijevo izmedu wc-a i tv-a.",
      },
    ],
    []
  );

  useEffect(() => {
    if (map.current) return; // init samo jednom

    const initializeMap = async () => {
      if (!mapContainer.current || !MAPBOX_ACCESS_TOKEN) return;
      try {
        const mapboxModule = await import("mapbox-gl");
        const M = mapboxModule.default as typeof mapboxgl;

        (M as typeof mapboxgl & { accessToken: string }).accessToken =
          MAPBOX_ACCESS_TOKEN;

        map.current = new M.Map({
          container: mapContainer.current,
          style: STYLES[mapStyle], // default streets
          center: [15.9734885, 45.813173],
          zoom: 9,
        });

        map.current.addControl(new M.NavigationControl(), "top-right");
        map.current.addControl(
          new M.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          }),
          "top-left"
        );

        // Markeri + popupovi
        locations.forEach((location) => {
          const markerEl = document.createElement("div");
          markerEl.className = "custom-marker";
          markerEl.innerHTML = `<img src="/assets/DrPin.webp" alt="Location" class="location-pin-image" />`;

          const marker = new M.Marker(markerEl)
            .setLngLat(location.coordinates)
            .addTo(map.current!);

          const popup = new M.Popup({
            offset: [0, -10],
            maxWidth: "200px",
            className: "modern-popup",
            closeButton: false,
          }).setHTML(`
            <div class="modern-popup-content" data-location-id="${location.id}" data-google-maps-url="${location.googleMapsUrl}" style="cursor: pointer;">
              <button class="custom-close-btn" onclick="event.stopPropagation(); this.closest('.mapboxgl-popup').remove();" title="Zatvori">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div class="popup-image-container">
                <img src="${location.photo}" alt="${location.name}" class="main-image" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="popup-body">
                <div class="popup-main">
                  <h3 class="popup-title">${location.name}</h3>
                  <p class="popup-description">${location.description}</p>
                  <div class="popup-meta">
                    <div class="popup-meta-left">
                      <span class="business-type">${location.businessType}</span>
                      <span class="avg-spending">${location.avgSpending}</span>
                    </div>
                    <span class="directions-icon">→</span>
                  </div>
                </div>
              </div>
            </div>
          `);

          marker.setPopup(popup);

          marker.getElement().addEventListener("click", () => {
            setTimeout(() => {
              const popupContent = document.querySelector(
                `[data-location-id="${location.id}"]`
              );
              if (popupContent) {
                const handlePopupClick = () => {
                  const googleMapsUrl = popupContent.getAttribute(
                    "data-google-maps-url"
                  );
                  if (googleMapsUrl) window.open(googleMapsUrl, "_blank");
                };
                // (ne zamaramo se uklanjanjem — bezopasno je)
                popupContent.addEventListener("click", handlePopupClick);
              }
            }, 100);
          });
        });
      } catch (error) {
        console.error("Failed to load Mapbox GL:", error);
        if (mapContainer.current) {
          mapContainer.current.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-align:center;padding:2rem;">
              <div style="font-size:3rem;margin-bottom:1rem;">🗺️</div>
              <h3 style="margin:0 0 1rem 0;font-size:1.5rem;">Interaktivna mapa</h3>
              <p style="margin:0;opacity:.9;">Mapa se učitava... Molimo pričekajte.</p>
            </div>
          `;
        }
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [locations, mapStyle]);

  // Sigurna promjena stila – rješava "bijeli ekran"
  const switchStyle = (styleKey: keyof typeof STYLES) => {
    const m = map.current;
    if (!m) return;

    // spremi kameru
    const center = m.getCenter();
    const zoom = m.getZoom();
    const bearing = m.getBearing();
    const pitch = m.getPitch();

    // promijeni stil i nakon load vrati kameru + resize
    m.setStyle(STYLES[styleKey]);
    m.once("style.load", () => {
      m.jumpTo({ center, zoom, bearing, pitch });
      m.resize();
    });

    setMapStyle(styleKey);
  };

  return (
    <div className="modern-map-container">
      <div className="map-wrapper">
        {/* Style switcher */}
        <div className="style-switcher">
          {(
            [
              ["streets", "Streets"],
              ["satellite", "Satellite"],
              ["light", "Light"],
              ["dark", "Dark"],
            ] as Array<[keyof typeof STYLES, string]>
          ).map(([key, label]) => (
            <button
              type="button"
              key={key}
              className={`style-btn ${mapStyle === key ? "active" : ""}`}
              onClick={() => switchStyle(key)}
              aria-pressed={mapStyle === key}
              title={`Promijeni na ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div ref={mapContainer} className="map" />
      </div>

      {/* Grid s karticama lokacija */}
      <div className="modern-locations-grid">
        {/* Lokacije i aparati u parovima */}
        {locations.map((location, index) => (
          <React.Fragment key={location.id}>
            {/* Lokacija card */}
            <div
              className={`modern-location-card card-${index % 4}`}
              onClick={() => window.open(location.googleMapsUrl, "_blank")}
            >
              <div className="card-image-container">
                <Image
                  src={location.photo || "/placeholder.svg"}
                  alt={location.name}
                  className="card-image"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority={location.id === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="card-overlay">
                  <div className="card-hover-content">
                    <p className="card-description">{location.description}</p>
                    <div className="card-meta">
                      <span className="card-address">{location.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{location.name}</h3>
                <div className="card-info">
                  <span className="business-type">{location.businessType}</span>
                  <span className="avg-spending">{location.avgSpending}</span>
                </div>
                <div className="card-footer">
                  <span className="directions-icon">→</span>
                </div>
              </div>
            </div>

            {/* Aparat card - prikazuje se tek nakon klika na gumb */}
            {showApparatusInfo && (
              <div
                className={`modern-location-card apparatus-card card-${
                  index % 4
                } animate-in`}
                onClick={() => window.open(location.googleMapsUrl, "_blank")}
              >
                <div className="card-image-container">
                  <Image
                    src={location.apparatusImage}
                    alt="Alkotest aparat u objektu"
                    className="card-image"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div className="card-overlay">
                    <div className="card-hover-content">
                      <p className="card-description">{`Unutar ${location.name}a`}</p>
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <p className="apparatus-instructions">
                    {`${location.upute}`}
                  </p>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Gumb za aparate u objektu */}
        <div className="show-more-container">
          <button
            type="button"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:from-primary/90 hover:to-secondary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => setShowApparatusInfo(!showApparatusInfo)}
          >
            {showApparatusInfo ? "Sakrij aparate" : "Aparati u objektu"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .modern-map-container {
          padding: 0;
          max-width: 100%;
          width: 100%;
          margin: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .map-wrapper {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
        }

        .map {
          width: 100%;
          height: 600px;
          background: #f3f4f6; /* suptilna pozadina dok se style loada */
        }

        /* STYLE SWITCHER */
        .style-switcher {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 8px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 9999px;
          padding: 6px;
          backdrop-filter: blur(6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .style-btn {
          border: 0;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 9999px;
          background: white;
          color: #374151;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s, color 0.2s;
        }
        .style-btn:hover {
          transform: translateY(-1px);
          background: #f3f4f6;
        }
        .style-btn.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }

        /* Grid ispod mape */
        .modern-locations-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        @media (min-width: 640px) {
          .modern-locations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .modern-locations-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .modern-locations-grid {
            grid-template-columns: repeat(8, 1fr);
          }
        }

        .modern-location-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        @media (min-width: 768px) {
          .modern-location-card.animate-in {
            animation: fadeInUp 0.5s ease-out;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        .modern-location-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .card-0 {
          border-top: 4px solid #3b82f6;
        }
        .card-1 {
          border-top: 4px solid #8b5cf6;
        }
        .card-2 {
          border-top: 4px solid #10b981;
        }
        .card-3 {
          border-top: 4px solid #f59e0b;
        }

        .apparatus-card {
          border-top: 4px solid #ef4444;
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
        }

        .apparatus-card .card-title {
          color: #dc2626;
        }

        .apparatus-card .business-type {
          background: linear-gradient(135deg, #fecaca, #fca5a5);
          color: #991b1b;
        }

        .apparatus-card .avg-spending {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
        }

        .apparatus-instructions {
          margin: 0;
          color: #374151;
          font-size: 0.875rem;
          line-height: 1.5;
          text-align: center;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 0.5rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 150px;
          overflow: hidden;
          min-height: 150px;
        }

        @media (max-width: 640px) {
          .card-image-container {
            height: 120px;
            min-height: 120px;
          }
        }

        @media (min-width: 1024px) {
          .card-image-container {
            height: 180px;
            min-height: 180px;
          }
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          max-width: 100%;
          max-height: 100%;
          object-position: center center;
          display: block;
        }

        .modern-location-card:hover .card-image {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.95) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          height: 60%;
        }
        .modern-location-card:hover .card-overlay {
          opacity: 1;
        }

        .card-hover-content {
          color: #ffffff;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        .modern-location-card:hover .card-hover-content {
          transform: translateY(0);
        }

        .card-description {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: #ffffff;
          font-weight: 500;
        }
        .card-meta {
          font-size: 0.75rem;
          opacity: 1;
          color: #ffffff;
          font-weight: 500;
        }
        .card-address {
          display: block;
          margin-bottom: 0.25rem;
          color: #ffffff;
          font-weight: 500;
        }

        .card-content {
          padding: 1rem;
        }
        .card-title {
          margin: 0 0 0.5rem 0;
          color: #1f2937;
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .card-info {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .business-type {
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          color: #3730a3;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 600;
        }
        .avg-spending {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 600;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #6b7280;
          font-size: 0.875rem;
        }
        .directions-icon {
          font-size: 1.25rem;
          font-weight: bold;
          color: #3b82f6;
          transition: transform 0.2s ease;
        }
        .modern-location-card:hover .directions-icon {
          transform: translateX(4px);
        }

        .show-more-container {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        /* Mapbox custom */
        :global(.custom-marker) {
          cursor: pointer;
        }
        :global(.location-pin-image) {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.2s ease;
        }
        :global(.location-pin-image:hover) {
          transform: scale(1.1);
        }

        :global(.mapboxgl-ctrl-group) {
          border: none !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border-radius: 0.75rem !important;
          overflow: hidden !important;
        }
        :global(.mapboxgl-ctrl-group > button) {
          background: white !important;
          color: #374151 !important;
          transition: all 0.2s ease !important;
        }
        :global(.mapboxgl-ctrl-group > button:hover) {
          background: #f3f4f6 !important;
          color: #1f2937 !important;
        }

        :global(.modern-popup .mapboxgl-popup-content) {
          padding: 0 !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          overflow: hidden !important;
          max-width: 200px !important;
          background: white !important;
        }
        :global(.modern-popup-content) {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          color: #1f2937;
        }
        :global(.popup-image-container) {
          position: relative;
          width: 100%;
          height: 120px;
          overflow: hidden;
        }
        :global(.main-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        :global(.popup-body) {
          padding: 1rem;
        }
        :global(.popup-title) {
          margin: 0 0 0.25rem 0;
          color: #1f2937;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.2;
        }
        :global(.popup-description) {
          margin: 0 0 0.5rem 0;
          color: #6b7280;
          font-size: 0.75rem;
          line-height: 1.3;
        }
        :global(.popup-meta) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          gap: 0.5rem;
        }
        :global(.popup-meta-left) {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
        }
        :global(.popup-meta .business-type) {
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          color: #3730a3;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 600;
        }
        :global(.popup-meta .avg-spending) {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 600;
        }
        :global(.custom-close-btn) {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        :global(.custom-close-btn:hover) {
          background: white;
          color: #1f2937;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        :global(.custom-close-btn:active) {
          transform: scale(0.95);
        }
        :global(.custom-close-btn svg) {
          transition: transform 0.2s ease;
        }
        :global(.custom-close-btn:hover svg) {
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  );
}
