# CLAUDE.md

Headless Shopify storefront for **Mouaflowers**, a floral design studio (weddings, flower orders, subscriptions). Built from the Shopify Hydrogen skeleton template and deployed to Shopify Oxygen.

The business is based in Göteborg, Sweden, and **will move to Mexico**. Location-specific copy, such as "Based in Göteborg, Sweden", will change. Don't hardcode assumptions about Sweden, like SEK or Swedish addresses, into new code.

## Stack

- **Shopify Hydrogen 2025.7** on **React Router 7.9** (framework mode, *not* Remix), React 18, Vite 6
- **JavaScript (JSX)**, not TypeScript. Types come from JSDoc comments plus generated `.d.ts` files
- Runtime: Oxygen (Cloudflare-worker-style). Entry point is [server.js](server.js); there are no Node APIs
- Data: Shopify Storefront API and Customer Account API (GraphQL), plus Featurable (Google reviews, REST)

## Commands

```bash
npm run dev       # local dev server (shopify hydrogen dev, runs codegen)
npm run build     # production build (runs codegen)
npm run preview   # build and preview locally
npm run lint      # eslint
npm run codegen   # regenerate GraphQL types and React Router route types
```

There are no tests. Use `npm run build` or `npm run lint` to verify changes.

## Deployment

Every push to any branch triggers [.github/workflows/oxygen-deployment-1000059244.yml](.github/workflows/oxygen-deployment-1000059244.yml), which runs `npx shopify hydrogen deploy`. A push to `main` deploys the site.

## Critical rules

- **Import routing APIs from `react-router`.** Never use `@remix-run/*` or `react-router-dom`, even though `react-router-dom` is listed in package.json. Adapt any Remix-based docs or examples. See [.cursor/rules/hydrogen-react-router.mdc](.cursor/rules/hydrogen-react-router.mdc).
- Don't hand-edit the generated files `storefrontapi.generated.d.ts`, `customer-accountapi.generated.d.ts` or `.react-router/`. Regenerate them with `npm run codegen`.
- `.env` holds secrets and is gitignored. Never print or commit its values. The keys are `SESSION_SECRET`, `PUBLIC_STOREFRONT_ID`, `PUBLIC_STOREFRONT_API_TOKEN`, `PUBLIC_STORE_DOMAIN`, `PRIVATE_STOREFRONT_API_TOKEN`, `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`, `PUBLIC_CUSTOMER_ACCOUNT_API_URL`, `SHOP_ID` and `FEATURABLE_URL`.

## Project layout

- `app/root.jsx`: root loader (header and footer menus, cart, analytics) and loading of global stylesheets
- `app/routes.js`: file-based routing via `flatRoutes()`, wrapped in `hydrogenRoutes()`
- `app/routes/`: every route is prefixed with `($locale).` (an optional locale segment)
- `app/components/`: mostly components from the Hydrogen skeleton (Header, Footer, Cart*, Search*, Product*, Aside, PageLayout). Custom components live in their own folders together with a CSS module: `AnimatedButton/`, `ParallaxSection/`
- `app/lib/context.js`: builds the Hydrogen context. Custom clients are added in `additionalContext`, for example `featurableReviews`
- `app/lib/createFeaturableReviewsClient.server.js`: REST client for reviews that uses `createWithCache` with `CacheLong`. Server-only files use the `.server.js` suffix
- `app/lib/fragments.js`: shared GraphQL fragments (cart, header and footer menus)
- `app/graphql/customer-account/`: Customer Account API queries and mutations
- `app/styles/`: `reset.css` and `app.css` are global (fonts, CSS variables, skeleton styles). Page styles are `*page.module.css` files
- `public/`: `fonts/` (Cormorant Garamond), `images/`, `symbols/` (logos, icons). Reference these with absolute paths such as `/images/...`
- `guides/`: Shopify's guides for search and predictive search

Path alias: `~/*` → `app/*`.

## Custom pages vs. skeleton pages

Custom pages built for this site:
- `($locale)._index.jsx`: homepage with a hero, intro, services cards, parallax section and a reviews carousel. Reviews come from `context.featurableReviews.getReviews()`
- `($locale).weddings.jsx`, `($locale).about.jsx`: mostly static marketing pages
- `($locale).order-flowers._index.jsx` / `.$handle.jsx`: copies of the collections routes, meant to become the flower shop
- `($locale).resources.jsx`: placeholder. `($locale).contact.jsx`: empty file

The rest (products, collections, cart, account, blogs, policies, search, sitemap) is unchanged skeleton code.

Navigation menus come from the Shopify admin menus queried in `root.jsx`, with `FALLBACK_HEADER_MENU` and `FALLBACK_FOOTER_MENU` as fallbacks. Many CTA buttons are still placeholders that link to `/pages/contact`.

## Conventions

- **Styling:** use a CSS module per page or component (`import styles from '../styles/xpage.module.css'`) with camelCase class names. Use global CSS variables from `app.css` (e.g. `--offBlack`, `--header-height`) and the `'Cormorant'` font family. Don't use Tailwind or CSS-in-JS.
- **Buttons:** use `<AnimatedButton bgColor textColor to>` for CTAs. Pass `as="div"` when the button is nested inside another `<Link>`.
- **Loaders:** follow the skeleton pattern. Split data into `loadCriticalData` (awaited) and `loadDeferredData` (promises that catch their own errors), and put GraphQL queries as `const` strings at the bottom of the route file.
- **Page titles:** `export const meta = () => [{title: 'Mouaflowers | <Page>'}]`.
- **Formatting:** Prettier with `@shopify/prettier-config` (single quotes, no bracket spacing: `{foo}`).
- **Site copy:** English for now. The site will eventually support **Spanish and English**, so prefer structures that are easy to translate later, such as keeping copy together instead of scattering strings through the JSX.

## Internationalization (planned)

- The site will support Spanish and English. Nothing has been translated yet, and all copy is hardcoded English in JSX.
- The routing is already in place. Every route has the `($locale)` prefix, and [app/lib/i18n.js](app/lib/i18n.js) parses a `/{lang}-{country}` path prefix (e.g. `/es-mx`). It defaults to `EN`/`US` and is passed to `createHydrogenContext` as `i18n`.
- Shopify data (products, collections, menus) can be localized through the Storefront API using `@inContext(language: $language, country: $country)` in queries, with Shopify's Translate & Adapt for the content.
- Static site copy will need its own translation layer, which hasn't been chosen yet. Ask before adding an i18n library.

## Known rough edges

- Some leftover code still needs cleanup: `console.log` debug calls in the homepage loader and render, large commented-out blocks, and unused imports.
- Image paths are inconsistent (`/images/...` vs `../images/...`). Prefer `/images/...`.
- `AnimatedButton/index.js` re-exports from the CSS module, which isn't needed.
