/**
 * Teks halaman studi kasus Gets Hint untuk dua bahasa.
 *
 * Halaman ini punya dua alamat, sama seperti halaman pengujian game:
 *   /getshint     Bahasa Indonesia
 *   /en/getshint  Bahasa Inggris
 *
 * Catatan penting saat menambah teks: halaman ini untuk dipamerkan, bukan untuk
 * diajarkan. Tulis alur besarnya saja. Jangan pernah menuliskan perintah ke model,
 * alamat API, nama kredensial, nama berkas, atau potongan skrip di sini, karena
 * halaman ini terbuka untuk umum dan resepnya sengaja tidak dibagikan.
 *
 * Catatan gaya penulisan yang berlaku untuk SELURUH berkas ini: tidak memakai
 * tanda pisah untuk menyambung kata atau kalimat.
 */

export type Locale = "id" | "en";

export const GETSHINT_URL = "https://getshint.com";
export const CONTACT_EMAIL = "mhilmirajwandhika@gmail.com";

/** Alamat halaman ini menurut bahasa yang sedang dibuka. */
export function getsHintPath(locale: Locale): string {
  return locale === "en" ? "/en/getshint" : "/getshint";
}

/** Alamat halaman profil menurut bahasa yang sedang dibuka. */
export const MAIN_SITE_PATH: Record<Locale, string> = { id: "/", en: "/en" };

export type GetsHintCopy = {
  metaTitle: string;
  metaDescription: string;
  metaOgTitle: string;
  nav: { site: string; crumb: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    status: string;
    logoAlt: string;
  };
  stats: { value: string; label: string }[];
  automated: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
  };
  flow: {
    eyebrow: string;
    title: string;
    lead: string;
    parts: { title: string; body: string }[];
    note: string;
  };
  closed: { eyebrow: string; title: string; body: string[] };
  why: { eyebrow: string; title: string; body: string[] };
  footer: {
    visit: string;
    profile: string;
    builtWith: string;
    rights: string;
  };
};

export const COPY: Record<Locale, GetsHintCopy> = {
  id: {
    metaTitle: "Gets Hint, situs konten dengan penerbitan otomatis",
    metaDescription:
      "Studi kasus Gets Hint: situs konten berbahasa Inggris yang saya bangun dan kelola sendiri, dengan alur penerbitan otomatis dari riset topik sampai draf siap tinjau.",
    metaOgTitle: "Gets Hint: cara kerja penerbitan otomatisnya",
    nav: { site: "hilmi.work", crumb: "Gets Hint", contact: "Hubungi saya" },
    hero: {
      eyebrow: "Situs konten dan otomatisasi penerbitan",
      title: "Gets Hint",
      lead: "Situs konten berbahasa Inggris yang saya bangun dan kelola sendiri. Isinya petunjuk harian Wordle dan Connections, berita AI, serta panduan game. Yang membuatnya menarik bagi saya bukan isinya saja, melainkan cara terbitnya: hampir seluruh pekerjaan menulis dan menyiapkan gambar dikerjakan mesin, lalu saya yang memutuskan apa yang layak tayang.",
      status: "Berjalan di getshint.com",
      logoAlt: "Logo Gets Hint",
    },
    stats: [
      { value: "120+", label: "artikel terbit" },
      { value: "12", label: "kategori" },
      { value: "Tiap hari", label: "irama terbit" },
      { value: "1 orang", label: "yang mengerjakan" },
    ],
    automated: {
      eyebrow: "Yang diotomatiskan",
      title: "Satu alur, delapan langkah, satu di antaranya milik saya",
      lead: "Semua langkah di bawah ini berjalan menurut jadwalnya sendiri. Yang tidak pernah diotomatiskan adalah keputusan terakhir.",
      steps: [
        {
          title: "Mengumpulkan bahan",
          body: "Mesin membaca sumber publik: tren pencarian, kabar teknologi terbaru, dan kalender permainan harian seperti Wordle dan Connections.",
        },
        {
          title: "Menilai kelayakan topik",
          body: "Setiap calon topik diberi skor: sedang dicari orang atau tidak, punya kedalaman teknis atau tidak, dan sudah pernah dibahas di situs atau belum.",
        },
        {
          title: "Menyusun kerangka",
          body: "Topik yang lolos disusun menjadi kerangka artikel berbahasa Inggris: urutan bagian, pertanyaan yang harus dijawab, dan data yang perlu ditampilkan.",
        },
        {
          title: "Menulis draf",
          body: "Draf ditulis dengan aturan tetap milik situs: panjang di atas 1500 kata, wajib bertabel, wajib berkotak info, dan wajib bertanya jawab. Aturan itu dipatok supaya tulisan mesin tetap terdengar satu suara.",
        },
        {
          title: "Menyiapkan gambar unggulan",
          body: "Gambar unggulan dibuat otomatis dan diberi tanda air, jadi tidak ada artikel yang tayang tanpa gambar.",
        },
        {
          title: "Mengunggah sebagai draf",
          body: "Draf dikirim ke WordPress lewat REST API resminya dalam status draf, lengkap dengan gambar unggulan dan kategorinya.",
        },
        {
          title: "Menunggu tinjauan saya",
          body: "Di sinilah manusia masuk. Saya membaca drafnya, memperbaiki bagian yang melenceng, menambahkan pengalaman sendiri, baru menerbitkannya.",
        },
        {
          title: "Menerbitkan halaman harian",
          body: "Halaman petunjuk harian berjalan menurut jadwalnya sendiri, karena pembacanya datang setiap hari di jam yang hampir sama.",
        },
      ],
    },
    flow: {
      eyebrow: "Bagaimana sistemnya bekerja",
      title: "Empat bagian yang dipisah, bukan satu program raksasa",
      lead: "Sistemnya saya pecah supaya kegagalan di satu bagian tidak menjatuhkan bagian lain, dan supaya tiap bagian bisa saya ganti tanpa menyentuh yang lain.",
      parts: [
        {
          title: "Penjadwal",
          body: "Menentukan kapan tiap pekerjaan berjalan: riset harian, penulisan, dan penerbitan halaman harian.",
        },
        {
          title: "Mesin penulis",
          body: "Mengubah topik menjadi draf utuh beserta gambarnya. Semua aturan gaya situs tinggal di bagian ini, jadi mengubah gaya berarti mengubah satu tempat.",
        },
        {
          title: "Penghubung penerbitan",
          body: "Berbicara dengan WordPress lewat REST API resminya: mengunggah gambar, membuat draf, memasang kategori.",
        },
        {
          title: "Pemeriksa",
          body: "Memeriksa ulang hasil kerjanya sendiri: status draf, gambar unggulan terpasang, kategori benar. Kalau ada yang gagal, saya menerima pemberitahuan, bukan halaman yang setengah jadi.",
        },
      ],
      note: "Mesinnya hanya boleh membuat draf. Tombol terbit tetap milik saya.",
    },
    closed: {
      eyebrow: "Yang tidak saya bagikan",
      title: "Alurnya saya tunjukkan, resepnya tidak",
      body: [
        "Halaman ini sengaja berhenti di gambaran besar. Perintah yang saya pakai ke model bahasa, daftar alamat API, kredensial, dan skrip internalnya tidak saya sebarkan, karena bagian itulah yang membuat situsnya bisa berjalan sendiri.",
        "Kalau Anda sedang membangun hal serupa dan ingin bertukar pikiran soal alurnya, silakan hubungi saya.",
      ],
    },
    why: {
      eyebrow: "Kenapa dikerjakan sendiri",
      title: "Sampai ke server membuat saya tahu di mana mesin berhenti",
      body: [
        "Mengerjakan sendiri dari sisi penulisan sampai sisi server membuat saya tahu di titik mana tinjauan manusia benar benar dibutuhkan, dan di titik mana tinjauan itu justru memperlambat.",
        "Aturan tetapnya juga lahir dari sini: satu suara, satu struktur, satu standar panjang. Tanpa itu, tulisan mesin mudah terasa acak dan pembaca tahu bahwa tidak ada orang di belakangnya.",
        "Seluruh alurnya berjalan di server sendiri, jadi biaya penerbitannya bisa ditekan dan saya bisa membongkar pasang bagian mana pun tanpa izin siapa pun.",
      ],
    },
    footer: {
      visit: "Buka getshint.com",
      profile: "Kembali ke profil",
      builtWith: "Dibangun sendiri di atas WordPress dan dijalankan di server sendiri.",
      rights: "Muhammad Hilmi Rajwandhika.",
    },
  },

  en: {
    metaTitle: "Gets Hint, a content site with automated publishing",
    metaDescription:
      "Gets Hint case study: an English content site I built and run myself, with an automated publishing flow that runs from topic research to a draft ready for review.",
    metaOgTitle: "Gets Hint: how its automated publishing works",
    nav: { site: "hilmi.work", crumb: "Gets Hint", contact: "Contact me" },
    hero: {
      eyebrow: "Content site and publishing automation",
      title: "Gets Hint",
      lead: "An English content site I built and run myself. It covers daily Wordle and Connections hints, AI news, and game guides. What makes it interesting to me is not only the content but how it gets published: almost all of the writing and image preparation is done by a machine, and I decide what is good enough to go live.",
      status: "Live on getshint.com",
      logoAlt: "Gets Hint logo",
    },
    stats: [
      { value: "120+", label: "published posts" },
      { value: "12", label: "categories" },
      { value: "Daily", label: "publishing rhythm" },
      { value: "One person", label: "doing the work" },
    ],
    automated: {
      eyebrow: "What is automated",
      title: "One flow, eight steps, one of them mine",
      lead: "Every step below runs on its own schedule. The one thing that is never automated is the final decision.",
      steps: [
        {
          title: "Gathering material",
          body: "The machine reads public sources: search trends, recent technology news, and the calendar of daily games such as Wordle and Connections.",
        },
        {
          title: "Scoring topic fit",
          body: "Every candidate topic is scored: whether people are searching for it, whether it has technical depth, and whether the site has covered it before.",
        },
        {
          title: "Building an outline",
          body: "Topics that pass are turned into an English article outline: the order of sections, the questions that must be answered, and the data worth showing.",
        },
        {
          title: "Writing the draft",
          body: "Drafts follow fixed house rules: more than 1500 words, a table, an info box, and a question and answer section. Those rules are pinned down so machine written articles keep one voice.",
        },
        {
          title: "Preparing the featured image",
          body: "The featured image is generated automatically and watermarked, so no article goes live without a picture.",
        },
        {
          title: "Uploading as a draft",
          body: "The draft is sent to WordPress through its official REST API in draft status, together with the featured image and its categories.",
        },
        {
          title: "Waiting for my review",
          body: "This is where the human enters. I read the draft, fix whatever went off track, add my own experience, and only then publish it.",
        },
        {
          title: "Publishing the daily pages",
          body: "The daily hint pages run on their own schedule, because their readers arrive every day at almost the same hour.",
        },
      ],
    },
    flow: {
      eyebrow: "How the system works",
      title: "Four separated parts, not one giant program",
      lead: "I split the system so that a failure in one part cannot take down the others, and so each part can be replaced without touching the rest.",
      parts: [
        {
          title: "Scheduler",
          body: "Decides when each job runs: daily research, writing, and publishing the daily pages.",
        },
        {
          title: "Writing engine",
          body: "Turns a topic into a complete draft plus its image. Every house style rule lives here, so changing the style means changing one place.",
        },
        {
          title: "Publishing connector",
          body: "Talks to WordPress through its official REST API: uploading images, creating drafts, attaching categories.",
        },
        {
          title: "Checker",
          body: "Rechecks its own work: draft status, featured image attached, categories correct. If something fails, I get a notification instead of a half finished page.",
        },
      ],
      note: "The machine is only allowed to create drafts. The publish button stays mine.",
    },
    closed: {
      eyebrow: "What I do not share",
      title: "You get the flow, not the recipe",
      body: [
        "This page deliberately stops at the big picture. The instructions I send to the language model, the list of API endpoints, the credentials, and the internal scripts are not published, because those are the parts that make the site run on its own.",
        "If you are building something similar and want to compare notes on the flow, get in touch.",
      ],
    },
    why: {
      eyebrow: "Why I built it myself",
      title: "Owning the server taught me where the machine should stop",
      body: [
        "Doing everything myself, from the writing side to the server side, taught me where human review is genuinely needed and where it only slows things down.",
        "The fixed rules came out of that too: one voice, one structure, one length standard. Without them, machine written articles feel random and readers can tell nobody is behind them.",
        "The whole flow runs on my own server, so publishing costs stay low and I can swap any part of it without asking anyone.",
      ],
    },
    footer: {
      visit: "Open getshint.com",
      profile: "Back to the profile",
      builtWith: "Built by hand on WordPress and served from my own server.",
      rights: "Muhammad Hilmi Rajwandhika.",
    },
  },
};
