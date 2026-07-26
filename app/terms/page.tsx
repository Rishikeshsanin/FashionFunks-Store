import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms" };
export default function Page() { return <InfoPage eyebrow="Store terms" title="Terms of use." intro="Clear terms for using FashionFunks and placing an order."><InfoSection title="Orders"><p>Product prices, ratings and availability are shown at the time you browse. An order is confirmed after the final checkout action; no card information is requested by the current checkout.</p></InfoSection><InfoSection title="Content"><p>FashionFunks brand elements, interface design and catalog copy belong to their respective owners. Product imagery may not be reused without permission.</p></InfoSection><InfoSection title="Availability"><p>Products and features may change as the collection evolves. We may update these terms to reflect improvements to ordering, delivery or account services.</p></InfoSection></InfoPage>; }
