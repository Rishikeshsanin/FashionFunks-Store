export default function Loading() {
  return (
    <div className="container page-loading" role="status" aria-label="Loading page">
      <div className="skeleton skeleton--title" />
      <div className="skeleton-grid">{Array.from({ length: 8 }).map((_, index) => <div className="skeleton skeleton--card" key={index} />)}</div>
    </div>
  );
}
