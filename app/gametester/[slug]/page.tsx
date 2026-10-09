import type { Metadata } from "next";
import GameTesterDetail from "../components/GameTesterDetail";
import { GAMES, MAIN_SITE_URL, findGame, gamePath } from "../data";

/**
 * Halaman satu game versi Bahasa Indonesia.
 *
 * Berkas ini sengaja hanya mengurus metadata dan meneruskan slug ke komponen
 * tampilan, karena versi Bahasa Inggrisnya memakai komponen yang sama. Segala
 * hal yang dilihat pengunjung tinggal di `components/GameTesterDetail.tsx`.
 *
 * Semua slug sudah diketahui saat build, jadi halamannya dibuat sekali sebagai
 * berkas statis. `dynamicParams = false` membuat alamat yang tidak ada di daftar
 * langsung menjawab 404, bukan mencoba merender di server.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = findGame(params.slug);
  if (!game) return {};

  const url = `${MAIN_SITE_URL}${gamePath("id", game.slug)}`;
  const title = `Laporan pengujian ${game.name} | Muhammad Hilmi Rajwandhika`;
  const description = `${game.reports.length} laporan pengujian ${game.name} yang saya tulis sendiri: ${game.summary.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": gamePath("id", game.slug),
        "en-US": gamePath("en", game.slug),
        "x-default": gamePath("id", game.slug),
      },
    },
    openGraph: { title, description, url, locale: "id_ID", type: "website" },
  };
}

export default function GameReportPage({ params }: { params: { slug: string } }) {
  return <GameTesterDetail locale="id" slug={params.slug} />;
}
