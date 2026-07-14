"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@/components/icons";
import { useStore } from "@/components/providers";
import type { Product } from "@/types/catalog";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]);
  const [error, setError] = useState("");
  const wished = wishlist.includes(product.id);

  function add() {
    if (!size) {
      setError("Choose a size before adding this piece.");
      return;
    }
    setError("");
    addToCart(product, size, color);
  }

  return (
    <div className="purchase-panel">
      <fieldset className="option-group">
        <legend><span>Colour</span><strong>{color}</strong></legend>
        <div className="color-options">{product.colors.map((item) => <button key={item} className={color === item ? "active" : ""} type="button" onClick={() => setColor(item)} aria-label={`Choose ${item}`}><i style={{ background: colorSwatch(item) }} /><span>{item}</span></button>)}</div>
      </fieldset>
      <fieldset className="option-group">
        <legend><span>Choose size</span><Link href="/size-guide">Size guide</Link></legend>
        <div className="product-size-grid">{product.sizes.map((item) => <button key={item} className={size === item ? "active" : ""} type="button" onClick={() => { setSize(item); setError(""); }}>{item}</button>)}</div>
        <p className="field-error" aria-live="polite">{error}</p>
      </fieldset>
      <div className="purchase-actions">
        <button className="button button--primary" type="button" disabled={product.stock === 0} onClick={add}>{product.stock === 0 ? "Currently sold out" : "Add to bag"}</button>
        <button className={`button button--wishlist${wished ? " active" : ""}`} type="button" aria-label={`${wished ? "Remove from" : "Add to"} wishlist`} onClick={() => toggleWishlist(product.id)}><HeartIcon filled={wished} /></button>
      </div>
      {product.stock > 0 && product.stock <= 8 && <p className="stock-note"><span />Only {product.stock} left across all sizes</p>}
      <div className="purchase-benefits"><p><span>↗</span><strong>Free delivery over ₹1,999</strong><small>Across India, usually 3–6 working days</small></p><p><span>◌</span><strong>Easy 15-day returns</strong><small>Simple returns on unworn pieces</small></p></div>
    </div>
  );
}

function colorSwatch(name: string) {
  const colors: Record<string, string> = { Cobalt: "#1744d1", Blue: "#3457ad", Sky: "#a9cfed", White: "#f8f6ef", Black: "#171717", Ink: "#1f2533", Rouge: "#d7333f", Lilac: "#b9a5df", Cream: "#e9deca", Ivory: "#ede8dc", Stone: "#aaa393", Sand: "#c7ad83", Olive: "#687056", Grey: "#898989", Navy: "#28344e", Oat: "#d7c9ac", Blush: "#e2b7b1", Rose: "#d2939d", Coral: "#e37c69", Sage: "#91a28a", Red: "#dc3d46", Wine: "#752d3b", Azure: "#3c79d8", Powder: "#bfcce0", Charcoal: "#474747", Taupe: "#978574", Khaki: "#a59875", Tobacco: "#9b6543", "Mid Blue": "#557aa0", "Blue Stripe": "linear-gradient(90deg,#e8e5dc 0 40%,#4f79a5 40% 60%,#e8e5dc 60%)", "Navy Stripe": "linear-gradient(90deg,#eee 0 40%,#28344e 40% 60%,#eee 60%)" };
  return colors[name] ?? "#bbb";
}
