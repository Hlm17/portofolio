import type { Metadata } from "next";
import PortfolioHome from "../components/portfolio/PortfolioHome";
import { dictionary } from "../components/portfolio/dictionary";

const t = dictionary.id;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "https://hilmi.work/id",
    languages: {
      "id-ID": "/id",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: t.metaTitle,
    description: t.metaDescription,
    url: "https://hilmi.work/id",
    locale: "id_ID",
    type: "website",
  },
};

export default function HomeIndonesia() {
  return <PortfolioHome locale="id" />;
}
