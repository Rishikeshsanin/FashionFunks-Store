export const categories = ["Women", "Men", "Unisex", "Kids", "Babies"] as const;

export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  colors: string[];
  sizes: string[];
  fabric: string;
  fit: string;
  care: string;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type CartLineWithProduct = CartLine & { product: Product };

export type SortOption = "newest" | "price-low" | "price-high" | "rating";
