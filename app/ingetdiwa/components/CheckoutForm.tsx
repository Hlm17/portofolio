"use client";

import { useState } from "react";
import { PRICE_LABEL, PERIOD_DAYS, TRIAL_DAYS } from "../config";
import { normalizePhone } from "../lib/pakasir";

type CreateResponse = {
  payment_link?: string;
  order_id?: string;
  message?: string;
};

export default function CheckoutForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalized = normalizePhone(phone);
  const phoneLooksValid = /^62\d{8,14}$/.test(normalized);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!phoneLooksValid) {
      setError("Nomor WhatsApp tidak valid. Contoh: 08197494871.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/pakasir/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      const data = (await response.json().catch(() => ({}))) as CreateResponse;

      if (!response.ok || !data.payment_link) {
        setError(data.message || "Gagal membuat tautan pembayaran. Silakan coba lagi.");
        return;
      }

      window.location.href = data.payment_link;
    } catch {
      setError("Koneksi bermasalah. Periksa jaringan Anda lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="phone" className="block text-[14px] font-semibold text-white">
          Nomor WhatsApp Anda
        </label>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45">
          Langganan akan diaktifkan untuk nomor ini. Gunakan nomor yang sudah atau akan
          Anda pakai untuk mengirim pesan ke bot.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 transition-colors focus-within:border-brand-cyan">
          <span className="text-[14px] text-white/40">+62</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="8197494871"
            className="w-full bg-transparent py-3.5 text-[14px] text-white outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between text-[13.5px] text-white/70">
          <span>Paket langganan IngetDiWA ({PERIOD_DAYS} hari)</span>
          <span className="font-semibold text-white">{PRICE_LABEL}</span>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3.5 text-[13.5px] text-white/45">
          <span>Masa coba gratis, otomatis untuk nomor baru</span>
          <span>{TRIAL_DAYS} hari</span>
        </div>
        <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
          <span className="text-[13.5px] text-white/70">Total tagihan hari ini</span>
          <span className="text-[26px] font-black tracking-tight text-white">
            {PRICE_LABEL}
          </span>
        </div>
        <p className="mt-2 text-[12px] text-white/35">
          Dibayar sekali untuk {PERIOD_DAYS} hari. Tidak ada perpanjangan otomatis.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-[13.5px] text-white/85"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-cyan px-6 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Menyiapkan pembayaran..." : `Lanjut ke pembayaran (${PRICE_LABEL})`}
      </button>

      <p className="text-[12px] leading-relaxed text-white/35">
        Anda akan diarahkan ke halaman pembayaran Pakasir untuk memilih QRIS atau virtual
        account. Setelah pembayaran selesai, langganan aktif otomatis dan bot mengirim
        konfirmasi ke WhatsApp Anda.
      </p>
    </form>
  );
}
