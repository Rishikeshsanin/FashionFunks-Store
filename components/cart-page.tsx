"use client";

import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useStore } from "@/components/providers";
import { formatMoney } from "@/lib/money";
import { calculateOrder, FREE_DELIVERY_THRESHOLD, ORDER_DISCOUNT_THRESHOLD } from "@/lib/pricing";

export function CartPage() {
  const { cart, hydrated, subtotal, updateQuantity, removeFromCart } = useStore();
  const totals = calculateOrder(subtotal);

  if (!hydrated) return <div className="container page-loading"><div className="skeleton skeleton--title" /></div>;
  if (!cart.length) return <div className="page-shell"><EmptyState eyebrow="Your bag is ready when you are" title="Nothing in the bag. Yet." copy="Start with the newest edit, then choose the pieces that feel most like you." /></div>;

  return (
    <div className="container checkout-shell">
      <header className="page-title"><span className="eyebrow">Your edit</span><h1>Shopping bag <sup>{cart.reduce((total, item) => total + item.quantity, 0)}</sup></h1></header>
      <div className="cart-layout">
        <section className="cart-lines" aria-label="Shopping bag items">
          {cart.map((line) => (
            <article className="cart-line" key={`${line.productId}-${line.size}-${line.color}`}>
              <Link className="cart-line__image" href={`/product/${line.product.slug}`}><Image src={line.product.image} alt={line.product.imageAlt} fill sizes="180px" /></Link>
              <div className="cart-line__body">
                <div><span className="eyebrow">{line.product.category} / {line.product.subcategory}</span><Link href={`/product/${line.product.slug}`}><h2>{line.product.name}</h2></Link><p>{line.color} · Size {line.size}</p></div>
                <div className="cart-line__bottom">
                  <div className="quantity-control" aria-label={`Quantity for ${line.product.name}`}><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(line, line.quantity - 1)}><MinusIcon /></button><span>{line.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(line, line.quantity + 1)}><PlusIcon /></button></div>
                  <strong>{formatMoney(line.product.price * line.quantity)}</strong>
                </div>
              </div>
              <button className="cart-line__remove" type="button" aria-label={`Remove ${line.product.name}`} onClick={() => removeFromCart(line)}><TrashIcon /></button>
            </article>
          ))}
          <Link className="arrow-link" href="/shop">← Continue shopping</Link>
        </section>
        <aside className="order-summary">
          <span className="eyebrow">Order summary</span><h2>Today’s total</h2>
          {totals.amountUntilFreeDelivery > 0 ? <p className="delivery-progress">Add <strong>{formatMoney(totals.amountUntilFreeDelivery)}</strong> for free delivery.</p> : <p className="delivery-progress delivery-progress--done">✓ You unlocked free delivery.</p>}
          <div className="progress-track"><span style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }} /></div>
          <dl className="summary-lines"><div><dt>Subtotal</dt><dd>{formatMoney(totals.subtotal)}</dd></div>{totals.discount > 0 && <div className="discount-line"><dt>Order discount (5%)</dt><dd>−{formatMoney(totals.discount)}</dd></div>}<div><dt>Delivery</dt><dd>{totals.delivery ? formatMoney(totals.delivery) : "Free"}</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatMoney(totals.total)}</dd></div></dl>
          {subtotal <= ORDER_DISCOUNT_THRESHOLD && <p className="summary-offer">Spend over {formatMoney(ORDER_DISCOUNT_THRESHOLD)} to unlock 5% off your order.</p>}
          <Link className="button button--primary button--wide" href="/checkout">Continue to checkout</Link>
          <p className="secure-note">Demo checkout · No card or address needed</p>
        </aside>
      </div>
    </div>
  );
}
