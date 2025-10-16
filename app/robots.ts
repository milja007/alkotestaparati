import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Uvijek koristi production URL za robots.txt
  const baseUrl = "https://www.drpromil.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"], // blokiraj privatne rute ako postoje
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
