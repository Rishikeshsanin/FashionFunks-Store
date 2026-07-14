import type { Metadata } from "next";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false, follow: false } };
export default function Page() { return <OrderSuccess />; }
