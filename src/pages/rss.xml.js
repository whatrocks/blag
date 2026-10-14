import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPost, sortNewestFirst } from '../lib/posts';

const SITE = 'https://www.charlieharrington.com';

// Feed readers have no page to resolve against, so site-relative images and
// links are made absolute, the way syte's feed did it.
function absolutize(html) {
  return html.replace(/(src|href)="\/([^"]*)"/g, `$1="${SITE}/$2"`);
}

export async function GET(context) {
  const posts = sortNewestFirst((await getCollection('posts')).filter(isPost));

  return rss({
    title: 'Charlie Harrington',
    description: 'Charlie Harrington',
    site: context.site,
    // @astrojs/rss adds a trailing slash by default; the existing feed's
    // links and guids have none.
    trailingSlash: false,
    customData: '<language>en-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      // Links carry no trailing slash: these are the guids subscribers already
      // have, and changing them would show every post as new again.
      link: `/${post.id}`,
      pubDate: new Date(`${post.data.date}T00:00:00Z`),
      description: absolutize(post.rendered?.html ?? ''),
    })),
  });
}
