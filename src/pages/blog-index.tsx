import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getAllTags, searchPosts, estimateReadingTime } from '../data/blog';
import { SEOHelpers } from '../utils/seo';
import { cn } from '../../lib/utils';
import { MagnifyingGlassIcon, TagIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const POSTS_PER_PAGE = 6;

export default function BlogIndex() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTag, setSelectedTag] = useState<string>('');
	const [currentPage, setCurrentPage] = useState(1);

	const allPosts = getAllPosts();
	const allTags = getAllTags();

	// Filter posts based on search and tag
	const filteredPosts = useMemo(() => {
		let posts = allPosts;

		if (searchQuery) {
			posts = searchPosts(searchQuery);
		}

		if (selectedTag) {
			posts = posts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase()));
		}

		return posts;
	}, [allPosts, searchQuery, selectedTag]);

	// Pagination
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
	const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, selectedTag]);

	const handleTagClick = (tag: string) => {
		if (selectedTag === tag) {
			setSelectedTag('');
		} else {
			setSelectedTag(tag);
		}
	};

	const clearFilters = () => {
		setSearchQuery('');
		setSelectedTag('');
	};

	return (
		<>
			<SEOHelpers
				title='Blog'
				description='Technical articles about web development, React, TypeScript, and modern frontend practices.'
			/>

			<div className='min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-6xl mx-auto'>
					{/* Header */}
					<header className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>Blog</h1>
						<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>Random stuff I've written</p>
					</header>

					{/* Search and Filters */}
					<div className='mb-8 space-y-4'>
						{/* Search Bar */}
						<div className='relative max-w-md mx-auto'>
							<MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
							<input
								type='text'
								placeholder='Search posts...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className={cn(
									'w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg',
									'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
									'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
									'transition-colors'
								)}
							/>
						</div>

						{/* Tags Filter */}
						<div className='flex flex-wrap justify-center gap-2'>
							{allTags.map((tag) => (
								<button
									key={tag}
									onClick={() => handleTagClick(tag)}
									className={cn(
										'px-3 py-1 rounded-full text-sm font-medium transition-all',
										'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
										selectedTag === tag
											? 'bg-blue-600 text-white hover:bg-blue-700'
											: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
									)}
								>
									<TagIcon className='inline h-3 w-3 mr-1' />
									{tag}
								</button>
							))}
						</div>

						{/* Active Filters Display */}
						{(searchQuery || selectedTag) && (
							<div className='flex flex-wrap items-center justify-center gap-2 text-sm'>
								<span className='text-gray-600 dark:text-gray-300'>Active filters:</span>
								{searchQuery && (
									<span className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded'>
										Search: "{searchQuery}"
									</span>
								)}
								{selectedTag && (
									<span className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded'>
										Tag: {selectedTag}
									</span>
								)}
								<button
									onClick={clearFilters}
									className='px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline'
								>
									Clear all
								</button>
							</div>
						)}
					</div>

					{/* Results Count */}
					<div className='text-center mb-8'>
						<p className='text-gray-600 dark:text-gray-300'>
							{filteredPosts.length === 0
								? 'No posts found'
								: `${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} found`}
						</p>
					</div>

					{/* Blog Posts Grid */}
					{paginatedPosts.length > 0 ? (
						<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'>
							{paginatedPosts.map((post) => {
								const readingTime = estimateReadingTime(post.body);
								const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								});

								return (
									<article
										key={post.slug}
										className={cn(
											'group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm',
											'border border-gray-200 dark:border-gray-700',
											'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
											'transition-all duration-200'
										)}
									>
										<Link to={`/blog/${post.slug}`} className='block'>
											{post.coverImage && (
												<div className='aspect-video overflow-hidden bg-gray-50 dark:bg-gray-900'>
													<img
														src={post.coverImage}
														alt={post.title}
														className='w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-200 z-50'
														loading='lazy'
													/>
												</div>
											)}

											<div className='p-6'>
												<div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3'>
													<div className='flex items-center gap-1'>
														<CalendarIcon className='h-3 w-3' />
														<time dateTime={post.date}>{formattedDate}</time>
													</div>
													<div className='flex items-center gap-1'>
														<ClockIcon className='h-3 w-3' />
														<span>{readingTime} min read</span>
													</div>
												</div>

												<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
													{post.title}
												</h2>

												<p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3'>{post.subtitle}</p>

												<div className='flex flex-wrap gap-1 mb-4'>
													{post.tags.slice(0, 3).map((tag) => (
														<span
															key={tag}
															className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs'
														>
															{tag}
														</span>
													))}
													{post.tags.length > 3 && (
														<span className='px-2 py-1 text-gray-500 dark:text-gray-400 text-xs'>
															+{post.tags.length - 3} more
														</span>
													)}
												</div>

												<div className='text-sm text-gray-500 dark:text-gray-400'>By {post.author}</div>
											</div>
										</Link>
									</article>
								);
							})}
						</div>
					) : (
						<div className='text-center py-12'>
							<p className='text-gray-600 dark:text-gray-300 mb-4'>No posts match your current filters.</p>
							<button
								onClick={clearFilters}
								className={cn(
									'px-6 py-3 bg-blue-600 text-white rounded-lg',
									'hover:bg-blue-700 transition-colors',
									'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
								)}
							>
								Clear Filters
							</button>
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center space-x-2'>
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className={cn(
									'px-4 py-2 rounded-lg border transition-colors',
									'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
									currentPage === 1
										? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
										: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
								)}
							>
								Previous
							</button>

							<span className='px-4 py-2 text-sm text-gray-600 dark:text-gray-300'>
								Page {currentPage} of {totalPages}
							</span>

							<button
								onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
								className={cn(
									'px-4 py-2 rounded-lg border transition-colors',
									'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
									currentPage === totalPages
										? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
										: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
								)}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
