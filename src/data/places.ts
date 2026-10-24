export type Role = { org: string; detail: string };

export type Place = {
	id: string;
	city: string;
	country: string;
	lat: number;
	lng: number;
	/** 'home'/'study' are the "lived / studied" pins (larger, pulsing, with roles); 'visited' are travel pins. */
	type: 'home' | 'study' | 'visited';
	tag?: string;
	/** One-line highlight shown on the card. Edit freely. */
	highlight: string;
	/** Only on home/study places. */
	roles?: Role[];
};

export const isKey = (p: Place) => p.type === 'home' || p.type === 'study';

/** Real photo path by convention — drop `<id>.jpg` into public/map/photos/. Falls back to a placeholder. */
export const photoUrl = (p: Place) => `/map/photos/${p.id}.jpg`;

/** Deterministic stylised skyline, used until a real photo is added. */
export function photoPlaceholder(city: string): string {
	const h = [40, 70, 52, 88, 60, 108, 74, 50, 96, 64, 80, 44, 100, 70, 58];
	const w = 360 / h.length;
	let bars = '';
	let lights = '';
	for (let i = 0; i < h.length; i++)
		bars += `<rect x='${(i * w).toFixed(1)}' y='${150 - h[i]}' width='${(w - 3).toFixed(1)}' height='${h[i]}' fill='#0b1426'/>`;
	for (let i = 0; i < 46; i++)
		lights += `<rect x='${(i * 53) % 360}' y='${92 + ((i * 29) % 52)}' width='2' height='2' fill='rgba(147,197,253,0.45)'/>`;
	const svg =
		`<svg xmlns='http://www.w3.org/2000/svg' width='360' height='150'>` +
		`<defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#15284a'/><stop offset='0.6' stop-color='#0b1426'/><stop offset='1' stop-color='#080d18'/></linearGradient></defs>` +
		`<rect width='360' height='150' fill='url(#s)'/><circle cx='298' cy='32' r='15' fill='rgba(96,165,250,0.22)'/>` +
		bars +
		lights +
		`<text x='18' y='28' fill='rgba(226,232,240,0.5)' font-family='monospace' font-size='11' letter-spacing='3'>${city.toUpperCase()}</text></svg>`;
	return 'data:image/svg+xml;base64,' + btoa(svg);
}

export const PLACES: Place[] = [
	{
		id: 'melbourne', city: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, type: 'home', tag: 'Home base',
		highlight: 'Home base — my degree, two AI internships and a decade of football.',
		roles: [
			{ org: 'Monash University', detail: 'B.Sc Computer Science (Distinction) · Data Science' },
			{ org: 'CSIRO', detail: 'AI Research Intern' },
			{ org: 'Hawthorn FC', detail: 'AI Intern · GPS & match telemetry' }
		]
	},
	{ id: 'sydney', city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, type: 'visited', highlight: 'Harbour views, the Opera House and Bondi sunrises.' },
	{ id: 'goldcoast', city: 'Gold Coast', country: 'Australia', lat: -28.0167, lng: 153.4, type: 'visited', highlight: 'Theme parks, surf breaks and endless beaches.' },
	{ id: 'tasmania', city: 'Tasmania', country: 'Australia', lat: -42.8821, lng: 147.3272, type: 'visited', highlight: 'Wild coastlines, MONA and the cleanest air on earth.' },
	{ id: 'shanghai', city: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, type: 'visited', highlight: 'The Bund skyline and late-night xiaolongbao.' },
	{ id: 'chengdu', city: 'Chengdu', country: 'China', lat: 30.5728, lng: 104.0668, type: 'visited', highlight: 'Pandas, hotpot and the slow Sichuan pace.' },
	{
		id: 'austin', city: 'Austin', country: 'United States', lat: 30.2672, lng: -97.7431, type: 'study', tag: 'Exchange',
		highlight: 'A semester of mathematics at UT, live music on every corner.',
		roles: [{ org: 'University of Texas at Austin', detail: 'B.Sc Mathematics · Exchange' }]
	},
	{ id: 'houston', city: 'Houston', country: 'United States', lat: 29.7604, lng: -95.3698, type: 'visited', highlight: 'Space Center and Tex-Mex in the Texas heat.' },
	{ id: 'la', city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437, type: 'visited', highlight: 'Santa Monica, Sunset Boulevard and the Hollywood sign.' },
	{ id: 'miami', city: 'Miami', country: 'United States', lat: 25.7617, lng: -80.1918, type: 'visited', highlight: 'Art deco, Ocean Drive and South Beach.' },
	{ id: 'nyc', city: 'New York City', country: 'United States', lat: 40.7128, lng: -74.006, type: 'visited', highlight: 'The city that never sleeps — Midtown to Brooklyn.' },
	{ id: 'philly', city: 'Philadelphia', country: 'United States', lat: 39.9526, lng: -75.1652, type: 'visited', highlight: 'Cheesesteaks and the birthplace of America.' },
	{ id: 'fiji', city: 'Fiji', country: 'Fiji', lat: -18.1416, lng: 178.4419, type: 'visited', highlight: 'Island time — reefs, kava and impossibly blue water.' },
	{
		id: 'tokyo', city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, type: 'study', tag: 'On exchange',
		highlight: 'Studying at Waseda while chasing ramen and neon.',
		roles: [{ org: 'Waseda University', detail: 'B.Eng CS & Communications Eng · Exchange' }]
	},
	{ id: 'osaka', city: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023, type: 'visited', highlight: 'Dotonbori lights and the best street food in Japan.' },
	{ id: 'shizuoka', city: 'Shizuoka', country: 'Japan', lat: 34.9756, lng: 138.3828, type: 'visited', highlight: 'Green tea fields in the shadow of Mount Fuji.' },
	{ id: 'kobe', city: 'Kobe', country: 'Japan', lat: 34.6901, lng: 135.1955, type: 'visited', highlight: 'Harbour city famous for its beef.' },
	{ id: 'kyoto', city: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, type: 'visited', highlight: 'A thousand shrines, bamboo groves and old Japan.' },
	{ id: 'hiroshima', city: 'Hiroshima', country: 'Japan', lat: 34.3853, lng: 132.4553, type: 'visited', highlight: "Peace Park, okonomiyaki and Miyajima's floating torii." },
	{ id: 'yokohama', city: 'Yokohama', country: 'Japan', lat: 35.4437, lng: 139.638, type: 'visited', highlight: "Waterfront Minato Mirai and Japan's biggest Chinatown." }
];
