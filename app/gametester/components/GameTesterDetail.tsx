import Link from "next/link";
import { notFound } from "next/navigation";
import Aurora from "../../components/Aurora/Aurora";
import LangAttribute from "../../components/portfolio/LangAttribute";
import ReportNav from "./ReportNav";
import ReportFooter from "./ReportFooter";
import { findGame, gameTesterPath, type Locale } from "../data";
import { COPY } from "../copy";

const AURORA_COLORS = ["#3A29FF", "#FF94B4", "#FF3232"];

/**
 * Tampilan halaman satu game, dipakai oleh kedua bahasa.
 *
 * Daftar laporan hanya muncul di sini, bukan di halaman daftar game: pengunjung
 * memilih game dulu, baru membaca laporannya.
 */
export default function GameTesterDetail({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const t = COPY[locale];
  const game = findGame(slug);
  if (!game) notFound();

  const reached = [game.studio, game.platform, game.genre].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      {/* Halaman ini punya dua bahasa, sedangkan `lang` di root layout hanya satu. */}
      <LangAttribute locale={locale} />
      <ReportNav locale={locale} crumb={game.name} slug={game.slug} />

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

        <div className="relative mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <Link
            href={gameTesterPath(locale)}
            className="inline-flex min-h-11 items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            {t.detail.back}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {reached.length ? reached.join(" \u00b7 ") : t.detail.eyebrowFallback}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              {game.reports.length} {t.reportsSuffix}
            </span>
          </div>

          <h1 className="mt-5 text-[38px] font-black leading-[1.05] tracking-tight sm:text-[50px]">
            {game.name}
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60">
            {game.summary[locale]}
          </p>

          {game.period ? (
            <p className="mt-6 text-[13px] text-white/55">
              {t.detail.period} {game.period[locale]}
            </p>
          ) : null}
        </div>
      </section>

      {/* Daftar laporan */}
      <section id="laporan" className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <h2 className="max-w-2xl text-[28px] font-black leading-tight tracking-tight sm:text-[34px]">
          {t.detail.reportsTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55">
          {t.detail.reportsLead}
        </p>

        <ol className="mt-12 space-y-6">
          {game.reports
            .slice()
            .sort((a, b) => (a.date < b.date ? -1 : 1))
            .map((report, index) => (
              <li key={report.slug} id={report.slug}>
                <article className="group grid gap-6 rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/45 sm:p-9 lg:grid-cols-[1.7fr_1fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-brand-gradient bg-clip-text text-[13px] font-bold tracking-widest text-transparent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <time
                        dateTime={report.date}
                        className="text-[12px] tracking-wide text-white/55"
                      >
                        {report.dateLabel[locale]}
                      </time>
                    </div>

                    <h3 className="mt-4 text-[21px] font-black tracking-tight sm:text-[24px]">
                      {report.title[locale]}
                    </h3>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-white/55">
                      {report.focus[locale]}
                    </p>
                    <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                      {report.summary[locale]}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-6 lg:items-end lg:text-right">
                    <p className="max-w-[240px] text-[12.5px] leading-relaxed text-white/55">
                      {t.detail.reportNote}
                    </p>
                    <a
                      href={report.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-md bg-white px-5 py-3 text-[13.5px] font-semibold text-black transition-colors hover:bg-brand-cyan lg:self-end"
                    >
                      {t.detail.openNotion}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
        </ol>

        {game.points?.length ? (
          <div className="mt-14 border-t border-white/10 pt-8">
            <h3 className="text-[15px] font-bold tracking-tight">{t.detail.checkedTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {game.points.map((point) => (
                <li
                  key={point[locale]}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] text-white/55"
                >
                  {point[locale]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <ReportFooter locale={locale} />
    </div>
  );
}
