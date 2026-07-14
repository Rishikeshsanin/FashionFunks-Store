import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop-client";

export const metadata: Metadata = {
  title: "Shop clothing",
  description: "Browse the complete FashionFunks clothing edit for women, men, unisex, kids and babies.",
};

export default function ShopPage() {
  return <Suspense fallback={<div className="container page-loading"><div className="skeleton skeleton--title" /></div>}><ShopClient /></Suspense>;
}
