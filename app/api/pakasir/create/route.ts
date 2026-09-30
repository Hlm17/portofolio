import { NextResponse } from "next/server";
import {
  PAKASIR_API_BASE,
  SUBSCRIPTION_AMOUNT,
  buildOrderId,
  normalizePhone,
} from "@/app/ingetdiwa/lib/pakasir";

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

export async function POST(request: Request) {
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

    return NextResponse.json({
      order_id: orderId,
      txn_id: (result.txn_id as string) || (payload?.txn_id as string) || null,
      amount: SUBSCRIPTION_AMOUNT,
      payment_link: paymentLink,
    });
  } catch (error) {
    console.error("[pakasir] error jaringan", error);
    return NextResponse.json(
      { message: "Tidak dapat menghubungi penyedia pembayaran. Silakan coba lagi." },
      { status: 502 }
    );
  }
}
