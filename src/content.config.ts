import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogCollectionSchema } from '@/data/blogSchema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogCollectionSchema,
});

export const collections = { blog };
