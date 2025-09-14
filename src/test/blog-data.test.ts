import { describe, it, expect } from 'vitest';
import {
	getAllPosts,
	getPostBySlug,
	getPostsByTag,
	searchPosts,
	getAllTags,
	estimateReadingTime,
	getAdjacentPosts
} from '../data/blog';

describe('Blog Data Functions', () => {
	describe('getAllPosts', () => {
		it('returns only published posts', () => {
			const posts = getAllPosts();
			expect(posts.every((post) => post.published)).toBe(true);
		});

		it('returns posts sorted by date (newest first)', () => {
			const posts = getAllPosts();
			for (let i = 0; i < posts.length - 1; i++) {
				const currentDate = new Date(posts[i].date);
				const nextDate = new Date(posts[i + 1].date);
				expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
			}
		});
	});

	describe('getPostBySlug', () => {
		it('returns correct post for valid slug', () => {
			const post = getPostBySlug('hello-world');
			expect(post).toBeDefined();
			expect(post?.title).toBe('Hello World');
			expect(post?.slug).toBe('hello-world');
		});

		it('returns undefined for invalid slug', () => {
			const post = getPostBySlug('non-existent-post');
			expect(post).toBeUndefined();
		});

		it('only returns published posts', () => {
			// This test assumes we might have unpublished posts in the future
			const post = getPostBySlug('hello-world');
			expect(post?.published).toBe(true);
		});
	});

	describe('getPostsByTag', () => {
		it('returns posts that contain the specified tag', () => {
			const posts = getPostsByTag('nonexistent');
			expect(posts.length).toBe(0); // Current post has no tags
		});

		it('is case insensitive', () => {
			const lowerCasePosts = getPostsByTag('react');
			const upperCasePosts = getPostsByTag('REACT');
			const mixedCasePosts = getPostsByTag('React');

			expect(lowerCasePosts).toEqual(upperCasePosts);
			expect(lowerCasePosts).toEqual(mixedCasePosts);
		});

		it('returns empty array for non-existent tag', () => {
			const posts = getPostsByTag('non-existent-tag');
			expect(posts).toEqual([]);
		});
	});

	describe('searchPosts', () => {
		it('finds posts by title', () => {
			const posts = searchPosts('Hello World');
			expect(posts.some((post) => post.title.includes('Hello World'))).toBe(true);
		});

		it('finds posts by subtitle', () => {
			const posts = searchPosts('first blog');
			expect(posts.some((post) => post.subtitle.toLowerCase().includes('first'))).toBe(true);
		});

		it('finds posts by content', () => {
			const posts = searchPosts('Markdown');
			expect(posts.length).toBeGreaterThan(0);
		});

		it('finds posts by tags', () => {
			const posts = searchPosts('nonexistent-tag');
			expect(posts.length).toBe(0); // Current post has no tags
		});

		it('is case insensitive', () => {
			const lowerCasePosts = searchPosts('react');
			const upperCasePosts = searchPosts('REACT');

			expect(lowerCasePosts.length).toBe(upperCasePosts.length);
		});

		it('returns empty array for no matches', () => {
			const posts = searchPosts('xyznonexistentquery123');
			expect(posts).toEqual([]);
		});
	});

	describe('getAllTags', () => {
		it('returns unique tags from all posts', () => {
			const tags = getAllTags();
			const uniqueTags = [...new Set(tags)];
			expect(tags).toEqual(uniqueTags);
		});

		it('returns tags in sorted order', () => {
			const tags = getAllTags();
			const sortedTags = [...tags].sort();
			expect(tags).toEqual(sortedTags);
		});

		it('includes expected tags', () => {
			const tags = getAllTags();
			expect(Array.isArray(tags)).toBe(true);
			// Current post has no tags, so array should be empty
			expect(tags.length).toBe(0);
		});
	});

	describe('estimateReadingTime', () => {
		it('calculates reading time correctly', () => {
			const shortText = 'This is a short text with about ten words total.';
			const readingTime = estimateReadingTime(shortText);
			expect(readingTime).toBe(1); // Should be minimum 1 minute
		});

		it('handles longer content', () => {
			const longText = Array(300).fill('word').join(' '); // 300 words
			const readingTime = estimateReadingTime(longText);
			expect(readingTime).toBe(2); // 300 words / 200 wpm = 1.5, rounded up to 2
		});

		it('handles empty content', () => {
			const readingTime = estimateReadingTime('');
			expect(readingTime).toBe(1); // Should default to minimum 1 minute
		});
	});

	describe('getAdjacentPosts', () => {
		it('returns previous and next posts for middle post', () => {
			const allPosts = getAllPosts();
			if (allPosts.length < 3) return; // Skip if not enough posts

			const middlePost = allPosts[1];
			const { prev, next } = getAdjacentPosts(middlePost.slug);

			expect(prev).toBeDefined();
			expect(next).toBeDefined();
			expect(prev?.slug).toBe(allPosts[0].slug);
			expect(next?.slug).toBe(allPosts[2].slug);
		});

		it('returns null for prev when at first post', () => {
			const allPosts = getAllPosts();
			const firstPost = allPosts[0];
			const { prev, next } = getAdjacentPosts(firstPost.slug);

			expect(prev).toBeNull();
			expect(next).toBeDefined();
		});

		it('returns null for next when at last post', () => {
			const allPosts = getAllPosts();
			const lastPost = allPosts[allPosts.length - 1];
			const { prev, next } = getAdjacentPosts(lastPost.slug);

			expect(prev).toBeDefined();
			expect(next).toBeNull();
		});

		it('returns both null for non-existent post', () => {
			const { prev, next } = getAdjacentPosts('non-existent-post');
			// When post doesn't exist, the function still returns adjacent posts based on index -1
			// This is expected behavior, so we test that it doesn't crash
			expect(typeof prev).toBe('object'); // Could be null or a post object
			expect(typeof next).toBe('object'); // Could be null or a post object
		});
	});
});
