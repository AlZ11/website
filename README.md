# Alex Zhang's Personal Website

A modern personal website built with React, TypeScript, and Vite, featuring a responsive design with Tailwind CSS and a fully-featured blog system.

## Features

- **Modern React 19** with TypeScript and Vite
- **Blog System** with full-text search, tag filtering, and pagination
- **SEO Optimized** with meta tags, Open Graph, and JSON-LD structured data
- **Responsive Design** using Tailwind CSS v4
- **Dark Mode Support** with theme switching
- **Smooth Animations** using Framer Motion alternative (motion)
- **Testing Suite** with Vitest and React Testing Library
- **Accessible** components with proper ARIA labels

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: motion (Framer Motion alternative)
- **Testing**: Vitest, React Testing Library
- **SEO**: React Helmet alternative with custom SEO helpers

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			...tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			...tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			...tseslint.configs.stylisticTypeChecked

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname
			}
			// other options...
		}
	}
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs['recommended-typescript'],
			// Enable lint rules for React DOM
			reactDom.configs.recommended
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname
			}
			// other options...
		}
	}
]);
```
