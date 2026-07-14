import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Lookbook", description: "The FashionFunks styling lookbook: colour, texture and easy silhouettes." };

const stories = [
  { number: "01", title: "Cobalt after quiet", copy: "Let one clean colour do the talking. White, stone and ink keep the rest of the sentence short.", image: "/assets/images/products/cobalt-poplin-top.webp", href: "/shop?color=Cobalt", position: "tall" },
  { number: "02", title: "The new soft suit", copy: "Shirting, wide trousers and relaxed layers with the stiffness edited out.", image: "/assets/images/products/mens-oxford-shirt.webp", href: "/shop?subcategory=Shirts", position: "wide" },
  { number: "03", title: "Rouge in motion", copy: "A statement jacket, an uncomplicated base and nowhere you need to blend in.", image: "/assets/images/products/rouge-statement-jacket.png", href: "/shop?color=Rouge", position: "wide" },
  { number: "04", title: "Shared wardrobes", copy: "Boxy tees and easy outerwear made to be styled, borrowed and restyled.", image: "/assets/images/products/lilac-studio-tee.webp", href: "/shop?category=Unisex", position: "tall" },
] as const;

export default function LookbookPage() {
  return (
    <>
      <header className="lookbook-hero"><div className="container"><span className="eyebrow eyebrow--light">Season 02 / 2026</span><h1>Looks with<br />something to say.</h1><p>Four wearable stories. No strict rules.</p></div></header>
      <section className="section"><div className="container lookbook-grid">{stories.map((story) => <article className={`lookbook-story lookbook-story--${story.position}`} key={story.number}><Link href={story.href} className="lookbook-story__image"><Image src={story.image} alt={story.title} fill sizes="(max-width: 800px) 100vw, 50vw" /><span>Shop story <ArrowIcon /></span></Link><div><span className="eyebrow">Story {story.number}</span><h2>{story.title}</h2><p>{story.copy}</p><Link className="arrow-link" href={story.href}>Shop the look<ArrowIcon /></Link></div></article>)}</div></section>
      <section className="lookbook-manifesto"><div className="container"><span>Wear</span><strong>what makes the rest<br />of your day feel possible.</strong><Link className="button button--light" href="/shop">Shop the complete edit</Link></div></section>
    </>
  );
}
