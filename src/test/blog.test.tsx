import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BlogPost from '../../components/BlogPost';
import BlogIndex from '../pages/blog-index';
// import { blogPosts } from '../data/blog'; // Unused import

// Mock the blog data to ensure consistent testing
vi.mock('../data/blog', () => ({
	blogPosts: [
		{
			slug: 'test-post-1',
			title: 'Test Post 1',
			subtitle: 'This is a test post subtitle',
			author: 'Test Author',
			date: '2025-09-14',
			tags: ['test', 'react'],
			body: '# Test Content\n\nThis is test content for the blog post.',
			published: true,
			metaDescription: 'Test meta description'
		},
		{
			slug: 'test-post-2',
			title: 'Test Post 2',
			subtitle: 'Another test post',
			author: 'Test Author',
			date: '2025-09-13',
			tags: ['javascript', 'testing'],
			body: '## Another Test\n\nMore test content here.',
			published: true
		}
	],
	getAllPosts: () => [
		{
			slug: 'test-post-1',
			title: 'Test Post 1',
			subtitle: 'This is a test post subtitle',
			author: 'Test Author',
			date: '2025-09-14',
			tags: ['test', 'react'],
			body: '# Test Content\n\nThis is test content for the blog post.',
			published: true,
			metaDescription: 'Test meta description'
		},
		{
			slug: 'test-post-2',
			title: 'Test Post 2',
			subtitle: 'Another test post',
			author: 'Test Author',
			date: '2025-09-13',
			tags: ['javascript', 'testing'],
			body: '## Another Test\n\nMore test content here.',
			published: true
		}
	],
	getAllTags: () => ['test', 'react', 'javascript', 'testing'],
	searchPosts: (_query: string) => [
		{
			slug: 'test-post-1',
			title: 'Test Post 1',
			subtitle: 'This is a test post subtitle',
			author: 'Test Author',
			date: '2025-09-14',
			tags: ['test', 'react'],
			body: '# Test Content\n\nThis is test content for the blog post.',
			published: true,
			metaDescription: 'Test meta description'
		}
	],
	estimateReadingTime: () => 2,
	getPostsByTag: () => []
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => <BrowserRouter>{children}</BrowserRouter>;

describe('BlogPost Component', () => {
	const mockPost = {
		slug: 'test-post',
		title: 'Test Blog Post',
		subtitle: 'A test blog post subtitle',
		author: 'Test Author',
		date: '2025-09-14',
		tags: ['react', 'testing'],
		body: '# Test Heading\n\nThis is a test paragraph with **bold** and *italic* text.\n\n## Sub Heading\n\nAnother paragraph.',
		published: true,
		metaDescription: 'Test meta description'
	};

	it('renders blog post title and subtitle', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
		expect(screen.getByText('A test blog post subtitle')).toBeInTheDocument();
	});

	it('renders author and date information', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		expect(screen.getByText('Test Author')).toBeInTheDocument();
		expect(screen.getByText('September 14, 2025')).toBeInTheDocument();
	});

	it('renders tags', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		expect(screen.getByText('react')).toBeInTheDocument();
		expect(screen.getByText('testing')).toBeInTheDocument();
	});

	it('displays reading time', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		expect(screen.getByText(/min read/)).toBeInTheDocument();
	});

	it('renders markdown content as HTML', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		// Check if headings are rendered in the content
		expect(screen.getByText('Test Heading')).toBeInTheDocument();
		expect(screen.getByText('Sub Heading')).toBeInTheDocument();
	});

	it('renders content without table of contents', () => {
		render(<BlogPost post={mockPost} />, { wrapper: TestWrapper });

		expect(screen.queryByText('Table of Contents')).not.toBeInTheDocument();
	});
});

describe('BlogIndex Component', () => {
	it('renders blog index page title', () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		expect(screen.getByText('Blog')).toBeInTheDocument();
		expect(screen.getByText("Random stuff I've written")).toBeInTheDocument();
	});

	it('renders search input', () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		const searchInput = screen.getByPlaceholderText('Search posts...');
		expect(searchInput).toBeInTheDocument();
	});

	it('renders tag filters', async () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		await waitFor(() => {
			expect(screen.getAllByText('test')[0]).toBeInTheDocument();
			expect(screen.getAllByText('react')[0]).toBeInTheDocument();
		});
	});

	it('filters posts by search query', async () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		const searchInput = screen.getByPlaceholderText('Search posts...');
		fireEvent.change(searchInput, { target: { value: 'test' } });

		await waitFor(() => {
			expect(screen.getByText('Test Post 1')).toBeInTheDocument();
		});
	});

	it('displays post count', async () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		await waitFor(() => {
			expect(screen.getByText(/posts? found/)).toBeInTheDocument();
		});
	});

	it('renders blog post cards with correct information', async () => {
		render(<BlogIndex />, { wrapper: TestWrapper });

		await waitFor(() => {
			expect(screen.getByText('Test Post 1')).toBeInTheDocument();
			expect(screen.getByText('This is a test post subtitle')).toBeInTheDocument();
			expect(screen.getAllByText('By Test Author')[0]).toBeInTheDocument();
		});
	});
});
