"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { filterProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { categories } from "@/types/catalog";
import { useDialogFocus } from "@/components/use-dialog-focus";

const TRENDING = ["Oxford shirt", "Cobalt", "Heavyweight tee", "Dress"];
const RECENT_KEY = "fashionfunks-recent-searches-v2";

function readRecentSearches() {
  try { return JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]") as string[]; }
  catch { return []; }
}

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const titleId = useId();
  const listId = useId();
  useDialogFocus(open, dialogRef, onClose, inputRef);

  useEffect(() => {
    if (open) {
      setRecent(readRecentSearches());
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      setQuery("");
      setActiveIndex(-1);
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  const cleanQuery = query.trim();
  const categoryMatches = useMemo(() => {
    const value = cleanQuery.toLocaleLowerCase();
    if (!value) return [];
    return categories.filter((category) => category.toLocaleLowerCase().includes(value)).slice(0, 2);
  }, [cleanQuery]);
  const suggestions = useMemo(() => cleanQuery ? filterProducts({ query: cleanQuery }).slice(0, 5) : [], [cleanQuery]);
  const results = useMemo(() => [
    ...categoryMatches.map((category) => ({ href: `/shop?category=${encodeURIComponent(category)}`, label: `${category} collection` })),
    ...suggestions.map((product) => ({ href: `/product/${product.slug}`, label: product.name })),
    ...(cleanQuery ? [{ href: `/shop?q=${encodeURIComponent(cleanQuery)}`, label: `All results for ${cleanQuery}` }] : []),
  ], [categoryMatches, suggestions, cleanQuery]);

  function remember(term: string) {
    const value = term.trim();
    if (!value) return;
    const next = [value, ...readRecentSearches().filter((item) => item.toLocaleLowerCase() !== value.toLocaleLowerCase())].slice(0, 5);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setRecent(next);
  }

  function navigate(href: string, term = cleanQuery) {
    remember(term);
    onClose();
    router.push(href);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cleanQuery) return;
    navigate(`/shop?q=${encodeURIComponent(cleanQuery)}`);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + direction + results.length) % results.length);
    }
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      navigate(results[activeIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className="drawer-shell" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className="search-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="search-drawer__head">
          <div><span className="v3-eyebrow">Search FashionFunks</span><h2 id={titleId}>Find the piece.</h2><p>Search names, categories, colours and styles.</p></div>
          <button className="icon-button" type="button" aria-label="Close search" onClick={onClose}><CloseIcon /></button>
        </div>
        <form className="search-box" onSubmit={submit}>
          <SearchIcon />
          <input ref={inputRef} name="q" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(-1); }} onKeyDown={handleInputKeyDown} placeholder="Try “shirt”, “cobalt” or “dress”" autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={Boolean(cleanQuery)} aria-controls={listId} aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined} />
          {query && <button className="search-box__clear" type="button" aria-label="Clear search" onClick={() => { setQuery(""); setActiveIndex(-1); inputRef.current?.focus(); }}><CloseIcon /></button>}
          <button className="search-box__submit" type="submit"><span>Search</span><ArrowIcon /></button>
        </form>
        {!cleanQuery && (
          <div className="search-discovery">
            {recent.length > 0 && <div className="search-trending"><div className="search-subhead"><p>Recent</p><button type="button" onClick={() => { window.localStorage.removeItem(RECENT_KEY); setRecent([]); }}>Clear</button></div><div className="chip-row">{recent.map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div></div>}
            <div className="search-trending"><p>Popular searches</p><div className="chip-row">{TRENDING.map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div></div>
          </div>
        )}
        {cleanQuery && (
          <div className="search-results" id={listId} role="listbox" aria-label="Search suggestions" aria-live="polite">
            <div className="search-results__label">{suggestions.length || categoryMatches.length ? "Best matches" : "No quick matches"}</div>
            {categoryMatches.map((category, index) => <Link id={`${listId}-${index}`} role="option" aria-selected={activeIndex === index} className={`search-category-match${activeIndex === index ? " active" : ""}`} key={category} href={`/shop?category=${encodeURIComponent(category)}`} onMouseEnter={() => setActiveIndex(index)} onClick={(event) => { event.preventDefault(); navigate(`/shop?category=${encodeURIComponent(category)}`, category); }}><span><small>Collection</small><strong>{category}</strong></span><span aria-hidden="true">↗</span></Link>)}
            {suggestions.map((product, productIndex) => {
              const index = categoryMatches.length + productIndex;
              return <Link id={`${listId}-${index}`} role="option" aria-selected={activeIndex === index} className={`v3-search-product${activeIndex === index ? " active" : ""}`} key={product.id} href={`/product/${product.slug}`} onMouseEnter={() => setActiveIndex(index)} onClick={(event) => { event.preventDefault(); navigate(`/product/${product.slug}`); }}>
                <span className="v3-search-product__image"><Image src={product.image} alt="" fill quality={85} sizes="62px" /></span>
                <span><strong>{product.name}</strong><small>{product.category} · {product.subcategory}</small></span>
                <strong>{formatMoney(product.price)}</strong>
              </Link>;
            })}
            <Link id={`${listId}-${results.length - 1}`} role="option" aria-selected={activeIndex === results.length - 1} className={`search-all${activeIndex === results.length - 1 ? " active" : ""}`} href={`/shop?q=${encodeURIComponent(cleanQuery)}`} onMouseEnter={() => setActiveIndex(results.length - 1)} onClick={(event) => { event.preventDefault(); navigate(`/shop?q=${encodeURIComponent(cleanQuery)}`); }}>See all results <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>
    </div>
  );
}