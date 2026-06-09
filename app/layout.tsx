import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const BASE_URL = "https://rocksmedia.ca";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rocks Media | Custom Websites for Small Businesses",
    template: "%s | Rocks Media",
  },
  description:
    "Rocks Media builds custom, handcrafted websites for small businesses across Canada and the US. No templates, no shortcuts. Real work built personally for you.",
  keywords: [
    "web design Canada",
    "custom website Ontario",
    "small business website",
    "web design Toronto",
    "affordable web design",
    "custom website design",
    "web development Ontario",
    "website for small business Canada",
    "Rocks Media",
  ],
  authors: [{ name: "Rocks Media", url: BASE_URL }],
  creator: "Rocks Media",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "Rocks Media",
    title: "Rocks Media | Custom Websites for Small Businesses",
    description:
      "Custom, handcrafted websites for small businesses across Canada and the US. No templates. Real work, built personally for you.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rocks Media — Custom Websites for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocks Media | Custom Websites for Small Businesses",
    description:
      "Custom, handcrafted websites for small businesses across Canada and the US. No templates. Real work, built personally for you.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/images/apple-touch-icon.png" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rocks Media",
  description:
    "Custom website design and development for small businesses across Canada and the US.",
  url: BASE_URL,
  telephone: "+16475135490",
  email: "abdulahihassan16@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: ["Canada", "United States"],
  serviceType: "Web Design and Development",
  priceRange: "$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${fraunces.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
