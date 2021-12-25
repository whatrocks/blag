---
title: Index
---

<% pages.sort((a,b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    if (aDate > bDate) return -1;
    if (aDate < bDate) return 1;
    return 0;
})
.forEach((page) => { _%>
    <%if (page.title !== "About" && page.title !== "Index") { %>
* [<%= page.title || pathTo(page) %>](<%= pathTo(page) %>): <%= page.date %>
    <% } %>
<% }); _%>