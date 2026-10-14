import Image from "next/image";
import Link from "next/link";
import TombolBahasa from "../../components/TombolBahasa";
import LangAttribute from "../../components/portfolio/LangAttribute";
import {
  CONTACT_EMAIL,
  COPY,
  GETSHINT_URL,
  MAIN_SITE_PATH,
  getsHintPath,
  type Locale,
} from "../copy";

/**
 * Halaman studi kasus Gets Hint.
 *
 * Komponen ini dipakai dua alamat (`/getshint` dan `/en/getshint`), jadi tidak
 * ada satu pun kalimat yang ditulis di sini: seluruh teksnya dibaca dari
 * `copy.ts` menurut prop `locale`.
 *
 * Dua hal yang disengaja:
 * 1. Tanpa komponen klien sama sekali, karena isinya hanya tulisan. Halaman ini
 *    tidak menambah satu byte JavaScript pun ke halaman pembuka profil.
 * 2. Latar auroranya memakai kelas CSS statis (`.aurora-statis`), bukan kanvas
 *    WebGL, mengikuti aturan satu kanvas hidup per halaman di Bagian 9.8 catatan
 *    Website-Deploy-Vercel.md.
 */
export default function GetsHintCase({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className="min-h-screen bg-brand-ink text-white antialiased">
      <LangAttribute locale={locale} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-3 text-[13px]">
            <Link
              href={MAIN_SITE_PATH[locale]}
              className="inline-flex min-h-11 items-center font-semibold text-white/70 transition-colors hover:text-white"
            >
              {t.nav.site}
            </Link>
            <span className="text-white/45">/</span>
            <span className="font-semibold text-white">{t.nav.crumb}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hidden min-h-11 items-center rounded-md border border-white/20 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-white/60 sm:inline-flex"
            >
              {t.nav.contact}
            </a>

            <TombolBahasa
              aktif={locale}
              opsi={[
                { kode: "id", href: getsHintPath("id") },
                { kode: "en", href: getsHintPath("en") },
              ]}
            />
          </div>
        </nav>
      </header>

      <main>
        {/* Pembuka. */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 aurora-statis opacity-80" />

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pb-20 sm:pt-24">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05]">
                <Image
                  src="/assets/getshint/logo.webp"
                  alt={t.hero.logoAlt}
                  width={192}
                  height={192}
                  priority
                  className="h-16 w-16 object-contain"
                />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="mt-8 text-[40px] font-black leading-[1.03] tracking-tight sm:text-[58px]">
              {t.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/60">
              {t.hero.lead}
            </p>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-cyan/35 px-3.5 py-1.5 text-[12px] text-brand-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              {t.hero.status}
            </p>
          </div>
        </section>

        {/* Angka sekilas. */}
        <section className="border-b border-white/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 sm:grid-cols-4">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {stat.label}
                </dt>
                <dd className="mt-3 text-[26px] font-black tracking-tight sm:text-[30px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Yang diotomatiskan. */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {t.automated.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
              {t.automated.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-white/55">
              {t.automated.lead}
            </p>

            <ol className="mt-14 grid gap-5 md:grid-cols-2">
              {t.automated.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-colors hover:border-brand-cyan/45"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-brand-cyan">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] font-bold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/55">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Bagaimana sistemnya bekerja. */}
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                {t.flow.eyebrow}
              </p>
              <h2 className="mt-4 text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
                {t.flow.title}
              </h2>
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/55">
                {t.flow.lead}
              </p>

              <p className="mt-8 inline-flex max-w-xl items-start gap-3 rounded-xl border border-brand-cyan/30 bg-brand-cyan/[0.06] px-4 py-3 text-[13.5px] leading-relaxed text-brand-cyan">
                {t.flow.note}
              </p>
            </div>

            <ol className="space-y-4">
              {t.flow.parts.map((part, index) => (
                <li
                  key={part.title}
                  className="flex gap-4 rounded-2xl border border-white/12 bg-white/[0.03] p-6"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-[13px] font-bold text-white/70">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-bold tracking-tight">
                      {part.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                      {part.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Yang tidak dibagikan. Sengaja ditulis jelas supaya tidak ada yang
            mengira halaman ini menyembunyikan cara menyalinnya. */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-3xl px-5 py-20 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {t.closed.eyebrow}
            </p>
            <h2 className="mt-4 text-[30px] font-black leading-tight tracking-tight sm:text-[36px]">
              {t.closed.title}
            </h2>
            {t.closed.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-[14.5px] leading-relaxed text-white/55"
              >
                {paragraph}
              </p>
            ))}

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/60"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>

        {/* Kenapa dikerjakan sendiri. */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-3xl px-5 py-20 lg:py-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {t.why.eyebrow}
            </p>
            <h2 className="mt-4 text-[30px] font-black leading-tight tracking-tight sm:text-[36px]">
              {t.why.title}
            </h2>
            {t.why.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-[14.5px] leading-relaxed text-white/55"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="max-w-md text-[13px] leading-relaxed text-white/55">
              {t.footer.builtWith}
            </p>
            <p className="mt-4 text-[12px] text-white/45">
              &copy; {new Date().getFullYear()} {t.footer.rights}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={GETSHINT_URL}
              className="inline-flex min-h-11 items-center rounded-md bg-brand-cyan px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-white"
            >
              {t.footer.visit}
            </a>
            <Link
              href={MAIN_SITE_PATH[locale]}
              className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/60"
            >
              {t.footer.profile}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
