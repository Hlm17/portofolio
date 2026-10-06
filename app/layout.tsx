import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import "./globals.css";

// Outfit sebelumnya diambil lewat @import ke fonts.googleapis.com di globals.css.
// Permintaan itu memblokir render dan menambah dua jabat tangan lintas domain
// sebelum teks pertama terlihat. next/font mengunduhnya sekali saat build lalu
// menyajikannya dari domain sendiri, tanpa permintaan pihak ketiga dan tanpa
// pergeseran tata letak karena metrik font cadangan sudah disesuaikan.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hilmi.work"),
  title: {
    default: "Muhammad Hilmi Rajwandhika | hilmi.work",
    template: "%s",
  },
  description:
    "Website pribadi Muhammad Hilmi Rajwandhika sekaligus tempat produk perangkat lunak yang saya bangun dan kelola sendiri, termasuk IngetDiWA, bot pengingat berbasis WhatsApp.",
  // Ikon ditulis eksplisit di sini, bukan lewat berkas app/favicon.ico, supaya
  // halaman produk bisa MENGGANTI ikonnya sendiri. Berkas bawaan app/favicon.ico
  // selalu disisipkan Next.js dan tidak bisa ditimpa lewat metadata segmen,
  // sehingga subdomain produk akan tetap menampilkan ikon profil.
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon", sizes: "any" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
