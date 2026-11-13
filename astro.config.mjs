// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Stamps `minutesRead` onto each Markdown entry's frontmatter so pages can show
 * a reading estimate without shipping a runtime word count.
 */
function remarkReadingTime() {
	return (tree, file) => {
		const words = String(file).trim().split(/\s+/).filter(Boolean).length;
		file.data.astro.frontmatter.minutesRead = words / 220;
	};
}

export default defineConfig({
	site: 'https://blog.alexxu.me',
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
	},
});
