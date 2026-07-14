# Supabase boundary

The checked-in migration defines the future persistence boundary without making local development depend on a hosted project.

## Included

- Authentication profiles with a display name
- Public read-only active product catalog
- Per-user wishlist rows
- Logged-in demo order history and order lines
- Newsletter subscribers with a unique normalized email
- Row-level-security policies for every public table

Guest bags, guest wishlists, theme preference, and guest order confirmation remain in browser storage. A future server route may create guest orders with a service-role client, but a service-role key must never reach the browser.

## Applying the schema

Use the Supabase SQL editor or CLI to apply `migrations/202607140001_initial_store.sql`. Connect the environment variables from `.env.example` only after the project and authentication providers are configured.

The current interface deliberately falls back to local behavior when those variables are absent.
