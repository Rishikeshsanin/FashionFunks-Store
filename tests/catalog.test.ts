import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { filterProducts, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { categories } from "@/types/catalog";

describe("catalog", () => {
  it("contains 50 pieces across every agreed category", () => {
    expect(products).toHaveLength(50);
    for (const category of categories) expect(products.some((product) => product.category === category)).toBe(true);
  });

  it("filters by category and availability", () => {
    const results = filterProducts({ category: "Men", availability: "in-stock" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.category === "Men" && product.stock > 0)).toBe(true);
  });

  it("handles a practical one-character typo", () => {
    expect(filterProducts({ query: "oxforf" }).some((product) => product.slug === "oxford-ease-shirt")).toBe(true);
  });

  it("never includes the current item in related products", () => {
    const product = getProductBySlug("cobalt-poplin-top");
    expect(product).toBeDefined();
    expect(getRelatedProducts(product!).every((candidate) => candidate.id !== product!.id)).toBe(true);
  });
});
