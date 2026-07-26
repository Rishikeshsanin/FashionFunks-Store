"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/logo";
import { formatMoney } from "@/lib/money";
import type { OrderRecord } from "@/types/order";

function uniqueOrders(orders: OrderRecord[]) {
  return orders.filter((order, index) => orders.findIndex((candidate) => candidate.id === order.id) === index);
}

export function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);

  useEffect(() => {
    try {
      const history = JSON.parse(window.localStorage.getItem("fashionfunks-orders-v1") ?? "[]") as OrderRecord[];
      const latest = JSON.parse(window.localStorage.getItem("fashionfunks-last-order-v2") ?? "null") as OrderRecord | null;
      setOrders(uniqueOrders(latest ? [latest, ...history] : history));
    } catch {
      setOrders([]);
    }
  }, []);

  if (orders === null) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;

  return (
    <div className="orders-page container">
      <header className="orders-hero">
        <div><span className="eyebrow">Your order history</span><h1>Your orders.</h1><p>Review your recent FashionFunks orders and confirmation details in one place.</p></div>
        <LogoMark className="orders-hero__mark" />
      </header>
      {orders.length ? (
        <div className="orders-list">
          <div className="orders-list__head"><span>Order</span><span>Date</span><span>Pieces</span><span>Total</span></div>
          {orders.map((order) => (
            <article key={order.id}>
              <strong>{order.id}</strong>
              <span>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(order.createdAt))}</span>
              <span>{order.itemCount} piece{order.itemCount === 1 ? "" : "s"}</span>
              <strong>{formatMoney(order.total)}</strong>
            </article>
          ))}
        </div>
      ) : (
        <section className="orders-empty">
          <span>00</span><h2>No orders yet.</h2><p>When you place one, its confirmation will appear here.</p><Link className="button button--primary" href="/shop">Explore the collection</Link>
        </section>
      )}
    </div>
  );
}
