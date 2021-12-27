---
title: Charlie Harrington
date: "2000-01-01"
---

<% pages.sort((c,d) => {
    if (!c.date || !d.date) return
    const a = c.date.split("-");
    const b = d.date.split("-");
    return b[0] - a[0] || b[1] - a[1] || b[2] - a[2]; 
})
.forEach((page) => { _%>
    <%if (page.title !== "About" && page.title !== "Charlie Harrington" && page.title !== "Library" && page.title !== "Books" && page.title !== "Walkingman") { %>
* [<%= page.title || pathTo(page) %>](<%= pathTo(page) %>): <%= page.date %>
    <% } %>
<% }); _%>