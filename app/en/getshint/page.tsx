import type { Metadata } from "next";
import GetsHintCase from "../../getshint/components/GetsHintCase";
import { COPY } from "../../getshint/copy";

const t = COPY.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "https://hilmi.work/en/getshint",
    languages: {
      "id-ID": "/getshint",
      "en-US": "/en/getshint",
      "x-default": "/getshint",
    },
  },
  openGraph: {
    title: t.metaOgTitle,
    description: t.metaDescription,
    url: "https://hilmi.work/en/getshint",
    locale: "en_US",
    type: "website",
  },
};

export default function GetsHintPageEnglish() {
  return <GetsHintCase locale="en" />;
}
