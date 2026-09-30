import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import CheckoutForm from "../components/CheckoutForm";
import { BOT_PHONE_DISPLAY, PRICE_LABEL, PERIOD_DAYS, SITE_URL, WA_LINK } from "../config";

export const metadata: Metadata = {
  title: `Langganan ${PRICE_LABEL}/bulan — IngetDiWA`,
  description: `Bayar langganan IngetDiWA ${PRICE_LABEL} untuk ${PERIOD_DAYS} hari dengan QRIS atau virtual account. Langganan aktif otomatis.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/langganan` },
  robots: { index: false, follow: true },
};

export default function LanggananPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-4 py-14">
        <nav className="text-xs text-slate-500">
          <Link href="/ingetdiwa" className="hover:text-white">
            IngetDiWA
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">Langganan</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
          Langganan IngetDiWA
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {PRICE_LABEL} untuk {PERIOD_DAYS} hari pemakaian penuh.
          Masukkan nomor WhatsApp Anda, selesaikan pembayaran QRIS/VA, dan langganan aktif
          otomatis — bot akan mengirim konfirmasi ke chat Anda.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-lg font-semibold text-white">Data langganan</h2>
            <div className="mt-6">
              <CheckoutForm />
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-base font-semibold text-white">Cara pembayaran</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-400">
                <li>1. Isi nomor WhatsApp, lalu tekan tombol pembayaran.</li>
                <li>2. Pilih metode QRIS atau virtual account di halaman Pakasir.</li>
                <li>3. Selesaikan pembayaran sesuai nominal {PRICE_LABEL}.</li>
                <li>4. Bot mengirim pesan konfirmasi &amp; tanggal aktif Anda.</li>
              </ol>
            </section>

            <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-6">
              <h2 className="text-base font-semibold text-white">
                Belum pernah mencoba?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Nomor baru otomatis mendapat masa coba gratis 7 hari dengan fitur penuh —
                tidak perlu membayar dulu.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full border border-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950"
              >
                Chat bot {BOT_PHONE_DISPLAY}
              </a>
            </section>

            <section className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-base font-semibold text-white">Butuh bantuan?</h2>
              <p className="mt-2 text-sm text-slate-400">
                Kirim pesan ke bot IngetDiWA atau balas email kami bila pembayaran sudah
                berhasil tetapi status langganan belum berubah. Sertakan bukti pembayaran
                agar bisa kami periksa lebih cepat.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
