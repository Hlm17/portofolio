/**
 * Teks halaman profil hilmi.work untuk dua bahasa.
 *
 * Catatan gaya penulisan yang berlaku untuk SELURUH berkas ini: tidak memakai
 * tanda pisah untuk menyambung kata atau kalimat. Kalimat disusun ulang supaya
 * tetap mengalir tanpa tanda pisah.
 */

export type Locale = "id" | "en";

export const locales: Locale[] = ["id", "en"];

export const DEFAULT_LOCALE: Locale = "id";

/**
 * Satu kartu pengalaman kerja.
 *
 * `status`, `cta`, dan `href` semuanya boleh kosong, karena tidak setiap
 * pengalaman punya lencana status atau tautan. Kartu tanpa `href` tetap tampil
 * rapi dengan bagian kanan yang lebih sederhana.
 *
 * `href` boleh berisi alamat di dalam situs ini, misalnya halaman daftar
 * laporan pengujian game, maupun alamat lengkap ke situs lain.
 */
export type ExperienceCopy = {
  name: string;
  category: string;
  description: string;
  meta: string;
  status?: string;
  cta?: string;
  href?: string;
};

export type Dictionary = {
  metaTitle: string;
  metaDescription: string;
  langLabel: string;
  nav: { experience: string; about: string; contact: string };
  hero: {
    lead: string;
    rotating: string[];
    byline: string;
    scroll: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ExperienceCopy[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    photoAlt: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    contact: string;
  };
  // `code` dipakai tombol pilih bahasa untuk menyimpan pilihan pengunjung ke
  // cookie, bukan hanya memindahkan halaman. Tanpa itu, pengunjung yang memilih
  // Bahasa Indonesia akan dilempar lagi ke versi Inggris oleh pendeteksi negara.
  switchTo: { code: Locale; href: string; label: string }[];
};

const PRODUCT_HREF = "https://ingetdiwa.hilmi.work";
const CONTACT_EMAIL = "mhilmirajwandhika@gmail.com";

// Halaman game tester punya alamat sendiri, karena jumlah game dan laporannya
// akan terus bertambah. Di sana pengunjung memilih kartu game dulu, baru
// laporannya terbuka. Tautan Notion mentahnya tinggal di halaman itu, bukan lagi
// di kartu profil ini.
//
// Halaman itu punya dua versi bahasa, sama seperti halaman profil, jadi
// alamatnya ikut menyesuaikan bahasa yang sedang dibuka. Kartu di halaman Inggris
// tidak boleh melempar pengunjung kembali ke halaman Bahasa Indonesia.
const GAME_REPORTS_HREF: Record<Locale, string> = {
  id: "/gametester",
  en: "/en/gametester",
};

export const dictionary: Record<Locale, Dictionary> = {
  id: {
    metaTitle: "Muhammad Hilmi Rajwandhika | hilmi.work",
    metaDescription:
      "Website pribadi Muhammad Hilmi Rajwandhika sekaligus tempat produk perangkat lunak yang saya bangun dan kelola sendiri, termasuk IngetDiWA, bot pengingat berbasis WhatsApp.",
    langLabel: "Bahasa Indonesia",
    nav: { experience: "Pengalaman", about: "Tentang", contact: "Kontak" },
    hero: {
      lead: "Membangun bisnis Anda melalui",
      rotating: ["Kreativitas", "Website"],
      byline: "Bersama saya, Muhammad Hilmi Rajwandhika",
      scroll: "Tentang saya",
    },
    experience: {
      eyebrow: "Pengalaman",
      title: "Yang saya kerjakan",
      lead: "Dua hal yang saya jalani sekarang: membangun dan mengelola perangkat lunak sendiri, serta menguji game dan menulis laporannya secara terstruktur.",
      items: [
        {
          name: "IngetDiWA",
          category: "Bot dan otomatisasi",
          description:
            "Bot pengingat dan daftar tugas yang berjalan sepenuhnya di dalam WhatsApp. Pengguna mencatat jadwal lewat percakapan biasa, menerima pengingat otomatis tepat waktu, lalu membayar langganan melalui QRIS.",
          meta: "Langganan Rp3.000 per bulan",
          status: "Berjalan",
          cta: "Buka IngetDiWA",
          href: PRODUCT_HREF,
        },
        {
          name: "Game Tester",
          category: "Pengujian game dan pelaporan",
          description:
            "Menguji game Age of Crowns dari sisi pemain: menelusuri alur permainan, mencari perilaku yang menyimpang dari yang seharusnya, lalu menyusun laporan yang bisa langsung dikerjakan tim pengembang. Setiap temuan saya lengkapi dengan langkah pengulangan, bukti tangkapan layar, dan tingkat keparahan.",
          meta: "Age of Crowns, laporan 1 dan 5 Oktober 2026",
          cta: "Buka halaman game tester",
          href: GAME_REPORTS_HREF.id,
        },
      ],
    },
    about: {
      eyebrow: "Tentang",
      title: "Tentang saya",
      body: [
        "Saya pengembang web yang membangun perangkat lunak untuk kebutuhan nyata, bukan sekadar tampilan. Saya mengerjakan sisi depan dan sisi belakang sekaligus, termasuk basis data, penjadwalan tugas, dan integrasi pembayaran.",
        "Produk yang saya bangun saya kelola sendiri sampai berjalan, karena itu saya terbiasa menangani hal yang jarang terlihat: pemantauan server, penanganan kegagalan, dan perbaikan setelah aplikasi dipakai orang lain.",
      ],
      photoAlt: "Muhammad Hilmi Rajwandhika",
    },
    footer: {
      builtWith: "Dibangun dengan Next.js dan dijalankan di Vercel.",
      rights: "Muhammad Hilmi Rajwandhika.",
      contact: "Hubungi saya",
    },
    switchTo: [
      { code: "id", href: "/", label: "ID" },
      { code: "en", href: "/en", label: "EN" },
    ],
  },

  en: {
    metaTitle: "Muhammad Hilmi Rajwandhika | hilmi.work",
    metaDescription:
      "Personal website of Muhammad Hilmi Rajwandhika and home of the software products I build and operate, including IngetDiWA, a WhatsApp based reminder bot.",
    langLabel: "English",
    nav: { experience: "Experience", about: "About", contact: "Contact" },
    hero: {
      lead: "Empowering your business through",
      rotating: ["Creativity", "Websites"],
      byline: "With me, Muhammad Hilmi Rajwandhika",
      scroll: "About me",
    },
    experience: {
      eyebrow: "Experience",
      title: "What I do",
      lead: "Two things I work on right now: building and running my own software, and testing games and writing the reports in a structured way.",
      items: [
        {
          name: "IngetDiWA",
          category: "Bots and automation",
          description:
            "A reminder and task list bot that runs entirely inside WhatsApp. People capture schedules through ordinary conversation, get automatic reminders on time, and pay for the subscription with QRIS.",
          meta: "Rp3,000 per month",
          status: "Live",
          cta: "Open IngetDiWA",
          href: PRODUCT_HREF,
        },
        {
          name: "Game Tester",
          category: "Game testing and reporting",
          description:
            "Testing the game Age of Crowns from a player's side: walking through the play flow, hunting for behaviour that deviates from what should happen, then writing reports the development team can act on straight away. Every finding comes with reproduction steps, screenshots, and a severity.",
          meta: "Age of Crowns, reports dated 1 and 5 October 2026",
          cta: "Open the game tester page",
          href: GAME_REPORTS_HREF.en,
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "About me",
      body: [
        "I am a web developer who builds software for real needs rather than for looks alone. I work on both the front end and the back end, including databases, task scheduling, and payment integrations.",
        "I operate what I build, so I am used to the parts that rarely show up in a portfolio: watching the server, handling failures, and fixing things after other people start depending on them.",
      ],
      photoAlt: "Muhammad Hilmi Rajwandhika",
    },
    footer: {
      builtWith: "Built with Next.js and running on Vercel.",
      rights: "Muhammad Hilmi Rajwandhika.",
      contact: "Get in touch",
    },
    switchTo: [
      { code: "id", href: "/", label: "ID" },
      { code: "en", href: "/en", label: "EN" },
    ],
  },
};

export const CONTACT = {
  email: CONTACT_EMAIL,
  label: "mhilmirajwandhika@gmail.com",
};
