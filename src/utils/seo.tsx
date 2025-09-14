import type { BlogPost } from '../data/blog';

export interface SEOProps {
	title: string;
	description?: string;
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: 'website' | 'article';
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	tags?: string[];
}

export function SEOHelpers({
	title,
	description,
	canonicalUrl,
	ogImage,
	ogType = 'website',
	publishedTime,
	modifiedTime,
	author,
	tags
}: SEOProps) {
	const siteTitle = 'Alex Zhang';
	const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
	const defaultDescription = 'Personal website and blog of Alex Zhang';
	const metaDescription = description || defaultDescription;

	return (
		<>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name='description' content={metaDescription} />
			{canonicalUrl && <link rel='canonical' href={canonicalUrl} />}

			{/* Open Graph Meta Tags */}
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={metaDescription} />
			<meta property='og:type' content={ogType} />
			{canonicalUrl && <meta property='og:url' content={canonicalUrl} />}
			{ogImage && <meta property='og:image' content={ogImage} />}

			{/* Article specific tags */}
			{ogType === 'article' && publishedTime && <meta property='article:published_time' content={publishedTime} />}
			{ogType === 'article' && modifiedTime && <meta property='article:modified_time' content={modifiedTime} />}
			{ogType === 'article' && author && <meta property='article:author' content={author} />}
			{ogType === 'article' && tags && tags.map((tag) => <meta key={tag} property='article:tag' content={tag} />)}

			{/* Twitter Card Meta Tags */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={metaDescription} />
			{ogImage && <meta name='twitter:image' content={ogImage} />}
		</>
	);
}

export function generateArticleJSONLD(post: BlogPost, baseUrl: string = ''): string {
	const articleData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.metaDescription || post.subtitle,
		author: {
			'@type': 'Person',
			name: post.author
		},
		datePublished: post.date,
		dateModified: post.date,
		url: `${baseUrl}/blog/${post.slug}`,
		...(post.coverImage && {
			image: {
				'@type': 'ImageObject',
				url: `${baseUrl}${post.coverImage}`
			}
		}),
		keywords: post.tags.join(', '),
		publisher: {
			'@type': 'Person',
			name: 'Alex Zhang'
		}
	};

	return JSON.stringify(articleData);
}

export function ArticleJSONLD({ post, baseUrl = '' }: { post: BlogPost; baseUrl?: string }) {
	const jsonLD = generateArticleJSONLD(post, baseUrl);

	return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: jsonLD }} />;
}

// Hook for setting document title and meta tags
export function useDocumentTitle(title: string) {
	const siteTitle = 'Alex Zhang';
	const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

	if (typeof document !== 'undefined') {
		document.title = fullTitle;
	}
}
