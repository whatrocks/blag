# Charlie's Blog - Claude Code Notes

## Overview
This is a personal blog built with Astro that uses a BeOS-inspired desktop interface design.

## Tech Stack
- **Static Site Generator**: Astro (v5)
- **Templating**: Astro components in `/src/layouts/` and `/src/components/`
- **Styling**: All custom CSS in `/static/app.css` (no external UI framework)
- **Content**: Markdown in `/src/content/posts/`, a content collection defined in `/src/content.config.ts`

## Key Files
- `/src/layouts/App.astro` - Main layout with BeOS window design
- `/src/pages/index.astro` - Homepage post listing
- `/src/pages/[slug].astro` - Route for every post and page
- `/src/pages/rss.xml.js` - RSS feed
- `/src/pages/llms.txt.js` - llms.txt for language models, listing every page and post
- `/src/components/Library.astro` + `LibraryScript.astro` - SQL book search widget and its DuckDB script
- `/src/lib/posts.ts` - Slug, filtering and sorting helpers shared by the routes and feed
- `/static/app.css` - Custom styles
- `/static/desktop.js` - Window manager (dragging, stacking, SPA navigation, persistence)
- `/src/pages/404.astro` - Not-found page, served by the Worker for unmatched paths
- `/src/content/posts/` - Blog posts and content pages

## Build
- `make serve` for the dev server, `make build` to build, `make check` to type-check
- Output goes to `build/` (set via `outDir`)
- `static/` is the `publicDir`, so its files are served from the site root

## Deploy
- Hosted on Cloudflare Workers (static assets, no Worker script), configured in `/wrangler.jsonc`
- Pushing to `main` builds and deploys via `.github/workflows/deploy.yml`, which runs the repo's pinned wrangler with the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets; `make deploy` deploys by hand
- `html_handling: "drop-trailing-slash"` means `/about/` redirects to `/about`
- `not_found_handling: "404-page"` serves `build/404.html` from `/src/pages/404.astro`
- Redirects go in `/static/_redirects` (served from the site root, real 301s)
- `/static/.assetsignore` keeps junk like `.DS_Store` out of the uploaded assets
- `wrangler dev` serves the built site with these rules applied, which is the way to test routing changes

## Design System
- BeOS look: blue desktop (`--desktop`), yellow title tabs on the focused window (gray when unfocused), gray beveled `.window-frame` around contents
- Each window is `.title-bar` (the tab, with close + zoom buttons) followed by a `.window-frame` wrapper; `createWindow()` in `/static/desktop.js` builds the same structure
- Deskbar (`nav.deskbar`) in the top-right corner: ¶ Charlie (links home), tray clock, and Posts/About/Library entries; becomes a horizontal bar on mobile
- Desktop only: double-clicking a tab minimizes the window; the Deskbar's `#deskbar-windows` list shows open windows (click to restore/focus, click the focused one to minimize). Window positions, stacking, minimized/zoomed state and open page windows persist in `localStorage` (`beos-desktop-v1`)
- Colors are CSS variables on `:root` in `/static/app.css`
- Icons are isometric BeOS/Haiku-style SVGs in `/static/icons/` (posts, document, books), used on the desktop and in the Deskbar
- Sidepanel with CS Primer Show and Fahrenheit 52 widgets

## Page Layout Logic
`App.astro` keys this off the page's slug, passed in by `[slug].astro`:
- **Homepage** (no slug): Shows "Posts" in the title bar, includes sidepanel
- **About page** (`about`): Shows "About" in title, NO sidepanel, 2x width
- **Library page** (`library`): Shows "Library" in title, NO sidepanel, 2x width
- **Blog posts**: Individual titles, includes sidepanel
- `about`, `library`, `books` and `walkingman` skip the post title/date header; `about`, `books`, `library` and `walkingman` are also left out of the homepage listing and the RSS feed (see `PAGE_SLUGS` in `/src/lib/posts.ts`)

## Width Rules
- Default window: 720px max-width
- About/Library pages: 1440px window, 1400px content (double width)
- Sidepanel only hidden on About and Library pages

## URLs
- Pages are linked and built without trailing slashes (`/about`), as `build/about/index.html`
- The Worker redirects the trailing-slash spelling to the canonical one
- RSS links and guids match that spelling; changing them would resurface every post as new for subscribers

## Special Features
- Library page has interactive SQL book search functionality, powered by DuckDB-WASM
- The library script stays inline (`is:inline type="module"`) because the SPA window loader re-runs inline module scripts when the Library opens in a new window
- Code blocks are highlighted in the browser by highlight.js, so Astro's own syntax highlighting is off
- Dynamic window titles based on current page
- Responsive design hides sidepanel on mobile

## Testing
No test suite. `make check` type-checks; `make build` is the real smoke test.

## Common Tasks
- Blog posts: Add new files to `/src/content/posts/` (or run `make post`)
- Styling: Modify `/static/app.css`
- Layout changes: Edit `/src/layouts/App.astro`
- Window behavior: Edit `/static/desktop.js`
- Menu items: Update the `.deskbar-teams` list in `nav.deskbar`
