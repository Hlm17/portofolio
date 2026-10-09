"use client";

import Link from "next/link";

/**
 * Pilihan bahasa yang dipakai di kaki halaman profil dan di bilah halaman
 * pengujian game.
 *
 * Selain berpindah alamat, satu klik di sini menyimpan pilihan pengunjung ke
 * cookie `bahasa` selama satu tahun. Cookie itulah yang dibaca middleware:
 * pengunjung yang pernah memilih Bahasa Indonesia tidak akan dialihkan lagi ke
 * versi Bahasa Inggris walau negaranya bukan Indonesia, dan sebaliknya. Tanpa
 * cookie ini, pilihan pengunjung akan selalu kalah oleh dugaan dari negaranya.
 */
export default function TombolBahasa({
  aktif,
  opsi,
}: {
  aktif: "id" | "en";
  opsi: { kode: "id" | "en"; href: string }[];
}) {
  const simpan = (kode: "id" | "en") => {
    document.cookie = `bahasa=${kode}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-white/15 p-0.5">
      {opsi.map((option) => (
        <Link
          key={option.kode}
          href={option.href}
          onClick={() => simpan(option.kode)}
          aria-current={option.kode === aktif ? "true" : undefined}
          className={`inline-flex min-h-10 items-center rounded px-2.5 py-1 text-[12px] font-semibold transition-colors ${
            option.kode === aktif
              ? "bg-brand-cyan text-black"
              : "text-white/55 hover:text-white"
          }`}
        >
          {option.kode.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
