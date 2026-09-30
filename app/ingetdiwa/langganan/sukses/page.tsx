import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { BOT_PHONE_DISPLAY, SITE_URL, SUPPORT_EMAIL, WA_LINK, PERIOD_DAYS } from "../../config";

export const metadata: Metadata = {
  title: "Pembayaran diterima | IngetDiWA",
  description: "Terima kasih. Langganan IngetDiWA Anda sedang diproses.",
  alternates: { canonical: `${SITE_URL}/ingetdiwa/langganan/sukses` },
  robots: { index: false, follow: false },
};

const langkah = [
  `Pastikan nomor bot ${BOT_PHONE_DISPLAY} sudah tersimpan di kontak Anda.`,
  "Kirim pesan apa saja ke bot untuk mulai mencatat tugas.",
  'Ketik "list" kapan saja untuk melihat seluruh tugas Anda.',
];

export default function SuksesPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      <main className="mx-auto max-w-2xl px-5 py-24">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/10">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan" />
        </span>

        <h1 className="mt-7 text-[32px] font-black leading-tight tracking-tight sm:text-[38px]">
          Terima kasih sudah berlangganan
        </h1>
        <p className="mt-5 text-[14px] leading-relaxed text-white/55">
          Setelah Pakasir mengonfirmasi pembayaran Anda, sistem kami menambahkan{" "}
          {PERIOD_DAYS} hari masa aktif ke nomor WhatsApp yang Anda masukkan. Bot akan
          mengirim pesan konfirmasi beserta tanggal berakhirnya langganan.
        </p>

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
            className="mt-7 inline-block rounded-md bg-brand-cyan px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white"
          >
            Buka WhatsApp
          </a>
        </div>

        <p className="mt-9 text-[12.5px] leading-relaxed text-white/35">
          Konfirmasi biasanya masuk dalam hitungan detik. Bila lebih dari sepuluh menit
          belum ada kabar, hubungi{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-brand-cyan transition-colors hover:text-white"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          dengan menyertakan bukti pembayaran.
        </p>

        <p className="mt-7 text-[13.5px]">
          <Link
            href="/ingetdiwa"
            className="text-white/45 transition-colors hover:text-white"
          >
            Kembali ke halaman produk
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
