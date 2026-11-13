import rss from '@astrojs/rss';
import { getPosts, BLOG_NAME, BLOG_DESCRIPTION } from '../lib/posts';

export async function GET(context) {
	const posts = (await getPosts()).filter((p) => !p.data.draft);

	return rss({
		title: `${BLOG_NAME} — Blog`,
		description: BLOG_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.summary,
			pubDate: post.data.date,
			link: `/${post.id}/`,
		})),
	});
}
