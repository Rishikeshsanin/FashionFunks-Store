import type { Metadata } from "next";
import { WishlistPage } from "@/components/wishlist-page";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };
export default function Page() { return <WishlistPage />; }
