import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { BOT_PHONE_DISPLAY, SITE_URL, SUPPORT_EMAIL, WA_LINK, PERIOD_DAYS } from "../../config";

export const metadata: Metadata = {
  title: "Pembayaran Diterima — IngetDiWA",
  description: "Terima kasih! Langganan IngetDiWA Anda sedang diproses.",
  alternates: { canonical: `${SITE_URL}/ingetdiwa/langganan/sukses` },
  robots: { index: false, follow: false },
};

export default function SuksesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteNav />

      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl">
          ✅
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Terima kasih sudah berlangganan!
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Setelah Pakasir mengonfirmasi pembayaran Anda, sistem kami otomatis menambah{" "}
          {PERIOD_DAYS} hari masa aktif ke nomor WhatsApp yang Anda masukkan. Bot akan
          mengirim pesan konfirmasi berisi tanggal berakhirnya langganan.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left">
          <h2 className="text-base font-semibold text-white">Langkah selanjutnya</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-400">
            <li>
              1. Pastikan Anda sudah menyimpan nomor bot <strong className="text-white">{BOT_PHONE_DISPLAY}</strong>.
            </li>
            <li>2. Kirim pesan apa saja ke bot untuk mulai mencatat tugas.</li>
            <li>3. Ketik “list” kapan saja untuk melihat daftar tugas Anda.</li>
          </ol>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Buka WhatsApp
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Konfirmasi biasanya masuk dalam hitungan detik. Bila lebih dari 10 menit belum
          ada kabar, hubungi{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          dengan menyertakan bukti pembayaran.
        </p>

        <p className="mt-6 text-sm">
          <Link href="/ingetdiwa" className="text-slate-400 hover:text-white">
            ← Kembali ke halaman produk
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
