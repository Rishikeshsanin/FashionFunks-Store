"use client";

import { EmptyState } from "@/components/empty-state";
import { ProductGrid } from "@/components/product-grid";
import { useStore } from "@/components/providers";
import { products } from "@/data/products";

export function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));
  if (!hydrated) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;
  if (!saved.length) return <div className="page-shell"><EmptyState eyebrow="Save it for later" title="Your wishlist is wide open." copy="Tap the heart on any piece and it will wait for you here." /></div>;
  return <div className="container wishlist-page"><header className="page-title"><span className="eyebrow">Your shortlist</span><h1>Wishlist <sup>{saved.length}</sup></h1><p>Saved in this browser, ready whenever the mood returns.</p></header><ProductGrid products={saved} priorityCount={4} /></div>;
}
