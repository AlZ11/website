import { estimateReadingTime } from '../src/data/blog';
import type { BlogPost as BlogPostType } from '../src/data/blog';
import { SEOHelpers, ArticleJSONLD } from '../src/utils/seo';
import { cn } from '../lib/utils';

interface BlogPostProps {
	post: BlogPostType;
	baseUrl?: string;
	className?: string;
}

// Simple markdown-to-HTML converter for headings and basic formatting
function parseMarkdown(markdown: string): string {
	let html = markdown
		// Handle images
		.replace(
			/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g,
			'<img src="$2" alt="$1" title="$3" class="max-w-full h-auto rounded-lg" />'
		)

		// Handle links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')

		// Handle headings (h1-h4 only) with direct text utility classes
		.replace(/^(#{1,4})\s+(.+)$/gm, (_match, hashes, title) => {
			const level = hashes.length;
			const id = title
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-');

			// Define text utility classes for each heading level
			const textClasses = {
				1: 'text-4xl font-bold mb-8 mt-8 leading-tight pb-4 border-b border-gray-200 dark:border-gray-700',
				2: 'text-3xl font-semibold mb-6 mt-12 leading-tight pb-3 border-b border-gray-300 dark:border-gray-600',
				3: 'text-2xl font-semibold mb-4 mt-8 leading-tight',
				4: 'text-xl font-medium mb-3 mt-6 leading-tight'
			};

			const classes = `font-mono text-gray-900 dark:text-white ${textClasses[level as keyof typeof textClasses]}`;

			return `<h${level} id="${id}" class="${classes}">${title}</h${level}>`;
		})

		// Handle tables
		.replace(/\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)*)/g, (_match, header, rows) => {
			const headerCells = header
				.split('|')
				.map((cell: string) => cell.trim())
				.filter((cell: string) => cell);
			const rowLines = rows.trim().split('\n');

			let tableHtml = '<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-4">';
			tableHtml += '<thead class="bg-gray-50 dark:bg-gray-800">';
			tableHtml += '<tr>';
			headerCells.forEach((cell: string) => {
				tableHtml += `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">${cell}</th>`;
			});
			tableHtml += '</tr></thead>';
			tableHtml += '<tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">';

			rowLines.forEach((rowLine: string) => {
				if (rowLine.trim()) {
					const cells = rowLine
						.split('|')
						.map((cell: string) => cell.trim())
						.filter((cell: string) => cell);
					tableHtml += '<tr>';
					cells.forEach((cell: string) => {
						tableHtml += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${cell}</td>`;
					});
					tableHtml += '</tr>';
				}
			});

			tableHtml += '</tbody></table>';
			return tableHtml;
		})

		// Handle blockquotes (including nested)
		.replace(/^(>{1,})\s*(.+)$/gm, (_match, quotes, content) => {
			const level = quotes.length;
			const classes =
				level === 1
					? 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400'
					: 'border-l-4 border-gray-400 dark:border-gray-500 pl-4 italic text-gray-500 dark:text-gray-500 ml-4';
			return `<blockquote class="${classes}">${content}</blockquote>`;
		})

		// Handle unordered lists (including nested)
		.replace(/^(\s*)\*\s+(.+)$/gm, (_match, indent, content) => {
			const level = Math.floor(indent.length / 4);
			const marginClass = level > 0 ? `ml-${level * 4}` : '';
			return `<li class="list-disc list-inside ${marginClass}">${content}</li>`;
		})

		// Handle ordered lists (including nested)
		.replace(/^(\s*)\d+\.\s+(.+)$/gm, (_match, indent, content) => {
			const level = Math.floor(indent.length / 4);
			const marginClass = level > 0 ? `ml-${level * 4}` : '';
			return `<li class="list-decimal list-inside ${marginClass}">${content}</li>`;
		})

		// Wrap consecutive list items in ul/ol tags
		.replace(/(<li class="list-disc[^>]*>[^<]*<\/li>\n?)+/g, (match) => {
			return `<ul class="my-4 space-y-1">${match}</ul>`;
		})
		.replace(/(<li class="list-decimal[^>]*>[^<]*<\/li>\n?)+/g, (match) => {
			return `<ol class="my-4 space-y-1">${match}</ol>`;
		})

		// Handle bold (both ** and __ syntax)
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/__([^_]+)__/g, '<strong>$1</strong>')

		// Handle italic (both * and _ syntax, but not if inside words)
		.replace(/\*([^*]+)\*/g, '<em>$1</em>')
		.replace(/_([^_]+)_/g, '<em>$1</em>')

		// Handle line breaks (two spaces at end of line)
		.replace(/  \n/g, '<br />')

		// Handle paragraphs - split by double newlines, but avoid breaking existing HTML
		.replace(/\n\s*\n/g, '\n\n')
		.split('\n\n')
		.map((paragraph) => {
			paragraph = paragraph.trim();
			if (!paragraph) return '';

			// Don't wrap if it's already an HTML block element
			if (paragraph.match(/^<(h[1-6]|div|blockquote|ul|ol|li|table|pre|hr)/)) {
				return paragraph;
			}

			return `<p>${paragraph}</p>`;
		})
		.join('\n')

		// Clean up extra newlines and spaces
		.replace(/\n+/g, '\n')
		.replace(/\n/g, ' ')

		// Fix spacing around block elements
		.replace(/(<\/(?:h[1-6]|div|blockquote|ul|ol|table|pre)>) /g, '$1\n')
		.replace(/ (<(?:h[1-6]|div|blockquote|ul|ol|table|pre))/g, '\n$1')

		// Remove empty paragraphs
		.replace(/<p>\s*<\/p>/g, '');

	return html;
}

export default function BlogPost({ post, baseUrl = '', className }: BlogPostProps) {
	const html = parseMarkdown(post.body);
	const readingTime = estimateReadingTime(post.body);
	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<>
			<SEOHelpers
				title={post.title}
				description={post.metaDescription || post.subtitle}
				canonicalUrl={`${baseUrl}/blog/${post.slug}`}
				ogImage={post.coverImage ? `${baseUrl}${post.coverImage}` : undefined}
				ogType='article'
				publishedTime={post.date}
				author={post.author}
				tags={post.tags}
			/>
			<ArticleJSONLD post={post} baseUrl={baseUrl} />

			<article className={cn('max-w-4xl mx-auto', className)}>
				{/* Header */}
				<header className='mb-8 pb-8 border-b border-gray-200 dark:border-gray-700'>
					{post.coverImage && (
						<div className='relative w-full h-64 md:h-96 rounded-lg mb-6 overflow-hidden z-50'>
							<img
								src={post.coverImage}
								alt={post.title}
								className='relative w-full h-full object-contain z-10'
								loading='eager'
							/>
						</div>
					)}

					<div className='space-y-4'>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight'>
							{post.title}
						</h1>

						{post.subtitle && (
							<p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed'>{post.subtitle}</p>
						)}

						{/* Meta information */}
						<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
							<div className='flex items-center gap-2'>
								<span>By</span>
								<span className='font-medium text-gray-700 dark:text-gray-200'>{post.author}</span>
							</div>

							<div className='flex items-center gap-2'>
								<time dateTime={post.date}>{formattedDate}</time>
							</div>

							<div className='flex items-center gap-2'>
								<span>{readingTime} min read</span>
							</div>
						</div>

						{/* Tags */}
						{post.tags.length > 0 && (
							<div className='flex flex-wrap gap-2'>
								{post.tags.map((tag) => (
									<span
										key={tag}
										className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</header>

				{/* Content */}
				<div
					className={cn(
						'prose prose-gray dark:prose-invert max-w-none text-left font-mono leading-7',
						// Paragraph styles
						'prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 prose-p:mb-4 prose-p:text-left prose-p:font-mono',
						// Link styles
						'prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-mono',
						// List styles
						'prose-ul:mb-4 prose-ol:mb-4 prose-ul:leading-7 prose-ol:leading-7',
						'prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:font-mono prose-li:leading-7',
						// Table styles
						'prose-table:font-mono prose-th:font-mono prose-td:font-mono',
						// Blockquote styles
						'prose-blockquote:font-mono prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic'
					)}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</article>
		</>
	);
}
