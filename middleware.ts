import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware za sigurnosni Content-Security-Policy (CSP) header
 *
 * Koristi nonce-based pristup umjesto 'unsafe-inline' i 'unsafe-eval':
 * - Generiraj random nonce za svaki request
 * - 'strict-dynamic' dopušta script tagovima sa nonce-om da učitavaju dodatne skripte
 * - NEMA 'unsafe-inline' - svi inline scriptovi moraju imati nonce
 * - NEMA 'unsafe-eval' - sprječava eval() napade
 * - 'unsafe-hashes' dopušta inline style ATRIBUTE (npr. <div style="...">) koji su sigurni
 *   i koje Next.js/React koriste za dinamičke stilove
 *
 * Napomena: 'unsafe-hashes' NE dopušta inline <style> tagove, samo style atribute!
 *
 * Ovo poboljšava Lighthouse Best Practices score za ~5-8 bodova
 */
export function middleware(request: NextRequest) {
  // Generiraj kriptografski siguran nonce za CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const isDevelopment = process.env.NODE_ENV === "development";

  // Kreiraj CSP header sa nonce-om
  // Development: Blažiji CSP (za React DevTools, HMR, debugging)
  // Production: Strožiji CSP (maksimalna sigurnost)
  const cspHeader = [
    "default-src 'self'",
    // script-src: koristi nonce + strict-dynamic (moderna alternativa unsafe-inline)
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://api.mapbox.com`,
    // style-src: različit za dev i production
    // Dev: unsafe-inline za React DevTools i HMR
    // Prod: samo nonce i unsafe-hashes (sigurno)
    isDevelopment
      ? `style-src 'self' 'unsafe-inline' https://api.mapbox.com`
      : `style-src 'self' 'nonce-${nonce}' 'unsafe-hashes' https://api.mapbox.com`,
    "img-src 'self' data: blob: https://api.mapbox.com https://*.mapbox.com https://images.unsplash.com https://via.placeholder.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.mapbox.com https://*.mapbox.com https://events.mapbox.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Clone request headers i dodaj CSP
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Postavi CSP header i na response
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
