import Link from "next/link";
import { PRODUCT_NAME, MAIN_SITE_URL } from "../config";

const links = [
  { href: "/ingetdiwa#cara-kerja", label: "Cara kerja" },
  { href: "/ingetdiwa#kemampuan", label: "Kemampuan" },
  { href: "/ingetdiwa#harga", label: "Harga" },
  { href: "/ingetdiwa#faq", label: "FAQ" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/ingetdiwa" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-cyan text-[13px] font-black tracking-tight text-black">
            ID
          </span>
          <span className="text-[17px] font-bold tracking-tight text-white">{PRODUCT_NAME}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={MAIN_SITE_URL}
            className="text-[13px] text-white/60 transition-colors hover:text-white"
          >
            hilmi.work
          </a>
        </div>

        <Link
          href="/ingetdiwa/langganan"
          className="rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-black transition-colors hover:bg-brand-cyan"
        >
          Berlangganan
        </Link>
      </nav>
    </header>
  );
}
