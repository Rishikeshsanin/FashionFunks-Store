import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandedLoading } from "@/components/branded-loading";
import { ShopClient } from "@/components/shop-client";

export const metadata: Metadata = {
  title: "Shop clothing",
  description: "Browse the complete FashionFunks clothing edit for women, men, unisex, kids and babies.",
};

export default function ShopPage() {
  return <Suspense fallback={<BrandedLoading catalog />}><ShopClient /></Suspense>;
}
