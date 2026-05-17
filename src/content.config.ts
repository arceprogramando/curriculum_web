import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Estructura: src/content/{coleccion}/{NN-slug}/{es|en}.md
const rhcsaCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/rhcsa' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    locale: z.enum(['es', 'en']),
    moduleNumber: z.number().int().positive(),
    completed: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    relatedCert: z.string().default('RHCSA EX200'),
    cover: z.string().optional()
  })
});

const ieltsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ielts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    locale: z.enum(['es', 'en']),
    moduleNumber: z.number().int().positive(),
    completed: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    relatedCert: z.string().default('IELTS'),
    cover: z.string().optional()
  })
});

export const collections = {
  rhcsa: rhcsaCollection,
  ielts: ieltsCollection
};
