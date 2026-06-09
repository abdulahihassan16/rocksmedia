import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent Work",
  description:
    "See the custom websites Rocks Media has built for real businesses — barber shops, window cleaning companies, auto dealers, sports clubs, and more across Canada and the US.",
  alternates: {
    canonical: "https://rocksmedia.ca/work",
  },
  openGraph: {
    title: "Recent Work | Rocks Media",
    description:
      "See the custom websites Rocks Media has built for real businesses across Canada and the US.",
    url: "https://rocksmedia.ca/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
