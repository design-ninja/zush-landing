import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.union([z.string(), z.date()]),
    slug: z.string(),
    tags: z.union([z.string(), z.array(z.string())]),
    tldr: z.string(),
  }),
});

export const collections = { blog };
