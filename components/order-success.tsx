"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { formatMoney } from "@/lib/money";
import type { OrderRecord } from "@/types/order";

export function OrderSuccess() {
  const [order, setOrder] = useState<OrderRecord | null | undefined>(undefined);
  useEffect(() => {
    try { setOrder(JSON.parse(window.localStorage.getItem("fashionfunks-last-order-v2") ?? "null")); } catch { setOrder(null); }
  }, []);
  if (order === undefined) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;
  if (!order) return <div className="page-shell checkout-empty"><span className="eyebrow">No recent order</span><h1>Ready when you are.</h1><p>Your latest order confirmation will appear here.</p><Link className="button button--primary" href="/shop">Start shopping</Link></div>;
  return (
    <section className="order-success">
      <div className="order-success__burst"><span><CheckIcon /></span></div>
      <span className="eyebrow">Order placed</span>
      <h1>It’s officially<br />on the list.</h1>
      <p>Thanks, {order.name}. Your order is confirmed and officially on the list.</p>
      <div className="order-ticket"><div><span>Order</span><strong>{order.id}</strong></div><div><span>Pieces</span><strong>{order.itemCount}</strong></div><div><span>Total</span><strong>{formatMoney(order.total)}</strong></div></div>
      <p className="order-success__email">Order updates are connected to <strong>{order.email}</strong>. We won’t spam you.</p>
      <div className="button-row"><Link className="button button--primary" href="/shop">Keep exploring</Link><Link className="button button--outline" href="/">Back home</Link></div>
    </section>
  );
}
