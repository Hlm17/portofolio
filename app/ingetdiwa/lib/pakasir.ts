/** Utilitas checkout Pakasir yang dipakai bareng oleh halaman & API route. */

export const PAKASIR_API_BASE = process.env.PAKASIR_API_BASE || "https://app.pakasir.com/api/v2";
export const SUBSCRIPTION_AMOUNT = Number(process.env.PAKASIR_SUBSCRIPTION_AMOUNT) || 3000;

/**
 * Alamat webhook bot WAbot. Halaman sukses memakainya untuk menitipkan satu
 * permintaan konfirmasi ke jalur aktivasi yang sama dengan webhook Pakasir.
 * Bukan rahasia, jadi boleh punya nilai bawaan; server tetap bisa menimpanya.
 */
export const WABOT_WEBHOOK_URL = (
  process.env.WABOT_WEBHOOK_URL || "https://wabot.mhr.web.id"
).replace(/\/+$/, "");

export const DEFAULT_DIAL_CODE = "62";

/**
 * Kode negara yang boleh dipilih di formulir checkout, Indonesia lebih dulu.
 *
 * Daftar ini sengaja pendek: bot memakai zona waktu WIB dan harga rupiah, jadi
 * negara di luar daftar ini lebih baik menghubungi kami dulu daripada membayar
 * lalu mendapat pengingat di jam yang salah.
 *
 * `nasional` adalah pola nomor SELULER setempat, tanpa kode negara dan tanpa nol
 * di depan. Ini yang membuat pemeriksaan di sini berguna: nomor seluler Indonesia
 * selalu diawali 8, Malaysia 1, dan seterusnya. Tanpa pola ini, memilih "+60"
 * sambil mengetik nomor "628197494871" akan diterima apa adanya dan menghasilkan
 * `60628197494871` yang mustahil:
 * satu-satunya cara tahu adalah memeriksa awalan nomor setempat.
 *
 * Hanya nomor seluler yang diterima karena langganan ini dipakai lewat WhatsApp.
 * `contoh` dipakai di placeholder dan pesan kesalahan.
 */
export const DIAL_CODES = [
  { code: "62", iso: "ID", label: "Indonesia", nasional: /^8\d{7,11}$/, contoh: "8123456789" },
  { code: "60", iso: "MY", label: "Malaysia", nasional: /^1\d{7,9}$/, contoh: "123456789" },
  { code: "65", iso: "SG", label: "Singapura", nasional: /^[89]\d{6,7}$/, contoh: "91234567" },
  { code: "673", iso: "BN", label: "Brunei", nasional: /^[78]\d{5,6}$/, contoh: "8123456" },
  { code: "63", iso: "PH", label: "Filipina", nasional: /^9\d{8,9}$/, contoh: "9171234567" },
  { code: "66", iso: "TH", label: "Thailand", nasional: /^[689]\d{7,8}$/, contoh: "812345678" },
  { code: "84", iso: "VN", label: "Vietnam", nasional: /^[35789]\d{7,8}$/, contoh: "912345678" },
  { code: "91", iso: "IN", label: "India", nasional: /^[6789]\d{8,9}$/, contoh: "9876543210" },
  { code: "81", iso: "JP", label: "Jepang", nasional: /^[789]0\d{8}$/, contoh: "9012345678" },
  { code: "61", iso: "AU", label: "Australia", nasional: /^4\d{8}$/, contoh: "412345678" },
  { code: "44", iso: "GB", label: "Inggris", nasional: /^7\d{9}$/, contoh: "7123456789" },
  { code: "1", iso: "US", label: "Amerika Serikat / Kanada", nasional: /^[2-9]\d{9}$/, contoh: "5551234567" },
] as const;

/** Panjang nomor E.164 tanpa tanda `+`. */
export const MIN_PHONE_DIGITS = 8;
export const MAX_PHONE_DIGITS = 15;

/** Alasan sebuah ketikan nomor belum bisa dipakai. */
export type PhoneProblem =
  | "ok"
  | "empty"
  | "too-short"
  | "too-long"
  | "other-country"
  | "wrong-prefix";

export type PhoneParse = {
  /** Nomor format internasional tanpa tanda `+`, siap masuk `order_id` dan JID bot. */
  digits: string;
  valid: boolean;
  problem: PhoneProblem;
  /** Kode negara lain yang terdeteksi di ketikan, mis. "62" untuk pilihan "60". */
  otherCountry: string | null;
  /** Baris kode negara yang sedang diperiksa, untuk menyusun pesan yang tepat. */
  entry: (typeof DIAL_CODES)[number] | null;
};

const SEMUA_KODE = DIAL_CODES.map((item) => item.code);

/**
 * Terjemahkan apa yang diketik pengunjung menjadi nomor format internasional,
 * sekaligus memutuskan apakah ketikan itu masuk akal.
 *
 * Menerima ketiga kebiasaan penulisan yang wajar, supaya tidak ada pengunjung yang
 * ditolak hanya karena gaya menulisnya berbeda:
 *   08197494871      → 628197494871
 *   8197494871       → 628197494871
 *   +62 819-749-4871 → 628197494871
 *   628197494871     → 628197494871
 *
 * Dua hal yang SENGAJA ditolak, keduanya demi menghindari pembeli membayar untuk
 * nomor yang salah:
 *  1. Nomor yang ditulis lengkap dengan tanda `+` (atau `00`) tetapi memakai kode
 *     negara lain daripada yang dipilih, mis. "+62 …" sementara yang terpilih "+60".
 *  2. Nomor yang panjangnya wajar tetapi awalannya bukan awalan seluler negara
 *     terpilih, mis. memilih "+60" lalu mengetik nomor Indonesia. Ini yang menangkap
 *     huruf mati `60628197494871` sebelum tagihan dibuat.
 *
 * @param raw apa yang diketik pengunjung
 * @param dialCode kode negara yang dipilih di formulir (bawaan 62)
 */
export function parsePhone(raw: string, dialCode: string = DEFAULT_DIAL_CODE): PhoneParse {
  const kode = String(dialCode || DEFAULT_DIAL_CODE).replace(/\D/g, "");
  const entry = DIAL_CODES.find((item) => item.code === kode) ?? null;
  const teks = String(raw || "").trim();
  let digits = teks.replace(/\D/g, "");

  // "+" dan "00" sama-sama berarti nomor ditulis lengkap dari kode negara.
  const eksplisit = /^\+/.test(teks) || digits.startsWith("00");
  if (digits.startsWith("00")) digits = digits.slice(2);

  const gagal = (problem: PhoneProblem, otherCountry: string | null = null): PhoneParse => ({
    digits: digits.startsWith(kode) ? digits : `${kode}${digits}`.replace(/^0+/, kode),
    valid: false,
    problem,
    otherCountry,
    entry,
  });

  if (!digits) return gagal("empty");

  if (eksplisit && !digits.startsWith(kode)) {
    const lain = SEMUA_KODE.filter((item) => digits.startsWith(item)).sort(
      (a, b) => b.length - a.length
    )[0];
    return gagal("other-country", lain ?? null);
  }

  // Bentuk setempat (0812…) melepas nolnya, bentuk lengkap (62 812…) dibiarkan.
  const nomorNasional = digits.startsWith(kode)
    ? digits.slice(kode.length)
    : digits.replace(/^0+/, "");
  const lengkap = kode + nomorNasional;

  const hasil = (problem: PhoneProblem): PhoneParse => ({
    digits: lengkap,
    valid: problem === "ok",
    problem,
    otherCountry: null,
    entry,
  });

  if (lengkap.length < MIN_PHONE_DIGITS) return hasil("too-short");
  if (lengkap.length > MAX_PHONE_DIGITS) return hasil("too-long");
  if (entry && !entry.nasional.test(nomorNasional)) return hasil("wrong-prefix");

  return hasil("ok");
}

/** Nomor format internasional tanpa tanda `+`. Dipakai saat validitas sudah diperiksa. */
export function normalizePhone(raw: string, dialCode: string = DEFAULT_DIAL_CODE): string {
  return parsePhone(raw, dialCode).digits;
}

/** Bentuk tampilan untuk pratinjau di formulir: 628197494871 → +62 819-749-4871 */
export function formatPhoneDisplay(digits: string): string {
  const kode: string | undefined = DIAL_CODES.map((item) => item.code)
    .filter((code) => digits.startsWith(code))
    .sort((a, b) => b.length - a.length)[0];

  if (!kode) return `+${digits}`;

  const sisa = digits
    .slice(kode.length)
    .replace(/(\d{3})(\d{4})(\d{0,4}).*/, "$1-$2-$3")
    .replace(/-+$/, "");
  return `+${kode} ${sisa}`.trim();
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
