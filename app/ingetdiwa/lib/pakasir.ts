/** Utilitas checkout Pakasir yang dipakai bareng oleh halaman & API route. */

export const PAKASIR_API_BASE = process.env.PAKASIR_API_BASE || "https://app.pakasir.com/api/v2";
export const SUBSCRIPTION_AMOUNT = Number(process.env.PAKASIR_SUBSCRIPTION_AMOUNT) || 3000;

/** 08197494871 / 8197494871 / +62 819-749-4871 → 628197494871 */
export function normalizePhone(raw: string): string {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  else if (digits.startsWith("8")) digits = "62" + digits;
  return digits;
}

/** Siklus penagihan `YYYYMM` menurut zona waktu WIB (UTC+7). */
export function currentCycleWib(now: Date = new Date()): string {
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return `${wib.getUTCFullYear()}${String(wib.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Akhiran acak pendek untuk order_id: hanya pembeda percobaan, bukan rahasia. */
function akhiranAcak(): string {
  return Math.random().toString(36).slice(2, 8).padEnd(6, "0");
}

/**
 * `order_id` untuk satu percobaan checkout: `SUB-<nomor>-<YYYYMM>-<acak>`.
 *
 * Bentuk dasarnya sama dengan yang dipakai bot WAbot di server (`SUB-<nomor>-<YYYYMM>`),
 * jadi webhook Pakasir tetap bisa mengurai nomor pelanggannya. Akhiran acaknya penting:
 * Pakasir menolak permintaan create untuk order_id yang transaksinya pernah dibatalkan
 * (HTTP 404 "Transaksi telah dibatalkan") dan TIDAK membuat transaksi pengganti.
 * Tanpa akhiran, satu keranjang yang ditinggalkan lebih dari 1x24 jam akan mematikan
 * tombol bayar nomor itu sampai berganti bulan. Dibuktikan langsung ke API 3 Okt 2026.
 */
export function buildOrderId(phone: string, now: Date = new Date()): string {
  return `SUB-${phone}-${currentCycleWib(now)}-${akhiranAcak()}`;
}

export const ORDER_ID_RE = /^SUB-(\d+)-(\d{6})(?:-[A-Za-z0-9]{1,12})?$/;
