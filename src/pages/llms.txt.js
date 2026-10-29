import { getCollection } from 'astro:content';
import { isPost, sortNewestFirst } from '../lib/posts';

const SITE = 'https://www.charlieharrington.com';

// An llms.txt (https://llmstxt.org) for language models: who the site is
// for, then every page and post as a link with its description. Links match
// the site's own spelling, with no trailing slash.
const line = (entry) => {
  const { title, description } = entry.data;
  return `- [${title}](${SITE}/${entry.id})${description ? `: ${description}` : ''}`;
};

export async function GET() {
  const entries = await getCollection('posts');
  const pages = ['about', 'library', 'books', 'walkingman']
    .map((slug) => entries.find((entry) => entry.id === slug))
    .filter(Boolean);
  const posts = sortNewestFirst(entries.filter(isPost));

  const body = [
    '# Charlie Harrington',
    '',
    "> Charlie Harrington's personal blog: essays, stories, projects and notes on programming, computer science education, retro computing, writing, music and books.",
    '',
    `Charlie is a computer programmer. Posts are listed newest first; the full posts are also in the RSS feed at ${SITE}/rss.xml.`,
    '',
    '## Pages',
    '',
    ...pages.map(line),
    '',
    '## Posts',
    '',
    ...posts.map((post) => `${line(post)} (${post.data.date})`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
