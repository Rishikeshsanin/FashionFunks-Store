import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { StoreProvider } from "@/components/providers";
import { PremiumInvite } from "@/components/premium-invite";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./v3.css";

export const metadata: Metadata = {
  title: { default: "FashionFunks — Modern fashion, made easy", template: "%s — FashionFunks" },
  description: "A modern India-first fashion storefront with thoughtfully priced wardrobe essentials, local high-resolution product imagery and a complete shopping experience.",
  keywords: ["FashionFunks", "fashion", "clothing", "India", "women's fashion", "men's fashion", "unisex clothing"],
  openGraph: {
    title: "FashionFunks — Modern fashion, made easy",
    description: "Thoughtfully priced wardrobe essentials, expressive edits and an effortless shopping experience.",
    type: "website",
    images: ["/assets/images/editorial/hero-campaign.png"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f1e9" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <Suspense fallback={<div className="header-loading" aria-hidden="true" />}><SiteHeader /></Suspense>
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Suspense><PremiumInvite /></Suspense>
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}