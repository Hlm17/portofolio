import { NextResponse, type NextRequest } from "next/server";

/**
 * Geo-routing halaman profil hilmi.work.
 *
 * Pengunjung yang membuka alamat utama (/) diarahkan ke versi bahasa yang
 * paling mungkin mereka pakai:
 *   negara ID   -> /id
 *   negara lain -> /en
 *
 * Yang sengaja TIDAK diarahkan:
 *   - halaman yang sudah punya bahasa sendiri (/id, /en, /ingetdiwa, ...)
 *   - subdomain produk ingetdiwa.hilmi.work, yang memakai / sebagai halaman
 *     depan produk lewat rewrite di next.config.mjs, dan middleware berjalan
 *     sebelum rewrite itu, jadi host ini harus dilewatkan utuh
 *   - crawler dan pengambil pratinjau tautan, supaya isi yang diindeks tetap
 *     stabil dan tidak berubah mengikuti lokasi server penjelajah
 *   - permintaan tanpa keterangan negara (localhost, pratinjau Vercel, host
 *     lain di luar Vercel), supaya / tetap menampilkan versi default
 *   - prefetch bawaan Next.js dan permintaan bukan HTML
 */

const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "x-country-code"];

const PRODUCT_HOST = "ingetdiwa.hilmi.work";

const BOT_PATTERN =
  /(bot|crawler|crawling|spider|slurp|facebookexternalhit|whatsapp|telegrambot|embedly|skypeuripreview|discord|preview|curl|wget|axios|node-fetch|python-requests|go-http-client|headless)/i;

function countryOf(request: NextRequest): string | null {
  const fromGeo = request.geo?.country;
  if (fromGeo) return fromGeo.toUpperCase();

  for (const header of COUNTRY_HEADERS) {
    const value = request.headers.get(header);
    if (value) return value.toUpperCase();
  }

  return null;
}

function isProductHost(host: string | null): boolean {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  return hostname === PRODUCT_HOST || hostname.startsWith("ingetdiwa.");
}

export function middleware(request: NextRequest) {
  if (isProductHost(request.headers.get("host"))) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent");
  if (!userAgent || BOT_PATTERN.test(userAgent)) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept");
  if (accept && !accept.includes("text/html")) {
    return NextResponse.next();
  }

  const purpose = `${request.headers.get("purpose") ?? ""} ${
    request.headers.get("sec-purpose") ?? ""
  }`.toLowerCase();
  if (
    purpose.includes("prefetch") ||
    purpose.includes("prerender") ||
    request.headers.get("next-router-prefetch")
  ) {
    return NextResponse.next();
  }

  const country = countryOf(request);
  if (!country) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = country === "ID" ? "/id" : "/en";

  // 307 dipakai supaya peramban tidak menyimpan pengalihan ini secara permanen.
  // Lokasi pengunjung bisa berubah, jadi hasilnya tidak boleh ikut ter-cache.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/"],
};
