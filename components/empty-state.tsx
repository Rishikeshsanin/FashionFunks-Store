import Link from "next/link";

export function EmptyState({ eyebrow = "Nothing here yet", title, copy, action = "Explore new arrivals", href = "/shop" }: { eyebrow?: string; title: string; copy: string; action?: string; href?: string }) {
  return (
    <section className="empty-state">
      <span className="empty-state__symbol" aria-hidden="true">✦</span>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
      <Link className="button button--primary" href={href}>{action}</Link>
    </section>
  );
}
