"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { filterProducts, getCatalogFacets, type CatalogFilters } from "@/lib/catalog";
import { categories, type Category, type SortOption } from "@/types/catalog";
import { products as allProducts } from "@/data/products";

const PAGE_SIZE = 12;

function numberParam(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function ShopClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const facets = useMemo(() => getCatalogFacets(), []);
  const paramsKey = searchParams.toString();

  const filters = useMemo<CatalogFilters>(() => {
    const categoryValue = searchParams.get("category");
    return {
      query: searchParams.get("q") || undefined,
      category: categories.includes(categoryValue as Category) ? categoryValue as Category : undefined,
      subcategory: searchParams.get("subcategory") || undefined,
      size: searchParams.get("size") || undefined,
      color: searchParams.get("color") || undefined,
      availability: searchParams.get("availability") as CatalogFilters["availability"] || undefined,
      minPrice: numberParam(searchParams.get("minPrice")),
      maxPrice: numberParam(searchParams.get("maxPrice")),
      minRating: numberParam(searchParams.get("rating")),
      minDiscount: numberParam(searchParams.get("discount")),
      sort: (searchParams.get("sort") as SortOption) || "newest",
    };
  }, [searchParams]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [paramsKey]);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", filtersOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [filtersOpen]);

  const matches = useMemo(() => filterProducts(filters), [filters]);
  const visible = matches.slice(0, visibleCount);
  const activeCount = [...searchParams.keys()].filter((key) => key !== "sort").length;
  const categoryTitle = filters.category ?? (filters.query ? `Results for “${filters.query}”` : "New in");
  const subcategories = [...new Set(allProducts.filter((product) => !filters.category || product.category === filters.category).map((product) => product.subcategory))].sort();

  function updateParam(name: string, value?: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(name, value); else next.delete(name);
    if (name === "category") next.delete("subcategory");
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  function clearFilters() {
    const sort = searchParams.get("sort");
    router.replace(`${pathname}${sort ? `?sort=${sort}` : ""}`, { scroll: false });
  }

  const filterPanel = (
    <div className="filter-panel">
      <div className="filter-panel__mobile-head"><strong>Filter the edit</strong><button type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><CloseIcon /></button></div>
      <FilterGroup title="Category">
        <label className="check-row"><input type="radio" name="category" checked={!filters.category} onChange={() => updateParam("category")} /><span>All clothing</span><small>{allProducts.length}</small></label>
        {categories.map((category) => <label className="check-row" key={category}><input type="radio" name="category" checked={filters.category === category} onChange={() => updateParam("category", category)} /><span>{category}</span><small>{allProducts.filter((product) => product.category === category).length}</small></label>)}
      </FilterGroup>
      <FilterGroup title="Type">
        {subcategories.map((subcategory) => <label className="check-row" key={subcategory}><input type="radio" name="subcategory" checked={filters.subcategory === subcategory} onChange={() => updateParam("subcategory", filters.subcategory === subcategory ? undefined : subcategory)} /><span>{subcategory}</span></label>)}
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="filter-size-grid">{facets.sizes.map((size) => <button className={filters.size === size ? "active" : ""} type="button" key={size} onClick={() => updateParam("size", filters.size === size ? undefined : size)}>{size}</button>)}</div>
      </FilterGroup>
      <FilterGroup title="Colour">
        <select className="field-select" value={filters.color ?? ""} onChange={(event) => updateParam("color", event.target.value || undefined)}><option value="">All colours</option>{facets.colors.map((color) => <option key={color}>{color}</option>)}</select>
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="price-fields"><label><span>Min ₹</span><input inputMode="numeric" value={filters.minPrice ?? ""} onChange={(event) => updateParam("minPrice", event.target.value || undefined)} /></label><label><span>Max ₹</span><input inputMode="numeric" value={filters.maxPrice ?? ""} onChange={(event) => updateParam("maxPrice", event.target.value || undefined)} /></label></div>
      </FilterGroup>
      <FilterGroup title="More">
        <label className="check-row"><input type="checkbox" checked={filters.availability === "in-stock"} onChange={(event) => updateParam("availability", event.target.checked ? "in-stock" : undefined)} /><span>In stock only</span></label>
        <label className="check-row"><input type="checkbox" checked={filters.minRating === 4.5} onChange={(event) => updateParam("rating", event.target.checked ? "4.5" : undefined)} /><span>Rated 4.5+</span></label>
        <label className="check-row"><input type="checkbox" checked={filters.minDiscount === 10} onChange={(event) => updateParam("discount", event.target.checked ? "10" : undefined)} /><span>10% off or more</span></label>
      </FilterGroup>
      {activeCount > 0 && <button className="text-button" type="button" onClick={clearFilters}>Clear all filters</button>}
      <button className="button button--primary filter-apply" type="button" onClick={() => setFiltersOpen(false)}>Show {matches.length} pieces</button>
    </div>
  );

  return (
    <>
      <header className="shop-hero">
        <div className="container">
          <span className="eyebrow">The complete edit</span>
          <div><h1>{categoryTitle}</h1><p>Considered clothing, expressive colour and easy shapes for real wardrobes.</p></div>
          <nav className="category-pills" aria-label="Shop categories">
            <button className={!filters.category ? "active" : ""} onClick={() => updateParam("category")} type="button">All</button>
            {categories.map((category) => <button className={filters.category === category ? "active" : ""} onClick={() => updateParam("category", category)} type="button" key={category}>{category}</button>)}
          </nav>
        </div>
      </header>
      <div className="container shop-toolbar">
        <div aria-live="polite"><strong>{matches.length}</strong> pieces</div>
        <div>
          <button className="filter-trigger" type="button" onClick={() => setFiltersOpen(true)}>Filters{activeCount > 0 && <span>{activeCount}</span>}</button>
          <label className="sort-field"><span>Sort by</span><select value={filters.sort} onChange={(event) => updateParam("sort", event.target.value)}><option value="newest">Newest first</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronIcon /></label>
        </div>
      </div>
      <div className="container shop-layout">
        <aside className="shop-sidebar" aria-label="Product filters">{filterPanel}</aside>
        <section className="shop-results" aria-label="Products">
          {visible.length ? (
            <>
              <ProductGrid products={visible} priorityCount={4} />
              {visibleCount < matches.length && <div className="show-more"><p>Showing {visible.length} of {matches.length}</p><button className="button button--outline" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show more</button></div>}
            </>
          ) : (
            <div className="catalog-empty"><SearchIcon /><h2>No pieces match this edit.</h2><p>Try clearing one or two filters — your next favourite may be close.</p><button className="button button--primary" type="button" onClick={clearFilters}>Clear filters</button></div>
          )}
        </section>
      </div>
      {filtersOpen && <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Product filters" onMouseDown={(event) => event.target === event.currentTarget && setFiltersOpen(false)}>{filterPanel}</div>}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="filter-group" open><summary>{title}<ChevronIcon /></summary><div className="filter-group__content">{children}</div></details>;
}
