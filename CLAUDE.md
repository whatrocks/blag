# Charlie's Blog - Claude Code Notes

## Overview
This is a personal blog built with Syte static site generator that uses a classic Mac OS interface design.

## Tech Stack
- **Static Site Generator**: Syte (v0.0.1-beta.13)
- **Templating**: EJS templates in `/layouts/app.ejs`
- **Styling**: `@sakun/system.css` for Mac OS components + custom CSS in `/static/app.css`
- **Content**: Pages in `/pages/` directory

## Key Files
- `/layouts/app.ejs` - Main template with Mac OS window design
- `/static/app.css` - Custom styles and overrides
- `/pages/` - Blog posts and content pages

## Design System
- Uses classic Mac OS window metaphor with title bars, close/resize buttons
- Global Mac OS-style menu bar at top with ¶ symbol (links to home), About, Library
- Main content in Mac OS windows with proper title bars
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
- Menu bar uses `ul[role="menu-bar"]` from system.css
- Dynamic window titles based on current page
- Responsive design hides sidepanel on mobile

## Testing
No specific test commands found - appears to be a simple static site.

## Common Tasks
- Blog posts: Add new files to `/pages/`
- Styling: Modify `/static/app.css`
- Layout changes: Edit `/layouts/app.ejs`
- Menu items: Update the `ul[role="menu-bar"]` section