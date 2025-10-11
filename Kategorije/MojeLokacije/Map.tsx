"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import type mapboxgl from "mapbox-gl"; // samo tipovi, runtime ide kroz dynamic import
import { locationsData } from "@/klijenti/data/Klijenti";

// Mapbox access token
const MAPBOX_ACCESS_TOKEN = locationsData.mapConfig.mapboxAccessToken;

// Default stil mape
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [showApparatusInfo, setShowApparatusInfo] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  const locations = useMemo(
    () =>
      locationsData.locations.map((loc) => ({
        ...loc,
        coordinates: loc.coordinates as [number, number],
      })),
    []
  );

  // Intersection Observer za lazy loading
  useEffect(() => {
    if (!mapContainer.current || shouldLoadMap) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Počni loadirati kad je komponenta 200px od viewporta
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setShouldLoadMap(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // započni loadiranje malo prije nego što korisnik stigne
        threshold: 0,
      }
    );

    observerRef.current.observe(mapContainer.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [shouldLoadMap]);

  // Inicijalizacija mape tek kad shouldLoadMap postane true
  useEffect(() => {
    if (!shouldLoadMap || map.current) return;

    const initializeMap = async () => {
      if (!mapContainer.current || !MAPBOX_ACCESS_TOKEN) return;
      try {
        setIsMapLoading(true);

        // Dinamički uvezi samo Mapbox modul (CSS je već statički importan na vrhu)
        const mapboxModule = await import("mapbox-gl");
        const M = mapboxModule.default as typeof mapboxgl;

        (M as typeof mapboxgl & { accessToken: string }).accessToken =
          MAPBOX_ACCESS_TOKEN;

        map.current = new M.Map({
          container: mapContainer.current,
          style: MAP_STYLE,
          center: locationsData.mapConfig.defaultCenter as [number, number],
          zoom: locationsData.mapConfig.defaultZoom,
        });

        map.current.on("load", () => {
          setIsMapLoading(false);
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
          markerEl.innerHTML = `
            <picture>
              <source srcset="/assets/DrPin.avif" type="image/avif" />
              <source srcset="/assets/DrPin.webp" type="image/webp" />
              <img src="/assets/DrPin.webp" alt="Location" class="location-pin-image" />
            </picture>
          `;

          const marker = new M.Marker(markerEl)
            .setLngLat(location.coordinates)
            .addTo(map.current!);

          const popup = new M.Popup({
            offset: [0, -10],
            maxWidth: "200px",
            className: "modern-popup",
            closeButton: false,
            closeOnClick: true,
          }).setHTML(`
            <div class="modern-popup-content" data-location-id="${location.id}" data-google-maps-url="${location.googleMapsUrl}" style="cursor: pointer;">
              <button class="custom-close-btn" onclick="event.stopPropagation(); this.closest('.mapboxgl-popup').remove();" title="Zatvori">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div class="popup-image-container">
                <picture>
                  <source srcset="${location.photoAvif}" type="image/avif" />
                  <source srcset="${location.photo}" type="image/webp" />
                  <img src="${location.photo}" alt="${location.name}" class="main-image" style="width: 100%; height: 100%; object-fit: cover;" />
                </picture>
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
        setIsMapLoading(false);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [shouldLoadMap, locations]);

  return (
    <div className="modern-map-container">
      <div className="map-wrapper">
        {/* Map container mora biti potpuno prazan */}
        <div ref={mapContainer} className="map" />
        {/* Loader overlay - potpuno odvojen od map containera */}
        {isMapLoading && (
          <div className="map-loader-overlay">
            <div className="loader-content">
              <span className="loader"></span>
              <p className="loader-text">Učitavam mapu...</p>
            </div>
          </div>
        )}
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
              <div
                className="card-image-container"
                style={{ position: "relative" }}
              >
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
                <div
                  className="card-image-container"
                  style={{ position: "relative" }}
                >
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
                      <p className="card-description">{`Aparat unutar ${location.name}a`}</p>
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
        {!showApparatusInfo && (
          <div className="show-more-container">
            <button
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full sm:hover:from-primary/90 sm:hover:to-secondary/90 transform sm:hover:scale-105 transition-all duration-200 shadow-lg sm:hover:shadow-xl"
              onClick={() => setShowApparatusInfo(true)}
            >
              {locationsData.mapButton.showMore}
            </button>
          </div>
        )}
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

        /* Loader overlay */
        .map-loader-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.95) 0%,
            rgba(118, 75, 162, 0.95) 100%
          );
          z-index: 10;
          border-radius: 1.5rem;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #fff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loader-text {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

        @media (min-width: 640px) {
          .modern-location-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
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

        @media (min-width: 640px) {
          .modern-location-card:hover .card-image {
            transform: scale(1.1);
          }
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
        @media (min-width: 640px) {
          .modern-location-card:hover .card-overlay {
            opacity: 1;
          }
        }

        .card-hover-content {
          color: #ffffff;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        @media (min-width: 640px) {
          .modern-location-card:hover .card-hover-content {
            transform: translateY(0);
          }
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
        @media (min-width: 640px) {
          .modern-location-card:hover .directions-icon {
            transform: translateX(4px);
          }
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
        @media (min-width: 640px) {
          :global(.location-pin-image:hover) {
            transform: scale(1.1);
          }
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
        @media (min-width: 640px) {
          :global(.mapboxgl-ctrl-group > button:hover) {
            background: #f3f4f6 !important;
            color: #1f2937 !important;
          }
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
        @media (min-width: 640px) {
          :global(.custom-close-btn:hover) {
            background: white;
            color: #1f2937;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
        }
        :global(.custom-close-btn:active) {
          transform: scale(0.95);
        }
        :global(.custom-close-btn svg) {
          transition: transform 0.2s ease;
        }
        @media (min-width: 640px) {
          :global(.custom-close-btn:hover svg) {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
