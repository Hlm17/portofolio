import { NextResponse } from "next/server";

/**
 * Pintu /socialmediamanager di hilmi.work → Social Media Manager di server bot.
 *
 * Halaman, API, dan data semuanya hidup di WAbot (features/social/*, port 3001).
 * Berkas ini hanya meneruskan permintaan ke sana, dengan pola yang sama seperti
 * /threadsmanager:
 *
 *   https://hilmi.work/socialmediamanager          → /socialmediamanager
 *   https://hilmi.work/socialmediamanager/api/...  → /socialmediamanager/api/...
 *
 * Kenapa proksi dan bukan pengalihan:
 *   1. Sandi HTTP Basic diingat peramban per-asal. Lewat proksi, kotak sandi
 *      muncul di hilmi.work dan tidak perlu diketik ulang di hostname tunnel.
 *   2. Tidak ada token Facebook/Threads di Vercel. Proksi hanya menitipkan
 *      header Authorization milik pengguna; data tetap di server bot.
 *   3. Halaman tidak menyimpan cookie sendiri, jadi tidak ada sesi baru yang
 *      perlu diamankan di sisi Next.js.
 *
 * Hanya GET/HEAD: halaman ini baca-saja. Permintaan tulis tidak diteruskan.
 * `WABOT_DASHBOARD_URL` dipakai ulang karena alamat tunnel-nya sama.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ASAL = (process.env.WABOT_DASHBOARD_URL || "https://wabot.mhr.web.id").replace(/\/+$/, "");

/** Header balasan yang diteruskan apa adanya, termasuk pengaman dari server bot. */
const HEADER_DITERUSKAN = [
  "content-type",
  "www-authenticate", // memunculkan kotak sandi di domain ini
  "cache-control",
  "x-robots-tag",
  "retry-after",
  "referrer-policy",
  "x-content-type-options",
  "x-frame-options",
  "content-security-policy",
  "location",
];

function halamanGagal(pesan: string) {
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Social Media Manager — tidak terjangkau</title>
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
    <h1>Social Media Manager sedang tidak terjangkau</h1>
    <p>${pesan}</p>
    <p>Halaman ini membaca data dari server bot lewat <code>${ASAL}</code>.
       Bila server atau laptopnya sedang mati, halaman ini ikut mati.</p>
  </div>
</body>
</html>`;
}

async function teruskan(request: Request, bagian: string[]) {
  const jalur = bagian.length
    ? `/socialmediamanager/${bagian.map(encodeURIComponent).join("/")}`
    : "/socialmediamanager";
  const tujuan = `${ASAL}${jalur}${new URL(request.url).search}`;

  // Hanya header yang diperlukan. Cookie dan referer tidak perlu menyeberang.
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
    console.error("[socialmediamanager] server bot tidak terjangkau", error);
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
