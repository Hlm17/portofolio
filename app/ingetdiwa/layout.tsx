import type { Metadata } from "next";

/**
 * Ikon khusus halaman produk.
 *
 * Kenapa di sini, bukan di root: berkas `app/favicon.ico` bawaan mengikat
 * favicon profil hilmi.work. Metadata `icons` pada segmen ini menggantinya
 * untuk seluruh halaman IngetDiWA, sehingga pengguna subdomain produk melihat
 * ikon produk di tab peramban, tanpa mengubah wajah hilmi.work.
 */
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/ingetdiwa-icon.png", type: "image/png", sizes: "646x646" }],
    shortcut: [{ url: "/ingetdiwa-icon.png", type: "image/png" }],
    apple: [{ url: "/ingetdiwa-icon.png", type: "image/png" }],
  },
};

export default function IngetdiwaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
