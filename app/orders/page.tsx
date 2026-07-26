import type { Metadata } from "next";
import { OrdersPage } from "@/components/orders-page";

export const metadata: Metadata = {
  title: "Your orders",
  description: "View your recent FashionFunks orders and confirmation details.",
};

export default function OrdersRoute() {
  return <OrdersPage />;
}
