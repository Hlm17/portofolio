import Link from "next/link";
import { PRODUCT_NAME } from "../config";

const links = [
  { href: "/ingetdiwa#fitur", label: "Fitur" },
  { href: "/ingetdiwa#cara-kerja", label: "Cara Kerja" },
  { href: "/ingetdiwa#harga", label: "Harga" },
  { href: "/ingetdiwa#faq", label: "FAQ" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/ingetdiwa" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-slate-950">
            ID
          </span>
          <span className="text-lg font-bold text-white">{PRODUCT_NAME}</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link
          href="/ingetdiwa/langganan"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Berlangganan
        </Link>
      </nav>
    </header>
  );
}
