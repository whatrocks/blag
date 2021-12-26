---
title: Index
---

<% pages.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
})
.reverse()
.forEach((page) => { _%>
    <%if (page.title !== "About" && page.title !== "Index" && page.title !== "Library" && page.title !== "Books" && page.title !== "Walkingman") { %>
* [<%= page.title || pathTo(page) %>](<%= pathTo(page) %>): <%= page.date %>
    <% } %>
<% }); _%>