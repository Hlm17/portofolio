import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { PRICE_LABEL, PERIOD_DAYS, TRIAL_DAYS, PRODUCT_NAME, SITE_URL, SUPPORT_EMAIL } from "../config";

export const metadata: Metadata = {
  title: `Syarat & Ketentuan — ${PRODUCT_NAME}`,
  description: `Ketentuan penggunaan layanan ${PRODUCT_NAME}.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/syarat` },
};

const sections = [
  {
    title: "1. Layanan",
    body: [
      `${PRODUCT_NAME} adalah layanan pengingat dan daftar tugas berbasis pesan WhatsApp yang dioperasikan dari Indonesia dan dapat diakses melalui website hilmi.work.`,
      "Layanan memerlukan akun WhatsApp aktif milik Anda. Kami tidak menyediakan nomor WhatsApp untuk pengguna.",
    ],
  },
  {
    title: "2. Masa coba dan harga",
    body: [
      `Nomor yang baru pertama kali menghubungi bot memperoleh masa coba gratis ${TRIAL_DAYS} hari dengan fitur penuh, tanpa perlu memasukkan metode pembayaran.`,
      `Setelah masa coba berakhir, layanan dilanjutkan dengan biaya ${PRICE_LABEL} untuk ${PERIOD_DAYS} hari masa aktif. Tidak ada perpanjangan otomatis dan tidak ada biaya tambahan.`,
      "Perpanjangan yang dilakukan sebelum masa aktif habis akan menambahkan masa baru di atas sisa masa aktif Anda.",
    ],
  },
  {
    title: "3. Pembayaran",
    body: [
      "Seluruh pembayaran diproses oleh penyedia pembayaran pihak ketiga, Pakasir, melalui kanal QRIS dan virtual account.",
      "Kami tidak menyimpan data kartu atau kredensial perbankan Anda.",
      "Masa aktif ditambahkan secara otomatis setelah penyedia pembayaran mengonfirmasi status pembayaran berhasil.",
    ],
  },
  {
    title: "4. Penggunaan yang wajar",
    body: [
      "Anda setuju untuk tidak menggunakan layanan ini untuk mengirim spam, konten melanggar hukum, atau mengganggu pengguna lain.",
      "Kami dapat menangguhkan layanan yang terbukti disalahgunakan tanpa pengembalian dana.",
    ],
  },
  {
    title: "5. Pembatalan & pengembalian dana",
    body: [
      "Anda dapat berhenti kapan saja dengan mengirim kata “batal” ke bot. Langganan akan berakhir sendiri pada tanggal kedaluwarsa.",
      "Karena harga layanan sangat rendah dan masa aktif langsung terpakai, pembayaran yang sudah berhasil tidak dapat dikembalikan. Namun bila terjadi kegagalan teknis yang membuat layanan tidak dapat dipakai, hubungi kami untuk penyelesaian yang wajar.",
    ],
  },
  {
    title: "6. Ketersediaan layanan",
    body: [
      "Layanan ini menggunakan antarmuka WhatsApp tidak resmi. Kami berupaya menjaga ketersediaan setinggi mungkin, tetapi tidak menjamin layanan bebas gangguan sepenuhnya.",
      "Bila layanan tidak tersedia lebih dari 3 hari berturut-turut karena kesalahan kami, masa aktif Anda akan dikompensasikan sesuai durasi gangguan.",
    ],
  },
];

export default function SyaratPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white">Syarat &amp; Ketentuan</h1>
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
            Pertanyaan mengenai ketentuan ini dapat dikirim ke{" "}
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
