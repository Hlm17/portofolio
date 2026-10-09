import type { Metadata } from "next";
import GameTesterIndex from "../../gametester/components/GameTesterIndex";
import { GAMES, TOTAL_REPORTS, gameTesterUrl } from "../../gametester/data";

export const metadata: Metadata = {
  title: "Game Tester | Game Testing Reports by Muhammad Hilmi Rajwandhika",
  description: `A collection of game testing reports I write myself: ${GAMES.length} games, ${TOTAL_REPORTS} reports, each with reproduction steps, screenshot evidence, and a severity rating.`,
  alternates: {
    canonical: gameTesterUrl("en"),
    languages: {
      "id-ID": "/gametester",
      "en-US": "/en/gametester",
      "x-default": "/gametester",
    },
  },
  openGraph: {
    title: "Game Tester: Game Testing Reports",
    description: `A collection of game testing reports I write myself: ${GAMES.length} games, ${TOTAL_REPORTS} reports.`,
    url: gameTesterUrl("en"),
    locale: "en_US",
    type: "website",
  },
};

export default function GameTesterPageEnglish() {
  return <GameTesterIndex locale="en" />;
}
