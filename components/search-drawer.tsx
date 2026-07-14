"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import { CloseIcon, SearchIcon } from "@/components/icons";

const TRENDING = ["Cobalt", "Overshirt", "Unisex tee", "Occasion dress"];

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      setQuery("");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.subcategory}`.toLowerCase().includes(value),
    ).slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="drawer-shell" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="search-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="search-drawer__head">
          <div>
            <span className="eyebrow">Find your next repeat</span>
            <h2 id={titleId}>Search FashionFunks</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close search" onClick={onClose}><CloseIcon /></button>
        </div>
        <form className="search-box" action="/shop" onSubmit={onClose}>
          <SearchIcon />
          <input ref={inputRef} name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘blue shirt’ or ‘unisex’" autoComplete="off" />
          <button type="submit">Search</button>
        </form>
        {!query && (
          <div className="search-trending">
            <p>Trending now</p>
            <div className="chip-row">{TRENDING.map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div>
          </div>
        )}
        {query && (
          <div className="search-results" aria-live="polite">
            <div className="search-results__label">{suggestions.length ? "Top matches" : "No quick matches"}</div>
            {suggestions.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} onClick={onClose}>
                <span><strong>{product.name}</strong><small>{product.category} · {product.subcategory}</small></span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link className="search-all" href={`/shop?q=${encodeURIComponent(query)}`} onClick={onClose}>See all search results</Link>
          </div>
        )}
      </section>
    </div>
  );
}
