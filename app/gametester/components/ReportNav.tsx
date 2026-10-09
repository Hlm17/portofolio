import Link from "next/link";
import TombolBahasa from "../../components/TombolBahasa";
import { CONTACT_EMAIL, MAIN_SITE_URL, type Locale } from "../data";
import { COPY } from "../copy";

/**
 * Bilah atas halaman pengujian game.
 *
 * Halaman ini tidak punya subdomain sendiri, jadi yang dibutuhkan hanya jalan
 * pulang ke profil, penanda halaman, dan pilihan bahasa. Pilihan bahasanya
 * mengikuti halaman yang sedang dibuka: dari satu game di versi Indonesia,
 * tombol EN membawa ke game yang sama di versi Inggris, bukan ke halaman daftar.
 */
export default function ReportNav({
  locale,
  crumb,
  slug,
}: {
  locale: Locale;
  crumb?: string;
  /** Slug game yang sedang dibuka, supaya pilihan bahasa tetap di game yang sama. */
  slug?: string;
}) {
  const t = COPY[locale];
  const akhiran = slug ? `/${slug}` : "";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3 text-[13px]">
          <a
            href={MAIN_SITE_URL}
            className="inline-flex min-h-11 items-center font-semibold text-white/70 transition-colors hover:text-white"
          >
            hilmi.work
          </a>
          <span className="text-white/45">/</span>
          {crumb ? (
            <>
              <Link
                href={`${locale === "en" ? "/en/gametester" : "/gametester"}`}
                className="inline-flex min-h-11 items-center text-white/60 transition-colors hover:text-white"
              >
                {t.nav.crumb}
              </Link>
              <span className="text-white/45">/</span>
              <span className="max-w-[45vw] truncate font-semibold text-white">{crumb}</span>
            </>
          ) : (
            <span className="font-semibold text-white">{t.nav.crumb}</span>
          )}
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
              { kode: "id", href: `/gametester${akhiran}` },
              { kode: "en", href: `/en/gametester${akhiran}` },
            ]}
          />
        </div>
      </nav>
    </header>
  );
}
