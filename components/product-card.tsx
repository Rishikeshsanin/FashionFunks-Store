"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon, PlusIcon } from "@/components/icons";
import { useStore } from "@/components/providers";
import { getDiscountPercentage } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/types/catalog";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const discount = getDiscountPercentage(product);
  const wished = wishlist.includes(product.id);

  function chooseSize(size: string) {
    addToCart(product, size, selectedColor);
    setPickerOpen(false);
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" priority={priority} loading={priority ? "eager" : "lazy"} />
        </Link>
        <div className="product-card__badges">
          {product.badge && <span>{product.badge}</span>}
          {discount > 0 && <span className="sale-badge">−{discount}%</span>}
        </div>
        <button className={`wishlist-button${wished ? " wishlist-button--active" : ""}`} type="button" aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`} onClick={() => toggleWishlist(product.id)}>
          <HeartIcon filled={wished} />
        </button>
        <button className="quick-add-button" type="button" disabled={product.stock === 0} onClick={() => setPickerOpen((value) => !value)} aria-expanded={pickerOpen}>
          <PlusIcon />{product.stock === 0 ? "Sold out" : "Quick add"}
        </button>
        {pickerOpen && (
          <div className="quick-picker">
            <div className="quick-picker__top"><span>Choose a size</span><button type="button" onClick={() => setPickerOpen(false)}>Close</button></div>
            {product.colors.length > 1 && (
              <label>Colour<select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>{product.colors.map((color) => <option key={color}>{color}</option>)}</select></label>
            )}
            <div className="size-grid">{product.sizes.map((size) => <button key={size} type="button" onClick={() => chooseSize(size)}>{size}</button>)}</div>
          </div>
        )}
      </div>
      <div className="product-card__info">
        <div className="product-card__meta"><span>{product.category} · {product.subcategory}</span><span>★ {product.rating}</span></div>
        <Link className="product-card__name" href={`/product/${product.slug}`}>{product.name}</Link>
        <div className="price-row"><strong>{formatMoney(product.price)}</strong>{product.compareAtPrice && <s>{formatMoney(product.compareAtPrice)}</s>}</div>
        {product.stock > 0 && product.stock <= 8 && <span className="low-stock">Only {product.stock} left</span>}
      </div>
    </article>
  );
}
