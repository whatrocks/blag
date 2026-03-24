# blag

charlie's site, built with `syte`.

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

## Create a post

```bash
make post
```

This creates a new markdown file in `pages/`.

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
