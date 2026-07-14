import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { StoreProvider } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashionfunks.example"),
  title: { default: "FashionFunks — Wear what moves you", template: "%s — FashionFunks" },
  description: "Expressive, easy clothing for women, men, kids and everyone in between.",
  keywords: ["FashionFunks", "clothing", "fashion", "India", "unisex fashion"],
  openGraph: {
    title: "FashionFunks — Wear what moves you",
    description: "Expressive, easy clothing for every version of you.",
    type: "website",
    images: ["/assets/images/editorial/hero-campaign.png"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f0e7" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <Suspense fallback={<div className="header-loading" aria-hidden="true" />}><SiteHeader /></Suspense>
          <main id="main-content">{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
