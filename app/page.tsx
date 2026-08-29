import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/data/products";

const featured = products.filter((product) => product.featured && product.stock > 0).slice(0, 8);
const bestsellers = products.filter((product) => product.bestseller && product.stock > 0).slice(0, 4);

const heroProducts = [
  { name: "Sculpted Rib Top", price: "₹1,599", image: "/assets/images/products/women/sculpted-rib-top.webp", href: "/product/sculpted-rib-top" },
  { name: "Oxford Ease Shirt", price: "₹1,899", image: "/assets/images/products/men/oxford-ease-shirt.webp", href: "/product/oxford-ease-shirt" },
  { name: "Lilac Studio Tee", price: "₹1,299", image: "/assets/images/products/unisex/lilac-studio-tee.webp", href: "/product/lilac-studio-tee" },
] as const;

const categories = [
  { label: "Women", copy: "Modern colour, easy shape.", image: "/assets/images/products/women/cobalt-poplin-top.webp", href: "/shop?category=Women" },
  { label: "Men", copy: "Relaxed tailoring, repeat wear.", image: "/assets/images/products/men/coastal-stripe-shirt.webp", href: "/shop?category=Men" },
  { label: "Unisex", copy: "Good clothes. No labels needed.", image: "/assets/images/products/unisex/everywhere-hoodie.webp", href: "/shop?category=Unisex" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="v3-hero">
        <div className="v3-hero__copy">
          <span className="v3-eyebrow">India · New season</span>
          <h1>Good clothes.<em>No noise.</em></h1>
          <p>A tightly edited wardrobe of shirts, tees, dresses, trousers and layers — priced for real life, styled to feel anything but ordinary.</p>
          <div className="v3-hero__actions">
            <Link className="v3-button v3-button--dark" href="/shop">Shop the collection <ArrowIcon /></Link>
            <Link className="v3-button" href="/lookbook">View the lookbook</Link>
          </div>
          <div className="v3-hero__micro" aria-label="Store highlights">
            <span><strong>₹799+</strong>Everyday entry price</span>
            <span><strong>15 days</strong>Easy returns</span>
            <span><strong>Local HD</strong>Product imagery</span>
          </div>
        </div>
        <div className="v3-hero__visual" aria-label="Featured products">
          {heroProducts.map((product, index) => (
            <Link className="v3-hero-card" href={product.href} key={product.name}>
              <Image src={product.image} alt={product.name} fill priority={index === 0} quality={92} sizes={index === 0 ? "(max-width: 820px) 58vw, 34vw" : "(max-width: 820px) 42vw, 22vw"} />
              <span className="v3-hero-card__label"><strong>{product.name}</strong><span>{product.price}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <div className="v3-proof" aria-label="Why shop FashionFunks">
        <div><strong>Local, crisp imagery</strong><span>1000×1250 catalogue masters with responsive Next/Image delivery.</span></div>
        <div><strong>India-first pricing</strong><span>Mid-market pricing instead of blind USD-to-INR conversion.</span></div>
        <div><strong>Free delivery ₹1,999+</strong><span>A simple threshold you can see before checkout.</span></div>
        <div><strong>15-day returns</strong><span>Clear demo-store policy, no hidden shopping friction.</span></div>
      </div>

      <section className="v3-section">
        <div className="v3-shell">
          <div className="v3-section-head">
            <div><span className="v3-eyebrow">Freshly added</span><h2>New in rotation.</h2></div>
            <p>Pieces chosen for repeat wear, not one-scroll novelty. Clean fits, useful colour and prices that still make sense.</p>
          </div>
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      <section className="v3-section v3-section--ink">
        <div className="v3-shell">
          <div className="v3-section-head">
            <div><span className="v3-eyebrow">Shop by edit</span><h2>Pick a direction.</h2></div>
            <p>Not a wall of categories. Three clear ways into the wardrobe, with the rest waiting inside the full collection.</p>
          </div>
          <div className="v3-category-grid">
            {categories.map((category) => (
              <Link className="v3-category" href={category.href} key={category.label}>
                <Image src={category.image} alt={`${category.label} fashion collection`} fill quality={92} sizes="(max-width: 820px) 100vw, 34vw" />
                <span className="v3-category__copy"><span><h3>{category.label}</h3><p>{category.copy}</p></span><span>↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-section v3-section--soft">
        <div className="v3-shell">
          <div className="v3-section-head">
            <div><span className="v3-eyebrow">Most wanted</span><h2>The repeat-wear list.</h2></div>
            <Link className="v3-link" href="/shop?sort=rating">See all favourites →</Link>
          </div>
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-shell editorial-feature__grid">
          <div className="editorial-feature__image">
            <Image src="/assets/images/products/men/sand-knit-overshirt.webp" alt="Sand Knit Overshirt" fill quality={92} sizes="(max-width: 800px) 100vw, 52vw" />
          </div>
          <div className="editorial-feature__copy">
            <span className="v3-eyebrow">One-piece upgrade</span>
            <h2 className="v3-title">Dress better without making it a project.</h2>
            <p>Start with a clean base. Add one strong layer. Keep the palette quiet. The easiest outfits are usually the ones you actually repeat.</p>
            <Link className="v3-button v3-button--dark" href="/shop?subcategory=Outerwear">Shop layers <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  );
}