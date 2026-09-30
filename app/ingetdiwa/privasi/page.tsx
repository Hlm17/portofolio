import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { PRODUCT_NAME, SITE_URL, SUPPORT_EMAIL } from "../config";

export const metadata: Metadata = {
  title: `Kebijakan Privasi — ${PRODUCT_NAME}`,
  description: `Bagaimana ${PRODUCT_NAME} mengumpulkan, memakai, dan menyimpan data Anda.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/privasi` },
};

const sections = [
  {
    title: "1. Data yang kami kumpulkan",
    body: [
      "Nomor WhatsApp yang Anda gunakan untuk mengirim pesan ke bot.",
      "Isi pesan yang Anda kirim ke bot, sebatas yang diperlukan untuk mencatat tugas dan waktu pengingatnya.",
      "Data teknis minimal dari proses pembayaran (nomor pesanan, status pembayaran, dan waktu transaksi) yang diterima dari Pakasir.",
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
      "Nomor pesanan dan nominal pembayaran dibagikan ke Pakasir hanya untuk memproses transaksi dan menerima notifikasi pembayaran.",
      "Kami tidak mengirim pesan promosi ke nomor yang belum menyimpan nomor bot atau belum menghubungi bot lebih dulu.",
    ],
  },
  {
    title: "4. Penyimpanan & keamanan",
    body: [
      "Data disimpan pada server kami sendiri dalam basis data lokal dan hanya dapat diakses oleh pengelola layanan.",
      "Sesi WhatsApp bot dilindungi dan tidak dibagikan kepada pihak lain.",
      "Kami menyimpan data selama akun Anda aktif atau selama diperlukan untuk keperluan pembukuan.",
    ],
  },
  {
    title: "5. Hak Anda",
    body: [
      "Anda dapat berhenti kapan saja dengan mengirim kata “batal” ke bot agar tidak lagi menerima pesan.",
      "Anda dapat meminta penghapusan data dengan mengirim email ke alamat kontak di bawah, dan kami akan memprosesnya dalam 7 hari kerja.",
    ],
  },
  {
    title: "6. Perubahan kebijakan",
    body: [
      "Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal pembaruannya.",
    ],
  },
];

export default function PrivasiPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white">Kebijakan Privasi</h1>
        <p className="mt-2 text-sm text-slate-500">
          Berlaku untuk layanan {PRODUCT_NAME} di hilmi.work · Terakhir diperbarui: 30
          September 2026
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
                {section.body.map((paragraph) => (
                  <li key={paragraph}>{paragraph}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-base font-semibold text-white">Kontak</h2>
          <p className="mt-2 text-sm text-slate-400">
            Pertanyaan tentang privasi dapat dikirim ke{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 hover:underline">
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
