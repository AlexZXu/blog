import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Underscored files are templates, not posts.
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.md' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		// Kind drives grouping on the index: longer essays vs. short notes.
		kind: z.enum(['essay', 'note']).default('note'),
		date: z.coerce.date(),
		summary: z.string(),
		draft: z.boolean().default(false),
		// Header image, relative to the post file. Shown on the index and the post.
		image: image().optional(),
		imageAlt: z.string().default(''),
		// Any Google Fonts family name, e.g. "Cormorant Garamond". Falls back to EB Garamond.
		font: z.string().regex(/^[A-Za-z0-9 ]+$/, 'Google Fonts family name').optional(),
		// Where I was or what I was doing when I posted; shown after the end mark.
		signoff: z.string().optional(),
	}),
});

export const collections = { blog };
