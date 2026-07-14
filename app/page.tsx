import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { collections, products } from "@/data/products";

const featured = products.filter((product) => product.featured).slice(0, 8);
const bestsellers = products.filter((product) => product.bestseller).slice(0, 4);

const categoryTiles = [
  { label: "Women", copy: "Soft forms. Strong colour.", image: "/assets/images/products/sculpted-rib-top.webp" },
  { label: "Men", copy: "Clean layers. Easy fits.", image: "/assets/images/products/mens-oxford-shirt.webp" },
  { label: "Unisex", copy: "No labels. Great clothes.", image: "/assets/images/products/lilac-studio-tee.webp" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image className="home-hero__image" src="/assets/images/editorial/hero-campaign.png" alt="FashionFunks models in a vivid editorial setting" fill priority sizes="100vw" />
        <div className="home-hero__veil" />
        <div className="container home-hero__content">
          <span className="eyebrow eyebrow--light">The new everyday, edited</span>
          <h1>Wear what<br />moves you.</h1>
          <p>Clean silhouettes, expressive colour and made-to-repeat essentials for every version of you.</p>
          <div className="button-row">
            <Link className="button button--light" href="/shop">Shop new arrivals</Link>
            <Link className="button button--glass" href="/lookbook">Explore the lookbook<ArrowIcon /></Link>
          </div>
        </div>
        <div className="home-hero__edition"><span>Edition 02</span><span>India · 2026</span></div>
      </section>

      <section className="service-bar" aria-label="Store benefits">
        <div className="container service-bar__grid">
          <div><span>01</span><p><strong>Fresh weekly edits</strong>New pieces, thoughtfully chosen</p></div>
          <div><span>02</span><p><strong>Easy 15-day returns</strong>Change your mind, stress-free</p></div>
          <div><span>03</span><p><strong>Style without rules</strong>Made for self-expression</p></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Just landed" title="New in rotation" copy="The newest shapes, colours and layers — ready to earn repeat status." href="/shop" linkLabel="View all new arrivals" />
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      <section className="section section--ink category-edit">
        <div className="container">
          <SectionHeading eyebrow="Find your lane" title="Shop by mood" copy="Three edits, one wardrobe. Go polished, relaxed or beautifully in between." />
          <div className="category-tiles">
            {categoryTiles.map((tile, index) => (
              <Link key={tile.label} className="category-tile" href={`/shop?category=${tile.label}`}>
                <Image src={tile.image} alt={`${tile.label} clothing edit`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                <span className="category-tile__index">0{index + 1}</span>
                <span className="category-tile__content"><span><strong>{tile.label}</strong><small>{tile.copy}</small></span><i>↗</i></span>
              </Link>
            ))}
          </div>
          <div className="small-category-links"><Link href="/shop?category=Kids">Kids edit <span>↗</span></Link><Link href="/shop?category=Babies">Baby essentials <span>↗</span></Link></div>
        </div>
      </section>

      <section className="section editorial-feature">
        <div className="container editorial-feature__grid">
          <div className="editorial-feature__image">
            <Image src="/assets/images/products/rouge-statement-jacket.png" alt="Rouge statement jacket from FashionFunks" fill sizes="(max-width: 800px) 100vw, 52vw" />
            <span>Colour story / 02</span>
          </div>
          <div className="editorial-feature__copy">
            <span className="eyebrow">The colour issue</span>
            <h2>Minimal doesn’t mean invisible.</h2>
            <p>Start with an easy foundation. Add one unapologetic colour. Keep everything else beautifully quiet.</p>
            <Link className="arrow-link" href="/shop?color=Rouge">Shop statement pieces<ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="Most wanted" title="Community favourites" copy="Easy shapes, confident details and zero overthinking." href="/shop?sort=rating" linkLabel="See every favourite" />
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <section className="section lookbook-preview">
        <div className="container">
          <SectionHeading eyebrow="The styling desk" title="Three ways into the season" href="/lookbook" linkLabel="Open the lookbook" />
          <div className="collection-row">
            {collections.map((collection, index) => (
              <Link key={collection.title} href={collection.href} className="collection-card">
                <div><Image src={collection.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span>Story 0{index + 1}</span><h3>{collection.title}</h3><p>{collection.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
