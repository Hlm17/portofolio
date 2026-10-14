import Image from "next/image";
import Link from "next/link";
import ClickSpark from "../ClickSpark/ClickSpark";
import HeroCard from "../HeroCard/HeroCard";
import RotatingText from "../RotatingText/RotatingText";
import ScrollVelocity from "../ScrollVelocity/ScrollVelocity";
import LangAttribute from "./LangAttribute";
import TombolBahasa from "../TombolBahasa";
import formal from "../img/formalmirrored.jpg";
import { CONTACT, dictionary, type Locale } from "./dictionary";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">{children}</p>
  );
}

/**
 * Ikon untuk deretan profil di bagian Tentang.
 *
 * Digambar langsung sebagai SVG di sini, bukan lewat pustaka ikon: hanya tiga
 * ikon yang dibutuhkan, dan menggambar sendiri berarti tidak ada satu pun
 * permintaan tambahan ke jaringan saat halaman dibuka. Warnanya mengikuti
 * `currentColor`, jadi bisa diatur dari kelas elemen induknya. Semuanya ditandai
 * `aria-hidden` karena nama tautannya sudah dibaca pembaca layar.
 */
const IKON_SOSIAL: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
};

export default function PortfolioHome({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ink text-white antialiased">
      <LangAttribute locale={locale} />

      {/* Pembuka. Tanpa bilah navigasi di atasnya, kartu identitas digantung
          tepat dari tepi paling atas halaman dan judulnya duduk di sebelahnya,
          baik di layar lebar maupun di ponsel. */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden">
        {/* Latar aurora statis (kelas di globals.css), bukan kanvas WebGL:
            halaman ini sudah membawa satu kanvas hidup untuk kartu 3D, dan
            latar dekoratif tidak perlu menjadi yang kedua. */}
        <div className="absolute inset-0 aurora-statis" />

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
                <h1 className="text-[clamp(20px,7vw,28px)] font-black leading-[1.08] tracking-tight sm:text-[34px] lg:text-[44px]">
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
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      {item.category}
                    </span>
                    {item.status ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                        {item.status}
                      </span>
                    ) : null}
                  </div>

                  {/* Kartu yang punya merek sendiri menampilkan logonya di
                      samping namanya. Kartu tanpa logo tetap hanya menampilkan
                      namanya, jadi tidak ada ruang kosong yang menganggur. */}
                  <h3 className="mt-6 flex items-center gap-3 text-[24px] font-black tracking-tight sm:text-[28px]">
                    {item.logo ? (
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/12 bg-white/[0.05]">
                        <Image
                          src={item.logo}
                          alt={item.logoAlt ?? ""}
                          width={192}
                          height={192}
                          className="h-11 w-11 object-contain"
                        />
                      </span>
                    ) : null}
                    {item.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
                  <p className="text-[13px] text-white/55">{item.meta}</p>

                  <div className="flex flex-col gap-3 md:items-end">
                    {/* Tautan di dalam situs ini dilewatkan Link supaya
                        perpindahannya tidak memuat ulang seluruh halaman,
                        sedangkan tautan ke situs lain tetap tautan biasa. */}
                    {item.href && item.cta ? (
                      item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 py-3 -my-3 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:text-white"
                        >
                          {item.cta}
                          <span className="transition-transform group-hover:translate-x-0.5">
                            &rarr;
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 py-3 -my-3 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:text-white"
                        >
                          {item.cta}
                          <span className="transition-transform group-hover:translate-x-0.5">
                            &rarr;
                          </span>
                        </a>
                      )
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

            {/* Profil di luar situs ini. Tautan luar memakai <a> biasa, sama
                seperti tautan ke situs lain di kartu pengalaman. Tingginya
                dijaga 44 px supaya tetap nyaman disentuh di ponsel. */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {t.social.map((tautan) => (
                <a
                  key={tautan.label}
                  href={tautan.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-[13.5px] font-semibold text-white/75 transition-colors hover:border-brand-cyan/45 hover:text-white"
                >
                  <span className="text-brand-cyan">
                    {IKON_SOSIAL[tautan.label] ?? null}
                  </span>
                  {tautan.label}
                </a>
              ))}
            </div>
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
              className="mt-2 inline-flex min-h-11 items-center text-[20px] font-bold tracking-tight text-white transition-colors hover:text-brand-cyan sm:text-[24px]"
            >
              {CONTACT.label}
            </a>
            <p className="mt-5 text-[12.5px] text-white/55">{t.footer.builtWith}</p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <nav className="flex items-center gap-6 text-[13px] text-white/60">
              <a href="#pengalaman" className="py-3 -my-3 transition-colors hover:text-white">
                {t.nav.experience}
              </a>
              <a href="#tentang" className="py-3 -my-3 transition-colors hover:text-white">
                {t.nav.about}
              </a>
              <a href="#kontak" className="py-3 -my-3 transition-colors hover:text-white">
                {t.nav.contact}
              </a>
            </nav>

            <TombolBahasa
              aktif={locale}
              opsi={t.switchTo.map((option) => ({ kode: option.code, href: option.href }))}
            />
          </div>
        </div>

        <div className="border-t border-white/5 py-6">
          <p className="mx-auto max-w-6xl px-5 text-[12px] text-white/45">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
