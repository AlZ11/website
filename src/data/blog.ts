export interface BlogPost {
	slug: string;
	title: string;
	subtitle: string;
	author: string;
	date: string;
	tags: string[];
	coverImage?: string;
	body: string;
	published: boolean;
	metaDescription?: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'hello-world',
		title: 'Hello World',
		subtitle: 'My first blog post',
		author: 'Alex Zhang',
		date: '2025-09-14',
		tags: [],
		coverImage: '/test.png',
		body: `Hi, I haven't got anything written so far but I thought starting to blog would be cool. 
		\nThe idea is to write stuff related to football, tech and other random things I find interesting and want to document.
`,
		published: true,
		metaDescription: 'Random blog posts'
	}
];

export function getAllPosts(): BlogPost[] {
	return blogPosts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug && post.published);
}

export function getPostsByTag(tag: string): BlogPost[] {
	return getAllPosts().filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
}

export function searchPosts(query: string): BlogPost[] {
	const searchTerm = query.toLowerCase();
	return getAllPosts().filter(
		(post) =>
			post.title.toLowerCase().includes(searchTerm) ||
			post.subtitle.toLowerCase().includes(searchTerm) ||
			post.body.toLowerCase().includes(searchTerm) ||
			post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
	);
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	getAllPosts().forEach((post) => {
		post.tags.forEach((tag) => tags.add(tag));
	});
	return Array.from(tags).sort();
}

export function estimateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}

export function getAdjacentPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
	const posts = getAllPosts();
	const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

	return {
		prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
		next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
	};
}
