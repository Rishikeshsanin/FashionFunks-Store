# Project structure

FashionFunks uses the Next.js App Router and separates routes, reusable interface components, domain logic, seed data, public media, tests, and database migrations.

```text
.
|-- app/                         # Routes, metadata, route states, global styles
|   |-- product/[slug]/          # Static-generated product detail routes
|   |-- shop/                    # URL-driven catalog
|   `-- ...                      # Cart, checkout, account, editorial and policy pages
|-- components/                  # Reusable storefront and interaction components
|-- data/
|   `-- products.ts              # Typed local seed catalog
|-- lib/                         # Catalog, pricing, money and Supabase adapters
|-- public/
|   `-- assets/images/
|       |-- editorial/           # Campaign imagery
|       `-- products/            # Product imagery
|-- supabase/
|   |-- migrations/              # PostgreSQL schema and RLS policies
|   `-- README.md                # Persistence boundary and setup notes
|-- tests/
|   |-- e2e/                     # Desktop and mobile customer journeys
|   `-- *.test.ts                # Unit tests
|-- types/                       # Shared domain types
|-- .env.example
|-- next.config.ts
|-- playwright.config.ts
|-- vitest.config.ts
`-- package.json
```

## Boundaries

- Route files compose screens; reusable UI and client state belong in `components/`.
- Business rules such as pricing and catalog filtering belong in `lib/` and remain framework-independent where possible.
- Static catalog content belongs in `data/`; it can later be replaced by a repository that reads Supabase without rewriting the UI.
- Browser-addressable media belongs in `public/assets/`, grouped by purpose.
- Database changes are additive, reviewed SQL migrations under `supabase/migrations/`.
- Unit tests cover deterministic domain logic; Playwright covers browser journeys and responsive behavior.

## Conventions

- Use lowercase kebab-case for routes and files, PascalCase for React component names, and camelCase for functions and variables.
- Keep customer-facing prices as integer rupees. Never use floating-point values for stored money.
- Keep filter state in the URL so filtered views remain shareable and browser navigation works.
- Keep client storage versioned so future migrations can be explicit.
- Never commit `.env.local`, generated Next.js output, coverage, browser reports, or TypeScript build information.
- Prefer server components by default and opt into client components only for interactions or browser APIs.

## Future development

The Supabase schema intentionally stays small: profiles, catalog records, wishlists, demo orders, order lines, and newsletter subscribers. Payment, address, phone, tax, and shipping-provider tables are intentionally absent from the current portfolio scope.
