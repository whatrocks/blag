---
title: Index
---

<% pages.sort((c,d) => {
    if (!c.date || !d.date) return
    <!-- return new Date(b.date) - new Date(a.date); -->
    const a = c.date.split("-");
    const b = d.date.split("-");
    return b[0] - a[0] || b[1] - a[1] || b[2] - a[2]; 
})
.forEach((page) => { _%>
    <%if (page.title !== "About" && page.title !== "Index" && page.title !== "Library" && page.title !== "Books" && page.title !== "Walkingman") { %>
* [<%= page.title || pathTo(page) %>](<%= pathTo(page) %>): <%= page.date %>
    <% } %>
<% }); _%>