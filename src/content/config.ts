import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    benefits: z.array(z.string()).optional(),
    warning: z.string().optional(),
    sections: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
    })).optional(),
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      link: z.string(),
      linkText: z.string(),
    })).optional(),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
    }).optional(),
  }),
});

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.enum(['vav', 'investicie', 'patent-box']),
    order: z.number(),
    question: z.string(),
  }),
});

export const collections = {
  pages: pagesCollection,
  faq: faqCollection,
};
