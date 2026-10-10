"use client";

import { useState } from "react";

/**
 * Tombol "periksa lagi" untuk halaman setelah pembayaran.
 *
 * Sengaja hanya tombol, bukan pemeriksaan otomatis berkala. Pemeriksaan berkala
 * membuat pembeli menunggu di depan halaman sambil sistem bertanya berulang ke
 * Pakasir, padahal konfirmasi seharusnya datang sendiri lewat webhook. Tombol ini
 * hanya jalan keluar bila pembeli memang ingin memastikan saat itu juga.
 */

type ConfirmResponse = {
  state?: string;
  activated?: boolean;
  message?: string | null;
};

export default function ConfirmButton({ txn }: { txn: string }) {
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<ConfirmResponse | null>(null);
  const [gagal, setGagal] = useState(false);

  async function periksa() {
    setLoading(true);
    setHasil(null);
    setGagal(false);
    try {
      const response = await fetch("/api/pakasir/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txn }),
      });
      const data = (await response.json().catch(() => ({}))) as ConfirmResponse;
      if (!response.ok) {
        setGagal(true);
        return;
      }
      setHasil(data);
    } catch {
      setGagal(true);
    } finally {
      setLoading(false);
    }
  }

  const aktif = hasil?.state === "completed" && hasil.activated === true;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={periksa}
        disabled={loading}
        className="inline-block rounded-md border border-white/25 px-5 py-2.5 text-[13.5px] font-semibold text-white/80 transition-colors hover:border-brand-cyan hover:text-brand-cyan disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Memeriksa..." : "Periksa status sekali lagi"}
      </button>

      {gagal ? (
        <p className="mt-3 text-[13px] leading-relaxed text-white/55">
          Pemeriksaan gagal karena jaringan. Coba lagi sebentar lagi, atau kirim kode
          pembayaran Anda ke bot lewat WhatsApp.
        </p>
      ) : null}

      {hasil && !gagal ? (
        <p className="mt-3 text-[13px] leading-relaxed text-white/75">
          {aktif
            ? "Pembayaran Anda lunas dan nomor Anda sudah aktif. Konfirmasi juga dikirim ke WhatsApp Anda."
            : hasil.message ||
              (hasil.state === "canceled"
                ? "Transaksi itu dibatalkan atau sudah kedaluwarsa."
                : "Pembayaran Anda belum terdeteksi lunas. Bila baru saja membayar, tunggu sebentar lalu periksa lagi.")}
        </p>
      ) : null}
    </div>
  );
}
