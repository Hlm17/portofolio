import Image from "next/image";
import Link from "next/link";
import Aurora from "../Aurora/Aurora";
import ClickSpark from "../ClickSpark/ClickSpark";
import HeroCard from "../HeroCard/HeroCard";
import RotatingText from "../RotatingText/RotatingText";
import ScrollVelocity from "../ScrollVelocity/ScrollVelocity";
import LangAttribute from "./LangAttribute";
import formal from "../img/formalmirrored.jpg";
import { CONTACT, dictionary, type Locale } from "./dictionary";

const AURORA_COLORS = ["#3A29FF", "#FF94B4", "#FF3232"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">{children}</p>
  );
}

export default function PortfolioHome({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ink text-white antialiased">
      <LangAttribute locale={locale} />

      {/* Pembuka. Tanpa bilah navigasi di atasnya, kartu identitas digantung
          tepat dari tepi paling atas halaman dan judulnya duduk di sebelahnya,
          baik di layar lebar maupun di ponsel. */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden">
        <div className="absolute inset-0">
          <Aurora colorStops={AURORA_COLORS} blend={0.5} amplitude={0.23} speed={0.5} />
        </div>

        <div className="absolute inset-0 z-0 lg:left-1/2">
          <HeroCard />
        </div>

        {/* Lapisan teks dilewatkan penunjuk supaya kartu yang menggantung di
            sebelahnya tetap bisa disentuh, sedangkan blok teksnya sendiri tetap
            menerima klik. */}
        <div className="pointer-events-none relative z-10 w-full self-start pt-[26vh] lg:self-center lg:pt-0">
          <div className="mx-auto max-w-6xl px-5">
            <div className="pointer-events-auto w-[52%] lg:w-1/2">
              <ClickSpark
                sparkColor="#fff"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                <h1 className="text-[28px] font-black leading-[1.08] tracking-tight sm:text-[34px] lg:text-[44px]">
                  {t.hero.lead}
                  <span className="mt-2 block">
                    <RotatingText
                      texts={t.hero.rotating}
                      mainClassName="px-2.5 bg-brand-cyan text-black overflow-hidden py-1 justify-center inline-flex rounded-lg font-black"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </span>
                </h1>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
                  {t.hero.byline}
                </p>
              </ClickSpark>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 py-7">
        <ScrollVelocity
          texts={[t.hero.scroll, t.hero.scroll]}
          velocity={55}
          numCopies={4}
          className="text-[34px] font-black tracking-tight text-white/75 sm:text-[46px]"
        />
      </div>

      {/* Pengalaman: apa yang saya kerjakan, termasuk pengujian game beserta
          tautan laporan yang saya tulis. */}
      <section id="pengalaman">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <Eyebrow>{t.experience.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
            {t.experience.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55">
            {t.experience.lead}
          </p>

          <div className="mt-14 space-y-6">
            {t.experience.items.map((item) => (
              <article
                key={item.name}
                className="group grid gap-8 rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/45 md:grid-cols-[1.6fr_1fr] md:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {item.category}
                    </span>
                    {item.status ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                        {item.status}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 text-[24px] font-black tracking-tight sm:text-[28px]">
                    {item.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
                  <p className="text-[13px] text-white/40">{item.meta}</p>

                  {/* Satu pengalaman bisa punya beberapa tautan keluar, jadi
                      tautannya dirender sebagai daftar. Kartu yang hanya punya
                      satu tautan tetap tampil sama seperti sebelumnya. */}
                  <div className="flex flex-col gap-3 md:items-end">
                    {item.href && item.cta ? (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:text-white"
                      >
                        {item.cta}
                        <span className="transition-transform group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </a>
                    ) : null}

                    {item.reports?.length ? (
                      <>
                        <div className="flex flex-col gap-2.5 md:items-end">
                          {item.reports.map((report) => (
                            <a
                              key={report.href}
                              href={report.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:text-white"
                            >
                              {report.label}
                              <span className="transition-transform group-hover:translate-x-0.5">
                                &rarr;
                              </span>
                            </a>
                          ))}
                        </div>
                        <p className="max-w-[220px] text-[11.5px] leading-relaxed text-white/30 md:text-right">
                          {t.experience.reportNote}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-24">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={formal}
              alt={t.about.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          <div>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
              {t.about.title}
            </h2>
            {t.about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/55"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak. Tautan bagian dan pilih bahasa tinggal di sini, karena bilah
          navigasi di bagian atas halaman sudah dihapus. */}
      <footer id="kontak" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.5fr_1fr] sm:items-start">
          <div>
            <Eyebrow>{t.footer.contact}</Eyebrow>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 block text-[20px] font-bold tracking-tight text-white transition-colors hover:text-brand-cyan sm:text-[24px]"
            >
              {CONTACT.label}
            </a>
            <p className="mt-5 text-[12.5px] text-white/35">{t.footer.builtWith}</p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <nav className="flex items-center gap-6 text-[13px] text-white/60">
              <a href="#pengalaman" className="transition-colors hover:text-white">
                {t.nav.experience}
              </a>
              <a href="#tentang" className="transition-colors hover:text-white">
                {t.nav.about}
              </a>
              <a href="#kontak" className="transition-colors hover:text-white">
                {t.nav.contact}
              </a>
            </nav>

            <div className="flex items-center gap-0.5 rounded-md border border-white/15 p-0.5">
              {t.switchTo.map((option) => {
                const active =
                  (option.label === "ID" && locale === "id") ||
                  (option.label === "EN" && locale === "en");
                return (
                  <Link
                    key={option.href}
                    href={option.href}
                    className={`rounded px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                      active ? "bg-brand-cyan text-black" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 py-6">
          <p className="mx-auto max-w-6xl px-5 text-[12px] text-white/25">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
