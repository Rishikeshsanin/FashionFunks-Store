"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DemoOrder } from "@/components/checkout-page";
import { CheckIcon } from "@/components/icons";
import { formatMoney } from "@/lib/money";

export function OrderSuccess() {
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);
  useEffect(() => {
    try { setOrder(JSON.parse(window.localStorage.getItem("fashionfunks-last-order-v2") ?? "null")); } catch { setOrder(null); }
  }, []);
  if (order === undefined) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;
  if (!order) return <div className="page-shell checkout-empty"><span className="eyebrow">No recent order</span><h1>Ready when you are.</h1><p>Your latest demo order confirmation will appear here.</p><Link className="button button--primary" href="/shop">Start shopping</Link></div>;
  return (
    <section className="order-success">
      <div className="order-success__burst"><span><CheckIcon /></span></div>
      <span className="eyebrow">Order placed</span>
      <h1>It’s officially<br />on the list.</h1>
      <p>Thanks, {order.name}. Your demo order is confirmed — no money was charged and nothing will be shipped.</p>
      <div className="order-ticket"><div><span>Order</span><strong>{order.id}</strong></div><div><span>Pieces</span><strong>{order.itemCount}</strong></div><div><span>Demo total</span><strong>{formatMoney(order.total)}</strong></div></div>
      <p className="order-success__email">A real store would send updates to <strong>{order.email}</strong>. We won’t email or spam you.</p>
      <div className="button-row"><Link className="button button--primary" href="/shop">Keep exploring</Link><Link className="button button--outline" href="/">Back home</Link></div>
    </section>
  );
}
