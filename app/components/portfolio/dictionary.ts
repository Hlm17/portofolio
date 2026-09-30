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

export type ProductCopy = {
  name: string;
  category: string;
  description: string;
  meta: string;
  status: string;
  cta: string;
  href: string;
};

export type Dictionary = {
  metaTitle: string;
  metaDescription: string;
  langLabel: string;
  nav: { products: string; about: string; contact: string };
  hero: {
    lead: string;
    rotating: string[];
    byline: string;
    scroll: string;
  };
  products: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ProductCopy[];
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
  switchTo: { href: string; label: string }[];
};

const PRODUCT_HREF = "https://ingetdiwa.hilmi.work";
const CONTACT_EMAIL = "mhilmirajwandhika@gmail.com";

export const dictionary: Record<Locale, Dictionary> = {
  id: {
    metaTitle: "Muhammad Hilmi Rajwandhika | hilmi.work",
    metaDescription:
      "Website pribadi Muhammad Hilmi Rajwandhika sekaligus tempat produk perangkat lunak yang saya bangun dan kelola sendiri, termasuk IngetDiWA, bot pengingat berbasis WhatsApp.",
    langLabel: "Bahasa Indonesia",
    nav: { products: "Produk", about: "Tentang", contact: "Kontak" },
    hero: {
      lead: "Membangun bisnis Anda melalui",
      rotating: ["Kreativitas", "Website"],
      byline: "Bersama saya, Muhammad Hilmi Rajwandhika",
      scroll: "Tentang saya",
    },
    products: {
      eyebrow: "Produk",
      title: "Perangkat lunak yang saya bangun dan kelola",
      lead: "Setiap produk di bawah ini saya kerjakan sendiri, mulai dari perancangan, penulisan kode, penyiapan server, sampai pemantauan harian setelah dipakai orang lain.",
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
      { href: "/id", label: "ID" },
      { href: "/en", label: "EN" },
    ],
  },

  en: {
    metaTitle: "Muhammad Hilmi Rajwandhika | hilmi.work",
    metaDescription:
      "Personal website of Muhammad Hilmi Rajwandhika and home of the software products I build and operate, including IngetDiWA, a WhatsApp based reminder bot.",
    langLabel: "English",
    nav: { products: "Products", about: "About", contact: "Contact" },
    hero: {
      lead: "Empowering your business through",
      rotating: ["Creativity", "Websites"],
      byline: "With me, Muhammad Hilmi Rajwandhika",
      scroll: "About me",
    },
    products: {
      eyebrow: "Products",
      title: "Software I build and operate",
      lead: "Everything below is my own work, from planning and writing the code to setting up the server and watching over it once people start using it.",
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
      { href: "/id", label: "ID" },
      { href: "/en", label: "EN" },
    ],
  },
};

export const CONTACT = {
  email: CONTACT_EMAIL,
  label: "mhilmirajwandhika@gmail.com",
};
