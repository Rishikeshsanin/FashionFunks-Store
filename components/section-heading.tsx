import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export function SectionHeading({ eyebrow, title, copy, href, linkLabel = "Shop the edit" }: { eyebrow: string; title: string; copy?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {copy && <p>{copy}</p>}
      {href && <Link className="arrow-link" href={href}>{linkLabel}<ArrowIcon /></Link>}
    </div>
  );
}
