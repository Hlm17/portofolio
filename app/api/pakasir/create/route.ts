import { NextResponse } from "next/server";
import {
  PAKASIR_API_BASE,
  SUBSCRIPTION_AMOUNT,
  buildOrderId,
  normalizePhone,
} from "@/app/ingetdiwa/lib/pakasir";
import { SITE_URL } from "@/app/ingetdiwa/config";

/**
 * Proxy checkout website hilmi.work → Pakasir API v2.
 *
 * Dipakai oleh halaman /ingetdiwa/langganan. Slug & API key diambil dari environment
 * Vercel (JANGAN pernah ditaruh di kode klien):
 *   PAKASIR_SLUG, PAKASIR_API_KEY
 * Opsional: PAKASIR_API_BASE, PAKASIR_SUBSCRIPTION_AMOUNT.
 *
 * order_id memakai format yang sama dengan bot WAbot (`SUB-<phone>-<YYYYMM>`), sehingga
 * webhook Pakasir yang menunjuk ke server bot otomatis mengaktifkan langganan tanpa
 * peduli user membayar lewat chat atau lewat website.
 */

export const dynamic = "force-dynamic";

/**
 * Pembatas sederhana per alamat IP. Endpoint ini terbuka untuk umum dan setiap
 * panggilan membuat transaksi NYATA di Pakasir (batas Pakasir 2 permintaan/detik),
 * jadi tanpa pengaman ini satu penyalahguna bisa menghabiskan kuota proyek.
 * Instance serverless Vercel tidak selalu sama, jadi ini pengaman, bukan tembok.
 */
const JENDELA_MS = 60_000;
const MAKS_PER_JENDELA = 5;
const catatanIp = new Map<string, number[]>();

function terlaluSering(ip: string): boolean {
  const sekarang = Date.now();
  if (catatanIp.size > 500) catatanIp.clear(); // jaga memori instance tetap kecil
  const riwayat = (catatanIp.get(ip) || []).filter((t) => sekarang - t < JENDELA_MS);
  riwayat.push(sekarang);
  catatanIp.set(ip, riwayat);
  return riwayat.length > MAKS_PER_JENDELA;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "tanpa-ip";

  if (terlaluSering(ip)) {
    return NextResponse.json(
      { message: "Terlalu banyak permintaan pembayaran dari jaringan ini. Tunggu satu menit lalu coba lagi." },
      { status: 429 }
    );
  }

  let body: { phone?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format permintaan tidak valid." }, { status: 400 });
  }

  const phone = normalizePhone(body?.phone ?? "");
  if (!/^62\d{8,14}$/.test(phone)) {
    return NextResponse.json(
      { message: "Nomor WhatsApp tidak valid. Contoh: 08197494871." },
      { status: 400 }
    );
  }

  const slug = process.env.PAKASIR_SLUG;
  const apiKey = process.env.PAKASIR_API_KEY;
  if (!slug || !apiKey) {
    return NextResponse.json(
      {
        message:
          "Pembayaran sedang tidak tersedia karena konfigurasi Pakasir belum lengkap. Silakan hubungi kami.",
      },
      { status: 503 }
    );
  }

  const orderId = buildOrderId(phone);

  try {
    const upstream = await fetch(
      `${PAKASIR_API_BASE}/create-transaction/${encodeURIComponent(slug)}/${encodeURIComponent(orderId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({ method: "payment_link", amount: SUBSCRIPTION_AMOUNT }),
        cache: "no-store",
      }
    );

    const payload = (await upstream.json().catch(() => null)) as Record<string, unknown> | null;
    const result = ((payload?.data as Record<string, unknown>) ?? payload ?? {}) as Record<
      string,
      unknown
    >;
    const paymentLink =
      (result.payment_link as string) ||
      (result.paymentLink as string) ||
      (result.link as string) ||
      "";

    if (!upstream.ok || !paymentLink) {
      console.error("[pakasir] create-transaction gagal", upstream.status, payload);
      return NextResponse.json(
        {
          message:
            (payload?.message as string) ||
            "Gagal membuat tautan pembayaran. Silakan coba lagi sebentar lagi.",
        },
        { status: 502 }
      );
    }

    const txnId = (result.txn_id as string) || (payload?.txn_id as string) || null;

    // Pakasir menampilkan tombol "Kembali ke halaman Merchant" di halaman pembayaran.
    // Tombol itu kita arahkan ke halaman sukses sambil membawa `txn_id`, sehingga halaman
    // sukses bisa menyodorkan tautan WhatsApp berisi "cek <kode>" bila konfirmasi webhook
    // belum sampai. Tombolnya boleh ditekan walau pembayaran belum selesai: halaman sukses
    // hanya mengarahkan, tidak mengklaim apa pun.
    const kembali = txnId
      ? `${SITE_URL}/ingetdiwa/langganan/sukses?txn=${encodeURIComponent(txnId)}`
      : `${SITE_URL}/ingetdiwa/langganan/sukses`;
    const tautanFinal = `${paymentLink}${paymentLink.includes("?") ? "&" : "?"}redirect=${encodeURIComponent(kembali)}`;

    return NextResponse.json({
      order_id: orderId,
      txn_id: txnId,
      amount: SUBSCRIPTION_AMOUNT,
      payment_link: tautanFinal,
    });
  } catch (error) {
    console.error("[pakasir] error jaringan", error);
    return NextResponse.json(
      { message: "Tidak dapat menghubungi penyedia pembayaran. Silakan coba lagi." },
      { status: 502 }
    );
  }
}
