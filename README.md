# blag

charlie's site, built with [Astro](https://astro.build).

## Setup

```bash
make install
```

## Local development

```bash
make serve
```

## Build

```bash
make build
```

Output goes to `build/`.

## Create a post

```bash
make post
```

This creates a new markdown file in `src/content/posts/`.

## Layout

- `src/content/posts/` - posts and standalone pages, one markdown file each
- `src/pages/` - routes: the homepage, the `[slug]` page route, and the RSS feed
- `src/layouts/App.astro` - the BeOS desktop window chrome every page shares
- `static/` - files served from the site root (`app.css`, `desktop.js`, images, icons)

## Handy commands

Add missing `/img/` to markdown image paths for one page:

```bash
sed 's/!\[\(.*\)](/![\1](\/img\//g' afternoon-with-arduino.md
```

Add missing `/img/` to all markdown files in the current directory:

```bash
sed -i -- 's/!\[\(.*\)](/![\1](\/img\//g' *.md
```

## Make targets

Run `make help` to see the available shortcuts.
