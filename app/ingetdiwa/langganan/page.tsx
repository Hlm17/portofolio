import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import CheckoutForm from "../components/CheckoutForm";
import { BOT_PHONE_DISPLAY, PRICE_LABEL, PERIOD_DAYS, SITE_URL, WA_LINK } from "../config";

export const metadata: Metadata = {
  title: `Langganan ${PRICE_LABEL} per bulan | IngetDiWA`,
  description: `Bayar langganan IngetDiWA ${PRICE_LABEL} untuk ${PERIOD_DAYS} hari dengan QRIS atau virtual account. Langganan aktif otomatis.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/langganan` },
  robots: { index: false, follow: true },
};

const langkah = [
  "Isi nomor WhatsApp, lalu tekan tombol pembayaran.",
  "Pilih metode QRIS atau virtual account di halaman Pakasir.",
  `Selesaikan pembayaran sesuai nominal ${PRICE_LABEL}.`,
  "Bot mengirim pesan konfirmasi beserta tanggal berakhirnya langganan.",
];

export default function LanggananPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-5 py-16">
        <nav className="text-[12px] text-white/35">
          <Link href="/ingetdiwa" className="transition-colors hover:text-white">
            IngetDiWA
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/50">Langganan</span>
        </nav>

        <h1 className="mt-5 text-[34px] font-black leading-tight tracking-tight sm:text-[42px]">
          Langganan IngetDiWA
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/55">
          {PRICE_LABEL} untuk {PERIOD_DAYS} hari pemakaian penuh. Masukkan nomor WhatsApp
          Anda, selesaikan pembayaran QRIS atau virtual account, dan langganan aktif
          otomatis.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-2xl border border-white/12 bg-white/[0.03] p-7 md:p-9">
            <h2 className="text-[17px] font-bold tracking-tight">Data langganan</h2>
            <div className="mt-7">
              <CheckoutForm />
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-[15px] font-bold tracking-tight">Cara pembayaran</h2>
              <ol className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-white/55">
                {langkah.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-[13px] font-bold text-brand-cyan">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/[0.06] p-6">
              <h2 className="text-[15px] font-bold tracking-tight">Belum pernah mencoba?</h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                Nomor baru otomatis mendapat masa coba gratis 7 hari dengan fitur penuh,
                tanpa perlu membayar lebih dulu.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-md border border-brand-cyan px-5 py-2.5 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:bg-brand-cyan hover:text-black"
              >
                Kirim pesan ke {BOT_PHONE_DISPLAY}
              </a>
            </section>

            <section className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-[15px] font-bold tracking-tight">Butuh bantuan?</h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">
                Kirim pesan ke bot IngetDiWA atau balas email kami bila pembayaran sudah
                berhasil tetapi status langganan belum berubah. Sertakan bukti pembayaran
                agar kami dapat memeriksa lebih cepat.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
