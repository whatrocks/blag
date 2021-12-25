---
title: Index Page
---
# Index page

This is your syte. It has <%= pages.length %> page(s).

Navigation:
<% for (const page of pages) { _%>
* [<%= page.title || pathTo(page) %>](<%= pathTo(page) %>)
<% } _%>

## TODO

- [X] Generate syte project
- [ ] Customize generated templates
- [ ] Deploy!
