# Project structure

The repository uses a static, feature-oriented layout that keeps the deployable entry point at the root while separating pages, application code, and public assets.

```text
.
|-- index.html                         # Static entry point
|-- public/
|   `-- assets/
|       `-- images/
|           |-- editorial/             # Campaign and hero imagery
|           `-- products/              # Catalog and lookbook imagery
|-- src/
|   |-- pages/                         # Secondary HTML documents
|   |-- scripts/
|   |   `-- storefront.js              # Product data and UI behavior
|   `-- styles/
|       `-- main.css                   # Shared responsive styles
|-- docs/                              # Architecture documentation
|-- .gitignore
`-- README.md
```

## Conventions

- Use lowercase kebab-case for file and directory names.
- Give assets descriptive names based on their content and role.
- Keep `index.html` at the repository root for static-host compatibility.
- Put additional browser pages in `src/pages/`.
- Keep shared client behavior in `src/scripts/` and shared styling in `src/styles/`.
- Put browser-addressable static files under `public/assets/`, grouped by media type and purpose.
- Secondary pages declare `<base href="../../">`, so links remain project-root-relative and continue to work when the repository is hosted below a domain subpath.
- Avoid committing generated output, local tooling state, secrets, or runtime uploads.

## Future application layers

The current storefront is intentionally static, so it has no backend or database files to relocate. If server-side features are introduced, add them only when implementation exists:

```text
server/
|-- config/
|-- controllers/
|-- middleware/
|-- routes/
|-- services/
`-- utils/

database/
|-- migrations/
|-- models/
`-- seeds/
```

Keep credentials in environment variables, document required keys in `.env.example`, and never commit secrets or production data.
