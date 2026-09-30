import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { PRODUCT_NAME, SITE_URL, SUPPORT_EMAIL } from "../config";

export const metadata: Metadata = {
  title: `Kebijakan privasi | ${PRODUCT_NAME}`,
  description: `Bagaimana ${PRODUCT_NAME} mengumpulkan, memakai, dan menyimpan data Anda.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/privasi` },
};

const sections = [
  {
    title: "1. Data yang kami kumpulkan",
    body: [
      "Nomor WhatsApp yang Anda gunakan untuk mengirim pesan ke bot.",
      "Isi pesan yang Anda kirim ke bot, sebatas yang diperlukan untuk mencatat tugas dan waktu pengingatnya.",
      "Data teknis minimal dari proses pembayaran, yaitu nomor pesanan, status pembayaran, dan waktu transaksi yang kami terima dari Pakasir.",
    ],
  },
  {
    title: "2. Cara kami memakai data",
    body: [
      "Mengirim pengingat dan daftar tugas yang Anda minta.",
      "Menentukan status langganan serta tanggal berakhirnya masa aktif Anda.",
      "Menjawab pertanyaan bantuan dan menangani keluhan pembayaran.",
    ],
  },
  {
    title: "3. Berbagi data dengan pihak ketiga",
    body: [
      "Kami tidak menjual atau menyewakan data Anda.",
      "Nomor pesanan dan nominal pembayaran dibagikan ke Pakasir hanya untuk memproses transaksi dan menerima konfirmasi pembayaran.",
      "Kami tidak mengirim pesan promosi ke nomor yang belum lebih dulu menghubungi bot.",
    ],
  },
  {
    title: "4. Penyimpanan dan keamanan",
    body: [
      "Data disimpan pada server kami sendiri dalam basis data lokal dan hanya dapat diakses oleh pengelola layanan.",
      "Sesi WhatsApp bot dilindungi dan tidak dibagikan kepada pihak lain.",
      "Kami menyimpan data selama akun Anda aktif atau selama diperlukan untuk keperluan pembukuan.",
    ],
  },
  {
    title: "5. Hak Anda",
    body: [
      'Anda dapat berhenti kapan saja dengan mengirim kata "batal" ke bot agar tidak lagi menerima pesan.',
      "Anda dapat meminta penghapusan data dengan mengirim email ke alamat kontak di bawah. Permintaan kami proses dalam tujuh hari kerja.",
    ],
  },
  {
    title: "6. Perubahan kebijakan",
    body: [
      "Kebijakan ini dapat diperbarui sewaktu waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal pembaruannya.",
    ],
  },
];

export default function PrivasiPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-[32px] font-black leading-tight tracking-tight sm:text-[38px]">
          Kebijakan privasi
        </h1>
        <p className="mt-3 text-[12.5px] text-white/35">
          Berlaku untuk layanan {PRODUCT_NAME}. Terakhir diperbarui 30 September 2026.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-white/10 pt-6">
              <h2 className="text-[16px] font-bold tracking-tight">{section.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-white/55">
                {section.body.map((paragraph) => (
                  <li key={paragraph} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand-cyan/70" />
                    {paragraph}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/12 bg-white/[0.03] p-7">
          <h2 className="text-[15px] font-bold tracking-tight">Kontak</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/55">
            Pertanyaan tentang privasi dapat dikirim ke{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-brand-cyan transition-colors hover:text-white"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
