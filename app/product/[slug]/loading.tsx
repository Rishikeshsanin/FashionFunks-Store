export default function ProductLoading() {
  return (
    <div className="container product-loading" role="status" aria-label="Loading product">
      <div className="skeleton product-loading__image" />
      <div className="product-loading__details">
        <div className="skeleton" /><div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
      </div>
    </div>
  );
}
