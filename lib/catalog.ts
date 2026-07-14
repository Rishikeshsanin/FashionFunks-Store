import { products } from "@/data/products";
import type { Category, Product, SortOption } from "@/types/catalog";

export type CatalogFilters = {
  query?: string;
  category?: Category;
  subcategory?: string;
  size?: string;
  color?: string;
  availability?: "in-stock" | "out-of-stock";
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  sort?: SortOption;
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getDiscountPercentage(product: Product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
}

function normalise(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function includesQuery(product: Product, query: string) {
  const needle = normalise(query);
  const haystack = normalise(
    [product.name, product.category, product.subcategory, product.colors.join(" "), product.description].join(" "),
  );
  if (haystack.includes(needle)) return true;
  const queryWords = needle.split(" ").filter(Boolean);
  return queryWords.every((word) => haystack.includes(word) || fuzzyWordMatch(haystack, word));
}

function fuzzyWordMatch(haystack: string, needle: string) {
  if (needle.length < 4) return false;
  const words = haystack.split(" ");
  return words.some((word) => levenshtein(word, needle) <= 1);
}

function levenshtein(a: string, b: string) {
  const rows = Array.from({ length: b.length + 1 }, (_, row) => [row]);
  for (let column = 0; column <= a.length; column += 1) rows[0][column] = column;
  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      rows[row][column] = b[row - 1] === a[column - 1]
        ? rows[row - 1][column - 1]
        : Math.min(rows[row - 1][column - 1], rows[row][column - 1], rows[row - 1][column]) + 1;
    }
  }
  return rows[b.length][a.length];
}

export function filterProducts(filters: CatalogFilters) {
  const filtered = products.filter((product) => {
    if (filters.query && !includesQuery(product, filters.query)) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
    if (filters.size && !product.sizes.includes(filters.size)) return false;
    if (filters.color && !product.colors.includes(filters.color)) return false;
    if (filters.availability === "in-stock" && product.stock === 0) return false;
    if (filters.availability === "out-of-stock" && product.stock > 0) return false;
    if (typeof filters.minPrice === "number" && product.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && product.price > filters.maxPrice) return false;
    if (filters.minRating && product.rating < filters.minRating) return false;
    if (filters.minDiscount && getDiscountPercentage(product) < filters.minDiscount) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    }
  });
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
    .sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory))
    .slice(0, limit);
}

export function getCatalogFacets() {
  return {
    subcategories: [...new Set(products.map((product) => product.subcategory))].sort(),
    sizes: [...new Set(products.flatMap((product) => product.sizes))],
    colors: [...new Set(products.flatMap((product) => product.colors))].sort(),
  };
}
