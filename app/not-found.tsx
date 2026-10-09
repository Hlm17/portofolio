import Link from "next/link";
import Aurora from "./components/Aurora/Aurora";

/**
 * Halaman yang tidak ditemukan.
 *
 * Tanpa berkas ini Next.js memakai halaman bawaan yang berbahasa Inggris dan
 * tidak punya jalan kembali, jadi pengunjung yang salah ketik alamat berhenti di
 * jalan buntu. Halaman ini memakai warna dan huruf yang sama dengan sisa situs,
 * lalu menawarkan dua jalan pulang.
 */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-ink px-5 text-center text-white antialiased">
      <div className="absolute inset-0 opacity-70">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={0.25}
          speed={0.35}
        />
      </div>

      <div className="relative max-w-lg">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
          Halaman tidak ditemukan
        </p>
        <p className="mt-6 text-[64px] font-black leading-none tracking-tight sm:text-[80px]">
          404
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-white/60">
          Alamat yang Anda buka tidak ada di situs ini. Mungkin salah ketik, atau
          halamannya sudah dipindahkan.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md bg-brand-cyan px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white"
          >
            Kembali ke profil
          </Link>
          <Link
            href="/gametester"
            className="inline-flex min-h-11 items-center rounded-md border border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:border-white/60"
          >
            Buka halaman game tester
          </Link>
        </div>
      </div>
    </div>
  );
}
