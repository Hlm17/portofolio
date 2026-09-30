import Link from "next/link";
import { PRODUCT_NAME, SUPPORT_EMAIL, BOT_PHONE_DISPLAY, WA_LINK } from "../config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{PRODUCT_NAME}</p>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Asisten pengingat dan daftar tugas harian yang berjalan sepenuhnya di dalam
            WhatsApp. Dikelola dari Indonesia.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Produk</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/ingetdiwa#fitur" className="hover:text-white">
                Fitur
              </Link>
            </li>
            <li>
              <Link href="/ingetdiwa#harga" className="hover:text-white">
                Harga &amp; Paket
              </Link>
            </li>
            <li>
              <Link href="/ingetdiwa/langganan" className="hover:text-white">
                Langganan
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Bantuan</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              WhatsApp bot:{" "}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {BOT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              <Link href="/ingetdiwa/syarat" className="hover:text-white">
                Syarat &amp; Ketentuan
              </Link>
            </li>
            <li>
              <Link href="/ingetdiwa/privasi" className="hover:text-white">
                Kebijakan Privasi
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {PRODUCT_NAME} — hilmi.work. Pembayaran diproses
        dengan aman melalui Pakasir.
      </div>
    </footer>
  );
}
