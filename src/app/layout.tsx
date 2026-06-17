import type { Metadata } from "next";
import { Suspense } from "react";
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
import { Analytics } from "@/components/Analytics";
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

export const metadata: Metadata = {
  title: {
    default: `${BRAND.storeName} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.storeName}`,
  },
  description: `${BRAND.storeName} is a curated dropshipping store by ${BRAND.company}. Discover tech, home, style, and wellness essentials.`,
  keywords: ["dropshipping", "online store", "curated products", BRAND.company],
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: `${BRAND.storeName} — ${BRAND.tagline}`,
    description: `Discover curated tech, home, style, and wellness essentials at ${BRAND.storeName}.`,
    url: "https://allthings.store",
    siteName: BRAND.storeName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen font-sans">
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
                <Suspense fallback={null}><Analytics /></Suspense>
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
