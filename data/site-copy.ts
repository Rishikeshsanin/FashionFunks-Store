import type { Category } from "@/types/catalog";

type CatalogHeroCopy = {
  eyebrow: string;
  descriptions: readonly string[];
};

export const defaultCatalogCopy: CatalogHeroCopy = {
  eyebrow: "The complete edit",
  descriptions: [
    "Fresh arrivals with modern shape, considered colour and repeat-wear potential.",
    "New silhouettes, useful layers and pieces ready for the week ahead.",
    "The latest shirts, separates and outerwear, chosen for easy styling.",
    "Recently added pieces with clean lines, thoughtful detail and lasting appeal.",
  ],
};

export const categoryCatalogCopy: Record<Category, CatalogHeroCopy> = {
  Women: {
    eyebrow: "The women’s edit",
    descriptions: [
      "Considered shapes, confident colour and everyday pieces designed to move with you.",
      "Modern tailoring, easy layers and confident colour for workdays and weekends.",
      "Refined essentials with comfortable fits and details that earn repeat wear.",
      "Dresses, separates and layers balanced for polish, comfort and versatility.",
    ],
  },
  Men: {
    eyebrow: "The men’s edit",
    descriptions: [
      "Clean construction, relaxed proportions and dependable pieces with a clear point of view.",
      "Modern shirts, easy trousers and versatile layers built for repeat wear.",
      "Comfortable fits and considered details for a wardrobe that works harder.",
      "Everyday essentials with sharper lines, practical colour and effortless styling.",
    ],
  },
  Unisex: {
    eyebrow: "Style without labels",
    descriptions: [
      "Thoughtful clothing beyond labels, made for individual style and everyday expression.",
      "Relaxed layers, balanced proportions and colours designed to be worn your way.",
      "Versatile pieces made for shared wardrobes and personal styling.",
      "Easy silhouettes and dependable fabrics, without rules about who wears what.",
    ],
  },
  Kids: {
    eyebrow: "Made for every adventure",
    descriptions: [
      "Comfortable shapes, playful colour and durable pieces made to keep up.",
      "Easy outfits designed for school days, weekends and everything between.",
      "Soft, practical layers with room to move, play and grow.",
      "Everyday favourites with reliable comfort and just enough personality.",
    ],
  },
  Babies: {
    eyebrow: "Little pieces, thoughtfully made",
    descriptions: [
      "Soft, comfortable essentials designed for little movements and everyday ease.",
      "Gentle layers and practical fits made for busy everyday changes.",
      "Breathable basics for naps, play and everything in between.",
      "Thoughtful babywear with soft fabrics, easy layering and lasting comfort.",
    ],
  },
};
