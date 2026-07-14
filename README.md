# FashionFunks Store

FashionFunks is a production-shaped fashion storefront built as a portfolio project. It combines an editorial visual system with a complete, deliberately payment-free shopping journey.

## Current experience

- 50 typed clothing products across Women, Men, Unisex, Kids, and Babies
- Search with practical typo tolerance, URL-based category and product filters, sorting, stock states, and Show More pagination
- Responsive product cards with wishlist controls and an explicit size chooser for Quick Add
- Static-generated product routes with fit, fabric, care, delivery, illustrative reviews, and related pieces
- Persistent local bag and wishlist, quantity editing, ₹1,999 free-delivery threshold, and 5% off orders above ₹5,000
- Guest checkout that asks only for name and email, never address or payment data
- Optional demo account, logout, local order history, newsletter duplicate protection, and dark theme
- Lookbook, About, Contact, FAQ, Size Guide, Delivery & Returns, Privacy, Terms, Accessibility, loading, error, and 404 views
- Keyboard focus, skip navigation, responsive touch targets, reduced-motion support, and semantic landmarks

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Supabase-ready browser client and row-level-security migration
- Vitest unit tests
- Playwright desktop and mobile journeys
- ESLint with Next.js Core Web Vitals rules

The storefront uses local seed data and browser storage when Supabase variables are absent. This keeps the portfolio demo fully usable while preserving a clean path to hosted authentication and persistence later.

## Run locally

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

`npm run check` runs lint, TypeScript, unit tests, and the production build. Playwright uses an installed Chrome channel and starts the project on port 4174.

## Optional Supabase connection

1. Create a Supabase project.
2. Run the SQL migration in `supabase/migrations/`.
3. Copy `.env.example` to `.env.local`.
4. Add the project URL and anonymous key.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

No secrets, service-role keys, real customer records, addresses, or payment details belong in this repository.

## Project documentation

- [Project structure](docs/PROJECT_STRUCTURE.md)
- [Supabase boundary](supabase/README.md)

FashionFunks is currently a non-commercial portfolio store. It does not charge money or create real shipments.
