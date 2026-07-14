# FashionFunks

FashionFunks is a responsive, multi-page fashion storefront built with semantic HTML, modern CSS, and vanilla JavaScript. It runs as a static application with no build step.

## Store experience

- Editorial landing page for women, men, and unisex collections
- Searchable and filterable product catalog
- Dynamic product detail pages with size selection
- Persistent shopping bag with quantity controls
- Simplified checkout with no address or payment fields
- Order confirmation flow with a generated demo order number
- Namesake sign-in stored only in the visitor's browser
- Responsive lookbook and mobile navigation

## Project layout

```text
FashionFunks-Store/
|-- index.html
|-- public/
|   `-- assets/images/
|       |-- editorial/
|       `-- products/
|-- src/
|   |-- pages/
|   |-- scripts/
|   `-- styles/
`-- docs/
```

- `index.html` is the static storefront entry point.
- `src/pages/` contains the catalog, product, bag, checkout, account, order confirmation, and lookbook pages.
- `src/scripts/storefront.js` contains storefront behavior and client-side data.
- `src/styles/main.css` contains the shared responsive design system.
- `public/assets/images/` contains named, categorized image assets.
- `docs/` contains architecture and maintenance documentation.

See [Project structure](docs/PROJECT_STRUCTURE.md) for organization rules and future module boundaries.

## Run locally

Serve the repository root with any static HTTP server, then open `index.html`. For example:

```powershell
npx serve .
```

No backend, database, or environment variables are currently required.
