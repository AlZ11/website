import '@testing-library/jest-dom';

// Mock window.scrollTo for tests
Object.defineProperty(window, 'scrollTo', {
	value: () => {},
	writable: true
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
};
