import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    // Dates stay strings: they are written and displayed as YYYY-MM-DD, and
    // parsing them to Date would shift them a day in western timezones.
    title: z.string(),
    date: z.string(),
    description: z.string().default(''),
    category: z.string().default(''),
    image: z.string().optional(),
  }),
});

export const collections = { posts };
