import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Uvijek koristi production URL za sitemap
  const baseUrl = "https://www.drpromil.com";

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
