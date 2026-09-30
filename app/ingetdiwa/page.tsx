import type { Metadata } from "next";
import Link from "next/link";
import Aurora from "../components/Aurora/Aurora";
import ScrollVelocity from "../components/ScrollVelocity/ScrollVelocity";
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
  BOT_PHONE_DISPLAY,
} from "./config";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} | Pengingat dan daftar tugas di WhatsApp`,
  description: `Catat jadwal cukup dengan chat WhatsApp. Bot ${PRODUCT_NAME} mengingatkan Anda tepat waktu. Gratis ${TRIAL_DAYS} hari, lalu ${PRICE_LABEL} per bulan.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa` },
  openGraph: {
    title: `${PRODUCT_NAME} | Pengingat dan daftar tugas di WhatsApp`,
    description: `Catat jadwal cukup dengan chat. Gratis ${TRIAL_DAYS} hari, lalu ${PRICE_LABEL} per bulan.`,
    url: `${SITE_URL}/ingetdiwa`,
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Kirim pesan pertama",
    body: `Simpan nomor ${BOT_PHONE_DISPLAY} lalu kirim kata "mulai". Masa coba ${TRIAL_DAYS} hari langsung aktif dengan seluruh fitur terbuka.`,
  },
  {
    number: "02",
    title: "Ceritakan jadwal Anda",
    body: "Tulis seperti Anda sedang mengirim pesan ke teman. Bot membaca waktu yang Anda maksud dan menyimpannya sebagai tugas.",
  },
  {
    number: "03",
    title: "Terima pengingatnya",
    body: 'Saat waktunya tiba, bot mengirim pengingat ke chat yang sama. Setelah selesai, balas "1 done" agar daftar Anda tetap bersih.',
  },
];

const abilities = [
  {
    title: "Memahami bahasa percakapan",
    body: 'Anda tidak perlu menulis format khusus. Bot mengenali jam, tanggal, dan istilah keseharian seperti "abis isya" atau "waktu buka puasa".',
  },
  {
    title: "Pengingat yang tepat waktu",
    body: "Sistem memeriksa jadwal setiap menit dan mengirim pengingat ke chat, termasuk saat aplikasi WhatsApp sedang tidak Anda buka.",
  },
  {
    title: "Daftar tugas yang bisa dicoret",
    body: 'Ketik "list" untuk melihat seluruh tugas hari ini, lalu "1 done" untuk mencoret yang sudah beres. Riwayat tetap tersimpan.',
  },
  {
    title: "Pengingat daftar berkala",
    body: 'Minta bot mengirim ulang daftar tugas Anda setiap jam atau setiap beberapa menit lewat perintah seperti "ingetin 1 jam sekali".',
  },
  {
    title: "Masa aktif yang transparan",
    body: "Bot mengabari tiga jam dan satu jam sebelum masa aktif berakhir. Saat memperpanjang, sisa masa aktif Anda tidak hangus.",
  },
  {
    title: "Tanpa aplikasi tambahan",
    body: "Tidak ada unduhan, tidak ada kata sandi, tidak ada email. Cukup nomor WhatsApp yang sudah Anda pakai setiap hari.",
  },
];

const examples = [
  "jemput adik jam 3 sore",
  "rapat tanggal 25 september jam 10 pagi",
  "matiin kompor 30 menit lagi",
  "besok waktu buka puasa ingetin beli es",
  "nanti malam abis isya telepon bos",
  "senin bayar utang, eh gajadi, selasa aja",
  "ingetin 1 jam sekali",
];

const faqs = [
  {
    q: "Apakah saya perlu memasang aplikasi tambahan?",
    a: `${PRODUCT_NAME} berjalan sepenuhnya di dalam WhatsApp. Anda hanya perlu menyimpan nomor bot lalu mulai mengirim pesan.`,
  },
  {
    q: "Bagaimana cara mencobanya?",
    a: `Nomor yang belum pernah mendaftar otomatis mendapat masa coba ${TRIAL_DAYS} hari dengan fitur penuh, tanpa perlu memasukkan metode pembayaran.`,
  },
  {
    q: "Berapa biayanya setelah masa coba selesai?",
    a: `${PRICE_LABEL} untuk ${PERIOD_DAYS} hari pemakaian. Tidak ada biaya pendaftaran, tidak ada perpanjangan otomatis, dan sisa masa aktif tetap terpakai saat Anda memperpanjang.`,
  },
  {
    q: "Bagaimana cara membayarnya?",
    a: 'Ketik "daftar" di chat. Bot akan mengirim kode QRIS beserta tautan pembayaran untuk tagihan yang sama. Setelah pembayaran masuk, masa aktif ditambahkan otomatis dan bot mengirim konfirmasi beserta tanggal berakhirnya.',
  },
  {
    q: "Bisakah saya berhenti kapan saja?",
    a: 'Bisa. Kirim kata "batal" agar bot berhenti mengirim pesan. Tidak ada kontrak dan tidak ada biaya penghentian.',
  },
];

export default function IngetDiwaPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      {/* Pembuka */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.55}
            amplitude={0.35}
            speed={0.35}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[12px] tracking-wide text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              Gratis {TRIAL_DAYS} hari, tanpa metode pembayaran
            </p>

            <h1 className="mt-6 text-[42px] font-black leading-[1.05] tracking-tight sm:text-[56px]">
              Pengingat dan daftar tugas
              <span className="mt-1 block bg-brand-gradient bg-clip-text text-transparent">
                di dalam WhatsApp
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/60">
              {PRODUCT_NAME} mencatat jadwal dari percakapan biasa, lalu mengingatkan Anda
              saat waktunya tiba. Tanpa aplikasi baru dan tanpa format penulisan khusus.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-brand-cyan px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white"
              >
                Coba gratis {TRIAL_DAYS} hari
              </a>
              <Link
                href="/ingetdiwa/langganan"
                className="rounded-md border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:border-white/60"
              >
                Langganan {PRICE_LABEL} per bulan
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {[
                { label: "Harga", value: PRICE_LABEL, note: `per ${PERIOD_DAYS} hari` },
                { label: "Masa coba", value: `${TRIAL_DAYS} hari`, note: "fitur penuh" },
                { label: "Metode bayar", value: "QRIS", note: "semua dompet digital" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] uppercase tracking-widest text-white/35">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[20px] font-bold tracking-tight">{item.value}</dd>
                  <dd className="text-[12px] text-white/40">{item.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* Contoh kalimat */}
      <section className="border-y border-white/10 py-8">
        <p className="mx-auto max-w-6xl px-5 pb-5 text-[12px] uppercase tracking-widest text-white/35">
          Kalimat yang sudah dimengerti bot
        </p>
        <ScrollVelocity
          texts={examples}
          velocity={45}
          numCopies={3}
          className="text-[22px] font-semibold tracking-tight text-white/70 sm:text-[28px]"
        />
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <h2 className="max-w-2xl text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
          Mulai bekerja dalam tiga langkah
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-white/15 pt-6">
              <span className="bg-brand-gradient bg-clip-text text-[13px] font-bold tracking-widest text-transparent">
                {step.number}
              </span>
              <h3 className="mt-3 text-[19px] font-bold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Kemampuan */}
      <section id="kemampuan" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <h2 className="max-w-2xl text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
            Yang Anda dapatkan
          </h2>

          <div className="mt-14 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {abilities.map((item) => (
              <div key={item.title} className="border-t border-white/10 pt-5">
                <h3 className="text-[16px] font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harga */}
      <section id="harga" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
                Satu harga, semua fitur
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/55">
                Tidak ada paket bertingkat dan tidak ada biaya tersembunyi. Masa coba
                berlaku penuh, jadi Anda bisa menilai sendiri sebelum membayar.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-8">
              <p className="text-[13px] uppercase tracking-widest text-white/40">
                Langganan bulanan
              </p>
              <p className="mt-4 text-[46px] font-black leading-none tracking-tight">
                {PRICE_LABEL}
              </p>
              <p className="mt-2 text-[13px] text-white/45">untuk {PERIOD_DAYS} hari</p>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-7 text-[14px] text-white/70">
                {[
                  "Pengingat otomatis tanpa batas",
                  "Daftar tugas dan riwayat penyelesaian",
                  "Pengingat daftar berkala setiap jam",
                  "Masa coba 7 hari sebelum membayar",
                  "Sisa masa aktif tidak hangus saat memperpanjang",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/ingetdiwa/langganan"
                className="mt-8 block rounded-md bg-white px-6 py-3.5 text-center text-[14px] font-semibold text-black transition-colors hover:bg-brand-cyan"
              >
                Lanjut ke pembayaran
              </Link>
              <p className="mt-4 text-[12px] leading-relaxed text-white/35">
                Membayar dengan kode QRIS atau tautan pembayaran setelah Anda mengetik
                &ldquo;daftar&rdquo; di chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-5 py-20 lg:py-24">
          <h2 className="text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
            Pertanyaan yang sering diajukan
          </h2>

          <div className="mt-12">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-white/10 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[15px] font-semibold text-white">
                  {faq.q}
                  <span className="mt-0.5 shrink-0 text-brand-cyan transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-70">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.7}
            amplitude={0.45}
            speed={0.3}
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-[32px] font-black leading-tight tracking-tight sm:text-[42px]">
            Jangan lupa hal penting lagi
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
            Mulai gratis hari ini, lalu bayar hanya {PRICE_LABEL} per bulan ketika Anda
            merasa terbantu.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-brand-cyan px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white"
            >
              Mulai di WhatsApp
            </a>
            <Link
              href="/ingetdiwa/langganan"
              className="rounded-md border border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:border-white/60"
            >
              Lihat halaman pembayaran
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
