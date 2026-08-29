# FashionFunks

### A product-first, India-first fashion storefront built with Next.js, React and TypeScript.

FashionFunks V3 is designed to feel like a real modern fashion business rather than a classroom ecommerce mockup. The experience focuses on crisp locally hosted product imagery, believable Indian pricing, clear commerce UX and a complete portfolio-safe shopping journey.

> **V3 direction:** good clothes, no noise — warm editorial design, straightforward discovery and zero low-resolution sample-API thumbnails.

## What makes V3 different

### Product-first visual system

- New warm off-white, ink-black and terracotta design language
- Minimal FashionFunks monogram / wordmark
- Product-led homepage hero instead of a model-heavy campaign image
- Local catalogue masters prepared at 1000×1250
- Next/Image AVIF / WebP delivery with explicit responsive widths
- 90-quality catalogue cards and 92-quality hero / product-detail images
- Product cards designed around the garment, price and next action

### Search that behaves like commerce

- Dedicated compact shop search field
- Global search overlay from the header
- Live product suggestions with thumbnail, category and price
- Search by product, colour, category and collection language
- Practical typo tolerance in the catalogue layer
- URL-driven category, size, colour, price, availability, rating and discount filters
- Separate filter and sort controls instead of one oversized floating toolbar

### India-first pricing

The catalogue is deliberately priced as an accessible mid-market concept instead of converting arbitrary dollar values to rupees.

Current pricing was sanity-checked against public H&M India and Zara India ranges. See [`docs/PRICING.md`](docs/PRICING.md) for the benchmark and guardrails.

- Entry pieces from ₹799
- Everyday tees mostly ₹1,099–₹1,499
- Shirts / tops mostly ₹1,599–₹2,299
- Dresses mostly ₹1,499–₹3,299
- Trousers mostly ₹1,999–₹2,599
- Free delivery above ₹1,999
- 5% demo basket discount above ₹5,000

## Full experience

- 51 typed products across Women, Men, Unisex, Kids and Fandom Edit
- Responsive product catalogue
- Product detail routes generated from stable slugs
- Size and colour selection
- Wishlist persistence
- Local shopping bag persistence
- Quantity editing and order totals
- Delivery threshold progress
- Guest checkout demo
- Optional local demo account and order history
- Lookbook
- About, Contact and FAQ
- Size Guide
- Delivery & Returns
- Privacy, Terms and Accessibility pages
- Dark theme
- Loading, error and 404 states
- Keyboard-friendly dialogs and navigation
- Reduced-motion support

## Architecture

```text
Next.js 16 App Router
        │
        ├── typed catalogue ────── data/products.ts
        │        │
        │        ├── search / filters / sort
        │        └── statically generated product routes
        │
        ├── React storefront state
        │        ├── bag
        │        ├── wishlist
        │        ├── demo account
        │        └── order history
        │
        ├── local high-resolution product assets
        │        └── Next/Image → responsive AVIF/WebP
        │
        └── optional Supabase boundary
                 └── auth / persistence path for future expansion
```

## Technology

| Area | Stack |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript |
| Images | Next/Image + local 4:5 WebP catalogue masters |
| State | React context + browser storage |
| Optional backend | Supabase-ready client + migration |
| Unit tests | Vitest |
| E2E | Playwright |
| Quality | ESLint + TypeScript + production build |
| Deployment target | Vercel |

## Quality gate

Every pull request to `main` runs:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

The goal is simple: a visual change does not ship if it breaks the production build.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For the full local verification:

```bash
npm run check
npm run test:e2e
```

## Optional Supabase connection

The storefront works without hosted credentials. To connect the optional Supabase path:

1. Create a Supabase project.
2. Run the migration in `supabase/migrations/`.
3. Copy `.env.example` to `.env.local`.
4. Add the public project URL and anonymous key.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit service-role keys, real customer data, addresses or payment credentials.

## Documentation

- [Pricing strategy](docs/PRICING.md)
- [Project structure](docs/PROJECT_STRUCTURE.md)
- [Supabase boundary](supabase/README.md)

## Product boundary

FashionFunks is a **portfolio storefront**, not a live merchant. The shopping journey is intentionally complete enough to demonstrate product engineering, while checkout does not charge money or create a real shipment.

---

Built by **Rishikesh Munnaluri**.