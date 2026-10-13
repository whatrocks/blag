import type { CollectionEntry } from 'astro:content';

// Standalone pages: they live in the same collection as the posts, but are
// left off the homepage listing and out of the feed.
const PAGE_SLUGS = new Set(['about', 'books', 'library', 'walkingman']);

export function isPost(entry: CollectionEntry<'posts'>) {
  return !PAGE_SLUGS.has(entry.id);
}

export function sortNewestFirst(entries: CollectionEntry<'posts'>[]) {
  return entries.sort((a, b) => b.data.date.localeCompare(a.data.date));
}
