import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.charlieharrington.com',
  // Keep syte's layout on disk: build/ is what the host publishes, and the
  // assets that used to be copied from static/ still land at the site root.
  outDir: './build',
  publicDir: './static',
  // syte linked pages without a trailing slash and the feed's guids follow
  // suit, so both spellings are left to resolve to the same built page.
  trailingSlash: 'ignore',
  // The apostrophe dropped out of the slug when the post was renamed, so the
  // old URL keeps working for anything already linking to it.
  redirects: {
    "/writer's-bane": '/writers-bane',
  },
  markdown: {
    // Code blocks are highlighted at build time, so no highlighter ships to
    // the browser. syte left quotes and dashes alone, so smartypants stays off.
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light', wrap: true },
    smartypants: false,
  },
});
