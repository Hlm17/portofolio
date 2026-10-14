import type { Metadata } from "next";
import GetsHintCase from "./components/GetsHintCase";
import { COPY } from "./copy";

const t = COPY.id;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "https://hilmi.work/getshint",
    languages: {
      "id-ID": "/getshint",
      "en-US": "/en/getshint",
      "x-default": "/getshint",
    },
  },
  openGraph: {
    title: t.metaOgTitle,
    description: t.metaDescription,
    url: "https://hilmi.work/getshint",
    locale: "id_ID",
    type: "website",
  },
};

export default function GetsHintPage() {
  return <GetsHintCase locale="id" />;
}
