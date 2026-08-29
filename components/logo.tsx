import Link from "next/link";

export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden="true">
      <rect x="1" y="1" width="34" height="34" rx="17" fill="currentColor" />
      <path d="M10 10h8v3h-5v4h4.5v3H13v6h-3V10Zm10 0h7v3h-4v4h3.6v3H23v6h-3V10Z" fill="var(--v3-paper, #f5f1e9)" />
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