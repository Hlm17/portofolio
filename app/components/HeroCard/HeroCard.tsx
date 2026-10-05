"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Kartu identitas di pembuka halaman.
 *
 * Kartu ini selalu digantung dari tepi paling atas halaman, tepat di sebelah
 * judul. Karena bentuk halaman pembuka bisa berbeda jauh antara ponsel dan
 * layar lebar, tata letaknya dihitung dari ukuran kotak yang tersedia, bukan
 * dari angka tetap:
 *
 * 1. Lebar kartu selalu sekitar 36 persen lebar kotak dan titik gantungnya
 *    diletakkan sedikit di atas tepi atas, jadi tali selalu tampak menempel di
 *    paling atas layar.
 * 2. Di layar lebar kartu digantung di tengah separuh kanan. Di layar sempit
 *    kartu digeser ke kanan, karena judulnya berada di sebelah kiri.
 *
 * Kartu 3D memang paling enak dilihat, tetapi ia membawa three.js dan mesin
 * fisika Rapier, jadi ada dua lapis penjagaan:
 *
 * - Tampilan ringan (tali dan gambar kartu) tampil lebih dulu, sehingga pembuka
 *   tidak pernah kosong dan bentuk gantungnya tetap terbaca.
 * - Kartu 3D baru diunduh setelah area ini masuk layar dan peramban menganggur,
 *   dan tidak pernah diunduh sama sekali pada perangkat yang memang tidak cocok
 *   memuatnya: mode hemat data, jaringan 2G atau 3G, atau memori kecil.
 *
 * Kartu 3D tetap dipakai walau setelan sistem meminta gerak minimum. Kartu ini
 * bukan hiasan yang bergerak sendiri, melainkan benda yang memang bisa ditarik
 * dan diayun pengunjung, jadi mematikannya berarti menghilangkan bagian yang
 * bisa dimainkan. Efek gerak lain di halaman tetap menghormati setelan itu.
 *
 * Kartu 3D dipakai di semua lebar layar: di layar sempit kecepatan unduhnya
 * memang lebih terasa, tetapi sisanya dijaga oleh pemeriksaan perangkat di atas.
 */

const Lanyard = dynamic(() => import("../Lanyard/Lanyard"), { ssr: false });

const FOV = 20;

/**
 * Menghitung letak kamera dan geseran gantungan dari ukuran kotak.
 *
 * `rasioKartu` adalah lebar kartu dibagi lebar kotak, `titikKartu` adalah posisi
 * horizontal pusat kartu (0.5 berarti tengah kotak).
 *
 * Kamera sengaja selalu berada di tengah, dan geseran mendatar diberikan ke
 * rangkaian gantungannya. Ini bukan pilihan gaya: kamera yang digeser ke samping
 * akan otomatis diarahkan memandang titik nol oleh pustaka 3D, sehingga isi
 * layar berputar balik ke tengah dan geserannya hilang. Dengan menggeser
 * gantungan, titik gantung, tali, dan kartu bergeser bersama dan talinya tetap
 * tegak lurus di bawah titik gantung.
 */
function susunanKartu(
  rasioKartu: number,
  titikKartu: number,
  jarakGantung: number,
  ukuran: Ukuran
) {
  const aspek = ukuran.lebar / Math.max(ukuran.tinggi, 1);
  const lebarIdeal = 1.8 / rasioKartu;
  const tinggiIdeal = lebarIdeal / Math.max(aspek, 0.2);
  // Batas bawah tinggi pandangan: di jendela yang lebar tetapi pendek, misalnya
  // ponsel mendatar, tanpa batas ini kartu menjadi lebih besar dari layar dan
  // tergantung di luar pandangan.
  const tinggiTampak = Math.max(tinggiIdeal, 5.5);
  const lebarTampak = tinggiTampak * Math.max(aspek, 0.2);
  const z = tinggiTampak / (2 * Math.tan(((FOV / 2) * Math.PI) / 180));

  return {
    position: [0, 0, z] as [number, number, number],
    // Kartu menggantung tepat di bawah titik gantungnya, jadi menggeser
    // rangkaian ke kanan juga memindahkan kartunya ke kanan.
    geserX: (titikKartu - 0.5) * lebarTampak,
    // Tepi atas layar berada di `tinggiTampak / 2`. Titik gantung diletakkan di
    // atas nilai itu, jadi talinya selalu terpotong tepi layar dan tampak
    // menempel di paling atas.
    anchorY: tinggiTampak / 2 + jarakGantung,
  };
}

type Ukuran = { lebar: number; tinggi: number };

type Koneksi = {
  saveData?: boolean;
  effectiveType?: string;
};

function perangkatMampuMemuat3D(): boolean {
  if (typeof window === "undefined") return false;

  // Gerak minimum tidak lagi mematikan kartu ini, lihat catatan di atas berkas.
  // Yang tetap diperiksa hanya kemampuan perangkatnya.
  const koneksi = (navigator as Navigator & { connection?: Koneksi }).connection;
  const hematData = Boolean(koneksi?.saveData);
  const jaringanLambat = ["slow-2g", "2g", "3g"].includes(
    koneksi?.effectiveType ?? ""
  );

  const memori = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const memoriKecil = typeof memori === "number" && memori < 4;

  return !hematData && !jaringanLambat && !memoriKecil;
}

export default function HeroCard() {
  const wadah = useRef<HTMLDivElement>(null);
  const [ukuran, setUkuran] = useState<Ukuran>({ lebar: 0, tinggi: 0 });
  const [lebarLayar, setLebarLayar] = useState(false);
  const [muatKartu3D, setMuatKartu3D] = useState(false);

  // Susunan lebar dipakai mulai titik henti `lg` Tailwind (1024px), sama dengan
  // perpindahan tata letak judul di PortfolioHome.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const terapkan = () => setLebarLayar(media.matches);

    terapkan();
    media.addEventListener("change", terapkan);

    return () => media.removeEventListener("change", terapkan);
  }, []);

  // Ukuran kotak dipantau supaya tata letak kartu ikut berubah saat jendela
  // diubah ukurannya.
  useEffect(() => {
    const elemen = wadah.current;
    if (!elemen) return;

    const ukur = () =>
      setUkuran({ lebar: elemen.clientWidth, tinggi: elemen.clientHeight });

    ukur();

    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(elemen);

    return () => pengamat.disconnect();
  }, []);

  // Dipantau ulang saat lebar layar melintasi titik henti, karena susunan
  // kartunya berbeda antara layar lebar dan layar sempit. Kanvasnya dibuat
  // ulang saat itu terjadi, jadi kamera dan titik gantungnya pasti ikut berubah.
  useEffect(() => {
    if (!perangkatMampuMemuat3D()) {
      setMuatKartu3D(false);
      return;
    }

    const elemen = wadah.current;
    if (!elemen) return;

    type IdleWindow = Window & {
      requestIdleCallback?: (
        cb: () => void,
        opsi?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleWindow = window as IdleWindow;

    let idTertunda: number | undefined = undefined;

    const mulaiUnduh = () => {
      if (idleWindow.requestIdleCallback) {
        idTertunda = idleWindow.requestIdleCallback(() => setMuatKartu3D(true), {
          timeout: 2500,
        });
      } else {
        idTertunda = window.setTimeout(() => setMuatKartu3D(true), 1200);
      }
    };

    const pengamat = new IntersectionObserver(
      (entri) => {
        if (entri.some((entri) => entri.isIntersecting)) {
          pengamat.disconnect();
          mulaiUnduh();
        }
      },
      { rootMargin: "150px" }
    );

    pengamat.observe(elemen);

    return () => {
      pengamat.disconnect();
      if (idTertunda !== undefined) {
        if (idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idTertunda);
        else window.clearTimeout(idTertunda);
      }
    };
  }, [lebarLayar]);

  const ukuranSiap = ukuran.lebar > 1 && ukuran.tinggi > 1;
  // Lebar kartu sekitar 37,5 persen lebar kotak. Di layar lebar kartunya di
  // tengah separuh kanan; di layar sempit digeser lebih ke kanan lagi, karena
  // judulnya memakai kiri layar dan keduanya tidak boleh bersinggungan. Angka
  // 0,75 dipilih dari ukuran nyata di lebar 390px: kartu mulai di x 211,
  // sedangkan blok judulnya berakhir di x 193.
  const susunan = ukuranSiap
    ? susunanKartu(0.375, lebarLayar ? 0.5 : 0.75, 1, ukuran)
    : null;

  return (
    <div ref={wadah} className="relative z-0 h-full w-full">
      {muatKartu3D && susunan ? (
        <Lanyard
          // `key` membuat kanvas dibuat ulang saat susunannya berubah, sehingga
          // kamera dan titik gantungnya pasti ikut berubah.
          key={`${susunan.geserX}-${susunan.anchorY}`}
          position={susunan.position}
          gravity={[0, -40, 0]}
          anchorY={susunan.anchorY}
          geserX={susunan.geserX}
        />
      ) : (
        <GantunganRingan />
      )}
    </div>
  );
}

/**
 * Tampilan ringan: tali dari tekstur yang sama dengan kartu 3D, klip kecil, lalu
 * gambar kartu. Dipakai sebelum kartu 3D siap dan pada perangkat yang tidak
 * memuatnya, supaya kartunya tidak pernah hanya mengambang tanpa tali.
 */
function GantunganRingan() {
  return (
    <div className="relative flex h-full w-full items-start justify-end pr-[5%] lg:justify-center lg:pr-0">
      <div className="flex flex-col items-center">
        <div className="relative h-[27vh] min-h-[150px] w-[18px] overflow-hidden lg:h-[35vh] lg:w-[22px]">
          {/* Tekstur tali diputar sembilan puluh derajat supaya arahnya turun
              seperti tali yang digantung, bukan mendatar. */}
          <div
            className="absolute left-1/2 top-1/2 h-[18px] w-[27vh] min-w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-repeat-x lg:h-[22px] lg:w-[35vh]"
            style={{
              backgroundImage: "url(/assets/lanyard/lanyard.png)",
              backgroundSize: "auto 100%",
            }}
          />
        </div>

        <div className="h-[20px] w-[14px] rounded-b-[4px] border-x border-white/10 bg-[#101018]" />

        {/* Berkas gambar kartu ini menyisakan sekitar seperlima bagian bawah yang
            rata abu abu kosong, jadi isinya dipotong dengan rasio 4:3 dari atas. */}
        <div className="relative -mt-1 aspect-[4/3] w-[38vw] max-w-[190px] overflow-hidden rounded-xl border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] lg:w-[250px] lg:max-w-[250px]">
          <Image
            src="/assets/lanyard/card-poster.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 38vw, 250px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
