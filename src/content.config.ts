import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    socialImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
