import Link from "next/link";
import Aurora from "../../components/Aurora/Aurora";
import LangAttribute from "../../components/portfolio/LangAttribute";
import ReportNav from "./ReportNav";
import ReportFooter from "./ReportFooter";
import {
  GAMES,
  TOTAL_REPORTS,
  collectionJsonLd,
  gamePath,
  type Locale,
} from "../data";
import { COPY } from "../copy";

const AURORA_COLORS = ["#3A29FF", "#FF94B4", "#FF3232"];

/**
 * Tampilan halaman daftar game, dipakai oleh kedua bahasa.
 *
 * Urutannya disengaja: pengunjung melihat kartu tiap game lebih dulu, dan daftar
 * laporan baru terbuka setelah salah satu kartunya dipilih. Halaman ini bekerja
 * dari `data.ts`, jadi menambah game tidak perlu menyentuh kode di sini.
 */
export default function GameTesterIndex({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      {/* Halaman ini punya dua bahasa, sedangkan `lang` di root layout hanya satu. */}
      <LangAttribute locale={locale} />
      <ReportNav locale={locale} />

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
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-[38px] font-black leading-[1.05] tracking-tight sm:text-[52px]">
            {t.title}
            <span className="mt-2 block bg-brand-gradient bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-white/60">
            {t.lead}
          </p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {[
              { label: t.stats.games, value: String(GAMES.length) },
              { label: t.stats.reports, value: String(TOTAL_REPORTS) },
              { label: t.stats.storage, value: "Notion" },
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
          {t.listTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55">
          {t.listLead}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {GAMES.map((game) => {
            const reached = [game.studio, game.platform, game.genre].filter(Boolean) as string[];

            return (
              <Link
                key={game.slug}
                href={gamePath(locale, game.slug)}
                className="group flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/45 sm:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      {reached.length ? reached.join(" \u00b7 ") : t.cardFallback}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      {game.reports.length} {t.reportsSuffix}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[24px] font-black tracking-tight sm:text-[28px]">
                    {game.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                    {game.summary[locale]}
                  </p>

                  {game.points?.length ? (
                    <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[13px] text-white/50">
                      {game.points.map((point) => (
                        <li key={point[locale]} className="flex gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                          {point[locale]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-cyan transition-colors group-hover:text-white">
                  {t.cardCta}
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
            {t.methodTitle}
          </h2>

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.method.map((step) => (
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
            {t.notionNote}
          </p>
        </div>
      </section>

      <ReportFooter locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd(locale)) }}
      />
    </div>
  );
}
