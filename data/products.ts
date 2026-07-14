import type { Category, Product } from "@/types/catalog";

const images = {
  oxford: "/assets/images/products/mens-oxford-shirt.webp",
  stripe: "/assets/images/products/mens-coastal-stripe-shirt.webp",
  overshirt: "/assets/images/products/mens-sand-overshirt.webp",
  rib: "/assets/images/products/sculpted-rib-top.webp",
  cobalt: "/assets/images/products/cobalt-poplin-top.webp",
  blouse: "/assets/images/products/soft-form-blouse.webp",
  lilac: "/assets/images/products/lilac-studio-tee.webp",
  noir: "/assets/images/products/noir-city-jacket.png",
  rouge: "/assets/images/products/rouge-statement-jacket.png",
  ivory: "/assets/images/products/ivory-occasion-dress.webp",
} as const;

type Seed = [
  slug: string,
  name: string,
  category: Category,
  subcategory: string,
  image: string,
  price: number,
  compareAtPrice: number | undefined,
  colors: string[],
  sizes: string[],
  stock: number,
  badge?: string,
];

const adultSizes = ["XS", "S", "M", "L", "XL"];
const menSizes = ["S", "M", "L", "XL", "XXL"];
const kidsSizes = ["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y"];
const babySizes = ["0–3M", "3–6M", "6–12M", "12–18M", "18–24M"];

const seeds: Seed[] = [
  ["oxford-ease-shirt", "Oxford Ease Shirt", "Men", "Shirts", images.oxford, 1899, 2299, ["Sky", "White"], menSizes, 18, "New"],
  ["coastal-stripe-shirt", "Coastal Stripe Shirt", "Men", "Shirts", images.stripe, 2099, undefined, ["Blue Stripe"], menSizes, 23, "Bestseller"],
  ["sand-knit-overshirt", "Sand Knit Overshirt", "Men", "Outerwear", images.overshirt, 2499, 2999, ["Sand", "Olive"], menSizes, 11, "Limited"],
  ["sculpted-rib-top", "Sculpted Rib Top", "Women", "Tops", images.rib, 1599, 1899, ["Cobalt", "Black"], adultSizes, 27, "New"],
  ["cobalt-poplin-top", "Cobalt Poplin Top", "Women", "Tops", images.cobalt, 1799, undefined, ["Cobalt"], adultSizes, 20, "Trending"],
  ["soft-form-blouse", "Soft Form Blouse", "Women", "Tops", images.blouse, 1999, 2399, ["Ivory", "Blush"], adultSizes, 16],
  ["lilac-studio-tee", "Lilac Studio Tee", "Unisex", "T-Shirts", images.lilac, 1299, undefined, ["Lilac", "Ink"], adultSizes, 34, "Unisex"],
  ["noir-city-jacket", "Noir City Jacket", "Unisex", "Outerwear", images.noir, 3499, 4299, ["Black"], adultSizes, 7, "Editor's pick"],
  ["rouge-statement-jacket", "Rouge Statement Jacket", "Women", "Outerwear", images.rouge, 3799, 4499, ["Rouge"], adultSizes, 4, "Statement"],
  ["ivory-occasion-dress", "Ivory Occasion Dress", "Women", "Dresses", images.ivory, 4299, undefined, ["Ivory"], adultSizes, 9, "Occasion"],
  ["studio-pleat-dress", "Studio Pleat Dress", "Women", "Dresses", images.ivory, 3299, 3999, ["Cream", "Cobalt"], adultSizes, 15, "Online exclusive"],
  ["after-hours-slip-dress", "After Hours Slip Dress", "Women", "Dresses", images.ivory, 2799, undefined, ["Ink", "Wine"], adultSizes, 13],
  ["gallery-crop-shirt", "Gallery Crop Shirt", "Women", "Shirts", images.cobalt, 1699, 1999, ["Azure", "White"], adultSizes, 22],
  ["soft-structure-shirt", "Soft Structure Shirt", "Women", "Shirts", images.blouse, 1899, undefined, ["Oat", "Rose"], adultSizes, 19, "New"],
  ["contour-knit-tee", "Contour Knit Tee", "Women", "T-Shirts", images.rib, 1399, 1699, ["Blue", "Stone"], adultSizes, 29],
  ["everyday-wide-trouser", "Everyday Wide Trouser", "Women", "Trousers", images.blouse, 2399, undefined, ["Stone", "Black"], adultSizes, 17, "Bestseller"],
  ["soft-tailored-pant", "Soft Tailored Pant", "Women", "Trousers", images.rib, 2599, 2999, ["Ink", "Taupe"], adultSizes, 12],
  ["weekend-denim-overshirt", "Weekend Denim Overshirt", "Women", "Outerwear", images.rouge, 2899, undefined, ["Mid Blue"], adultSizes, 8],
  ["field-note-shirt", "Field Note Shirt", "Men", "Shirts", images.overshirt, 1999, undefined, ["Stone", "Sage"], menSizes, 24, "New"],
  ["city-pinstripe-shirt", "City Pinstripe Shirt", "Men", "Shirts", images.stripe, 2199, 2599, ["Navy Stripe"], menSizes, 14],
  ["club-collar-shirt", "Club Collar Shirt", "Men", "Shirts", images.oxford, 2299, undefined, ["White", "Powder"], menSizes, 19],
  ["washed-heavyweight-tee", "Washed Heavyweight Tee", "Men", "T-Shirts", images.lilac, 1499, undefined, ["Lilac", "Charcoal"], menSizes, 31, "Bestseller"],
  ["graphic-form-tee", "Graphic Form Tee", "Men", "T-Shirts", images.lilac, 1399, 1699, ["Cream", "Cobalt"], menSizes, 28],
  ["utility-easy-trouser", "Utility Easy Trouser", "Men", "Trousers", images.overshirt, 2499, undefined, ["Sand", "Black"], menSizes, 21],
  ["relaxed-city-chino", "Relaxed City Chino", "Men", "Trousers", images.oxford, 2299, 2699, ["Khaki", "Navy"], menSizes, 20],
  ["midnight-bomber", "Midnight Bomber", "Men", "Outerwear", images.noir, 3999, 4699, ["Black"], menSizes, 0, "Sold out"],
  ["canvas-work-jacket", "Canvas Work Jacket", "Men", "Outerwear", images.overshirt, 3299, undefined, ["Tobacco", "Navy"], menSizes, 6, "Low stock"],
  ["common-ground-tee", "Common Ground Tee", "Unisex", "T-Shirts", images.lilac, 1199, 1499, ["Lilac", "White", "Ink"], adultSizes, 35],
  ["colour-theory-tee", "Colour Theory Tee", "Unisex", "T-Shirts", images.cobalt, 1399, undefined, ["Cobalt", "Rouge"], adultSizes, 26, "New"],
  ["everywhere-hoodie", "Everywhere Hoodie", "Unisex", "Sweatshirts", images.noir, 2799, 3299, ["Black", "Grey"], adultSizes, 17, "Bestseller"],
  ["soft-volume-sweatshirt", "Soft Volume Sweatshirt", "Unisex", "Sweatshirts", images.lilac, 2199, undefined, ["Lilac", "Oat"], adultSizes, 18],
  ["studio-track-pant", "Studio Track Pant", "Unisex", "Trousers", images.noir, 2299, undefined, ["Ink", "Grey"], adultSizes, 16],
  ["transit-cargo-pant", "Transit Cargo Pant", "Unisex", "Trousers", images.overshirt, 2599, 2999, ["Olive", "Black"], adultSizes, 10],
  ["open-road-jacket", "Open Road Jacket", "Unisex", "Outerwear", images.rouge, 3599, undefined, ["Rouge", "Black"], adultSizes, 5, "Limited"],
  ["little-artist-tee", "Little Artist Tee", "Kids", "T-Shirts", images.lilac, 799, undefined, ["Lilac", "Cream"], kidsSizes, 24, "New"],
  ["mini-colour-pop-tee", "Mini Colour Pop Tee", "Kids", "T-Shirts", images.cobalt, 899, 1099, ["Cobalt", "Red"], kidsSizes, 20],
  ["play-all-day-shirt", "Play All Day Shirt", "Kids", "Shirts", images.stripe, 1199, undefined, ["Blue Stripe"], kidsSizes, 15],
  ["tiny-oxford-shirt", "Tiny Oxford Shirt", "Kids", "Shirts", images.oxford, 1299, 1499, ["Sky", "White"], kidsSizes, 12],
  ["weekend-explorer-jacket", "Weekend Explorer Jacket", "Kids", "Outerwear", images.overshirt, 1799, undefined, ["Sand", "Olive"], kidsSizes, 8, "Low stock"],
  ["mini-city-bomber", "Mini City Bomber", "Kids", "Outerwear", images.noir, 1999, 2399, ["Black"], kidsSizes, 0, "Sold out"],
  ["movement-jogger", "Movement Jogger", "Kids", "Trousers", images.noir, 1099, undefined, ["Grey", "Navy"], kidsSizes, 21],
  ["bright-day-dress", "Bright Day Dress", "Kids", "Dresses", images.ivory, 1599, 1899, ["Ivory", "Coral"], kidsSizes, 11],
  ["cloud-soft-bodysuit", "Cloud Soft Bodysuit", "Babies", "Bodysuits", images.blouse, 699, undefined, ["Cream", "Blush"], babySizes, 29, "Organic cotton"],
  ["tiny-rib-bodysuit", "Tiny Rib Bodysuit", "Babies", "Bodysuits", images.rib, 749, 899, ["Blue", "Oat"], babySizes, 25],
  ["first-stripe-romper", "First Stripe Romper", "Babies", "Rompers", images.stripe, 999, undefined, ["Blue Stripe"], babySizes, 18],
  ["little-lilac-romper", "Little Lilac Romper", "Babies", "Rompers", images.lilac, 949, undefined, ["Lilac"], babySizes, 22, "New"],
  ["cosy-cuddle-set", "Cosy Cuddle Set", "Babies", "Sets", images.blouse, 1299, 1499, ["Oat", "Sky"], babySizes, 16],
  ["mini-weekend-set", "Mini Weekend Set", "Babies", "Sets", images.overshirt, 1399, undefined, ["Sand", "Sage"], babySizes, 13],
  ["first-layer-cardigan", "First Layer Cardigan", "Babies", "Knitwear", images.ivory, 1199, undefined, ["Ivory", "Rose"], babySizes, 9, "Gift favourite"],
  ["soft-step-trouser", "Soft Step Trouser", "Babies", "Trousers", images.oxford, 799, 999, ["Sky", "Stone"], babySizes, 20],
];

const copy: Record<string, { fabric: string; fit: string; care: string }> = {
  Dresses: { fabric: "Fluid viscose blend", fit: "Easy, softly shaped fit", care: "Gentle machine wash" },
  Outerwear: { fabric: "Structured cotton blend", fit: "Relaxed layering fit", care: "Dry clean recommended" },
  Shirts: { fabric: "Breathable cotton", fit: "Relaxed everyday fit", care: "Machine wash cold" },
  Tops: { fabric: "Soft cotton blend", fit: "Close, comfortable fit", care: "Gentle machine wash" },
  "T-Shirts": { fabric: "Premium cotton jersey", fit: "Relaxed unisex fit", care: "Machine wash cold" },
  Trousers: { fabric: "Soft twill blend", fit: "Easy straight fit", care: "Machine wash cold" },
  Sweatshirts: { fabric: "Brushed cotton fleece", fit: "Relaxed drop-shoulder fit", care: "Wash inside out" },
  Bodysuits: { fabric: "GOTS-inspired soft cotton", fit: "Comfort stretch fit", care: "Machine wash gentle" },
  Rompers: { fabric: "Soft cotton jersey", fit: "Roomy movement fit", care: "Machine wash gentle" },
  Sets: { fabric: "Breathable cotton blend", fit: "Comfort-first fit", care: "Machine wash gentle" },
  Knitwear: { fabric: "Soft cotton knit", fit: "Easy layering fit", care: "Gentle hand wash" },
};

export const products: Product[] = seeds.map((seed, index) => {
  const [slug, name, category, subcategory, image, price, compareAtPrice, colors, sizes, stock, badge] = seed;
  const details = copy[subcategory] ?? copy["T-Shirts"];
  return {
    id: `FF-${String(index + 1).padStart(3, "0")}`,
    slug,
    name,
    category,
    subcategory,
    description: `${name} balances a considered silhouette with everyday comfort. Designed for repeat wear, easy styling and a confident hit of FashionFunks character.`,
    price,
    compareAtPrice,
    image,
    imageAlt: `${name} from the FashionFunks ${category.toLowerCase()} collection`,
    colors,
    sizes,
    ...details,
    rating: Number((4.2 + ((index * 7) % 8) / 10).toFixed(1)),
    reviewCount: 12 + ((index * 17) % 136),
    stock,
    badge,
    featured: index < 8 || [18, 27, 34, 42].includes(index),
    bestseller: [1, 3, 7, 15, 21, 29, 34, 42].includes(index),
    createdAt: new Date(Date.UTC(2026, 5, 30 - (index % 28))).toISOString(),
  };
});

export const collections = [
  {
    title: "The colour edit",
    copy: "One saturated piece. Everything else, beautifully quiet.",
    href: "/shop?color=Cobalt",
    image: images.cobalt,
  },
  {
    title: "Soft tailoring",
    copy: "Polished shapes that still know how to relax.",
    href: "/shop?subcategory=Shirts",
    image: images.oxford,
  },
  {
    title: "No labels needed",
    copy: "Easy unisex layers made for personal styling.",
    href: "/shop?category=Unisex",
    image: images.lilac,
  },
] as const;
