"use client";
import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// Vaš Mapbox access token
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWlsamEwMDciLCJhIjoiY21ld3Rncm9oMGp1dTJqcjFvOTkzaHB2MiJ9.ts703Zeabqe9IVm7beTAKw";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const [showAllLocations, setShowAllLocations] = useState(false);

  // Koordinate za Zagreb centar i 3 bliska lokacije s poboljšanim podacima
  const locations = useMemo(
    () => [
      {
        id: 0,
        name: "Harat's Pub",
        coordinates: [15.9776849, 45.8148249] as [number, number],
        description: "Harat's Irish Pub kod trznice Dolac uz veliki izbor piva",
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

  useEffect(() => {
    if (map.current) return; // Inicijaliziraj mapu samo jednom

    const initializeMap = async () => {
      if (mapContainer.current) {
        try {
          const mapboxModule = await import("mapbox-gl");
          const mapboxgl = mapboxModule.default;

          // Postavi access token globalno
          mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [15.9734885, 45.813173],
            zoom: 9,
          });

          // Dodaj navigation kontrole
          (map.current as mapboxgl.Map).addControl(
            new mapboxgl.NavigationControl(),
            "top-right"
          );
          (map.current as mapboxgl.Map).addControl(
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
            // Kreiraj custom marker element s personaliziranom slikom
            const markerEl = document.createElement("div");
            markerEl.className = "custom-marker";
            markerEl.innerHTML = `<img src="/assets/location-pin.png" alt="Location" class="location-pin-image" />`;

            // Dodaj marker na mapu
            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat(location.coordinates)
              .addTo(map.current as mapboxgl.Map);

            // Dodaj kompaktni popup s jednom slikom
            const popup = new mapboxgl.Popup({
              offset: [0, -10], // Otvara se odozgo
              maxWidth: "200px",
              className: "modern-popup",
              closeButton: false, // Onemogući default close button
            }).setHTML(`
            <div class="modern-popup-content" data-location-id="${location.id}" data-google-maps-url="${location.googleMapsUrl}" style="cursor: pointer;">
              <!-- Custom close button -->
              <button class="custom-close-btn" onclick="event.stopPropagation(); this.closest('.mapboxgl-popup').remove();" title="Zatvori">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <!-- Glavna slika -->
              <div class="popup-image-container">
                <img src="${location.photos[0]}" alt="${location.name}" class="main-image" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              
              <!-- Sadržaj -->
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

            // Dodaj event listener za klik na popup
            marker.getElement().addEventListener("click", () => {
              setTimeout(() => {
                const popupContent = document.querySelector(
                  `[data-location-id="${location.id}"]`
                );
                if (popupContent) {
                  // Dodaj event listener za klik na popup
                  const handlePopupClick = () => {
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
        } catch (error) {
          console.error("Failed to load Mapbox GL:", error);
          if (mapContainer.current) {
            mapContainer.current.innerHTML = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Interaktivna mapa</h3>
                <p style="margin: 0; opacity: 0.9;">Mapa se učitava... Molimo pričekajte.</p>
              </div>
            `;
          }
        }
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        (map.current as mapboxgl.Map).remove();
      }
    };
  }, [locations]);

  return (
    <div className="modern-map-container">
      <div className="map-wrapper">
        <div ref={mapContainer} className="map" />
      </div>

      {/* Minijaturne lokacije ispod mape */}
      <div className="modern-locations-grid">
        {(showAllLocations ? locations : locations.slice(0, 2)).map(
          (location, index) => (
            <div
              key={location.id}
              className={`modern-location-card card-${index % 4} ${
                showAllLocations && index >= 2 ? "animate-in" : ""
              }`}
              onClick={() => window.open(location.googleMapsUrl, "_blank")}
            >
              <div className="card-image-container">
                <Image
                  src={location.photos[0] || "/placeholder.svg"}
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
          )
        )}

        {/* Show more button */}
        {!showAllLocations && locations.length > 2 && (
          <div className="show-more-container">
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => setShowAllLocations(true)}
            >
              Pogledaj sve lokacije
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
        }

        /* Minijaturne lokacije grid ispod mape */
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

        /* Jednostavna animacija samo za md screens i veće */
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

        /* Colorful card variants */
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
            rgba(0, 0, 0, 0.85) 100%
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
        }

        .modern-location-card:hover .card-hover-content {
          transform: translateY(0);
        }

        .card-description {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: #ffffff;
        }

        .card-meta {
          font-size: 0.75rem;
          opacity: 0.95;
          color: #ffffff;
        }

        .card-address {
          display: block;
          margin-bottom: 0.25rem;
          color: #ffffff;
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

        /* Show more button styles */
        .show-more-container {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .show-more-btn {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 1rem;
          padding: 0.875rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          min-width: 200px;
          justify-content: center;
        }

        .show-more-btn:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .show-more-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .show-more-text {
          font-weight: 600;
        }

        .show-more-icon {
          font-size: 1.25rem;
          transition: transform 0.3s ease;
        }

        .show-more-btn:hover .show-more-icon {
          transform: translateY(2px);
        }

        /* Added comprehensive Mapbox CSS styles inline to avoid import issues */
        /* Custom marker stilovi */
        :global(.custom-marker) {
          cursor: pointer;
        }

        :global(.location-pin-image) {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.2s ease;
        }

        :global(.location-pin-image:hover) {
          transform: scale(1.1);
        }

        /* Mapbox base styles */
        :global(.mapboxgl-map) {
          font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
          overflow: hidden;
          position: relative;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        :global(.mapboxgl-canvas) {
          position: absolute;
          left: 0;
          top: 0;
        }

        :global(.mapboxgl-canvas-container) {
          overflow: hidden;
        }

        :global(.mapboxgl-ctrl-group) {
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
          border: none !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border-radius: 0.75rem !important;
          overflow: hidden !important;
        }

        :global(.mapboxgl-ctrl-group > button) {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          display: block;
          height: 29px;
          outline: 0;
          padding: 0;
          width: 29px;
          background: white !important;
          color: #374151 !important;
          transition: all 0.2s ease !important;
        }

        :global(.mapboxgl-ctrl-group > button:hover) {
          background: #f3f4f6 !important;
          color: #1f2937 !important;
        }

        /* Mapbox popup stilovi */
        :global(.mapboxgl-popup) {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          will-change: transform;
          pointer-events: none;
        }

        :global(.mapboxgl-popup-anchor-top),
        :global(.mapboxgl-popup-anchor-top-left),
        :global(.mapboxgl-popup-anchor-top-right) {
          flex-direction: column;
        }

        :global(.mapboxgl-popup-anchor-bottom),
        :global(.mapboxgl-popup-anchor-bottom-left),
        :global(.mapboxgl-popup-anchor-bottom-right) {
          flex-direction: column-reverse;
        }

        :global(.mapboxgl-popup-anchor-left) {
          flex-direction: row;
        }

        :global(.mapboxgl-popup-anchor-right) {
          flex-direction: row-reverse;
        }

        :global(.mapboxgl-popup-tip) {
          width: 0;
          height: 0;
          border: 10px solid transparent;
          z-index: 1;
        }

        :global(.mapboxgl-popup-anchor-top .mapboxgl-popup-tip) {
          align-self: center;
          border-top: none;
          border-bottom-color: #fff;
        }

        :global(.mapboxgl-popup-content) {
          position: relative;
          background: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          padding: 10px 10px 15px;
          pointer-events: auto;
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

        :global(.directions-icon) {
          font-size: 1.25rem;
        }

        /* Custom close button styles */
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
