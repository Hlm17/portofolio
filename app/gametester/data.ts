/**
 * Sumber tunggal untuk halaman pengujian game.
 *
 * Halaman ini punya dua alamat, jadi setiap teks yang dilihat pengunjung
 * disimpan dalam dua bahasa sekaligus:
 *   /gametester     Bahasa Indonesia
 *   /en/gametester  Bahasa Inggris
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

export type Locale = "id" | "en";

/** Satu teks yang disimpan dalam dua bahasa. */
export type Teks = Record<Locale, string>;

export type GameReportEntry = {
  /** Dipakai sebagai jangkar di halaman detail, jadi harus unik dalam satu game. */
  slug: string;
  /** Tanggal dalam format ISO, dipakai untuk atribut time. */
  date: string;
  /** Tautan laporan di Notion. */
  href: string;
  /** Judul singkat laporan, misalnya "Putaran pertama". */
  title: Teks;
  /** Tanggal seperti yang ditampilkan ke pengunjung. */
  dateLabel: Teks;
  /** Jenis pengujian pada putaran itu. */
  focus: Teks;
  /** Satu paragraf yang menjelaskan isi laporan. */
  summary: Teks;
};

export type GameEntry = {
  slug: string;
  /** Nama game sama di kedua bahasa, jadi tidak perlu diterjemahkan. */
  name: string;
  /** Semua bidang di bawah ini opsional: yang kosong tidak dirender. */
  studio?: string;
  platform?: string;
  genre?: string;
  /** Rentang waktu pengujian seperti yang ingin Anda tampilkan. */
  period?: Teks;
  summary: Teks;
  /** Hal yang Anda periksa pada game itu. */
  points?: Teks[];
  reports: GameReportEntry[];
};

/** Halaman profil, dipakai untuk tautan balik dan data terstruktur. */
export const MAIN_SITE_URL = "https://hilmi.work";
export const CONTACT_EMAIL = "mhilmirajwandhika@gmail.com";

/**
 * Alamat halaman game tester untuk satu bahasa.
 *
 * Bahasa Indonesia tetap di akar situs, sama seperti halaman profil, sedangkan
 * Bahasa Inggris berada di bawah `/en` supaya kedua versi bisa diindeks
 * mesin pencari sebagai dua halaman yang berbeda.
 */
export function gameTesterPath(locale: Locale): string {
  return locale === "en" ? "/en/gametester" : "/gametester";
}

/** Alamat halaman satu game untuk satu bahasa. */
export function gamePath(locale: Locale, slug: string): string {
  return `${gameTesterPath(locale)}/${slug}`;
}

/** Alamat lengkap halaman game tester, untuk metadata dan data terstruktur. */
export function gameTesterUrl(locale: Locale): string {
  return `${MAIN_SITE_URL}${gameTesterPath(locale)}`;
}

/** Nama halaman ini sendiri, dipakai data terstruktur. */
export const COLLECTION_NAME: Teks = {
  id: "Laporan pengujian game",
  en: "Game testing reports",
};

export const GAMES: GameEntry[] = [
  {
    slug: "age-of-crowns",
    name: "Age of Crowns",
    summary: {
      id: "Game yang saya uji dari sisi pemain: menelusuri alur permainan dari awal sampai sesi pertempuran, mencari perilaku yang menyimpang dari yang seharusnya, lalu menyusun laporan yang bisa langsung dikerjakan tim pengembang.",
      en: "A game I test from the player's side: walking the play flow from the start to a battle session, hunting for behaviour that deviates from what should happen, then writing reports the development team can act on straight away.",
    },
    points: [
      {
        id: "Menelusuri alur utama dari awal sampai pertempuran pertama",
        en: "Walking the main flow from the start to the first battle",
      },
      {
        id: "Mencari perilaku yang menyimpang dari aturan permainan",
        en: "Hunting for behaviour that breaks the rules of the game",
      },
      {
        id: "Memeriksa ulang temuan lama setelah ada perbaikan",
        en: "Rechecking older findings after a fix ships",
      },
    ],
    reports: [
      {
        slug: "laporan-1-oktober-2026",
        date: "2026-10-01",
        href: "https://app.notion.com/p/hlm17/Age-of-Crowns-Report-1-10-2026-3ec50c971ad180d392d2e887f8bb2fe5?source=copy_link",
        title: { id: "Putaran pertama", en: "First round" },
        dateLabel: { id: "1 Oktober 2026", en: "1 October 2026" },
        focus: {
          id: "Penelusuran awal dan pemetaan alur",
          en: "Opening walkthrough and flow mapping",
        },
        summary: {
          id: "Putaran pengujian pertama. Saya berjalan melalui bagian awal permainan untuk memetakan alur yang normal, lalu mencatat setiap perilaku yang tidak sesuai dengan yang seharusnya terjadi.",
          en: "The first testing round. I walked through the opening of the game to map the normal flow, then noted every behaviour that did not match what should have happened.",
        },
      },
      {
        slug: "laporan-5-oktober-2026",
        date: "2026-10-05",
        href: "https://app.notion.com/p/hlm17/Age-of-Crowns-Report-5-10-2026-3f050c971ad180789de4d6bc5cf88b4e?source=copy_link",
        title: { id: "Putaran kedua", en: "Second round" },
        dateLabel: { id: "5 Oktober 2026", en: "5 October 2026" },
        focus: {
          id: "Area yang belum tertutup dan pemeriksaan ulang",
          en: "Uncovered areas and a recheck",
        },
        summary: {
          id: "Putaran lanjutan setelah laporan pertama dikirim. Fokusnya menutup area yang belum saya sentuh pada putaran pertama, sekaligus memeriksa ulang temuan sebelumnya.",
          en: "A follow up round after the first report was sent. The focus was closing the areas I had not touched in the first round, while rechecking the earlier findings.",
        },
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
export function collectionJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: COLLECTION_NAME[locale],
    url: gameTesterUrl(locale),
    inLanguage: locale === "en" ? "en" : "id-ID",
    author: { "@type": "Person", name: "Muhammad Hilmi Rajwandhika", url: MAIN_SITE_URL },
    hasPart: GAMES.flatMap((game) =>
      game.reports.map((report) => ({
        "@type": "CreativeWork",
        name: `${game.name}: ${report.title[locale]}`,
        datePublished: report.date,
        url: `${MAIN_SITE_URL}${gamePath(locale, game.slug)}#${report.slug}`,
        about: game.name,
      }))
    ),
  };
}
