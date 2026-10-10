import { NextResponse } from "next/server";
import { confirmTransaction } from "@/app/ingetdiwa/lib/confirm";

/**
 * Konfirmasi pembayaran sekali jalan untuk halaman langganan/sukses.
 *
 * Dipanggil paling banyak sekali per kunjungan halaman (bukan cron, bukan
 * pemeriksaan berkala), untuk pembeli yang ingin memastikan tanpa harus mengetik
 * perintah apa pun di WhatsApp. Isi pekerjaannya ada di lib/confirm.ts supaya
 * halaman sukses bisa memakai jalur yang sama persis.
 */

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { txn?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format permintaan tidak valid." }, { status: 400 });
  }

  const hasil = await confirmTransaction(body?.txn ?? "");

  if (hasil.state === "invalid") {
    return NextResponse.json({ message: "Kode pembayaran tidak valid." }, { status: 400 });
  }

  // Selalu 200 untuk kode yang sah: halaman hanya perlu tahu keadaannya, bukan
  // diperlakukan sebagai kegagalan sistem.
  return NextResponse.json({
    state: hasil.state,
    activated: hasil.activated,
    phone: hasil.phone,
    message: hasil.message,
  });
}
