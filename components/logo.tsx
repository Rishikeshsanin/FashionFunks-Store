import Link from "next/link";

export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path className="logo-mark__frame" d="M5 5h38v38H5z" />
      <path className="logo-mark__f logo-mark__f--back" d="M13 12h15v6h-8v5h7v6h-7v8h-7V12Z" />
      <path className="logo-mark__fold" d="m28 12 7 6-7 5v-5h-5l5-6Z" />
      <path className="logo-mark__f logo-mark__f--front" d="M27 21h10v6h-4v10h-7V21Z" />
      <path className="logo-mark__seam" d="M20 23h7" />
      <circle className="logo-mark__accent" cx="37" cy="37" r="2.5" />
    </svg>
  );
}

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`logo${footer ? " logo--footer" : ""}`} href="/" aria-label="FashionFunks home">
      <LogoMark />
      <span className="logo__word">Fashion<span>Funks</span></span>
    </Link>
  );
}
