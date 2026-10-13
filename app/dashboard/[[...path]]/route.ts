import { NextResponse } from "next/server";

/**
 * Pintu /dashboard di ingetdiwa.hilmi.work → dasbor pemantau di server bot.
 *
 * Dasbor itu sendiri dilayani Express di server bot (core/dashboard.js di repo
 * WAbot, port 3001) dan sudah hidup di tunnel `wabot.mhr.web.id`. Halaman ini
 * hanya meneruskan permintaan ke sana supaya pemilik proyek cukup mengetik satu
 * alamat yang mudah diingat: ingetdiwa.hilmi.work/dashboard.
 *
 * Kenapa proksi, bukan pengalihan (redirect):
 *   1. Alamat tetap di domain produk, jadi tidak ada lompatan ke hostname lain.
 *   2. Dasbor memakai HTTP Basic. Peramban mencocokkan kotak sandi dengan asal
 *      permintaan, jadi kalau halamannya dialihkan, sandi harus diketik ulang di
 *      hostname tunnel. Lewat proksi, kotak sandi muncul di domain produk dan
 *      jawabannya diingat peramban untuk domain itu.
 *   3. Tidak ada satu pun kunci rahasia di sini. Kata sandi diperiksa di server
 *      bot; berkas ini hanya menitipkan header `Authorization` apa adanya.
 *
 * Yang sengaja dibatasi:
 *   - Tujuan selalu `https://wabot.mhr.web.id/dashboard…`; tidak ada parameter
 *     yang bisa mengarahkan proksi ini ke alamat lain.
 *   - Hanya metode GET (dan HEAD). Tidak ada jalur tulis.
 *   - Hanya beberapa header balasan yang diteruskan apa adanya. `WWW-Authenticate`
 *     wajib ikut, karena itulah yang memunculkan kotak sandi peramban.
 *
 * `WABOT_DASHBOARD_URL` boleh diisi di Vercel bila kelak hostname tunnel berganti.
 * Alamat bawaan sengaja ditulis utuh supaya halaman ini tetap bekerja tanpa env.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Alamat asal dasbor (tanpa garis miring di ujung). */
const ASAL = (process.env.WABOT_DASHBOARD_URL || "https://wabot.mhr.web.id").replace(/\/+$/, "");

/** Header balasan yang diteruskan apa adanya ke peramban. */
const HEADER_DITERUSKAN = [
  "content-type",
  "www-authenticate", // memicu kotak sandi peramban
  "cache-control",
  "x-robots-tag",
  "retry-after", // diisi server bot saat membatasi percobaan gagal (429)
];

/** Halaman sederhana saat server bot tidak terjangkau. */
function halamanGagal(pesan: string) {
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>IngetDiWA — Dasbor tidak terjangkau</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #08080c;
         color: #f5f5f7; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  .kotak { max-width: 520px; padding: 32px; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; background: rgba(255,255,255,.035); }
  h1 { margin: 0 0 10px; font-size: 22px; letter-spacing: -.02em; }
  p { margin: 0 0 8px; color: rgba(255,255,255,.6); font-size: 14px; line-height: 1.65; }
  code { background: rgba(255,255,255,.08); border-radius: 6px; padding: 2px 6px; font-size: 12px; color: #f5f5f7; }
</style>
</head>
<body>
  <div class="kotak">
    <h1>Dasbor sedang tidak terjangkau</h1>
    <p>${pesan}</p>
    <p>Halaman ini membaca data dari server bot di rumah lewat
       <code>${ASAL}</code>. Bila server atau laptopnya sedang mati, dasbor ikut
       mati — bot WhatsApp-nya sendiri tetap berjalan begitu server menyala lagi.</p>
  </div>
</body>
</html>`;
}

/**
 * Teruskan satu permintaan ke dasbor.
 * @param bagian potongan alamat setelah `/dashboard` (mis. `["data"]`).
 */
async function teruskan(request: Request, bagian: string[]) {
  const jalur = bagian.length ? `/dashboard/${bagian.map(encodeURIComponent).join("/")}` : "/dashboard";
  const tujuan = `${ASAL}${jalur}${new URL(request.url).search}`;

  // Hanya header yang menentukan jawaban dasbor yang dititipkan. Header lain
  // (cookie, referer, dan seterusnya) sengaja tidak diteruskan: dasbor tidak
  // memakainya, dan semakin sedikit yang menyeberang semakin baik.
  const masuk = new Headers();
  const authorization = request.headers.get("authorization");
  if (authorization) masuk.set("authorization", authorization);
  const accept = request.headers.get("accept");
  if (accept) masuk.set("accept", accept);

  let balasan: Response;
  try {
    balasan = await fetch(tujuan, {
      method: request.method === "HEAD" ? "HEAD" : "GET",
      headers: masuk,
      cache: "no-store",
      redirect: "manual",
    });
  } catch (error) {
    console.error("[dashboard] server bot tidak terjangkau", error);
    return new NextResponse(halamanGagal("Permintaan tidak sampai ke server bot."), {
      status: 502,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  }

  const keluar = new Headers();
  for (const nama of HEADER_DITERUSKAN) {
    const nilai = balasan.headers.get(nama);
    if (nilai) keluar.set(nama, nilai);
  }

  // Balasan 401 dari server bot punya halaman kecil sendiri; itu yang dikirim,
  // supaya pengunjung melihat keterangan yang sama di domain mana pun.
  return new NextResponse(balasan.body, { status: balasan.status, headers: keluar });
}

export async function GET(request: Request, { params }: { params: { path?: string[] } }) {
  return teruskan(request, params.path ?? []);
}

export async function HEAD(request: Request, { params }: { params: { path?: string[] } }) {
  return teruskan(request, params.path ?? []);
}
