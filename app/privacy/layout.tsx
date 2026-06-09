import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Rocks Media's privacy policy — how we collect, use, and protect your personal information. Compliant with Canada's PIPEDA and applicable US privacy laws.",
  alternates: {
    canonical: "https://rocksmedia.ca/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
