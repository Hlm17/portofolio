/**
 * Satu tempat untuk memutuskan apakah pengunjung menerima efek gerak.
 *
 * Aturan bawaannya menghormati setelan sistem: bila pengunjung meminta gerak
 * minimum (mis. "efek animasi" dimatikan di Windows), gulir halus dan animasi
 * yang tidak diminta tidak dijalankan.
 *
 * Karena setelan itu bisa dimatikan tanpa disadari, ada satu jalan pintas
 * eksplisit untuk melihat tampilan penuh: tambahkan ?gerak=penuh pada alamat.
 * Jalan pintas ini hanya membatalkan batas gerak, bukan batas kemampuan
 * perangkat seperti lebar layar atau mode hemat data.
 */

export function gerakDipaksa(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("gerak") === "penuh";
}

export function gerakDiizinkan(): boolean {
  if (typeof window === "undefined") return false;
  if (gerakDipaksa()) return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
