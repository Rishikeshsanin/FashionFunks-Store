import Link from "next/link";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`logo${footer ? " logo--footer" : ""}`} href="/" aria-label="FashionFunks home">
      <svg className="logo__mark" viewBox="0 0 42 42" aria-hidden="true">
        <path d="M7 7h28v28H7z" fill="currentColor" />
        <path d="M14 12h15v5H20v4h8v5h-8v8h-6V12Z" fill="var(--logo-cut)" />
        <circle cx="31" cy="31" r="3" fill="var(--accent-red)" />
      </svg>
      <span className="logo__word">Fashion<span>Funks</span></span>
    </Link>
  );
}
