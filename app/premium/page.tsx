import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { PremiumForm } from "@/components/premium-form";

export const metadata: Metadata = {
  title: "Premium",
  description: "Join FashionFunks Premium for first looks and early-access clothing drops.",
};

const benefits = [
  ["01", "First looks", "Preview new edits before they move into the main collection."],
  ["02", "Early access", "Get a quiet head start on limited pieces and seasonal drops."],
  ["03", "Better updates", "Only considered notes about clothes, colour and what is next."],
];

export default function PremiumPage() {
  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="container premium-hero__grid">
          <div>
            <span className="eyebrow eyebrow--light">FashionFunks / Premium</span>
            <h1>Closer to<br />what’s next.</h1>
            <p>A lighter kind of membership—first looks, early access and no unnecessary noise.</p>
          </div>
          <LogoMark className="premium-hero__mark" />
        </div>
      </section>
      <section className="section premium-benefits">
        <div className="container">
          <div className="premium-benefits__intro"><span className="eyebrow">Membership, kept simple</span><h2>More access.<br />Less inbox.</h2></div>
          <div className="premium-benefits__grid">{benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>
      <section className="premium-join">
        <div className="container premium-join__grid">
          <div><span className="eyebrow">Join the list</span><h2>Your front-row place.</h2><p>Membership is free and your preferences are saved securely on this device.</p><Link href="/privacy">How we handle your data →</Link></div>
          <PremiumForm />
        </div>
      </section>
    </div>
  );
}
