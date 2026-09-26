# Charlie's Blog - Claude Code Notes

## Overview
This is a personal blog built with Syte static site generator that uses a BeOS-inspired desktop interface design.

## Tech Stack
- **Static Site Generator**: Syte (v0.0.1-beta.13)
- **Templating**: EJS templates in `/layouts/app.ejs`
- **Styling**: All custom CSS in `/static/app.css` (no external UI framework)
- **Content**: Pages in `/pages/` directory

## Key Files
- `/layouts/app.ejs` - Main template with BeOS window design
- `/static/app.css` - Custom styles and overrides
- `/pages/` - Blog posts and content pages

## Design System
- BeOS look: blue desktop (`--desktop`), yellow title tabs on the focused window (gray when unfocused), gray beveled `.window-frame` around contents
- Each window is `.title-bar` (the tab, with close + zoom buttons) followed by a `.window-frame` wrapper; `createWindow()` in the template JS builds the same structure
- Deskbar (`nav.deskbar`) in the top-right corner: ¶ Charlie (links home), tray clock, and Posts/About/Library entries; becomes a horizontal bar on mobile
- Colors are CSS variables on `:root` in `/static/app.css`
- Sidepanel with CS Primer Show and Fahrenheit 52 widgets

## Page Layout Logic
- **Homepage** (`title === "Charlie Harrington"`): Shows "Posts" in title, includes sidepanel
- **About page** (`title === "About"`): Shows "About" in title, NO sidepanel, 2x width
- **Library page** (`title === "Library"`): Shows "Library" in title, NO sidepanel, 2x width
- **Blog posts**: Individual titles, includes sidepanel

## Width Rules
- Default window: 720px max-width
- About/Library pages: 1440px window, 1400px content (double width)
- Sidepanel only hidden on About and Library pages

## Special Features
- Library page has interactive SQL book search functionality
- Dynamic window titles based on current page
- Responsive design hides sidepanel on mobile

## Testing
No specific test commands found - appears to be a simple static site.

## Common Tasks
- Blog posts: Add new files to `/pages/`
- Styling: Modify `/static/app.css`
- Layout changes: Edit `/layouts/app.ejs`
- Menu items: Update the `.deskbar-teams` list in `nav.deskbar`