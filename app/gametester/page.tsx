import type { Metadata } from "next";
import Link from "next/link";
import Aurora from "../components/Aurora/Aurora";
import ReportNav from "./components/ReportNav";
import ReportFooter from "./components/ReportFooter";
import { GAMES, MAIN_SITE_URL, TOTAL_REPORTS, collectionJsonLd } from "./data";

const AURORA_COLORS = ["#3A29FF", "#FF94B4", "#FF3232"];

export const metadata: Metadata = {
  title: "Game Tester | Laporan Pengujian Game Muhammad Hilmi Rajwandhika",
  description: `Kumpulan laporan pengujian game yang saya tulis sendiri: ${GAMES.length} game, ${TOTAL_REPORTS} laporan, lengkap dengan langkah pengulangan, bukti tangkapan layar, dan tingkat keparahan tiap temuan.`,
  alternates: { canonical: `${MAIN_SITE_URL}/gametester` },
  openGraph: {
    title: "Game Tester: Laporan Pengujian Game",
    description: `Kumpulan laporan pengujian game yang saya tulis sendiri: ${GAMES.length} game, ${TOTAL_REPORTS} laporan.`,
    url: `${MAIN_SITE_URL}/gametester`,
    type: "website",
  },
};

const method = [
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
];

export default function GameTesterPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <ReportNav />

      {/* Pembuka */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-80">
          <Aurora
            colorStops={AURORA_COLORS}
            blend={0.5}
            amplitude={0.25}
            speed={0.35}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            Game tester
          </p>
          <h1 className="mt-5 max-w-3xl text-[38px] font-black leading-[1.05] tracking-tight sm:text-[52px]">
            Laporan pengujian game
            <span className="mt-2 block bg-brand-gradient bg-clip-text text-transparent">
              yang saya tulis sendiri
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Saya menguji game dari sisi pemain, lalu menyusun laporannya secara
            terstruktur supaya bisa langsung dikerjakan tim pengembang.            Pilih salah
            satu kartu game di bawah untuk membuka daftar laporannya.
          </p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {[
              { label: "Game diuji", value: String(GAMES.length) },
              { label: "Laporan", value: String(TOTAL_REPORTS) },
              { label: "Penyimpanan", value: "Notion" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] uppercase tracking-widest text-white/55">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[20px] font-bold tracking-tight">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Daftar game */}
      <section id="daftar-game" className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <h2 className="max-w-2xl text-[28px] font-black leading-tight tracking-tight sm:text-[34px]">
          Game yang sudah saya uji
        </h2>
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55">
          Klik salah satu kartu untuk membuka daftar laporan game tersebut.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {GAMES.map((game) => {
            const reached = [
              game.studio,
              game.platform,
              game.genre,
            ].filter(Boolean) as string[];

            return (
              <Link
                key={game.slug}
                href={`/gametester/${game.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/45 sm:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      {reached.length ? reached.join(" \u00b7 ") : "Game"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      {game.reports.length} laporan
                    </span>
                  </div>

                  <h3 className="mt-6 text-[24px] font-black tracking-tight sm:text-[28px]">
                    {game.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                    {game.summary}
                  </p>

                  {game.points?.length ? (
                    <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[13px] text-white/50">
                      {game.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-cyan transition-colors group-hover:text-white">
                  Lihat laporan
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cara saya menguji */}
      <section id="cara-menguji" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <h2 className="max-w-2xl text-[28px] font-black leading-tight tracking-tight sm:text-[34px]">
            Cara saya menguji
          </h2>

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((step) => (
              <li key={step.number} className="border-t border-white/15 pt-6">
                <span className="bg-brand-gradient bg-clip-text text-[13px] font-bold tracking-widest text-transparent">
                  {step.number}
                </span>
                <h3 className="mt-3 text-[17px] font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-white/55">
            Laporan lengkapnya disimpan di Notion. Kalau sebuah tautan meminta izin
            akses, kirim email ke saya supaya saya buka aksesnya.
          </p>
        </div>
      </section>

      <ReportFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd()) }}
      />
    </div>
  );
}
