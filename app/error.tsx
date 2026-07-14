"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="empty-state page-shell">
      <span className="empty-state__symbol" aria-hidden="true">!</span>
      <span className="eyebrow">A small styling snag</span>
      <h1>This page didn’t load properly.</h1>
      <p>Nothing was charged or changed. Try loading it once more.</p>
      <button className="button button--primary" type="button" onClick={reset}>Try again</button>
    </section>
  );
}
