import Link from "next/link";
import { CONTACT_EMAIL, MAIN_SITE_URL } from "../data";

/**
 * Bilah atas halaman game tester.
 *
 * Halaman ini tidak punya subdomain sendiri, jadi yang dibutuhkan hanya jalan
 * pulang ke profil dan penanda halaman supaya pengunjung tahu sedang di mana.
 */
export default function ReportNav({ crumb }: { crumb?: string }) {
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
                href="/gametester"
                className="inline-flex min-h-11 items-center text-white/60 transition-colors hover:text-white"
              >
                Laporan game tester
              </Link>
              <span className="text-white/45">/</span>
              <span className="max-w-[45vw] truncate font-semibold text-white">{crumb}</span>
            </>
          ) : (
            <span className="font-semibold text-white">Game tester</span>
          )}
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="hidden min-h-11 items-center rounded-md border border-white/20 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-white/60 sm:inline-flex"
        >
          Hubungi saya
        </a>
      </nav>
    </header>
  );
}
