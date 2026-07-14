import type { ReactNode } from "react";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <div className="info-page">
      <header className="info-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></header>
      <div className="container info-content">{children}</div>
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
