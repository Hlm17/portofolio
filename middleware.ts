import { NextResponse, type NextRequest } from "next/server";

/**
 * Pendeteksi negara untuk halaman yang punya dua bahasa.
 *
 * Aturannya sengaja sempit, karena halaman yang isinya berubah hanya gara gara
 * asal negara pengunjung itu berisiko bagi mesin pencari dan bagi pengunjung
 * yang sudah memilih sendiri:
 *
 *   1. Hanya alamat yang benar benar punya versi Inggris (`/` dan
 *      `/gametester/...`) yang dialihkan. Halaman yang cuma berbahasa Indonesia,
 *      seperti `/ingetdiwa`, tidak pernah disentuh.
 *   2. Hanya permintaan halaman yang dialihkan, bukan berkas, gambar, atau
 *      permintaan dari alat pratinjau peramban.
 *   3. Cookie `bahasa` menang atas negara. Setelah pengunjung menekan tombol ID
 *      atau EN, pilihannya bertahan setahun: yang memilih Bahasa Indonesia tidak
 *      akan pernah dibawa ke versi Inggris lagi, dan yang memilih Bahasa Inggris
 *      tetap mendapat versi Inggris walau negara asalnya Indonesia.
 *   4. Perayap mesin pencari tidak pernah dialihkan, supaya `/` tetap terbaca
 *      sebagai halaman Bahasa Indonesia dan `/en` sebagai halaman Bahasa Inggris
 *      dari mana pun Google mengunjunginya. Tanpa aturan ini, halaman Indonesia
 *      tidak akan pernah terindeks karena hampir semua perayap datang dari
 *      Amerika Serikat.
 *
 * Karena itu pengalihan ini memakai kode 307 (sementara), bukan 308, supaya
 * browser tidak mengingatnya selamanya.
 */

/** Nama cookie pilihan bahasa, sama dengan yang ditulis `TombolBahasa.tsx`. */
const COOKIE_BAHASA = "bahasa";

/** Masa berlaku cookie pilihan bahasa, satu tahun. */
const COOKIE_MAX_AGE = 31536000;

/**
 * Perayap, alat pratinjau tautan, dan perkakas baris perintah tidak pernah
 * dialihkan supaya hasil pembacaannya sama dari mana pun permintaannya datang.
 */
const POLA_BOT =
  /bot|crawler|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|whatsapp|telegram|discord|slack|linkedin|twitter|x\.com|applebot|petalbot|gptbot|claudebot|perplexity|headless|lighthouse|curl|wget|python|axios|node-fetch/i;

/**
 * Alamat Indonesia yang punya pasangan Bahasa Inggris beserta tujuannya.
 * `null` berarti alamat itu tidak dialihkan sama sekali.
 */
function tujuanInggris(pathname: string): string | null {
  if (pathname === "/") return "/en";
  if (pathname === "/gametester") return "/en/gametester";
  if (pathname.startsWith("/gametester/")) return `/en${pathname}`;
  return null;
}

/**
 * Negara pengunjung menurut Vercel.
 *
 * `request.geo` diisi runtime Vercel; header `x-vercel-ip-country` dipakai
 * sebagai cadangan kalau `geo` kosong, dan `cf-ipcountry` untuk kalau kelak
 * situs ini dilayani Cloudflare. Alamat tanpa keterangan negara, misalnya saat
 * dijalankan di komputer sendiri, sengaja dibiarkan apa adanya.
 */
function negaraPengunjung(request: NextRequest): string | null {
  const geo = request.geo?.country;
  if (geo) return geo;

  const header = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  return header || null;
}

/** Apakah permintaan ini permintaan halaman yang boleh dialihkan. */
function mintaHalaman(request: NextRequest): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/html")) return false;

  const userAgent = request.headers.get("user-agent") ?? "";
  if (POLA_BOT.test(userAgent)) return false;

  // Permintaan yang disiapkan Next.js sendiri saat tautan didekati tidak boleh
  // dialihkan. Yang paling menentukan di sini `sec-fetch-mode`: peramban menulis
  // `navigate` hanya saat pengunjung benar benar membuka alamatnya, sedangkan
  // ambilan data Next.js (pra muat tautan dan perpindahan sisi klien) memakai
  // `cors`. Diperiksa langsung dari peramban: header `Next-Router-Prefetch`
  // tidak sampai ke middleware karena sudah dipakai Next.js sendiri, jadi
  // penanda itu tidak bisa diandalkan.
  const mode = request.headers.get("sec-fetch-mode");
  if (mode && mode !== "navigate") return false;

  // Cadangan untuk peramban lama yang belum menulis `sec-fetch-mode`.
  if (request.headers.get("x-middleware-prefetch") === "1") return false;
  if (request.headers.get("purpose") === "prefetch") return false;

  return true;
}

export function middleware(request: NextRequest) {
  const tujuan = tujuanInggris(request.nextUrl.pathname);
  if (!tujuan) return NextResponse.next();

  // Subdomain IngetDiWA berbahasa Indonesia saja, jadi pengunjung dari negara
  // mana pun harus tetap melihat halaman itu apa adanya.
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("ingetdiwa.")) return NextResponse.next();

  if (!mintaHalaman(request)) return NextResponse.next();

  const pilihan = request.cookies.get(COOKIE_BAHASA)?.value;

  // Pengunjung yang pernah menekan tombol ID tidak pernah dibawa lagi ke versi
  // Inggris, dari negara mana pun ia datang.
  if (pilihan === "id") return NextResponse.next();

  // Yang pernah memilih Bahasa Inggris tetap dibawa ke versi Inggris, walau
  // negara asalnya Indonesia. Inilah yang membuat kunjungan kedua dari negara
  // berbahasa Inggris tidak kembali mendarat di halaman Indonesia.
  const mauInggris = pilihan === "en";

  const negara = negaraPengunjung(request)?.toUpperCase();
  if (!mauInggris && (!negara || negara === "ID")) return NextResponse.next();

  const pengalihan = NextResponse.redirect(new URL(tujuan, request.url), 307);
  if (!pilihan) {
    pengalihan.cookies.set(COOKIE_BAHASA, "en", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return pengalihan;
}

export const config = {
  matcher: ["/", "/gametester", "/gametester/:slug*"],
};
