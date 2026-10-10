import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import ConfirmButton from "../../components/ConfirmButton";
import { confirmTransaction, type ConfirmResult } from "../../lib/confirm";
import { formatPhoneDisplay } from "../../lib/pakasir";
import { BOT_PHONE_DISPLAY, SITE_URL, SUPPORT_EMAIL, WA_LINK, PERIOD_DAYS, waLink } from "../../config";

export const metadata: Metadata = {
  title: "Pembayaran diterima | IngetDiWA",
  description: "Terima kasih. Langganan IngetDiWA Anda sedang diproses.",
  alternates: { canonical: `${SITE_URL}/ingetdiwa/langganan/sukses` },
  robots: { index: false, follow: false },
};

// Halaman ini menanyakan status satu transaksi ke Pakasir saat dibuka, jadi hasil
// pemeriksaannya tidak boleh diambil dari cache dan tidak boleh dipangkas saat build.
export const dynamic = "force-dynamic";

const langkah = [
  `Pastikan nomor bot ${BOT_PHONE_DISPLAY} sudah tersimpan di kontak Anda.`,
  "Kirim pesan apa saja ke bot untuk mulai mencatat tugas.",
  'Ketik "list" kapan saja untuk melihat seluruh tugas Anda.',
];

/** Judul dan kalimat pembuka menurut hasil pemeriksaan sekali jalan. */
function ringkasan(hasil: ConfirmResult | null, adaTxn: boolean) {
  if (!adaTxn || !hasil) {
    return {
      judul: "Terima kasih sudah berlangganan",
      isi: `Setelah Pakasir mengonfirmasi pembayaran Anda, sistem kami menambahkan ${PERIOD_DAYS} hari masa aktif ke nomor WhatsApp yang Anda masukkan. Bot mengirim pesan konfirmasi beserta tanggal berakhirnya langganan.`,
    };
  }

  const nomor = hasil.phone ? formatPhoneDisplay(hasil.phone) : null;

  switch (hasil.state) {
    case "completed":
      return hasil.activated
        ? {
            judul: "Nomor Anda sudah aktif",
            isi: nomor
              ? `Pembayaran Anda lunas. Nomor ${nomor} sudah masuk ke daftar kami sebagai pelanggan aktif selama ${PERIOD_DAYS} hari, dan pesan konfirmasinya juga dikirim ke WhatsApp nomor itu. Tidak ada langkah lain yang perlu Anda kerjakan.`
              : `Pembayaran Anda lunas dan nomor Anda sudah aktif selama ${PERIOD_DAYS} hari. Pesan konfirmasinya juga dikirim ke WhatsApp Anda.`,
          }
        : {
            judul: "Pembayaran Anda lunas",
            isi: nomor
              ? `Pembayaran untuk nomor ${nomor} sudah lunas, tetapi konfirmasi otomatisnya belum sampai ke sistem kami. Satu langkah kecil lagi: buka WhatsApp dan kirim kodenya, nomor Anda langsung diaktifkan.`
              : "Pembayaran Anda sudah lunas, tetapi konfirmasi otomatisnya belum sampai ke sistem kami. Kirim kode pembayaran Anda ke bot lewat WhatsApp agar nomor Anda langsung diaktifkan.",
          };
    case "pending":
      return {
        judul: "Menunggu pembayaran Anda",
        isi: belumLunas(nomor),
      };
    case "canceled":
      return {
        judul: "Transaksi dibatalkan",
        isi: "Transaksi itu dibatalkan atau sudah melewati batas waktu, jadi tidak ada masa aktif yang ditambahkan. Silakan ulangi pembayaran dari halaman langganan.",
      };
    case "nominal":
      return {
        judul: "Nominal belum sesuai",
        isi: "Nominal pembayaran tidak sama dengan harga langganan, jadi belum bisa diaktifkan otomatis. Hubungi kami dengan bukti pembayaran agar diperiksa manual.",
      };
    case "not-configured":
      return {
        judul: "Pembayaran sedang kami periksa",
        isi: "Pembayaran Anda tercatat di Pakasir. Kirim kode pembayaran Anda ke bot lewat WhatsApp agar kami bisa mengaktifkannya dari sana.",
      };
    default:
      return {
        judul: "Kode pembayaran tidak ditemukan",
        isi: "Kami tidak menemukan transaksi dengan kode itu. Bila Anda merasa sudah membayar, kirim kode pembayaran Anda ke bot lewat WhatsApp agar kami periksa.",
      };
  }
}

/**
 * Kalimat untuk transaksi yang belum lunas. Intinya menenangkan: pembeli tidak perlu
 * menunggu di halaman ini karena konfirmasinya datang sendiri lewat WhatsApp.
 */
function belumLunas(nomor: string | null): string {
  const awal = nomor
    ? `Transaksi untuk nomor ${nomor} baru tercatat belum lunas.`
    : "Transaksi itu baru tercatat belum lunas.";
  return `${awal} Begitu pembayaran benar-benar masuk, langganan aktif sendiri dan konfirmasinya dikirim ke WhatsApp Anda. Tidak perlu menunggu di halaman ini.`;
}

export default async function SuksesPage({
  searchParams,
}: {
  searchParams?: { txn?: string };
}) {
  // Kode transaksi datang dari tautan balik Pakasir (`?txn=`). Satu kali pemeriksaan
  // di sini sudah cukup: jalur normalnya adalah webhook Pakasir, yang berjalan sendiri
  // tanpa pembeli perlu membuka halaman ini sama sekali.
  const txn = (searchParams?.txn || "").trim();
  const txnSah = /^[a-z0-9]{6,24}$/i.test(txn) ? txn : "";

  const hasil = txnSah ? await confirmTransaction(txnSah) : null;
  const { judul, isi } = ringkasan(hasil, Boolean(txnSah));
  const aktif = hasil?.state === "completed" && hasil.activated === true;

  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      <main className="mx-auto max-w-2xl px-5 py-24">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/10">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan" />
        </span>

        <h1 className="mt-7 text-[32px] font-black leading-tight tracking-tight sm:text-[38px]">
          {judul}
        </h1>
        <p className="mt-5 text-[14px] leading-relaxed text-white/55">{isi}</p>

        {txnSah ? (
          <div className="mt-9 rounded-2xl border border-brand-cyan/30 bg-brand-cyan/[0.06] p-7">
            <h2 className="text-[15px] font-bold tracking-tight">
              {aktif ? "Langkah berikutnya" : "Bila perlu, aktifkan sekarang"}
            </h2>
            {aktif ? (
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                Buka WhatsApp dan kirim pesan apa saja ke bot. Nomor Anda sudah terdaftar,
                jadi tugas pertama bisa langsung dicatat tanpa perintah tambahan.
              </p>
            ) : (
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                Buka WhatsApp dan kirim pesan yang sudah tertulis di bawah ini. Bot memeriksa
                kode pembayaran Anda, lalu menambahkan masa aktifnya. Kode pembayaran Anda:{" "}
                <span className="text-white/85">{txnSah}</span>
              </p>
            )}

            <a
              href={aktif ? WA_LINK : waLink(`cek ${txnSah}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md bg-brand-cyan px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white"
            >
              {aktif ? "Buka WhatsApp" : "Konfirmasi lewat WhatsApp"}
            </a>

            {!aktif ? <ConfirmButton txn={txnSah} /> : null}
          </div>
        ) : null}

        <div className="mt-11 rounded-2xl border border-white/12 bg-white/[0.03] p-7">
          <h2 className="text-[15px] font-bold tracking-tight">Langkah selanjutnya</h2>
          <ol className="mt-5 space-y-3.5 text-[13.5px] leading-relaxed text-white/55">
            {langkah.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[13px] font-bold text-brand-cyan">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-md border border-brand-cyan px-6 py-3 text-[14px] font-semibold text-brand-cyan transition-colors hover:bg-brand-cyan hover:text-black"
          >
            Buka WhatsApp
          </a>
        </div>

        <p className="mt-9 text-[12.5px] leading-relaxed text-white/55">
          Konfirmasi biasanya masuk dalam hitungan detik. Bila lebih dari sepuluh menit belum
          ada kabar, hubungi{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-brand-cyan transition-colors hover:text-white"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          dengan menyertakan bukti pembayaran.
        </p>

        <p className="mt-7 text-[13.5px]">
          <Link href="/ingetdiwa" className="text-white/55 transition-colors hover:text-white">
            Kembali ke halaman produk
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
