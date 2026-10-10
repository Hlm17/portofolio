"use client";

import { useState } from "react";
import { PRICE_LABEL, PERIOD_DAYS, TRIAL_DAYS } from "../config";
import {
  DIAL_CODES,
  DEFAULT_DIAL_CODE,
  MAX_PHONE_DIGITS,
  MIN_PHONE_DIGITS,
  formatPhoneDisplay,
  parsePhone,
} from "../lib/pakasir";

type CreateResponse = {
  payment_link?: string;
  order_id?: string;
  message?: string;
};

export default function CheckoutForm() {
  const [dialCode, setDialCode] = useState<string>(DEFAULT_DIAL_CODE);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasil = parsePhone(phone, dialCode);
  const normalized = hasil.digits;
  const phoneLooksValid = hasil.valid;
  const negara = DIAL_CODES.find((item) => item.code === dialCode);
  const contoh = negara?.contoh ?? "8123456789";

  /** Pesan yang tepat untuk masalah nomor yang sedang dihadapi pengunjung. */
  function pesanNomor(): string {
    switch (hasil.problem) {
      case "empty":
        return "Masukkan nomor WhatsApp Anda lebih dulu.";
      case "other-country":
        return `Nomor itu terlihat memakai kode negara +${hasil.otherCountry}. Ubah pilihan kode negara menjadi +${hasil.otherCountry}, atau tulis nomornya tanpa kode negara.`;
      case "wrong-prefix":
        return `Nomor itu belum sesuai untuk ${negara?.label ?? "negara yang dipilih"}. Contoh yang benar: +${dialCode} ${contoh}. Bila nomor Anda dari negara lain, ubah kode negaranya lebih dulu.`;
      case "too-short":
      case "too-long":
        return `Nomor WhatsApp harus ${MIN_PHONE_DIGITS} sampai ${MAX_PHONE_DIGITS} angka termasuk kode negara. Nomor Anda ${hasil.digits.length} angka.`;
      default:
        return `Nomor WhatsApp belum lengkap. Contoh: +${dialCode} ${contoh}.`;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!phoneLooksValid) {
      setError(pesanNomor());
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/pakasir/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, dialCode }),
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
          Tulis nomor dalam format internasional: pilih kode negara, lalu nomor tanpa
          angka 0 di depan. Gunakan nomor yang sudah atau akan Anda pakai untuk mengirim
          pesan ke bot.
        </p>
        <div className="mt-4 flex items-stretch gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] pl-3.5 pr-2 transition-colors focus-within:border-brand-cyan">
            <label htmlFor="dialCode" className="sr-only">
              Kode negara
            </label>
            <select
              id="dialCode"
              name="dialCode"
              value={dialCode}
              onChange={(event) => setDialCode(event.target.value)}
              className="cursor-pointer appearance-none bg-transparent py-3.5 text-[14px] text-white outline-none"
            >
              {DIAL_CODES.map((item) => (
                <option key={item.code} value={item.code} className="bg-brand-ink text-white">
                  +{item.code} {item.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5 shrink-0 text-white/40"
              fill="currentColor"
            >
              <path d="M5.5 8l4.5 4.5L14.5 8z" />
            </svg>
          </div>
          <div className="flex flex-1 items-center rounded-lg border border-white/15 bg-white/[0.04] px-3.5 transition-colors focus-within:border-brand-cyan">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={contoh}
              aria-describedby="phone-preview"
              className="w-full bg-transparent py-3.5 text-[14px] text-white outline-none placeholder:text-white/25"
            />
          </div>
        </div>
        <p id="phone-preview" className="mt-2.5 text-[12.5px] leading-relaxed">
          {phoneLooksValid ? (
            <>
              <span className="text-white/45">Nomor yang akan diaktifkan: </span>
              <span className="font-semibold text-brand-cyan">
                {formatPhoneDisplay(normalized)}
              </span>
            </>
          ) : (
            <span className="text-white/35">
              Contoh lengkapnya: +{dialCode} {contoh}
              {negara ? ` (${negara.label})` : ""}
            </span>
          )}
        </p>
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
