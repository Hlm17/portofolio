import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ChatDemo from "./components/ChatDemo";
import {
  PRODUCT_NAME,
  PRICE_LABEL,
  PERIOD_DAYS,
  TRIAL_DAYS,
  WA_LINK,
  SITE_URL,
} from "./config";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} — Pengingat & To-Do List di WhatsApp`,
  description:
    `Catat jadwal cukup dengan chat WhatsApp, bot ${PRODUCT_NAME} mengingatkan Anda tepat waktu. Gratis ${TRIAL_DAYS} hari, lalu ${PRICE_LABEL} per bulan.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa` },
  openGraph: {
    title: `${PRODUCT_NAME} — Pengingat & To-Do List di WhatsApp`,
    description: `Catat jadwal cukup dengan chat. Gratis ${TRIAL_DAYS} hari, lalu ${PRICE_LABEL}/bulan.`,
    url: `${SITE_URL}/ingetdiwa`,
    type: "website",
  },
};

const features = [
  {
    icon: "💬",
    title: "Cukup Chat Bahasa Sehari-hari",
    body: "“Jemput adik jam 3 sore”, “bayar token abis isya”, “30 menit lagi matiin kompor” — bot memahami kalimat biasa, bukan format kaku.",
  },
  {
    icon: "⏰",
    title: "Pengingat Otomatis Tepat Waktu",
    body: "Begitu waktunya tiba, bot mengirim pesan pengingat langsung ke WhatsApp Anda. Tidak perlu buka aplikasi lain.",
  },
  {
    icon: "✅",
    title: "Daftar Tugas & Coret Selesai",
    body: "Ketik “list” untuk melihat tugas hari ini dan “1 done” untuk mencoret yang sudah selesai. Riwayat tetap rapi.",
  },
  {
    icon: "🔁",
    title: "Pengingat List Rutin",
    body: "Atur bot mengirim ulang daftar tugas Anda setiap jam atau beberapa menit sekali lewat perintah “ingetin 1 jam sekali”.",
  },
  {
    icon: "📵",
    title: "Tanpa Install Aplikasi Baru",
    body: "Tidak ada aplikasi, tidak ada email, tidak ada password. Semua berjalan di dalam WhatsApp yang sudah Anda pakai.",
  },
  {
    icon: "🔒",
    title: "Data Hanya Untuk Anda",
    body: "Nomor dan daftar tugas Anda hanya dipakai untuk mengirim pengingat. Lihat Kebijakan Privasi untuk detailnya.",
  },
];

const steps = [
  {
    n: "1",
    title: "Kirim pesan ke bot",
    body: "Klik tombol WhatsApp dan kirim kata “mulai”. Anda langsung mendapat masa coba gratis tanpa perlu memasukkan metode pembayaran.",
  },
  {
    n: "2",
    title: "Ceritakan kegiatan Anda",
    body: "Tulis jadwal seperti sedang chat ke teman. Bot menyimpannya sebagai tugas dengan waktu pengingat yang Anda maksud.",
  },
  {
    n: "3",
    title: "Terima pengingatnya",
    body: "Saat waktunya tiba, pengingat dikirim ke chat. Selesaikan lalu balas “1 done” agar daftar Anda selalu bersih.",
  },
];

const faqs = [
  {
    q: "Apakah perlu memasang aplikasi tambahan?",
    a: "Tidak. IngetDiWA 100% berjalan di dalam WhatsApp. Anda hanya perlu menyimpan nomor bot dan mulai mengirim pesan.",
  },
  {
    q: "Bagaimana cara mencobanya?",
    a: `Nomor yang belum pernah mendaftar otomatis mendapat masa coba gratis ${TRIAL_DAYS} hari dengan fitur penuh, tanpa perlu memasukkan metode pembayaran.`,
  },
  {
    q: "Berapa biayanya setelah masa coba habis?",
    a: `${PRICE_LABEL} untuk ${PERIOD_DAYS} hari (1 bulan). Masa aktif bisa diperpanjang kapan saja, dan sisa masa aktif tidak hangus saat melakukan perpanjangan.`,
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Pembayaran diproses oleh Pakasir sehingga Anda bisa membayar dengan QRIS atau virtual account dari berbagai bank dan e-wallet. Setelah pembayaran selesai, langganan aktif otomatis.",
  },
  {
    q: "Bagaimana jika saya ingin berhenti?",
    a: "Tidak ada kontrak. Cukup kirim “batal” agar bot berhenti mengirim pesan, dan langganan akan berakhir sendiri pada tanggal kedaluwarsa.",
  },
];

export default function IngetDiwaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(16,185,129,0.18),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Gratis {TRIAL_DAYS} hari • tanpa kartu kredit
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Pengingat &amp; daftar tugas
              <span className="block text-emerald-400">langsung di WhatsApp</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              {PRODUCT_NAME} mencatat jadwal dari chat biasa lalu mengingatkan Anda tepat
              waktu. Tanpa aplikasi baru, tanpa format rumit — cukup seperti mengirim pesan
              ke teman.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                Coba Gratis {TRIAL_DAYS} Hari
              </a>
              <Link
                href="/ingetdiwa/langganan"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Langganan {PRICE_LABEL}/bulan
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt className="text-xs text-slate-500">Harga</dt>
                <dd className="text-lg font-bold text-white">{PRICE_LABEL}</dd>
                <dd className="text-xs text-slate-500">per bulan</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Masa coba</dt>
                <dd className="text-lg font-bold text-white">{TRIAL_DAYS} hari</dd>
                <dd className="text-xs text-slate-500">fitur penuh</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Pembayaran</dt>
                <dd className="text-lg font-bold text-white">QRIS</dd>
                <dd className="text-xs text-slate-500">via Pakasir</dd>
              </div>
            </dl>
          </div>

          <ChatDemo />
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="border-t border-white/10 bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-white">Semua yang Anda butuhkan</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Dibuat untuk orang sibuk yang ingin mencatat cepat tanpa membuka aplikasi
            produktivitas yang rumit.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/40"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-white">Mulai dalam 3 langkah</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Tidak ada proses pendaftaran panjang. Anda sudah bisa memakai {PRODUCT_NAME}
            dalam waktu kurang dari satu menit.
          </p>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl border border-white/10 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-base font-bold text-slate-950">
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Mulai sekarang di WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Harga */}
      <section id="harga" className="border-t border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-white">Harga sederhana, tanpa jebakan</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Satu paket untuk semua fitur. Tidak ada biaya pendaftaran dan tidak ada biaya
            tersembunyi.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-8">
              <h3 className="text-lg font-semibold text-white">Uji Coba</h3>
              <p className="mt-4 text-4xl font-extrabold text-white">Gratis</p>
              <p className="mt-1 text-sm text-slate-500">{TRIAL_DAYS} hari pertama</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>✓ Semua fitur terbuka</li>
                <li>✓ Tanpa metode pembayaran</li>
                <li>✓ Aktif otomatis untuk nomor baru</li>
              </ul>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white hover:border-white/40"
              >
                Kirim “mulai” ke bot
              </a>
            </div>

            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-500/[0.06] p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Langganan Bulanan</h3>
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950">
                  Populer
                </span>
              </div>
              <p className="mt-4 text-4xl font-extrabold text-white">{PRICE_LABEL}</p>
              <p className="mt-1 text-sm text-slate-500">per {PERIOD_DAYS} hari</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li>✓ Pengingat otomatis tanpa batas</li>
                <li>✓ Daftar tugas harian</li>
                <li>✓ Pengingat list rutin per jam</li>
                <li>✓ Perpanjangan tidak menghanguskan sisa masa aktif</li>
              </ul>
              <Link
                href="/ingetdiwa/langganan"
                className="mt-8 block rounded-full bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Bayar dengan QRIS
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 p-8">
              <h3 className="text-lg font-semibold text-white">Pembayaran</h3>
              <p className="mt-4 text-4xl font-extrabold text-white">Otomatis</p>
              <p className="mt-1 text-sm text-slate-500">aktif seketika</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>✓ QRIS semua bank &amp; e-wallet</li>
                <li>✓ Diproses aman oleh Pakasir</li>
                <li>✓ Bot langsung mengabari saat lunas</li>
              </ul>
              <Link
                href="/ingetdiwa/langganan"
                className="mt-8 block rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white hover:border-white/40"
              >
                Lihat halaman pembayaran
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-white">Pertanyaan yang sering diajukan</h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-white">
                  {faq.q}
                  <span className="ml-4 text-emerald-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-emerald-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-950">
            Jangan lupa hal penting lagi.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-900">
            Mulai gratis hari ini, dan bayar hanya {PRICE_LABEL} per bulan ketika Anda
            merasa terbantu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Coba Gratis {TRIAL_DAYS} Hari
            </a>
            <Link
              href="/ingetdiwa/langganan"
              className="rounded-full border border-slate-950/30 px-6 py-3 text-sm font-semibold text-slate-950 hover:border-slate-950"
            >
              Lihat Paket Bulanan
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
