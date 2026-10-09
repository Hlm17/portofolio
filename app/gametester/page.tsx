import type { Metadata } from "next";
import GameTesterIndex from "./components/GameTesterIndex";
import { GAMES, TOTAL_REPORTS, gameTesterUrl } from "./data";

export const metadata: Metadata = {
  title: "Game Tester | Laporan Pengujian Game Muhammad Hilmi Rajwandhika",
  description: `Kumpulan laporan pengujian game yang saya tulis sendiri: ${GAMES.length} game, ${TOTAL_REPORTS} laporan, lengkap dengan langkah pengulangan, bukti tangkapan layar, dan tingkat keparahan tiap temuan.`,
  alternates: {
    canonical: gameTesterUrl("id"),
    languages: {
      "id-ID": "/gametester",
      "en-US": "/en/gametester",
      "x-default": "/gametester",
    },
  },
  openGraph: {
    title: "Game Tester: Laporan Pengujian Game",
    description: `Kumpulan laporan pengujian game yang saya tulis sendiri: ${GAMES.length} game, ${TOTAL_REPORTS} laporan.`,
    url: gameTesterUrl("id"),
    locale: "id_ID",
    type: "website",
  },
};

export default function GameTesterPage() {
  return <GameTesterIndex locale="id" />;
}
