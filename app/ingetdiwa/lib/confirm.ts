/**
 * Konfirmasi pembayaran sekali jalan untuk halaman checkout website.
 *
 * Alasan berkas ini ada: alur normal pembelian lewat website adalah
 * Pakasir menembak webhook ke server bot begitu pembayaran selesai, lalu bot
 * menambahkan masa aktif dan mengirim pesan konfirmasi ke WhatsApp pembeli.
 * Tidak ada yang perlu menunggu atau memeriksa apa pun berulang.
 *
 * Yang dikerjakan di sini hanya jaring pengaman untuk satu kali permintaan saat
 * pembeli mendarat di halaman sukses, supaya pembelian tidak bergantung pada satu
 * syarat yang tidak bisa kami periksa sendiri: kolom Webhook URL di dashboard
 * Pakasir. Urutannya:
 *
 *   1. Tanya Pakasir SEKALI status transaksi itu (bukan pemeriksaan berkala).
 *   2. Bila sudah lunas, titipkan hasilnya ke webhook bot memakai format payload
 *      Pakasir yang sama, sehingga hanya ada SATU jalur aktivasi di seluruh sistem
 *      (core/server.js di repo WAbot) dan sifat idempotent per txn_id tetap berlaku.
 *
 * Tanpa langkah 2, halaman sukses hanya bisa menampilkan "sedang diproses" dan
 * pembeli harus mengetik perintah konfirmasi sendiri di WhatsApp.
 */

import {
  PAKASIR_API_BASE,
  SUBSCRIPTION_AMOUNT,
  WABOT_WEBHOOK_URL,
} from "./pakasir";

/** Kode transaksi Pakasir: huruf/angka, panjang wajar. */
const TXN_RE = /^[A-Za-z0-9]{6,24}$/;

export type ConfirmState =
  | "invalid" // kode transaksi tidak masuk akal
  | "not-configured" // kredensial Pakasir belum diisi
  | "unknown" // Pakasir tidak mengenali kode itu
  | "pending" // belum dibayar
  | "canceled" // dibatalkan atau kedaluwarsa
  | "nominal" // lunas, tetapi nominalnya bukan harga langganan
  | "completed"; // lunas

export type ConfirmResult = {
  state: ConfirmState;
  /** true bila aktivasi sudah dititipkan ke bot (atau sudah pernah diproses). */
  activated: boolean;
  /** Nomor pelanggan dari order_id, dalam format internasional tanpa tanda +. */
  phone: string | null;
  /** Pesan yang aman ditampilkan ke pengunjung; null bila tidak perlu. */
  message: string | null;
};

/** Ambil nomor pelanggan dari order_id `SUB-<nomor>-<YYYYMM>[-<acak>]`. */
function phoneFromOrderId(orderId: string | null): string | null {
  const match = /^SUB-(\d+)-(\d{6})(?:-[A-Za-z0-9]{1,12})?$/.exec(String(orderId || ""));
  return match ? match[1] : null;
}

/**
 * Periksa satu transaksi lalu, bila sudah lunas, minta bot mengaktifkannya.
 *
 * @param txn kode transaksi dari tautan balik Pakasir (`?txn=`)
 */
export async function confirmTransaction(txn: string): Promise<ConfirmResult> {
  const kode = String(txn || "").trim();
  if (!TXN_RE.test(kode)) {
    return { state: "invalid", activated: false, phone: null, message: null };
  }

  const slug = process.env.PAKASIR_SLUG;
  const apiKey = process.env.PAKASIR_API_KEY;
  if (!slug || !apiKey) {
    return {
      state: "not-configured",
      activated: false,
      phone: null,
      message:
        "Pembayaran Anda tercatat di Pakasir, tetapi sistem kami belum bisa memeriksanya sendiri. Kirim kode pembayaran Anda ke bot lewat WhatsApp agar kami aktifkan sekarang.",
    };
  }

  let payload: Record<string, unknown> | null = null;
  try {
    const response = await fetch(
      `${PAKASIR_API_BASE}/transaction-status/${encodeURIComponent(slug)}/${encodeURIComponent(kode)}`,
      {
        method: "GET",
        headers: { "X-Api-Key": apiKey },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      // 404 = kode tidak dikenal. Selain itu gangguan sesaat, perlakukan sama:
      // pembeli diarahkan ke jalur WhatsApp daripada disuruh menunggu.
      return { state: "unknown", activated: false, phone: null, message: null };
    }
    payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  } catch {
    return { state: "unknown", activated: false, phone: null, message: null };
  }

  const data = ((payload?.data as Record<string, unknown>) ?? payload ?? {}) as Record<
    string,
    unknown
  >;
  const status = String(data.status || "").trim().toLowerCase();

  if (status === "canceled") {
    return { state: "canceled", activated: false, phone: null, message: null };
  }
  if (status !== "completed") {
    return { state: "pending", activated: false, phone: null, message: null };
  }

  const phone = phoneFromOrderId((data.order_id as string) || null);
  if (Number(data.amount) !== SUBSCRIPTION_AMOUNT) {
    return {
      state: "nominal",
      activated: false,
      phone,
      message:
        "Nominal pembayaran tidak sama dengan harga langganan, jadi belum bisa diaktifkan otomatis. Hubungi kami sambil membawa bukti pembayaran.",
    };
  }

  // Titipkan ke jalur aktivasi yang sama dengan webhook Pakasir. Bila rahasianya
  // belum dipasang, jangan mengaku sudah aktif: suruh pembeli menyapa bot.
  const secret = process.env.PAKASIR_WEBHOOK_SECRET;
  if (!secret) {
    console.error(
      "[confirm] PAKASIR_WEBHOOK_SECRET belum diisi di lingkungan ini; konfirmasi diteruskan ke bot tidak dijalankan."
    );
    return {
      state: "completed",
      activated: false,
      phone,
      message:
        "Pembayaran Anda lunas. Kirim pesan apa saja ke bot lewat WhatsApp agar nomor Anda langsung berstatus pelanggan aktif.",
    };
  }

  try {
    const forwarded = await fetch(`${WABOT_WEBHOOK_URL}/webhook/pakasir`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Secret": secret },
      body: JSON.stringify({
        txn_id: kode,
        order_id: data.order_id ?? null,
        amount: data.amount ?? SUBSCRIPTION_AMOUNT,
        status: "completed",
        completed_at: data.completed_at ?? null,
        is_sandbox: Boolean(data.is_sandbox),
      }),
      cache: "no-store",
    });

    if (!forwarded.ok) {
      const teks = await forwarded.text().catch(() => "");
      console.error(`[confirm] bot menolak konfirmasi ${kode}: HTTP ${forwarded.status} ${teks}`);
      return {
        state: "completed",
        activated: false,
        phone,
        message:
          "Pembayaran Anda lunas, tetapi konfirmasi otomatis belum sampai ke sistem kami. Kirim kode pembayaran Anda ke bot lewat WhatsApp agar langsung diaktifkan.",
      };
    }
  } catch (error) {
    console.error("[confirm] gagal menghubungi bot:", error);
    return {
      state: "completed",
      activated: false,
      phone,
      message:
        "Pembayaran Anda lunas, tetapi konfirmasi otomatis belum sampai ke sistem kami. Kirim kode pembayaran Anda ke bot lewat WhatsApp agar langsung diaktifkan.",
    };
  }

  return { state: "completed", activated: true, phone, message: null };
}
