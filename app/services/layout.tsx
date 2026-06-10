import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Rocks Media builds custom websites for small businesses across Canada and the US. Web design, SEO, contact forms, booking integrations, add-ons and more. Built personally, every time.",
  alternates: {
    canonical: "https://rocksmedia.ca/services",
  },
  openGraph: {
    title: "Services | Rocks Media",
    description:
      "Custom web design, SEO setup, booking integrations and add-ons for small businesses. Built personally by Rocks Media.",
    url: "https://rocksmedia.ca/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
