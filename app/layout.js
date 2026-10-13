import "./globals.css";
import { DM_Sans, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema } from "@/lib/business";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const socialImage = {
  url: "/smfame-social-preview.webp",
  width: 1200,
  height: 630,
  alt: "SmFame — Social Growth, Made Simple",
};

export const metadata = {
  metadataBase: new URL("https://smfame.us"),
  title: {
    default: "SmFame — Social Media Growth Services for US Creators",
    template: "%s | SmFame",
  },
  description: "Explore TikTok, Instagram and Facebook growth services with clear USD pricing and no social media password required.",
  alternates: { canonical: "/" },
  icons: { icon: "/logo-smfame.webp", apple: "/logo-smfame.webp" },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "SmFame — Build momentum that gets noticed",
    description: "Simple, transparent social growth services for creators, brands and agencies across the United States.",
    url: "https://smfame.us",
    siteName: "SmFame",
    locale: "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmFame — Social Growth, Made Simple",
    description: "TikTok, Instagram and Facebook growth services with clear US pricing and no social media password required.",
    images: ["/smfame-social-preview.webp"],
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      {
        "@type": "WebSite",
        "@id": "https://smfame.us/#website",
        url: "https://smfame.us/",
        name: "SmFame",
        publisher: { "@id": "https://smfame.us/#organization" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
