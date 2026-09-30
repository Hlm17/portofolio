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

/**
 * `order_id` harus identik dengan format yang dipakai bot WAbot di server,
 * supaya webhook Pakasir yang sama bisa mengaktifkan langganan dari dua jalur
 * (chat bot maupun website).
 */
export function buildOrderId(phone: string, now: Date = new Date()): string {
  return `SUB-${phone}-${currentCycleWib(now)}`;
}

export const ORDER_ID_RE = /^SUB-(\d+)-(\d{6})$/;
