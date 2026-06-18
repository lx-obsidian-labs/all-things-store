import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToastContainer } from "@/components/ToastContainer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsent } from "@/components/CookieConsent";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const SITE_URL = "https://allthings.store";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.storeName} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.storeName}`,
  },
  description: `${BRAND.storeName} is a curated marketplace by ${BRAND.company}. Discover premium electronics, fashion, home essentials, wellness products, and automotive accessories — all in one place.`,
  keywords: [
    "online marketplace", "curated products", "electronics", "fashion", "home decor",
    "wellness", "automotive accessories", "dropshipping store", BRAND.company.toLowerCase(),
    "tech gadgets", "clothing online", "home essentials",
  ],
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
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
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND.storeName,
    title: `${BRAND.storeName} — ${BRAND.tagline}`,
    description: `Discover premium electronics, fashion, home essentials, wellness products, and more at ${BRAND.storeName}. Curated quality, delivered worldwide.`,
    images: [{ url: "/logo-icon.png", width: 512, height: 512, alt: BRAND.storeName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.storeName} — ${BRAND.tagline}`,
    description: `Curated essentials in tech, fashion, home & wellness — delivered worldwide.`,
    images: ["/logo-icon.png"],
    creator: `@${BRAND.companyShort.replace(/\s+/g, "").toLowerCase()}`,
  },
  category: "marketplace",
  classification: "E-commerce",
  other: {
    "og:locale:alternate": "en",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.company,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  description: `${BRAND.storeName} — ${BRAND.tagline}`,
  email: BRAND.email,
  founder: { "@type": "Person", name: BRAND.company },
  sameAs: [
    // Add social URLs here when available
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <CurrencyProvider>
        <OnboardingProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <div className="flex min-h-screen flex-col bg-obsidian-gradient">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ToastContainer />
                <OnboardingModal />
                <WhatsAppButton />
                <CookieConsent />
              </div>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
        </OnboardingProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
