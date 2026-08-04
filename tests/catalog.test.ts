import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { products } from "@/data/products";
import { filterProducts, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { categories } from "@/types/catalog";

describe("catalog", () => {
  it("contains 51 pieces across every agreed category", () => {
    expect(products).toHaveLength(51);
    for (const category of categories) expect(products.some((product) => product.category === category)).toBe(true);
  });

  it("uses unique stable identities and valid local images", () => {
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
    for (const product of products) {
      expect(existsSync(join(process.cwd(), "public", product.image))).toBe(true);
    }
  });

  it("surfaces the kids fandom dress without duplicating its product record", () => {
    const fandomResults = filterProducts({ category: "Fandom Edit" });
    expect(fandomResults.some((product) => product.slug === "spark-tutu-dress")).toBe(true);
    expect(products.filter((product) => product.slug === "spark-tutu-dress")).toHaveLength(1);
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
