import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const BLOG_NAME = 'Alexander Xu';
export const BLOG_DESCRIPTION = 'Dealing with the acceleration of everything';

/** Newest first. Drafts are visible under `npm run dev` so they can be previewed. */
export async function getPosts(): Promise<Post[]> {
	const all = await getCollection('blog', ({ data }) => !data.draft || import.meta.env.DEV);
	return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// How much of each post the index shows as a preview.
export const EXCERPT_WORDS = 40;

/**
 * Opening words of a post's body as plain text, for the index. `more` is set
 * when the text was cut short, so the index can link to the rest.
 */
export function excerpt(post: Post, words = EXCERPT_WORDS): { text: string; more: boolean } {
	const text = (post.body ?? '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/^\[\^[^\]]+\]:.*$/gm, ' ')
		.replace(/\[\^[^\]]+\]/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
		// Odd pieces are inline code and stay verbatim. Elsewhere `\b_|_\b` drops
		// emphasis underscores but keeps snake_case intact.
		.split(/(`[^`]*`)/)
		.map((s, i) => (i % 2 ? s.slice(1, -1) : s.replace(/[*~]|\b_|_\b/g, '')))
		.join('')
		.replace(/\s+/g, ' ')
		.trim();

	const parts = text.split(' ');
	if (parts.length <= words) return { text, more: false };
	return { text: parts.slice(0, words).join(' ').replace(/[\s.,;:!?—–-]+$/, ''), more: true };
}

// Header images fill the 40rem text column (see --gutter in global.css); 2x for retina.
export const COVER_WIDTHS = [640, 1280];
export const COVER_SIZES = '(max-width: 42.5rem) calc(100vw - 2.5rem), 40rem';

/**
 * One stylesheet per family: Google rejects the whole request if any family in it
 * is missing a requested style, so only the regular weight is asked for and the
 * browser synthesizes bold and italic.
 */
export function fontHref(family: string): string {
	return `https://fonts.googleapis.com/css2?family=${family.trim().replace(/ +/g, '+')}&display=swap`;
}

/** Inline style that sets a post's own font, if it has one. */
export function fontStyle(post: Post): string | undefined {
	return post.data.font && `font-family: '${post.data.font}', 'EB Garamond', Georgia, serif`;
}

// Frontmatter dates parse as UTC midnight, so format in UTC or they slip a day.
export const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const longDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
