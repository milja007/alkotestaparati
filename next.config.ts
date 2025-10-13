import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["leaflet"],
  // Kompresija za bolje performanse
  compress: true,

  // Optimizacije za produkciju
  poweredByHeader: false,

  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Security i Performance headers
  async headers() {
    return [
      // Cache headers za statičke resurse
      {
        source: "/:all*(svg|jpg|png|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security headers za sve stranice
      {
        source: "/:path*",
        headers: [
          // Sprječava clickjacking napade
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Sprječava MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Kontrolira koliko referrer informacija se šalje
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Ograničava pristup browser funkcionalnostima
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=(self)",
              "interest-cohort=()",
            ].join(", "),
          },
          // Forsira HTTPS konekcije (samo za produkciju)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Kontrolira DNS prefetching
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Legacy XSS protection (za starije browsere)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
