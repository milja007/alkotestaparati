import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // URL se čita iz environment varijable ili koristi default
  // Postavi NEXT_PUBLIC_BASE_URL u .env.local za production
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : null;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || "https://www.drpromil.com";

  // Za single-page aplikacije, sitemap treba sadržavati samo glavne stranice
  // Sekcije s anchor linkovima (#) Google ionako ignorira u sitemap.xml
  // Ali one su VAŽNE u StructuredData (ItemList, BreadcrumbList) - tamo su na pravom mjestu!
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
