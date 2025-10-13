# 🍺 Dr. Promil - Alkotest Aparati

<div align="center">
  <img src="public/assets/DrLogoNew.avif" alt="Dr. Promil Logo" width="200"/>
  
  **Testiraj, nauči i odluči!**
  
  Moderna Next.js aplikacija za alkotest aparate u Hrvatskoj sa interaktivnom kartom, online kalkulatorom promila i edukativnim sadržajem.
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 📋 Sadržaj

- [Značajke](#-značajke)
- [Tehnologije](#-tehnologije)
- [Početak Rada](#-početak-rada)
- [Environment Varijable](#-environment-varijable)
- [Sigurnost](#-sigurnost)
- [Deployment](#-deployment)
- [SEO Optimizacije](#-seo-optimizacije)
- [Performance](#-performance)

---

## ✨ Značajke

- 🗺️ **Interaktivna Karta** - Mapbox integracija sa 4+ lokacijama alkotest aparata
- 🧮 **Online Kalkulator** - Widmarkova formula za procjenu promila
- 📚 **Edukativni Sadržaj** - Informacije o alkoholu, kaznama i sigurnosti
- 📍 **Lokacije** - Detalji o klubovima, pubovima i barovima sa aparatima
- 🎨 **Moderna UI** - Responsive dizajn sa GSAP animacijama
- 🔒 **Sigurnost** - Potpuni security headers (HSTS, X-Frame-Options, itd.)
- ⚡ **Performance** - AVIF slike, Image optimizacija, Turbopack
- 🔍 **SEO Optimiziran** - Schema.org, Open Graph, Sitemap, Robots.txt

---

## 🛠️ Tehnologije

### Core

- **Next.js 15.5.2** - React framework sa App Router
- **React 19.1.0** - UI biblioteka
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.12** - Utility-first CSS

### Integracije

- **Mapbox GL JS** - Interaktivne karte
- **GSAP** - Napredne animacije
- **Lucide React** - SVG ikone
- **Motion** - Animacije i transitions

### Development

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Brži build proces

---

## 🚀 Početak Rada

### Preduvjeti

```bash
Node.js 20+ i npm/yarn/pnpm
```

### Instalacija

1. **Kloniraj repozitorij**

```bash
git clone https://github.com/tvoj-username/alkotestWebp.git
cd alkotestWebp
```

2. **Instaliraj dependencies**

```bash
npm install
# ili
yarn install
# ili
pnpm install
```

3. **Napravi `.env.local` datoteku** (vidi [Environment Varijable](#-environment-varijable))

4. **Pokreni development server**

```bash
npm run dev
```

5. **Otvori browser**

```
http://localhost:3000
```

---

## 🔐 Environment Varijable

Napravi `.env.local` datoteku u root direktoriju:

```bash
# Base URL (obavezno za SEO)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Mapbox Token (obavezno za kartu)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.tvoj_mapbox_token

# Vercel (automatski na produkciji)
# NEXT_PUBLIC_VERCEL_URL=
```

### Kako dobiti Mapbox Token:

1. Napravi account na [Mapbox](https://account.mapbox.com/)
2. Idi na **Access Tokens**
3. Kreiraj novi **Public Token** (počinje sa `pk.`)
4. Kopiraj token u `.env.local`

---

## 🔒 Sigurnost

Projekt implementira security headers:

✅ **X-Frame-Options (DENY)**  
✅ **X-Content-Type-Options (nosniff)**  
✅ **Strict-Transport-Security (HSTS)**  
✅ **Referrer-Policy**  
✅ **Permissions-Policy**

📖 **Detaljnu dokumentaciju vidi u [SECURITY.md](./SECURITY.md)**

### Security Score

- **Security Headers:** A+
- **Mozilla Observatory:** 95+/100
- **Lighthouse Security:** 100/100

---

## 🚢 Deployment

### Vercel (Preporučeno)

1. **Push na GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import u Vercel**

   - Idi na [vercel.com](https://vercel.com)
   - Klikni "New Project"
   - Import tvoj GitHub repo
   - Dodaj Environment Variables:
     - `NEXT_PUBLIC_BASE_URL` → `https://www.drpromil.com`
     - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` → tvoj token

3. **Deploy**
   - Klikni "Deploy"
   - Done! 🎉

### Build Lokalno

```bash
npm run build
npm run start
```

---

## 🔍 SEO Optimizacije

### Implementirano

✅ **Meta Tags** - Title, description, keywords  
✅ **Open Graph** - Facebook/LinkedIn sharing  
✅ **Twitter Cards** - Twitter sharing  
✅ **Schema.org** - Organization, WebSite, LocalBusiness, Breadcrumb  
✅ **Sitemap.xml** - Automatski generiran  
✅ **Robots.txt** - Search engine rules  
✅ **Canonical URLs** - Duplicate content prevention  
✅ **Semantic HTML** - H1, nav, main, section

### Kako aktivirati Google Search Console

1. U `app/layout.tsx` linija 76, odkomentiraj:

```typescript
verification: {
  google: "tvoj-google-verification-kod",
}
```

2. Dobij kod na [search.google.com/search-console](https://search.google.com/search-console/)

---

## ⚡ Performance

### Optimizacije

✅ **AVIF Format** - 50% manji od WebP  
✅ **Next.js Image** - Automatska optimizacija  
✅ **Priority Loading** - Above-the-fold slike  
✅ **Lazy Loading** - Below-the-fold sadržaj  
✅ **Cache Headers** - 1 godina za statičke resurse  
✅ **Compression** - Gzip/Brotli  
✅ **Turbopack** - Brži build  
✅ **CSS Optimizacije** - will-change, content-visibility  
✅ **Preconnect** - Mapbox DNS prefetch

### Lighthouse Score

- **Performance:** 85+/100
- **SEO:** 95+/100
- **Accessibility:** 90+/100
- **Best Practices:** 95+/100

---

## 📁 Struktura Projekta

```
alkotestWebp/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + SEO
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/             # Reusable komponente
│   ├── Sova.tsx            # Optimizirane slike
│   ├── StructuredData.tsx  # Schema.org JSON-LD
│   └── ui/                 # UI komponente
├── Kategorije/             # Feature modules
│   ├── Header/             # Hero sekcija
│   ├── Kalkulator/         # Online kalkulator
│   ├── MojeLokacije/       # Mapbox karta
│   ├── Informacije/        # Info o promilima
│   └── ...
├── klijenti/data/          # Podaci o lokacijama
├── public/assets/          # AVIF slike
├── next.config.ts          # Next.js config + Security
├── tailwind.config.js      # Tailwind setup
├── tsconfig.json           # TypeScript config
├── SECURITY.md             # Security dokumentacija
└── README.md               # Ova datoteka
```

---

## 🐛 Troubleshooting

### Mapbox ne radi

- Provjeri `.env.local` da imaš `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- Token mora počinjati sa `pk.`

### Security Headers ne rade na localhost

- HSTS radi samo na HTTPS
- Testiraj security headers na deployed verziji

### Slike se ne učitavaju

- AVIF format nije podržan u IE/starije verzije
- Next.js automatski fallback na WebP/JPG

---

## 📝 License

© 2025 Dr. Promil. All rights reserved.

---

## 🤝 Contributing

Pull requests su dobrodošli! Za veće izmjene, molimo prvo otvori issue.

---

## 📞 Kontakt

**Web:** [www.drpromil.com](https://www.drpromil.com)  
**Email:** info@drpromil.com

---

<div align="center">
  <sub>Built with ❤️ using Next.js 15</sub>
</div>
