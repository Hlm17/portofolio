import Link from "next/link";
import { CONTACT_EMAIL, MAIN_SITE_URL } from "../data";

export default function ReportFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[13px] font-semibold text-white">Game tester</p>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/55">
            Kumpulan laporan yang saya tulis setelah memainkan game-nya sendiri,
            lengkap dengan langkah pengulangan dan bukti tangkapan layar.
          </p>
        </div>

        <div className="sm:justify-self-end">
          <p className="text-[13px] font-semibold text-white">Tautan</p>
          <ul className="mt-4 space-y-2.5 text-[13px] text-white/55">
            <li>
              <Link
                href="/gametester"
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                Daftar game
              </Link>
            </li>
            <li>
              <a
                href={MAIN_SITE_URL}
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                Profil hilmi.work
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <p className="mx-auto max-w-6xl px-5 text-[12px] text-white/50">
          Muhammad Hilmi Rajwandhika. Laporan lengkap disimpan di Notion.
        </p>
      </div>
    </footer>
  );
}
