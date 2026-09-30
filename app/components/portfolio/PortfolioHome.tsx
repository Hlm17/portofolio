import Image from "next/image";
import Link from "next/link";
import Aurora from "../Aurora/Aurora";
import ClickSpark from "../ClickSpark/ClickSpark";
import Lanyard from "../Lanyard/Lanyard";
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

      {/* Navigasi */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="text-[15px] font-bold tracking-tight text-white"
          >
            hilmi.work
          </Link>

          <nav className="flex items-center gap-5 sm:gap-7">
            <a
              href="#produk"
              className="hidden text-[13px] text-white/60 transition-colors hover:text-white sm:block"
            >
              {t.nav.products}
            </a>
            <a
              href="#tentang"
              className="hidden text-[13px] text-white/60 transition-colors hover:text-white sm:block"
            >
              {t.nav.about}
            </a>
            <a
              href="#kontak"
              className="hidden text-[13px] text-white/60 transition-colors hover:text-white sm:block"
            >
              {t.nav.contact}
            </a>

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
                      active
                        ? "bg-brand-cyan text-black"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Pembuka */}
      <section className="relative isolate">
        <div className="absolute inset-0">
          <Aurora colorStops={AURORA_COLORS} blend={0.5} amplitude={0.23} speed={0.5} />
        </div>

        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <div className="relative mx-auto grid max-w-6xl grid-cols-12 items-center gap-y-8 px-5 pb-20 pt-32">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-[34px] font-black leading-[1.08] tracking-tight sm:text-[44px]">
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
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Lanyard position={[0, 0, 17]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </ClickSpark>
      </section>

      <div className="border-y border-white/10 py-7">
        <ScrollVelocity
          texts={[t.hero.scroll, t.hero.scroll]}
          velocity={55}
          numCopies={4}
          className="text-[34px] font-black tracking-tight text-white/75 sm:text-[46px]"
        />
      </div>

      {/* Produk */}
      <section id="produk" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <Eyebrow>{t.products.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-[30px] font-black leading-tight tracking-tight sm:text-[38px]">
            {t.products.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/55">
            {t.products.lead}
          </p>

          <div className="mt-14 space-y-6">
            {t.products.items.map((product) => (
              <article
                key={product.name}
                className="group grid gap-8 rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-colors hover:border-brand-cyan/45 md:grid-cols-[1.6fr_1fr] md:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {product.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/35 px-2.5 py-0.5 text-[11px] text-brand-cyan">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      {product.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[24px] font-black tracking-tight sm:text-[28px]">
                    {product.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/55">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
                  <p className="text-[13px] text-white/40">{product.meta}</p>
                  <a
                    href={product.href}
                    className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-cyan transition-colors hover:text-white"
                  >
                    {product.cta}
                    <span className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" className="scroll-mt-24 border-t border-white/10">
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

      {/* Kontak */}
      <footer id="kontak" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{t.footer.contact}</Eyebrow>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 block text-[20px] font-bold tracking-tight text-white transition-colors hover:text-brand-cyan sm:text-[24px]"
            >
              {CONTACT.label}
            </a>
          </div>
          <p className="text-[12.5px] text-white/35">{t.footer.builtWith}</p>
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
