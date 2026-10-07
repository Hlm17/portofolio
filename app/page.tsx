import type { Metadata } from "next";
import PortfolioHome from "./components/portfolio/PortfolioHome";
import { DEFAULT_LOCALE, dictionary } from "./components/portfolio/dictionary";

const t = dictionary[DEFAULT_LOCALE];

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "https://hilmi.work",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
};

export default function Home() {
  return <PortfolioHome locale={DEFAULT_LOCALE} />;
}
