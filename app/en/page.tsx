import type { Metadata } from "next";
import PortfolioHome from "../components/portfolio/PortfolioHome";
import { dictionary } from "../components/portfolio/dictionary";

const t = dictionary.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "https://hilmi.work/en",
    languages: {
      "id-ID": "/id",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: t.metaTitle,
    description: t.metaDescription,
    url: "https://hilmi.work/en",
    locale: "en_US",
    type: "website",
  },
};

export default function HomeEnglish() {
  return <PortfolioHome locale="en" />;
}
