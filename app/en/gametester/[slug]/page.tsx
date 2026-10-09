import type { Metadata } from "next";
import GameTesterDetail from "../../../gametester/components/GameTesterDetail";
import { GAMES, MAIN_SITE_URL, findGame, gamePath } from "../../../gametester/data";

/**
 * Halaman satu game versi Bahasa Inggris.
 *
 * Isinya sama dengan versi Indonesia karena keduanya memakai komponen tampilan
 * yang sama; yang berbeda hanya alamatnya, bahasanya, dan metadata untuk mesin
 * pencari. Slug yang tidak ada di `data.ts` langsung menjawab 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = findGame(params.slug);
  if (!game) return {};

  const url = `${MAIN_SITE_URL}${gamePath("en", game.slug)}`;
  const title = `${game.name} testing reports | Muhammad Hilmi Rajwandhika`;
  const description = `${game.reports.length} ${game.name} testing reports I wrote myself: ${game.summary.en}`;

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
    openGraph: { title, description, url, locale: "en_US", type: "website" },
  };
}

export default function GameReportPageEnglish({ params }: { params: { slug: string } }) {
  return <GameTesterDetail locale="en" slug={params.slug} />;
}
