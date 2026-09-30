/**
 * Sumber tunggal untuk identitas produk IngetDiWA di website hilmi.work.
 * Angka & nomor di sini WAJIB sama dengan yang dipakai bot WAbot (lihat ~/WAbot/.env).
 */

export const PRODUCT_NAME = "IngetDiWA";
export const PRODUCT_TAGLINE = "Pengingat & to-do list lewat WhatsApp";

/** Nomor bot final — keputusan pemilik proyek: SELALU 628197494871. */
export const BOT_PHONE = "628197494871";
export const BOT_PHONE_DISPLAY = "+62 819-749-4871";

export const SUPPORT_EMAIL = "mhilmirajwandhika@gmail.com";

/** Domain kanonik website produk. Diatur lewat env agar mudah dipindah antar-domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ingetdiwa.hilmi.work"
).replace(/\/+$/, "");

/** Harga langganan (Rupiah). Harus sama dengan PAKASIR_SUBSCRIPTION_AMOUNT di server bot. */
export const PRICE_IDR = 3000;
export const PRICE_LABEL = "Rp3.000";
export const PERIOD_DAYS = 30;
export const TRIAL_DAYS = 7;

export const WA_LINK = `https://wa.me/${BOT_PHONE}?text=${encodeURIComponent("mulai")}`;

export function waLink(text: string): string {
  return `https://wa.me/${BOT_PHONE}?text=${encodeURIComponent(text)}`;
}
