# Blog System Documentation

## Overview

The website includes a comprehensive blog system with the following features:

## File Structure

```
src/
├── data/
│   └── blog.ts              # Blog posts data and helper functions
├── pages/
│   ├── blog-index.tsx       # Blog listing page (/blog)
│   └── blog-post.tsx        # Individual blog post page (/blog/[slug])
├── utils/
│   └── seo.tsx              # SEO helpers and JSON-LD generation
└── test/
    ├── blog.test.tsx        # Component tests
    ├── blog-data.test.ts    # Data function tests
    └── setup.ts             # Test configuration

components/
└── BlogPost.tsx             # Reusable blog post component
```

## Adding a New Blog Post

To add a new blog post, follow these steps:

1. **Open the blog data file**: `src/data/blog.ts`

2. **Add your new post** to the `blogPosts` array:

```typescript
{
  slug: "your-post-url-slug",                    // URL-friendly identifier
  title: "Your Post Title",                     // Main title
  subtitle: "Your post subtitle or excerpt",   // Appears in listings
  author: "Your Name",                          // Author name
  date: "2025-09-14",                          // Publication date (YYYY-MM-DD)
  tags: ["tag1", "tag2", "tag3"],              // Searchable tags
  coverImage: "/path-to-image.jpg",            // Optional cover image
  body: `# Your Markdown Content

Your blog post content goes here in **Markdown** format.

## Subheadings

- Lists work
- Code blocks work too

\`\`\`javascript
console.log('Hello World');
\`\`\`

Regular paragraphs and *emphasis* work as expected.`,
  published: true,                              // Set to false for drafts
  metaDescription: "SEO description"            // Optional: for better SEO
}
```

3. **Save the file** - the new post will automatically appear in:
   - Blog index page (`/blog`)
   - Search results
   - Tag filtering
   - RSS-style chronological ordering

## Blog Post Features

Each blog post automatically includes:

- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Reading Time Estimation**: Calculated at ~200 words per minute
- **Clear Typography Hierarchy**: H1-H4 headers with distinct visual sizes
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Follows site theme
- **Previous/Next Navigation**: Links to adjacent posts
- **Tag System**: Clickable tags for filtering
- **Social Sharing**: Ready for Open Graph and Twitter Cards

## Blog Index Features

The blog index page (`/blog`) includes:

- **Full-Text Search**: Search through titles, subtitles, content, and tags
- **Tag Filtering**: Click any tag to filter posts
- **Pagination**: Displays 6 posts per page
- **Responsive Grid**: Adapts to screen size
- **Post Previews**: Shows title, subtitle, author, date, and tags

## Supported Markdown Features

The blog system supports comprehensive Markdown syntax:

### Headers

- **Four levels supported**: `# H1`, `## H2`, `### H3`, `#### H4`
- Direct Tailwind utility classes applied to each heading:
  - `# H1` - `text-4xl font-bold` with bottom border and spacing
  - `## H2` - `text-3xl font-semibold` with bottom border and spacing
  - `### H3` - `text-2xl font-semibold` with proper spacing
  - `#### H4` - `text-xl font-medium` with spacing
- Includes `font-mono` and dark mode color classes
- Auto-generated IDs for anchor linking

### Text Formatting

- **Bold**: `**bold text**` or `__bold text__`
- **Italic**: `*italic text*` or `_italic text_`
- **Combined**: `_You **can** combine them_`
- **Inline Code**: `` `code` ``

### Links and Images

- **Links**: `[Link Text](https://example.com)`
- **Images**: `![Alt Text](/path/to/image.jpg "Optional Title")`
- Images are automatically responsive with rounded corners

### Lists

- **Unordered**: Use `*` or `-`
- **Ordered**: Use `1.`, `2.`, etc.
- **Nested**: Indent with 4 spaces for sub-items

```
* Item 1
* Item 2
    * Nested item
    * Another nested item
1. First item
2. Second item
    1. Sub-item
```

### Blockquotes

- **Single**: `> Quote text`
- **Nested**: `>> Nested quote`

```
> This is a blockquote
>
>> This is nested
```

### Tables

- Full table support with headers and alignment

```
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Code Blocks

- **Fenced**: ` `language ```
- **Syntax highlighting** ready (specify language)

```javascript
let message = 'Hello world';
console.log(message);
```

### Line Breaks

- **Hard breaks**: End line with two spaces `  `
- **Paragraph breaks**: Double newline

## Testing

Run the test suite to ensure everything works correctly:

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test
```

## Development Workflow

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **Add your blog post** to `src/data/blog.ts`

3. **Preview at** `http://localhost:5173/blog`

4. **Run tests** to ensure no issues:

   ```bash
   npm run test:run
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Best Practices

- **Use descriptive slugs**: Make URLs readable and SEO-friendly
- **Add meta descriptions**: Helps with SEO and social sharing
- **Include cover images**: Improves visual appeal and sharing
- **Use relevant tags**: Helps users discover related content
- **Keep content accessible**: Use proper heading hierarchy
- **Test on mobile**: Ensure responsive design works well
