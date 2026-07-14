import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";

const footerGroups = [
  { title: "Shop", links: [["New in", "/shop"], ["Women", "/shop?category=Women"], ["Men", "/shop?category=Men"], ["Unisex", "/shop?category=Unisex"], ["Kids & babies", "/shop?category=Kids"]] },
  { title: "Discover", links: [["Lookbook", "/lookbook"], ["About us", "/about"], ["Your account", "/login"], ["Wishlist", "/wishlist"]] },
  { title: "Need help?", links: [["Delivery & returns", "/delivery-returns"], ["Size guide", "/size-guide"], ["Contact", "/contact"], ["FAQ", "/faq"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="newsletter-band">
        <div className="container newsletter-band__inner">
          <div><span className="eyebrow">The good list</span><h2>Good clothes.<br />Better inbox.</h2></div>
          <div><p>New drops, styling notes and first access. We don’t spam.</p><NewsletterForm /></div>
        </div>
      </section>
      <div className="container footer-grid">
        <div className="footer-intro"><Logo footer /><p>Expressive, easy clothes for every version of you. A portfolio storefront built in India.</p></div>
        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
        ))}
      </div>
      <div className="container footer-legal">
        <span>© 2026 FashionFunks</span>
        <span>Demo store · No real payments are collected</span>
        <span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></span>
      </div>
    </footer>
  );
}
