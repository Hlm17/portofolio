"use client";

import { useEffect } from "react";

/**
 * Atribut `lang` hanya bisa ditulis sekali di root layout, sedangkan halaman ini
 * punya dua bahasa. Komponen kecil ini menyesuaikannya setelah halaman tampil,
 * supaya pembaca layar dan mesin pencari tahu bahasa yang sedang dipakai.
 */
export default function LangAttribute({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
