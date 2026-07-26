import type { Category } from "@/types/catalog";

type CatalogHeroCopy = {
  eyebrow: string;
  description: string;
};

export const defaultCatalogCopy: CatalogHeroCopy = {
  eyebrow: "The complete edit",
  description: "Fresh silhouettes, expressive colour and the pieces about to become everyday favourites.",
};

export const categoryCatalogCopy: Record<Category, CatalogHeroCopy> = {
  Women: {
    eyebrow: "The women’s edit",
    description: "Considered shapes, confident colour and everyday pieces designed to move with you.",
  },
  Men: {
    eyebrow: "The men’s edit",
    description: "Clean construction, relaxed proportions and dependable pieces with a clear point of view.",
  },
  Unisex: {
    eyebrow: "Style without labels",
    description: "Thoughtful clothing beyond labels, made for individual style and everyday expression.",
  },
  Kids: {
    eyebrow: "Made for every adventure",
    description: "Comfortable shapes, playful colour and durable pieces made to keep up.",
  },
  Babies: {
    eyebrow: "Little pieces, thoughtfully made",
    description: "Soft, comfortable essentials designed for little movements and everyday ease.",
  },
};
