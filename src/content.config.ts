import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogCollectionSchema } from '@/data/blogSchema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: blogCollectionSchema,
});

export const collections = { blog };
