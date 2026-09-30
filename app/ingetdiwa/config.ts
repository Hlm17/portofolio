/**
 * Sumber tunggal untuk identitas produk IngetDiWA di subdomain produk.
 * Angka dan nomor di sini WAJIB sama dengan yang dipakai bot WAbot (~/WAbot/.env).
 */

export const PRODUCT_NAME = "IngetDiWA";
export const PRODUCT_TAGLINE = "Pengingat dan daftar tugas lewat WhatsApp";

/** Nomor bot final, keputusan pemilik proyek: selalu 628197494871. */
export const BOT_PHONE = "628197494871";
export const BOT_PHONE_DISPLAY = "+62 819-749-4871";

export const SUPPORT_EMAIL = "mhilmirajwandhika@gmail.com";

/** Domain kanonik halaman produk. Bisa dipindah lewat env tanpa mengubah kode. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ingetdiwa.hilmi.work"
).replace(/\/+$/, "");

/** Halaman lain milik pemilik proyek yang sama. */
export const MAIN_SITE_URL = "https://hilmi.work";

/** Harga langganan. Harus sama dengan PAKASIR_SUBSCRIPTION_AMOUNT di server bot. */
export const PRICE_IDR = 3000;
export const PRICE_LABEL = "Rp3.000";
export const PERIOD_DAYS = 30;
export const TRIAL_DAYS = 7;

export const WA_LINK = `https://wa.me/${BOT_PHONE}?text=${encodeURIComponent("mulai")}`;

export function waLink(text: string): string {
  return `https://wa.me/${BOT_PHONE}?text=${encodeURIComponent(text)}`;
}
