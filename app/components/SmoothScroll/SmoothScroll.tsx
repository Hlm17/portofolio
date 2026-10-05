"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gerakDiizinkan, gerakDipaksa } from "../motionPref";

/**
 * Gulir halus untuk seluruh situs.
 *
 * Lenis menggerakkan gulir jendela seperti biasa, jadi komponen yang membaca
 * posisi gulir (mis. marquee yang peka kecepatan) tetap bekerja tanpa perubahan.
 *
 * Dua hal yang sengaja dijaga:
 * 1. Pengunjung yang meminta gerak minimum tidak mendapat Lenis sama sekali,
 *    langsung memakai gulir bawaan. Bila ingin melihat versi penuhnya meski
 *    setelan sistem mematikan animasi, buka dengan ?gerak=penuh.
 * 2. Tautan jangkar (#produk, #tentang, #kontak) tetap ditangani Lenis.
 *    Sejak bilah navigasi dihapus, tidak ada lagi header tetap yang perlu
 *    dihindari, jadi tiap bagian berhenti tepat di tepi atas layar.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (!gerakDiizinkan()) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      // Tautan jangkar ditangani Lenis. Tidak ada header tetap lagi, jadi
      // tidak ada offset yang perlu ditambahkan di sini.
      anchors: true,
      // Lenis punya pemeriksaan setelan gerak sendiri. Pemeriksaan itu dimatikan
      // hanya ketika pengunjung meminta tampilan penuh lewat ?gerak=penuh,
      // supaya jalan pintas itu benar benar berjalan.
      respectReducedMotion: !gerakDipaksa(),
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
