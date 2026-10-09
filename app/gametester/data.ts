/**
 * Sumber tunggal untuk halaman laporan pengujian game.
 *
 * Cara menambah game baru:
 *   1. Salin satu blok di `GAMES` di bawah, lalu ganti `slug`, `name`, dan isinya.
 *   2. Isi `reports` dengan laporan yang sudah Anda tulis beserta tautan Notion-nya.
 * Halaman indeks dan halaman detail membaca berkas ini, jadi keduanya ikut
 * berubah tanpa perlu menyentuh kode tampilan.
 *
 * Catatan gaya penulisan yang berlaku di berkas ini: tidak memakai tanda pisah
 * untuk menyambung kata atau kalimat.
 */

export type GameReportEntry = {
  /** Dipakai sebagai jangkar di halaman detail, jadi harus unik dalam satu game. */
  slug: string;
  /** Judul singkat laporan, misalnya "Putaran pertama". */
  title: string;
  /** Tanggal dalam format ISO, dipakai untuk atribut time. */
  date: string;
  /** Tanggal seperti yang ditampilkan ke pengunjung. */
  dateLabel: string;
  /** Jenis pengujian pada putaran itu. */
  focus: string;
  /** Satu paragraf yang menjelaskan isi laporan. */
  summary: string;
  /** Tautan laporan di Notion. */
  href: string;
};

export type GameEntry = {
  slug: string;
  name: string;
  /** Semua bidang di bawah ini opsional: yang kosong tidak dirender. */
  studio?: string;
  platform?: string;
  genre?: string;
  /** Rentang waktu pengujian seperti yang ingin Anda tampilkan. */
  period?: string;
  summary: string;
  /** Hal yang Anda periksa pada game itu. */
  points?: string[];
  reports: GameReportEntry[];
};

/** Halaman profil, dipakai untuk tautan balik dan data terstruktur. */
export const MAIN_SITE_URL = "https://hilmi.work";
export const CONTACT_EMAIL = "mhilmirajwandhika@gmail.com";

export const GAMES: GameEntry[] = [
  {
    slug: "age-of-crowns",
    name: "Age of Crowns",
    summary:
      "Game yang saya uji dari sisi pemain: menelusuri alur permainan dari awal sampai sesi pertempuran, mencari perilaku yang menyimpang dari yang seharusnya, lalu menyusun laporan yang bisa langsung dikerjakan tim pengembang.",
    points: [
      "Menelusuri alur utama dari awal sampai pertempuran pertama",
      "Mencari perilaku yang menyimpang dari aturan permainan",
      "Memeriksa ulang temuan lama setelah ada perbaikan",
    ],
    reports: [
      {
        slug: "laporan-1-oktober-2026",
        title: "Putaran pertama",
        date: "2026-10-01",
        dateLabel: "1 Oktober 2026",
        focus: "Penelusuran awal dan pemetaan alur",
        summary:
          "Putaran pengujian pertama. Saya berjalan melalui bagian awal permainan untuk memetakan alur yang normal, lalu mencatat setiap perilaku yang tidak sesuai dengan yang seharusnya terjadi.",
        href: "https://app.notion.com/p/hlm17/Age-of-Crowns-Report-1-10-2026-3ec50c971ad180d392d2e887f8bb2fe5?source=copy_link",
      },
      {
        slug: "laporan-5-oktober-2026",
        title: "Putaran kedua",
        date: "2026-10-05",
        dateLabel: "5 Oktober 2026",
        focus: "Area yang belum tertutup dan pemeriksaan ulang",
        summary:
          "Putaran lanjutan setelah laporan pertama dikirim. Fokusnya menutup area yang belum saya sentuh pada putaran pertama, sekaligus memeriksa ulang temuan sebelumnya.",
        href: "https://app.notion.com/p/hlm17/Age-of-Crowns-Report-5-10-2026-3f050c971ad180789de4d6bc5cf88b4e?source=copy_link",
      },
    ],
  },
];

export const TOTAL_REPORTS = GAMES.reduce((total, game) => total + game.reports.length, 0);

export function findGame(slug: string): GameEntry | undefined {
  return GAMES.find((game) => game.slug === slug);
}

/**
 * Potongan data terstruktur untuk mesin pencari.
 *
 * Halaman ini berisi kumpulan laporan pengujian yang saya tulis, jadi bentuk
 * yang paling tepat adalah daftar berisi item, bukan artikel tunggal.
 */
export function collectionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Laporan pengujian game",
    url: `${MAIN_SITE_URL}/gametester`,
    inLanguage: "id-ID",
    author: { "@type": "Person", name: "Muhammad Hilmi Rajwandhika", url: MAIN_SITE_URL },
    hasPart: GAMES.flatMap((game) =>
      game.reports.map((report) => ({
        "@type": "CreativeWork",
        name: `${game.name}: ${report.title}`,
        datePublished: report.date,
        url: `${MAIN_SITE_URL}/gametester/${game.slug}#${report.slug}`,
        about: game.name,
      })),
    ),
  };
}
