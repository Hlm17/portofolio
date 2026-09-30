import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  ];

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hilmi.work"),
  title: {
    default: "Muhammad Hilmi Rajwandhika — hilmi.work",
    template: "%s",
  },
  description:
    "Website pribadi Muhammad Hilmi Rajwandhika sekaligus rumah produk IngetDiWA, bot pengingat dan daftar tugas lewat WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[var(--font-outfit)]`}
      >
        {children}
      </body>
    </html>
  );
}
