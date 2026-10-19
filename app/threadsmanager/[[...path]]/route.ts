import { NextResponse } from "next/server";

/**
 * Pintu /threadsmanager di hilmi.work → Threads Manager di server bot.
 *
 * Halaman, API, dan callback OAuth semuanya hidup di repo WAbot
 * (features/threads/*, port 3001). Berkas ini hanya meneruskan permintaan ke
 * sana, dengan pola yang sama seperti /dashboard:
 *
 *   https://hilmi.work/threadsmanager            → /threads
 *   https://hilmi.work/threadsmanager/api/...    → /threads/api/...
 *   https://hilmi.work/threadsmanager/oauth/...  → /threads/oauth/...
 *
 * Kenapa proksi dan bukan pengalihan:
 *   1. Sandi HTTP Basic diingat peramban per-asal. Lewat proksi, kotak sandi
 *      muncul di hilmi.work dan tidak perlu diketik ulang di hostname tunnel.
 *   2. Redirect URI OAuth yang didaftarkan di Meta cukup satu:
 *      https://hilmi.work/threadsmanager/oauth/callback. Kalau halaman
 *      dialihkan ke tunnel, alamat balikan Meta akan berbeda dari alamat yang
 *      dilihat pemilik.
 *   3. Tidak ada token Threads di Vercel. Semua rahasia tinggal di server bot;
 *      berkas ini hanya menitipkan header Authorization apa adanya.
 *
 * `WABOT_DASHBOARD_URL` dipakai ulang (bukan variabel baru): alamat tunnel-nya
 * sama, dan satu variabel yang sudah ada lebih sulit salah isi.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ASAL = (process.env.WABOT_DASHBOARD_URL || "https://wabot.mhr.web.id").replace(/\/+$/, "");

/** Batas isi JSON: utas terpanjang 10 × 500 karakter, jauh di bawah angka ini. */
const BATAS_ISI = 64 * 1024;

/** Header balasan yang diteruskan apa adanya (termasuk pengaman dari server bot). */
const HEADER_DITERUSKAN = [
  "content-type",
  "www-authenticate", // memunculkan kotak sandi di domain ini
  "location", // pengalihan ke threads.com dan balikan OAuth
  "cache-control",
  "x-robots-tag",
  "retry-after",
  "referrer-policy",
  "x-content-type-options",
  "content-security-policy",
];

function halamanGagal(pesan: string) {
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Threads Manager — tidak terjangkau</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #08080c;
         color: #f5f5f7; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  .kotak { max-width: 540px; padding: 32px; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; background: rgba(255,255,255,.035); }
  h1 { margin: 0 0 10px; font-size: 22px; letter-spacing: -.02em; }
  p { margin: 0 0 8px; color: rgba(255,255,255,.6); font-size: 14px; line-height: 1.65; }
  code { background: rgba(255,255,255,.08); border-radius: 6px; padding: 2px 6px; font-size: 12px; color: #f5f5f7; }
</style>
</head>
<body>
  <div class="kotak">
    <h1>Threads Manager sedang tidak terjangkau</h1>
    <p>${pesan}</p>
    <p>Halaman ini membaca data dari server bot di rumah lewat <code>${ASAL}</code>.
       Bila laptop server mati, halaman ini ikut mati; jadwal yang terlewat akan
       diterbitkan begitu server menyala lagi.</p>
  </div>
</body>
</html>`;
}

async function teruskan(request: Request, bagian: string[]) {
  const jalur = bagian.length ? `/threads/${bagian.map(encodeURIComponent).join("/")}` : "/threads";
  const tujuan = `${ASAL}${jalur}${new URL(request.url).search}`;

  const menulis = request.method === "POST";
  const masuk = new Headers();
  const authorization = request.headers.get("authorization");
  if (authorization) masuk.set("authorization", authorization);
  const accept = request.headers.get("accept");
  if (accept) masuk.set("accept", accept);
  const jenisIsi = request.headers.get("content-type");
  if (menulis && jenisIsi) masuk.set("content-type", jenisIsi);
  // Dipakai cron eksternal untuk memicu /threads/api/jalan tanpa Basic Auth.
  const rahasiaCron = request.headers.get("x-threads-cron");
  if (rahasiaCron) masuk.set("x-threads-cron", rahasiaCron);

  const isi = menulis ? await request.text() : undefined;
  if (menulis && isi && isi.length > BATAS_ISI) {
    return new NextResponse("Isi permintaan terlalu besar", {
      status: 413,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  let balasan: Response;
  try {
    balasan = await fetch(tujuan, {
      method: menulis ? "POST" : request.method === "HEAD" ? "HEAD" : "GET",
      headers: masuk,
      body: isi,
      cache: "no-store",
      redirect: "manual",
    });
  } catch (error) {
    console.error("[threadsmanager] server bot tidak terjangkau", error);
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
  return new NextResponse(balasan.body, { status: balasan.status, headers: keluar });
}

export async function GET(request: Request, { params }: { params: { path?: string[] } }) {
  return teruskan(request, params.path ?? []);
}

export async function HEAD(request: Request, { params }: { params: { path?: string[] } }) {
  return teruskan(request, params.path ?? []);
}

export async function POST(request: Request, { params }: { params: { path?: string[] } }) {
  return teruskan(request, params.path ?? []);
}
