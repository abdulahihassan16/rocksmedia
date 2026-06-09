import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Rocks Media — a Canadian web studio that builds custom websites personally for your business. No templates, no shortcuts, no outsourcing.",
  alternates: {
    canonical: "https://rocksmedia.ca/about",
  },
  openGraph: {
    title: "About Us | Rocks Media",
    description:
      "Meet the team behind Rocks Media — a Canadian web studio that builds custom websites personally for your business.",
    url: "https://rocksmedia.ca/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
