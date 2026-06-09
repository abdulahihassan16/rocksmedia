import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Rocks Media's terms of service — covering project scope, pricing, revisions, intellectual property ownership, liability, and governing law for Ontario, Canada.",
  alternates: {
    canonical: "https://rocksmedia.ca/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
