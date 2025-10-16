import type { MetadataRoute } from "next";

const BASE_URL = "https://www.drpromil.com" as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"], // dodaj još privatnih ruta po potrebi
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL, // opcionalno, ali uredno
  };
}
