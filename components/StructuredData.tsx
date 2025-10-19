export default function StructuredData() {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : null;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || "https://www.drpromil.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dr. Promil",
    url: baseUrl,
    logo: `${baseUrl}/DrLogoNew.avif`,
    image: [
      `${baseUrl}/opengraph-image.png`,
      `${baseUrl}/DrLogoNew.avif`,
      `${baseUrl}/DrKalkulator.avif`,
      `${baseUrl}/DrKarta.avif`,
    ],
    description:
      "Alkotest aparati u pubovima, klubovima i kafićima u Hrvatskoj s besplatnim online kalkulatorom promila.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HR",
      addressLocality: "Zagreb",
    },
    sameAs: [
      "https://www.facebook.com/drpromil",
      "https://www.instagram.com/drpromil.hr/",
      "https://www.tiktok.com/@drpromil.com",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dr. Promil",
    url: baseUrl,
    description:
      "Testirajte razinu alkohola u krvi na mojim alkotest aparatima u pubovima, klubovima i kafićima u Hrvatskoj. Besplatni online kalkulator promila.",
    inLanguage: "hr",
    image: `${baseUrl}/opengraph-image.png`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dr. Promil - Alkotest Lokacije",
    description: "Alkotest aparati na više lokacija u Hrvatskoj",
    url: baseUrl,
    image: [
      `${baseUrl}/opengraph-image.png`,
      `${baseUrl}/DrKarta.avif`,
      `${baseUrl}/Bunker.avif`,
      `${baseUrl}/Harats.avif`,
      `${baseUrl}/Conlee.avif`,
      `${baseUrl}/Pharmacy.avif`,
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "HR",
    },
    areaServed: {
      "@type": "Country",
      name: "Hrvatska",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Alkotest Usluge",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Alkotest Testiranje",
            description: "Testiranje razine alkohola u krvi alkotest aparatom",
            provider: {
              "@type": "Organization",
              name: "Dr. Promil",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Online Kalkulator Promila",
            description: "Besplatni online kalkulator za izračun promila",
            provider: {
              "@type": "Organization",
              name: "Dr. Promil",
            },
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Početna",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "O Meni",
        item: `${baseUrl}/#OOmeni`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Moje Lokacije",
        item: `${baseUrl}/#MojeLokacije`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Upute Korištenja",
        item: `${baseUrl}/#UputeKorištenja`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Postani Partner",
        item: `${baseUrl}/#PostaniPartner`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Online Kalkulator",
        item: `${baseUrl}/#OnlineKalkulator`,
      },
    ],
  };

  // ItemList schema za sitelinks - redoslijed kako želiš
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Glavni Sadržaj",
    description: "Navigacija kroz Dr. Promil usluge",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Moje Lokacije",
        url: `${baseUrl}/#MojeLokacije`,
        description:
          "Pronađite najbliži alkotest aparat u pubovima i klubovima diljem Hrvatske",
        image: `${baseUrl}/DrKarta.avif`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Upute Korištenja",
        url: `${baseUrl}/#UputeKorištenja`,
        description:
          "Naučite kako koristiti alkotest aparat u 6 jednostavnih koraka",
        image: `${baseUrl}/DrUpute.avif`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Postani Partner",
        url: `${baseUrl}/#PostaniPartner`,
        description:
          "Postavite moj alkotest aparat u svojem klubu ili kafiću besplatno",
        image: `${baseUrl}/DrUgovor.avif`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Online Alkotest Kalkulator",
        url: `${baseUrl}/#OnlineKalkulator`,
        description:
          "Besplatni online kalkulator za izračun razine alkohola u krvi",
        image: `${baseUrl}/DrKalkulator.avif`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
    </>
  );
}
