import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, getAdjacentPosts } from '../data/blog';
import BlogPost from '../../components/BlogPost';
import { cn } from '../../lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BlogPostPage() {
	const { slug } = useParams<{ slug: string }>();

	if (!slug) {
		return <Navigate to='/blog' replace />;
	}

	const post = getPostBySlug(slug);

	if (!post) {
		return (
			<div className='min-h-screen flex items-center justify-center px-4'>
				<div className='text-left'>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Post Not Found</h1>
					<p className='text-gray-600 dark:text-gray-300 mb-8'>
						The blog post you're looking for doesn't exist or has been removed.
					</p>
					<Link
						to='/blog'
						className={cn(
							'inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg',
							'hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
						)}
					>
						<ChevronLeftIcon className='h-4 w-4' />
						Back to Blog
					</Link>
				</div>
			</div>
		);
	}

	const { prev, next } = getAdjacentPosts(slug);

	return (
		<div className='min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
			{/* Back to Blog Link */}
			{/* <div className='max-w-4xl mx-auto mb-8'>
				<Link
					to='/blog'
					className={cn(
						'inline-flex items-center gap-2 text-gray-600 dark:text-gray-300',
						'hover:text-gray-900 dark:hover:text-white transition-colors',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md px-2 py-1'
					)}
				>
					<ChevronLeftIcon className='h-4 w-4' />
					Back to Blog
				</Link>
			</div> */}

			{/* Blog Post Content */}
			<BlogPost post={post} />

			{/* Previous/Next Navigation */}
			{(prev || next) && (
				<nav className='max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Previous Post */}
						<div className='flex justify-start'>
							{prev && (
								<Link
									to={`/blog/${prev.slug}`}
									className={cn(
										'group flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700',
										'hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50',
										'transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
										'w-full max-w-sm'
									)}
								>
									<ChevronLeftIcon className='h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 mt-0.5' />
									<div className='min-w-0'>
										<p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Previous</p>
										<h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
											{prev.title}
										</h3>
									</div>
								</Link>
							)}
						</div>

						{/* Next Post */}
						<div className='flex justify-end'>
							{next && (
								<Link
									to={`/blog/${next.slug}`}
									className={cn(
										'group flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700',
										'hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50',
										'transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
										'w-full max-w-sm text-right'
									)}
								>
									<div className='min-w-0'>
										<p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Next</p>
										<h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
											{next.title}
										</h3>
									</div>
									<ChevronRightIcon className='h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 mt-0.5' />
								</Link>
							)}
						</div>
					</div>
				</nav>
			)}
		</div>
	);
}
