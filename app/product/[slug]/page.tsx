import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { getDiscountPercentage, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const discount = getDiscountPercentage(product);

  return (
    <>
      <div className="container product-breadcrumbs"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.category, href: `/shop?category=${product.category}` }, { label: product.name }]} /></div>
      <section className="container product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main"><Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 850px) 100vw, 58vw" />{product.badge && <span className="product-gallery__badge">{product.badge}</span>}</div>
          <div className="product-gallery__note"><span>Front view</span><span>Editorial image</span></div>
        </div>
        <div className="product-summary">
          <span className="eyebrow">{product.category} / {product.subcategory}</span>
          <h1>{product.name}</h1>
          <div className="product-summary__rating"><span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span><Link href="#reviews">{product.rating} · {product.reviewCount} demo reviews</Link></div>
          <div className="product-summary__price"><strong>{formatMoney(product.price)}</strong>{product.compareAtPrice && <s>{formatMoney(product.compareAtPrice)}</s>}{discount > 0 && <span>Save {discount}%</span>}</div>
          <p className="product-summary__description">{product.description}</p>
          <ProductPurchasePanel product={product} />
          <div className="product-accordions">
            <details open><summary>Details & fit<span>+</span></summary><div><dl><dt>Fabric</dt><dd>{product.fabric}</dd><dt>Fit</dt><dd>{product.fit}</dd><dt>Product ID</dt><dd>{product.id}</dd></dl></div></details>
            <details><summary>Care guide<span>+</span></summary><div><p>{product.care}. Wash with similar colours and follow the garment label for its longest, best-looking life.</p></div></details>
            <details><summary>Delivery & returns<span>+</span></summary><div><p>Delivery across India in 3–6 working days. Easy returns within 15 days on unworn pieces with tags attached.</p></div></details>
          </div>
        </div>
      </section>
      <section className="section product-story">
        <div className="container product-story__grid">
          <div><span className="eyebrow">Why it works</span><h2>Designed for the repeat-wear list.</h2></div>
          <div><p>Easy to style, comfortable in motion and considered in every proportion. This is the kind of piece that makes getting dressed feel obvious.</p><ul><li>Comfort-first construction</li><li>Made to mix across the collection</li><li>Finished with considered details</li></ul></div>
        </div>
      </section>
      <section id="reviews" className="section review-placeholder">
        <div className="container review-placeholder__grid">
          <div><span className="eyebrow">Community notes</span><h2>Reviews will live here.</h2><p>This portfolio shop shows the complete review experience without collecting or publishing customer content yet.</p></div>
          <div className="review-score"><strong>{product.rating}</strong><span>★★★★★</span><p>Based on {product.reviewCount} illustrative ratings</p><button className="button button--outline" type="button" disabled>Write a review — coming soon</button></div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container"><SectionHeading eyebrow="Keep looking" title="You may also like" href={`/shop?category=${product.category}`} linkLabel={`Shop all ${product.category.toLowerCase()}`} /><ProductGrid products={related} /></div>
      </section>
    </>
  );
}
