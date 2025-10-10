import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // URL se čita iz environment varijable ili koristi default
  // Postavi NEXT_PUBLIC_BASE_URL u .env.local za production
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : null;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || "https://www.drpromil.com";

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
