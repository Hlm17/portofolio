import Link from "next/link";
import { PRODUCT_NAME, SUPPORT_EMAIL, BOT_PHONE_DISPLAY, MAIN_SITE_URL, WA_LINK } from "../config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-cyan text-[13px] font-black tracking-tight text-black">
              ID
            </span>
            <span className="text-[17px] font-bold tracking-tight text-white">{PRODUCT_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/45">
            Asisten pengingat dan daftar tugas harian yang berjalan sepenuhnya di dalam
            WhatsApp.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-white">Produk</p>
          <ul className="mt-4 space-y-2.5 text-[13px] text-white/45">
            <li>
              <a href="/ingetdiwa#cara-kerja" className="transition-colors hover:text-white">
                Cara kerja
              </a>
            </li>
            <li>
              <a href="/ingetdiwa#harga" className="transition-colors hover:text-white">
                Harga
              </a>
            </li>
            <li>
              <Link href="/ingetdiwa/langganan" className="transition-colors hover:text-white">
                Halaman pembayaran
              </Link>
            </li>
            <li>
              <a
                href={MAIN_SITE_URL}
                className="transition-colors hover:text-white"
              >
                hilmi.work
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-white">Bantuan</p>
          <ul className="mt-4 space-y-2.5 text-[13px] text-white/45">
            <li>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp {BOT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              <Link href="/ingetdiwa/syarat" className="transition-colors hover:text-white">
                Syarat dan ketentuan
              </Link>
            </li>
            <li>
              <Link href="/ingetdiwa/privasi" className="transition-colors hover:text-white">
                Kebijakan privasi
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <p className="mx-auto max-w-6xl px-5 text-[12px] text-white/30">
          {PRODUCT_NAME} oleh Muhammad Hilmi Rajwandhika. Pembayaran diproses melalui
          Pakasir.
        </p>
      </div>
    </footer>
  );
}
