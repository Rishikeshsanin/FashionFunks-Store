import { LogoMark } from "@/components/logo";

export function BrandedLoading({ catalog = false }: { catalog?: boolean }) {
  return (
    <div className={`container page-loading${catalog ? " page-loading--catalog" : ""}`} role="status" aria-label="Loading FashionFunks">
      <div className="page-loading__brand">
        <LogoMark className="page-loading__mark" />
        <div><span>FashionFunks</span><p>{catalog ? "The next repeat starts here." : "Preparing the next edit."}</p></div>
      </div>
      {catalog ? (
        <div className="skeleton-grid">{Array.from({ length: 8 }).map((_, index) => <div className="skeleton skeleton--card" key={index} />)}</div>
      ) : (
        <div className="page-loading__lines"><div className="skeleton" /><div className="skeleton" /></div>
      )}
    </div>
  );
}
