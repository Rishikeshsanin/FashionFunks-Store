"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";
import { useStore } from "@/components/providers";
import { formatMoney } from "@/lib/money";
import { calculateOrder } from "@/lib/pricing";

const ORDER_KEY = "fashionfunks-last-order-v2";
const ORDER_HISTORY_KEY = "fashionfunks-orders-v1";

export type DemoOrder = { id: string; name: string; email: string; createdAt: string; total: number; itemCount: number };

export function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, user, clearCart, hydrated } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const totals = calculateOrder(subtotal);

  useEffect(() => { if (user) { setName(user.name); setEmail(user.email); } }, [user]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length) return;
    setSubmitting(true);
    const order: DemoOrder = {
      id: `FF${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
      total: totals.total,
      itemCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    };
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    if (user) {
      const history = JSON.parse(window.localStorage.getItem(ORDER_HISTORY_KEY) ?? "[]") as DemoOrder[];
      window.localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([order, ...history].slice(0, 20)));
    }
    window.setTimeout(() => { clearCart(); router.push("/order-success"); }, 650);
  }

  if (!hydrated) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;
  if (!cart.length) return <div className="page-shell checkout-empty"><span className="eyebrow">Nothing to check out</span><h1>Your bag is empty.</h1><p>Add a piece before placing a demo order.</p><Link className="button button--primary" href="/shop">Shop new arrivals</Link></div>;

  return (
    <div className="checkout-page">
      <div className="container checkout-page__head"><Link href="/cart">← Back to bag</Link><span>Secure demo checkout</span></div>
      <div className="container checkout-grid">
        <form className="checkout-form" onSubmit={submit}>
          <span className="eyebrow">Almost yours</span><h1>Place your order</h1><p className="checkout-form__intro">No address or payment details are needed for this portfolio checkout.</p>
          <div className="checkout-step"><span>1</span><div><h2>Your details</h2><p>Only enough to personalise the confirmation.</p></div></div>
          <label className="form-field"><span>Name</span><input value={name} onChange={(event) => setName(event.target.value)} minLength={2} autoComplete="name" placeholder="Your name" required /></label>
          <label className="form-field"><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required /><small>We only use your email for this order. We do not send spam.</small></label>
          <div className="checkout-step checkout-step--last"><span><CheckIcon /></span><div><h2>No payment required</h2><p>This is a realistic demo flow. Clicking below creates a confirmation only.</p></div></div>
          <label className="confirm-check"><input type="checkbox" required /><span>I understand this is a demo order and no purchase will be made.</span></label>
          <button className="button button--primary button--wide button--large" type="submit" disabled={submitting}>{submitting ? "Placing your order…" : `Place demo order · ${formatMoney(totals.total)}`}</button>
        </form>
        <aside className="checkout-summary">
          <div className="checkout-summary__head"><h2>Your order</h2><Link href="/cart">Edit bag</Link></div>
          <div className="checkout-mini-lines">{cart.map((line) => <div key={`${line.productId}-${line.size}-${line.color}`}><div><Image src={line.product.image} alt="" fill sizes="72px" /><span>{line.quantity}</span></div><p><strong>{line.product.name}</strong><small>{line.color} · {line.size}</small></p><b>{formatMoney(line.product.price * line.quantity)}</b></div>)}</div>
          <dl className="summary-lines"><div><dt>Subtotal</dt><dd>{formatMoney(totals.subtotal)}</dd></div>{totals.discount > 0 && <div className="discount-line"><dt>5% order discount</dt><dd>−{formatMoney(totals.discount)}</dd></div>}<div><dt>Delivery</dt><dd>{totals.delivery ? formatMoney(totals.delivery) : "Free"}</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatMoney(totals.total)}</dd></div></dl>
        </aside>
      </div>
    </div>
  );
}
