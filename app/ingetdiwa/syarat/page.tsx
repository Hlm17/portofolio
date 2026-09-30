import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import {
  PRICE_LABEL,
  PERIOD_DAYS,
  TRIAL_DAYS,
  PRODUCT_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "../config";

export const metadata: Metadata = {
  title: `Syarat dan ketentuan | ${PRODUCT_NAME}`,
  description: `Ketentuan penggunaan layanan ${PRODUCT_NAME}.`,
  alternates: { canonical: `${SITE_URL}/ingetdiwa/syarat` },
};

const sections = [
  {
    title: "1. Layanan",
    body: [
      `${PRODUCT_NAME} adalah layanan pengingat dan daftar tugas berbasis pesan WhatsApp yang dioperasikan dari Indonesia dan dapat diakses melalui website ini.`,
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
      "Masa aktif ditambahkan secara otomatis setelah penyedia pembayaran mengonfirmasi bahwa pembayaran berhasil.",
    ],
  },
  {
    title: "4. Penggunaan yang wajar",
    body: [
      "Anda setuju untuk tidak menggunakan layanan ini untuk mengirim spam, konten yang melanggar hukum, atau mengganggu pengguna lain.",
      "Kami dapat menangguhkan layanan yang terbukti disalahgunakan tanpa pengembalian dana.",
    ],
  },
  {
    title: "5. Pembatalan dan pengembalian dana",
    body: [
      'Anda dapat berhenti kapan saja dengan mengirim kata "batal" ke bot. Langganan akan berakhir sendiri pada tanggal kedaluwarsa.',
      "Karena harga layanan sangat rendah dan masa aktif langsung terpakai, pembayaran yang sudah berhasil tidak dapat dikembalikan. Namun bila terjadi kegagalan teknis yang membuat layanan tidak dapat dipakai, hubungi kami untuk penyelesaian yang wajar.",
    ],
  },
  {
    title: "6. Ketersediaan layanan",
    body: [
      "Layanan ini menggunakan antarmuka WhatsApp tidak resmi. Kami berupaya menjaga ketersediaan setinggi mungkin, tetapi tidak menjamin layanan bebas gangguan sepenuhnya.",
      "Bila layanan tidak tersedia lebih dari tiga hari berturut turut karena kesalahan kami, masa aktif Anda akan dikompensasikan sesuai durasi gangguan.",
    ],
  },
];

export default function SyaratPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-[32px] font-black leading-tight tracking-tight sm:text-[38px]">
          Syarat dan ketentuan
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
            Pertanyaan mengenai ketentuan ini dapat dikirim ke{" "}
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
