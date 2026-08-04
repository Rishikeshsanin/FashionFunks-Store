import type { Product } from "@/types/catalog";

const adultSizes = ["XS", "S", "M", "L", "XL"];
const menSizes = ["S", "M", "L", "XL", "XXL"];
const kidsSizes = ["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y"];

type ImageGroup = "women" | "men" | "unisex" | "kids" | "fandom";
type Seed = Omit<Product, "image" | "imageAlt" | "rating" | "reviewCount" | "createdAt"> & {
  imageGroup: ImageGroup;
};

const seeds: Seed[] = [
  {
    id: "FF-001", slug: "oxford-ease-shirt", name: "Oxford Ease Shirt", category: "Men", subcategory: "Shirts", imageGroup: "men",
    description: "A clean sky-blue Oxford shirt with an easy collar and a relaxed shape that works tucked, layered or worn open.",
    price: 1899, compareAtPrice: 2299, colors: ["Sky Blue"], sizes: menSizes, stock: 18, badge: "New",
    fabric: "Midweight cotton Oxford", fit: "Relaxed fit with a straight hem", care: "Machine wash cold and reshape while damp", featured: true,
  },
  {
    id: "FF-002", slug: "coastal-stripe-shirt", name: "Coastal Stripe Shirt", category: "Men", subcategory: "Shirts", imageGroup: "men",
    description: "A breathable striped shirt cut with enough room for warm days, easy weekends and uncomplicated layering.",
    price: 2099, colors: ["Blue Stripe"], sizes: menSizes, stock: 23, badge: "Bestseller",
    fabric: "Yarn-dyed cotton poplin", fit: "Easy fit with relaxed shoulders", care: "Machine wash cold with similar colours", bestseller: true,
  },
  {
    id: "FF-003", slug: "sand-knit-overshirt", name: "Sand Knit Overshirt", category: "Men", subcategory: "Outerwear", imageGroup: "men",
    description: "A softly structured sand overshirt that brings knit comfort to a polished, layer-ready silhouette.",
    price: 2499, compareAtPrice: 2999, colors: ["Sand"], sizes: menSizes, stock: 11, badge: "Limited",
    fabric: "Textured cotton-blend knit", fit: "Relaxed layering fit", care: "Gentle machine wash and dry flat",
  },
  {
    id: "FF-004", slug: "sculpted-rib-top", name: "Sculpted Rib Top", category: "Women", subcategory: "Tops", imageGroup: "women",
    description: "A close-fitting ribbed top with a clean neckline and sculpted stretch that holds its shape throughout the day.",
    price: 1599, compareAtPrice: 1899, colors: ["Cobalt"], sizes: adultSizes, stock: 27, badge: "New",
    fabric: "Cotton-rich stretch rib", fit: "Close, sculpted fit", care: "Gentle machine wash inside out", featured: true, bestseller: true,
  },
  {
    id: "FF-005", slug: "cobalt-poplin-top", name: "Cobalt Poplin Top", category: "Women", subcategory: "Tops", imageGroup: "women",
    description: "A saturated cobalt top in crisp poplin, balanced by a precise silhouette and a confident everyday finish.",
    price: 1799, colors: ["Cobalt"], sizes: adultSizes, stock: 20, badge: "Trending",
    fabric: "Crisp cotton poplin", fit: "Relaxed through the body", care: "Machine wash cold and warm iron if needed", featured: true,
  },
  {
    id: "FF-006", slug: "soft-form-blouse", name: "Soft Form Blouse", category: "Women", subcategory: "Tops", imageGroup: "women",
    description: "A fluid blouse with soft volume and subtle structure, designed to move easily between tailoring and denim.",
    price: 1999, compareAtPrice: 2399, colors: ["Ivory"], sizes: adultSizes, stock: 16,
    fabric: "Lightweight viscose twill", fit: "Fluid fit with gentle volume", care: "Gentle machine wash and line dry",
  },
  {
    id: "FF-007", slug: "lilac-studio-tee", name: "Lilac Studio Tee", category: "Unisex", subcategory: "T-Shirts", imageGroup: "unisex",
    description: "A lilac heavyweight tee with a clean crew neck, dropped shoulders and an easy shape made for repeat wear.",
    price: 1299, colors: ["Lilac"], sizes: adultSizes, stock: 34, badge: "Unisex",
    fabric: "240 GSM cotton jersey", fit: "Relaxed unisex fit", care: "Machine wash cold inside out", featured: true,
  },
  {
    id: "FF-008", slug: "noir-city-jacket", name: "Noir City Jacket", category: "Unisex", subcategory: "Outerwear", imageGroup: "unisex",
    description: "An asymmetric black city jacket with a sharp collar, concealed fastening and enough room for refined layering.",
    price: 3499, compareAtPrice: 4299, colors: ["Noir"], sizes: adultSizes, stock: 7, badge: "Editor's pick",
    fabric: "Dense cotton-nylon twill", fit: "Relaxed, architectural fit", care: "Dry clean recommended", featured: true, bestseller: true,
  },
  {
    id: "FF-009", slug: "rouge-statement-jacket", name: "Rouge Statement Jacket", category: "Women", subcategory: "Outerwear", imageGroup: "women",
    description: "A vivid rouge faux-fur jacket with a cropped proportion and plush texture designed to carry the entire look.",
    price: 3999, compareAtPrice: 4499, colors: ["Rouge"], sizes: adultSizes, stock: 4, badge: "Statement",
    fabric: "Premium faux fur with satin lining", fit: "Cropped statement fit", care: "Specialist dry clean only", featured: true, bestseller: true,
  },
  {
    id: "FF-010", slug: "ivory-occasion-dress", name: "Ivory Occasion Dress", category: "Women", subcategory: "Dresses", imageGroup: "women",
    description: "A refined ivory dress with controlled volume and a graceful line for celebrations, dinners and elevated daytime plans.",
    price: 3299, colors: ["Ivory"], sizes: adultSizes, stock: 9, badge: "Occasion",
    fabric: "Smooth crepe with soft lining", fit: "Defined waist with an easy skirt", care: "Dry clean recommended",
  },
  {
    id: "FF-011", slug: "studio-pleat-dress", name: "Studio Pleat Dress", category: "Women", subcategory: "Dresses", imageGroup: "women",
    description: "A modern midi dress shaped by precise pleats, clean movement and a silhouette that stays polished without feeling formal.",
    price: 3299, compareAtPrice: 3999, colors: ["Cream"], sizes: adultSizes, stock: 15, badge: "Online exclusive",
    fabric: "Fluid recycled-polyester crepe", fit: "Regular fit with a pleated skirt", care: "Gentle machine wash in a laundry bag",
  },
  {
    id: "FF-012", slug: "after-hours-slip-dress", name: "After Hours Slip Dress", category: "Women", subcategory: "Dresses", imageGroup: "women",
    description: "A fluid slip dress with a clean neckline and understated sheen, made for simple evening styling and confident layering.",
    price: 2799, colors: ["Ink"], sizes: adultSizes, stock: 13,
    fabric: "Satin-touch viscose blend", fit: "Skimming bias-cut fit", care: "Gentle hand wash and line dry",
  },
  {
    id: "FF-013", slug: "gallery-crop-shirt", name: "Gallery Crop Shirt", category: "Women", subcategory: "Shirts", imageGroup: "women",
    description: "A crisp cropped shirt with a boxy proportion that pairs naturally with high-waisted trousers and relaxed denim.",
    price: 1699, compareAtPrice: 1999, colors: ["Azure"], sizes: adultSizes, stock: 22,
    fabric: "Crisp cotton poplin", fit: "Boxy cropped fit", care: "Machine wash cold and warm iron",
  },
  {
    id: "FF-014", slug: "soft-structure-shirt", name: "Soft Structure Shirt", category: "Women", subcategory: "Shirts", imageGroup: "women",
    description: "A softly tailored shirt with dropped shoulders and clean lines, balancing polish with an easy drape.",
    price: 1899, colors: ["Oat"], sizes: adultSizes, stock: 19, badge: "New",
    fabric: "Tencel-cotton twill", fit: "Relaxed fit with dropped shoulders", care: "Gentle machine wash cold",
  },
  {
    id: "FF-015", slug: "contour-knit-tee", name: "Contour Knit Tee", category: "Women", subcategory: "T-Shirts", imageGroup: "women",
    description: "A finely knitted tee with a neat contour fit and enough stretch to sit smoothly under jackets and shirts.",
    price: 1399, compareAtPrice: 1699, colors: ["Blue"], sizes: adultSizes, stock: 29,
    fabric: "Fine cotton-viscose knit", fit: "Close fit with comfortable stretch", care: "Gentle wash and dry flat",
  },
  {
    id: "FF-016", slug: "everyday-wide-trouser", name: "Everyday Wide Trouser", category: "Women", subcategory: "Trousers", imageGroup: "women",
    description: "A high-rise wide trouser with a clean front and fluid fall, cut for comfortable movement from morning onward.",
    price: 2399, colors: ["Stone"], sizes: adultSizes, stock: 17, badge: "Bestseller",
    fabric: "Fluid twill blend", fit: "High-rise wide-leg fit", care: "Machine wash cold and line dry", bestseller: true,
  },
  {
    id: "FF-017", slug: "soft-tailored-pant", name: "Soft Tailored Pant", category: "Women", subcategory: "Trousers", imageGroup: "women",
    description: "A softly tailored pant with a straight leg, comfortable waistband and enough structure for a clean finish.",
    price: 2599, compareAtPrice: 2999, colors: ["Ink"], sizes: adultSizes, stock: 12,
    fabric: "Soft suiting twill", fit: "Mid-rise straight fit", care: "Gentle machine wash or dry clean",
  },
  {
    id: "FF-018", slug: "weekend-denim-overshirt", name: "Weekend Denim Overshirt", category: "Women", subcategory: "Outerwear", imageGroup: "women",
    description: "A relaxed denim overshirt with utility detail and a washed finish, ready to layer through changing weather.",
    price: 2899, colors: ["Mid Blue"], sizes: adultSizes, stock: 8,
    fabric: "Non-stretch cotton denim", fit: "Relaxed layering fit", care: "Wash cold inside out and line dry",
  },
  {
    id: "FF-019", slug: "field-note-shirt", name: "Field Note Shirt", category: "Men", subcategory: "Shirts", imageGroup: "men",
    description: "A practical utility shirt with clean patch pockets and a grounded neutral tone for easy everyday combinations.",
    price: 1999, colors: ["Sage"], sizes: menSizes, stock: 24, badge: "New",
    fabric: "Garment-washed cotton twill", fit: "Relaxed utility fit", care: "Machine wash cold with similar colours",
  },
  {
    id: "FF-020", slug: "city-pinstripe-shirt", name: "City Pinstripe Shirt", category: "Men", subcategory: "Shirts", imageGroup: "men",
    description: "A refined pinstripe shirt with a modern relaxed cut that sharpens trousers and lifts casual layers equally well.",
    price: 2199, compareAtPrice: 2599, colors: ["Navy Stripe"], sizes: menSizes, stock: 14,
    fabric: "Yarn-dyed cotton blend", fit: "Relaxed straight fit", care: "Machine wash cold and warm iron",
  },
  {
    id: "FF-021", slug: "club-collar-shirt", name: "Club Collar Shirt", category: "Men", subcategory: "Shirts", imageGroup: "men",
    description: "A polished shirt distinguished by its rounded club collar and clean construction, made for subtle character rather than noise.",
    price: 2299, colors: ["White"], sizes: menSizes, stock: 19,
    fabric: "Smooth cotton poplin", fit: "Regular fit with a neat shoulder", care: "Machine wash cold and warm iron",
  },
  {
    id: "FF-022", slug: "washed-heavyweight-tee", name: "Washed Heavyweight Tee", category: "Men", subcategory: "T-Shirts", imageGroup: "men",
    description: "A substantial cotton tee with a softly washed surface, strong neckline and relaxed shape that improves with wear.",
    price: 1499, colors: ["Charcoal"], sizes: menSizes, stock: 31, badge: "Bestseller",
    fabric: "260 GSM garment-washed cotton", fit: "Relaxed heavyweight fit", care: "Wash cold inside out", bestseller: true,
  },
  {
    id: "FF-023", slug: "graphic-form-tee", name: "Graphic Form Tee", category: "Men", subcategory: "T-Shirts", imageGroup: "men",
    description: "A clean graphic tee with considered placement, a firm cotton hand and an easy proportion for daily rotation.",
    price: 1399, compareAtPrice: 1699, colors: ["Cream"], sizes: menSizes, stock: 28,
    fabric: "220 GSM cotton jersey", fit: "Relaxed fit with dropped shoulders", care: "Machine wash cold inside out",
  },
  {
    id: "FF-024", slug: "utility-easy-trouser", name: "Utility Easy Trouser", category: "Men", subcategory: "Trousers", imageGroup: "men",
    description: "An easy utility trouser with practical pockets and a straight profile, balancing function with a tidy city-ready finish.",
    price: 2499, colors: ["Sand"], sizes: menSizes, stock: 21,
    fabric: "Durable cotton twill", fit: "Relaxed straight fit", care: "Machine wash cold and line dry",
  },
  {
    id: "FF-025", slug: "relaxed-city-chino", name: "Relaxed City Chino", category: "Men", subcategory: "Trousers", imageGroup: "men",
    description: "A modern chino with comfortable room through the leg and a clean taper that works across smart and casual outfits.",
    price: 2299, compareAtPrice: 2699, colors: ["Khaki"], sizes: menSizes, stock: 20,
    fabric: "Cotton stretch twill", fit: "Relaxed tapered fit", care: "Machine wash cold with similar colours",
  },
  {
    id: "FF-026", slug: "midnight-bomber", name: "Midnight Bomber", category: "Men", subcategory: "Outerwear", imageGroup: "men",
    description: "A clean midnight bomber with a low-sheen shell, ribbed trims and light structure for a sharp final layer.",
    price: 3999, compareAtPrice: 4699, colors: ["Midnight Navy"], sizes: menSizes, stock: 0, badge: "Sold out",
    fabric: "Technical recycled-nylon shell", fit: "Regular bomber fit", care: "Gentle machine wash and line dry",
  },
  {
    id: "FF-027", slug: "canvas-work-jacket", name: "Canvas Work Jacket", category: "Men", subcategory: "Outerwear", imageGroup: "men",
    description: "A dependable canvas work jacket with utility pockets, straightforward structure and a finish made for frequent wear.",
    price: 3299, colors: ["Tobacco"], sizes: menSizes, stock: 6, badge: "Low stock",
    fabric: "Heavy cotton canvas", fit: "Relaxed workwear fit", care: "Machine wash cold and line dry",
  },
  {
    id: "FF-028", slug: "common-ground-tee", name: "Common Ground Tee", category: "Unisex", subcategory: "T-Shirts", imageGroup: "unisex",
    description: "A clean everyday tee with balanced proportions, a substantial hand and an intentionally inclusive silhouette.",
    price: 1199, compareAtPrice: 1499, colors: ["White"], sizes: adultSizes, stock: 35,
    fabric: "220 GSM combed cotton jersey", fit: "Relaxed unisex fit", care: "Machine wash cold inside out",
  },
  {
    id: "FF-029", slug: "colour-theory-tee", name: "Colour Theory Tee", category: "Unisex", subcategory: "T-Shirts", imageGroup: "unisex",
    description: "A graphic colour-block tee designed to bring one focused hit of colour to relaxed, everyday styling.",
    price: 1399, colors: ["Cobalt Mix"], sizes: adultSizes, stock: 26, badge: "New",
    fabric: "Premium cotton jersey", fit: "Boxy unisex fit", care: "Machine wash cold inside out",
  },
  {
    id: "FF-030", slug: "everywhere-hoodie", name: "Everywhere Hoodie", category: "Unisex", subcategory: "Sweatshirts", imageGroup: "unisex",
    description: "A substantial everyday hoodie with a clean front, generous hood and relaxed volume for year-round layering.",
    price: 2799, compareAtPrice: 3299, colors: ["Black"], sizes: adultSizes, stock: 17, badge: "Bestseller",
    fabric: "Brushed cotton fleece", fit: "Relaxed drop-shoulder fit", care: "Wash cold inside out and dry flat", bestseller: true,
  },
  {
    id: "FF-031", slug: "soft-volume-sweatshirt", name: "Soft Volume Sweatshirt", category: "Unisex", subcategory: "Sweatshirts", imageGroup: "unisex",
    description: "A softly structured sweatshirt with controlled volume, comfortable rib trims and a calm studio-ready finish.",
    price: 2199, colors: ["Oat"], sizes: adultSizes, stock: 18,
    fabric: "Loopback cotton fleece", fit: "Relaxed volume fit", care: "Machine wash cold and reshape while damp",
  },
  {
    id: "FF-032", slug: "studio-track-pant", name: "Studio Track Pant", category: "Unisex", subcategory: "Trousers", imageGroup: "unisex",
    description: "A refined track pant with a straight leg and clean waistband, designed beyond workouts for everyday styling.",
    price: 2299, colors: ["Ink"], sizes: adultSizes, stock: 16,
    fabric: "Smooth double-knit jersey", fit: "Relaxed straight-leg fit", care: "Machine wash cold and line dry",
  },
  {
    id: "FF-033", slug: "transit-cargo-pant", name: "Transit Cargo Pant", category: "Unisex", subcategory: "Trousers", imageGroup: "unisex",
    description: "A modern cargo pant with practical storage, an easy rise and a streamlined leg for movement across the city.",
    price: 2599, compareAtPrice: 2999, colors: ["Olive"], sizes: adultSizes, stock: 10,
    fabric: "Cotton-nylon utility twill", fit: "Relaxed unisex fit", care: "Machine wash cold and line dry",
  },
  {
    id: "FF-034", slug: "open-road-jacket", name: "Open Road Jacket", category: "Unisex", subcategory: "Outerwear", imageGroup: "unisex",
    description: "A bold road-ready jacket with useful pockets, relaxed structure and enough presence to work as the defining layer.",
    price: 3599, colors: ["Rouge"], sizes: adultSizes, stock: 5, badge: "Limited",
    fabric: "Weather-resistant cotton-nylon", fit: "Relaxed layering fit", care: "Gentle machine wash and line dry",
  },
  {
    id: "FF-035", slug: "little-artist-tee", name: "Little Artist Tee", category: "Kids", subcategory: "T-Shirts", imageGroup: "kids",
    description: "A soft graphic tee with playful colour, a comfortable neckline and plenty of room for drawing, running and making things.",
    price: 799, colors: ["Cream"], sizes: kidsSizes, stock: 24, badge: "New",
    fabric: "Soft combed cotton jersey", fit: "Easy play-ready fit", care: "Machine wash cold", bestseller: true,
  },
  {
    id: "FF-036", slug: "mini-colour-pop-tee", name: "Mini Colour Pop Tee", category: "Kids", subcategory: "T-Shirts", imageGroup: "kids",
    description: "A bright everyday tee with comfortable stretch and cheerful colour designed to hold up through active days.",
    price: 899, compareAtPrice: 1099, colors: ["Cobalt"], sizes: kidsSizes, stock: 20,
    fabric: "Cotton jersey with gentle stretch", fit: "Regular comfortable fit", care: "Machine wash cold with similar colours",
  },
  {
    id: "FF-037", slug: "play-all-day-shirt", name: "Play All Day Shirt", category: "Kids", subcategory: "Shirts", imageGroup: "kids",
    description: "A lightweight striped shirt with an easy shape that stays comfortable through school days, weekends and celebrations.",
    price: 1199, colors: ["Blue Stripe"], sizes: kidsSizes, stock: 15,
    fabric: "Breathable cotton poplin", fit: "Relaxed movement-friendly fit", care: "Machine wash cold",
  },
  {
    id: "FF-038", slug: "tiny-oxford-shirt", name: "Tiny Oxford Shirt", category: "Kids", subcategory: "Shirts", imageGroup: "kids",
    description: "A polished little Oxford shirt with soft construction and enough room for comfortable movement at every occasion.",
    price: 1299, compareAtPrice: 1499, colors: ["Sky Blue"], sizes: kidsSizes, stock: 12,
    fabric: "Soft-washed cotton Oxford", fit: "Regular fit with movement room", care: "Machine wash cold and warm iron",
  },
  {
    id: "FF-039", slug: "weekend-explorer-jacket", name: "Weekend Explorer Jacket", category: "Kids", subcategory: "Outerwear", imageGroup: "kids",
    description: "A practical lightweight jacket with useful pockets and an easy fit for playgrounds, trips and changeable weather.",
    price: 1799, colors: ["Olive"], sizes: kidsSizes, stock: 8, badge: "Low stock",
    fabric: "Durable cotton-nylon twill", fit: "Relaxed layering fit", care: "Machine wash cold and line dry",
  },
  {
    id: "FF-040", slug: "mini-city-bomber", name: "Mini City Bomber", category: "Kids", subcategory: "Outerwear", imageGroup: "kids",
    description: "A clean mini bomber with soft rib trims and lightweight warmth, designed for comfortable city adventures.",
    price: 1999, compareAtPrice: 2399, colors: ["Black"], sizes: kidsSizes, stock: 0, badge: "Sold out",
    fabric: "Lightweight recycled-nylon shell", fit: "Comfortable bomber fit", care: "Gentle machine wash and line dry",
  },
  {
    id: "FF-041", slug: "movement-jogger", name: "Movement Jogger", category: "Kids", subcategory: "Trousers", imageGroup: "kids",
    description: "A soft everyday jogger with a flexible waistband, useful pockets and room for unrestricted play.",
    price: 1099, colors: ["Grey"], sizes: kidsSizes, stock: 21,
    fabric: "Cotton-rich loopback jersey", fit: "Relaxed fit with cuffed hems", care: "Machine wash cold",
  },
  {
    id: "FF-042", slug: "bright-day-dress", name: "Bright Day Dress", category: "Kids", subcategory: "Dresses", imageGroup: "kids",
    description: "A cheerful dress with an easy skirt and soft construction, made for birthdays, weekends and spontaneous dancing.",
    price: 1599, compareAtPrice: 1899, colors: ["Coral"], sizes: kidsSizes, stock: 11,
    fabric: "Breathable cotton poplin", fit: "Comfortable fit-and-flare shape", care: "Machine wash cold",
  },
  {
    id: "FF-051", slug: "ember-arc-haori-shirt", name: "Ember Arc Haori Shirt", category: "Fandom Edit", subcategory: "Outerwear", imageGroup: "fandom",
    description: "A green-and-black geometric haori overshirt with wide sleeves, clean drape and a modern streetwear proportion.",
    price: 3299, compareAtPrice: 3799, colors: ["Emerald Check"], sizes: adultSizes, stock: 9, badge: "Fandom exclusive",
    fabric: "Cotton-Tencel twill", fit: "Relaxed unisex haori fit", care: "Gentle machine wash cold", featured: true,
  },
  {
    id: "FF-052", slug: "shadow-pulse-tech-jacket", name: "Shadow Pulse Tech Jacket", category: "Fandom Edit", subcategory: "Outerwear", imageGroup: "fandom",
    description: "A black longline technical jacket with deep-red cloud graphics, utility pockets and a sharp fan-led streetwear finish.",
    price: 4299, compareAtPrice: 4999, colors: ["Black / Crimson"], sizes: adultSizes, stock: 6, badge: "Limited edition",
    fabric: "Water-resistant recycled-nylon shell", fit: "Relaxed longline unisex fit", care: "Gentle wash inside out and line dry", featured: true,
  },
  {
    id: "FF-053", slug: "panther-shadow-heavyweight-tee", name: "Panther Shadow Heavyweight Tee", category: "Fandom Edit", subcategory: "T-Shirts", imageGroup: "fandom",
    description: "A charcoal oversized tee with a high-impact panther graphic and heavyweight structure made for statement streetwear.",
    price: 1899, colors: ["Charcoal"], sizes: adultSizes, stock: 15, badge: "Graphic edition",
    fabric: "280 GSM combed cotton jersey", fit: "Oversized unisex fit", care: "Wash cold inside out; do not iron print",
  },
  {
    id: "FF-054", slug: "saiyan-training-jersey", name: "Saiyan Training Jersey", category: "Fandom Edit", subcategory: "Jerseys", imageGroup: "fandom",
    description: "An orange-and-blue training jersey with breathable performance texture and bold front-and-back icon placement.",
    price: 1699, colors: ["Orange / Blue"], sizes: adultSizes, stock: 18, badge: "Fan favourite",
    fabric: "Breathable recycled performance knit", fit: "Relaxed jersey fit", care: "Machine wash cold inside out",
  },
  {
    id: "FF-055", slug: "akatsuki-heavyweight-tee", name: "Akatsuki Heavyweight Tee", category: "Fandom Edit", subcategory: "T-Shirts", imageGroup: "fandom",
    description: "A black heavyweight tee with crimson cloud artwork, strong back placement and a collectible oversized silhouette.",
    price: 1799, compareAtPrice: 2099, colors: ["Black / Crimson"], sizes: adultSizes, stock: 14, badge: "Bestseller",
    fabric: "280 GSM combed cotton jersey", fit: "Oversized unisex fit", care: "Wash cold inside out; do not iron print", bestseller: true,
  },
  {
    id: "FF-056", slug: "scout-legends-heavyweight-tee", name: "Scout Legends Heavyweight Tee", category: "Fandom Edit", subcategory: "T-Shirts", imageGroup: "fandom",
    description: "An ecru heavyweight tee with a two-character scout graphic and a relaxed shape designed to showcase the back artwork.",
    price: 1899, colors: ["Ecru"], sizes: adultSizes, stock: 12, badge: "Collector's edit",
    fabric: "280 GSM combed cotton jersey", fit: "Oversized unisex fit", care: "Wash cold inside out; do not iron print",
  },
  {
    id: "FF-057", slug: "spark-tutu-dress", name: "Spark Tutu Dress", category: "Kids", additionalCategories: ["Fandom Edit"], subcategory: "Dresses", imageGroup: "kids",
    description: "A bright character-inspired tutu dress with a soft crochet bodice and full layered skirt for parties and dress-up days.",
    price: 1499, colors: ["Electric Yellow"], sizes: kidsSizes, stock: 10, badge: "Fandom kids",
    fabric: "Soft crochet bodice with layered tulle", fit: "Comfortable fitted bodice with full skirt", care: "Gentle hand wash and dry flat",
  },
  {
    id: "FF-058", slug: "web-signal-long-sleeve-tee", name: "Web Signal Long-Sleeve Tee", category: "Fandom Edit", subcategory: "T-Shirts", imageGroup: "fandom",
    description: "A red-and-black long-sleeve tee with web-led graphics and an athletic streetwear shape for high-impact layering.",
    price: 1899, colors: ["Red / Black"], sizes: adultSizes, stock: 13, badge: "Graphic edition",
    fabric: "Midweight cotton jersey", fit: "Relaxed long-sleeve fit", care: "Wash cold inside out; do not iron print",
  },
  {
    id: "FF-059", slug: "three-sword-hunter-oversized-tee", name: "Three-Sword Hunter Oversized Tee", category: "Fandom Edit", subcategory: "T-Shirts", imageGroup: "fandom",
    description: "A deep forest oversized tee with a sword-led back graphic and substantial cotton weight for a clean streetwear drape.",
    price: 1899, colors: ["Forest Green"], sizes: adultSizes, stock: 11, badge: "Collector's edit",
    fabric: "280 GSM combed cotton jersey", fit: "Oversized unisex fit", care: "Wash cold inside out; do not iron print",
  },
];

function imagePath(group: ImageGroup, slug: string) {
  return `/assets/images/products/${group}/${slug}.webp`;
}

export const products: Product[] = seeds.map((seed, index) => {
  const { imageGroup, ...product } = seed;
  const isReleaseProduct = Number(product.id.slice(3)) >= 51;
  return {
    ...product,
    image: imagePath(imageGroup, product.slug),
    imageAlt: `${product.name} from the FashionFunks ${product.category.toLowerCase()} collection`,
    rating: Number((4.2 + ((index * 7) % 8) / 10).toFixed(1)),
    reviewCount: 12 + ((index * 17) % 136),
    createdAt: new Date(Date.UTC(2026, isReleaseProduct ? 7 : 6, isReleaseProduct ? 4 - ((index - 42) % 4) : 31 - (index % 28))).toISOString(),
  };
});

export const collections = [
  {
    title: "The colour edit",
    copy: "One saturated piece. Everything else, beautifully quiet.",
    href: "/shop?color=Cobalt",
    image: imagePath("women", "cobalt-poplin-top"),
  },
  {
    title: "Soft tailoring",
    copy: "Polished shapes that still know how to relax.",
    href: "/shop?subcategory=Shirts",
    image: imagePath("men", "oxford-ease-shirt"),
  },
  {
    title: "No labels needed",
    copy: "Easy unisex layers made for personal styling.",
    href: "/shop?category=Unisex",
    image: imagePath("unisex", "lilac-studio-tee"),
  },
] as const;
