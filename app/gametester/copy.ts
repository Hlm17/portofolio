import type { Locale } from "./data";

/**
 * Seluruh kalimat yang dilihat pengunjung di halaman pengujian game, dalam dua
 * bahasa. Dipisahkan dari `data.ts` supaya berkas itu tetap hanya berisi daftar
 * game dan laporan, sedangkan urusan kalimat tinggal di sini.
 */

export type ReportCopy = {
  /** Label kecil di atas judul pembuka. */
  eyebrow: string;
  title: string;
  titleHighlight: string;
  lead: string;
  stats: { games: string; reports: string; storage: string };
  listTitle: string;
  listLead: string;
  cardFallback: string;
  reportsSuffix: string;
  cardCta: string;
  methodTitle: string;
  method: { number: string; title: string; body: string }[];
  notionNote: string;
  detail: {
    back: string;
    eyebrowFallback: string;
    period: string;
    reportsTitle: string;
    reportsLead: string;
    reportNote: string;
    openNotion: string;
    checkedTitle: string;
  };
  nav: {
    /** Remah halaman di bilah atas. */
    crumb: string;
    contact: string;
    /** Label pilihan bahasa. */
    switchLabels: { id: string; en: string };
  };
  footer: {
    title: string;
    body: string;
    links: string;
    all: string;
    profile: string;
    rights: string;
  };
};

export const COPY: Record<Locale, ReportCopy> = {
  id: {
    eyebrow: "Game tester",
    title: "Laporan pengujian game",
    titleHighlight: "yang saya tulis sendiri",
    lead: "Saya menguji game dari sisi pemain, lalu menyusun laporannya secara terstruktur supaya bisa langsung dikerjakan tim pengembang. Pilih salah satu kartu game di bawah untuk membuka daftar laporannya.",
    stats: { games: "Game diuji", reports: "Laporan", storage: "Penyimpanan" },
    listTitle: "Game yang sudah saya uji",
    listLead: "Klik salah satu kartu untuk membuka daftar laporan game tersebut.",
    cardFallback: "Game",
    reportsSuffix: "laporan",
    cardCta: "Lihat laporan",
    methodTitle: "Cara saya menguji",
    method: [
      {
        number: "01",
        title: "Mencari perilaku yang menyimpang",
        body: "Saya berjalan melalui alur permainan seperti pemain biasa, lalu memperhatikan bagian yang tidak sesuai dengan aturan main atau dengan yang seharusnya terjadi.",
      },
      {
        number: "02",
        title: "Menulis langkah pengulangan",
        body: "Setiap temuan saya sertakan langkah yang bisa diikuti orang lain untuk memunculkan masalah yang sama, bukan hanya kesimpulan akhirnya.",
      },
      {
        number: "03",
        title: "Melampirkan bukti",
        body: "Tangkapan layar dan rekaman menjadi bukti bahwa temuan itu benar terjadi, sehingga tim pengembang tidak perlu menebak apa yang saya lihat.",
      },
      {
        number: "04",
        title: "Menilai tingkat keparahan",
        body: "Temuan saya urutkan menurut dampaknya terhadap pengalaman bermain, supaya pekerjaan yang paling mengganggu bisa ditangani lebih dulu.",
      },
    ],
    notionNote:
      "Laporan lengkapnya disimpan di Notion. Kalau sebuah tautan meminta izin akses, kirim email ke saya supaya saya buka aksesnya.",
    detail: {
      back: "Semua game",
      eyebrowFallback: "Pengujian game",
      period: "Masa pengujian:",
      reportsTitle: "Daftar laporan",
      reportsLead:
        "Setiap laporan disimpan di Notion. Tautan di bawah membuka laporannya di tab baru.",
      reportNote:
        "Langkah pengulangan, bukti tangkapan layar, dan tingkat keparahan ada di dalam laporan.",
      openNotion: "Buka laporan di Notion",
      checkedTitle: "Yang saya periksa",
    },
    nav: {
      crumb: "Laporan game tester",
      contact: "Hubungi saya",
      switchLabels: { id: "ID", en: "EN" },
    },
    footer: {
      title: "Game tester",
      body: "Kumpulan laporan yang saya tulis setelah memainkan game-nya sendiri, lengkap dengan langkah pengulangan dan bukti tangkapan layar.",
      links: "Tautan",
      all: "Daftar game",
      profile: "Profil hilmi.work",
      rights: "Muhammad Hilmi Rajwandhika. Laporan lengkap disimpan di Notion.",
    },
  },

  en: {
    eyebrow: "Game tester",
    title: "Game testing reports",
    titleHighlight: "written from my own playthroughs",
    lead: "I test games from the player's side, then write the findings up in a structured way so the development team can act on them straight away. Pick a game card below to open that game's report list.",
    stats: { games: "Games tested", reports: "Reports", storage: "Storage" },
    listTitle: "Games I have tested",
    listLead: "Click any card to open that game's list of reports.",
    cardFallback: "Game",
    reportsSuffix: "reports",
    cardCta: "See the reports",
    methodTitle: "How I test",
    method: [
      {
        number: "01",
        title: "Hunting for behaviour that deviates",
        body: "I walk through the play flow the way an ordinary player would, then pay attention to the parts that do not match the rules of the game or what should have happened.",
      },
      {
        number: "02",
        title: "Writing reproduction steps",
        body: "Every finding comes with steps someone else can follow to bring up the same problem, not just the conclusion at the end.",
      },
      {
        number: "03",
        title: "Attaching evidence",
        body: "Screenshots and recordings prove the finding really happened, so the development team never has to guess what I saw.",
      },
      {
        number: "04",
        title: "Rating the severity",
        body: "Findings are ordered by how much they hurt the play experience, so the most disruptive work can be handled first.",
      },
    ],
    notionNote:
      "The full reports live in Notion. If a link asks for access, email me and I will open it for you.",
    detail: {
      back: "All games",
      eyebrowFallback: "Game testing",
      period: "Testing period:",
      reportsTitle: "List of reports",
      reportsLead: "Each report lives in Notion. The links below open it in a new tab.",
      reportNote:
        "Reproduction steps, screenshot evidence, and severity are inside the report.",
      openNotion: "Open the report in Notion",
      checkedTitle: "What I checked",
    },
    nav: {
      crumb: "Game tester reports",
      contact: "Contact me",
      switchLabels: { id: "ID", en: "EN" },
    },
    footer: {
      title: "Game tester",
      body: "A collection of reports I write after playing the game myself, complete with reproduction steps and screenshot evidence.",
      links: "Links",
      all: "All games",
      profile: "hilmi.work profile",
      rights: "Muhammad Hilmi Rajwandhika. The full reports live in Notion.",
    },
  },
};
