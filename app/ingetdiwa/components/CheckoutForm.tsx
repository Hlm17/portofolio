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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Nomor WhatsApp Anda
        </label>
        <p className="mt-1 text-xs text-slate-400">
          Langganan akan diaktifkan untuk nomor ini. Gunakan nomor yang sudah atau akan
          Anda pakai untuk chat ke bot.
        </p>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900 px-3 focus-within:border-emerald-500">
          <span className="text-sm text-slate-400">+62</span>
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
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Paket langganan IngetDiWA ({PERIOD_DAYS} hari)</span>
          <span className="font-semibold text-white">{PRICE_LABEL}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm text-slate-400">
          <span>Masa coba gratis (otomatis, tanpa bayar)</span>
          <span>{TRIAL_DAYS} hari</span>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-slate-300">Total tagihan hari ini</span>
          <span className="text-2xl font-extrabold text-white">{PRICE_LABEL}</span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Dibayar sekali untuk {PERIOD_DAYS} hari. Tidak ada perpanjangan otomatis.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Menyiapkan pembayaran…" : `Lanjut ke Pembayaran — ${PRICE_LABEL}`}
      </button>

      <p className="text-center text-xs text-slate-500">
        Anda akan diarahkan ke halaman pembayaran aman milik Pakasir (QRIS / virtual
        account). Setelah pembayaran selesai, bot langsung mengabari Anda di WhatsApp.
      </p>
    </form>
  );
}
