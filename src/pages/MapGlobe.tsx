import { useEffect, useRef, useState, useCallback } from 'react';
import Globe, { type GlobeInstance } from 'globe.gl';
import { PLACES, isKey, photoPlaceholder, photoUrl, type Place } from '../data/places';

const REVEAL = 1.9; // zoom closer than this and visited-city labels appear
const ACCENT = '#60a5fa';

export default function MapGlobe() {
	const mountRef = useRef<HTMLDivElement>(null);
	const worldRef = useRef<GlobeInstance | null>(null);
	const selectedRef = useRef<Place | null>(null);
	const hoveredRef = useRef<Place | null>(null);
	const altRef = useRef(2.3);
	const [selected, setSelected] = useState<Place | null>(null);

	const select = useCallback((p: Place | null) => {
		selectedRef.current = p;
		setSelected(p);
		const world = worldRef.current;
		if (!world) return;
		if (p) {
			world.controls().autoRotate = false;
			world.pointOfView({ lat: p.lat, lng: p.lng, altitude: isKey(p) ? 1.7 : 1.4 }, 900);
		} else {
			world.controls().autoRotate = true;
		}
	}, []);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;
		mount.innerHTML = ''; // guard against StrictMode double-invoke

		const elMap = new Map<string, HTMLElement>();
		const world: GlobeInstance = Globe()(mount);
		worldRef.current = world;

		world
			.backgroundColor('rgba(0,0,0,0)')
			.globeImageUrl('/map/earth-night.jpg')
			.bumpImageUrl('/map/earth-topology.png')
			.showAtmosphere(true)
			.atmosphereColor('#3b82f6')
			.atmosphereAltitude(0.18)
			.htmlElementsData(PLACES)
			.htmlLat('lat')
			.htmlLng('lng')
			.htmlAltitude(0.004)
			.htmlElement((d: object) => {
				const p = d as Place;
				const el = document.createElement('div');
				el.className = 'map-marker' + (isKey(p) ? ' is-key' : '');
				el.innerHTML = `<span class="map-dot"></span><span class="map-label">${p.city}</span>`;
				el.addEventListener('click', (e) => {
					e.stopPropagation();
					select(p);
				});
				el.addEventListener('pointerenter', () => {
					hoveredRef.current = p;
				});
				el.addEventListener('pointerleave', () => {
					hoveredRef.current = null;
				});
				elMap.set(p.id, el);
				return el;
			});

		world.controls().autoRotate = true;
		world.controls().autoRotateSpeed = 0.42;
		world.controls().enableDamping = true;
		world.onZoom((pov: { altitude: number }) => {
			altRef.current = pov.altitude;
		});

		const resize = () => {
			world.width(mount.clientWidth);
			world.height(mount.clientHeight);
		};
		resize();
		world.pointOfView({ lat: -8, lng: 135, altitude: 2.4 }, 0);
		const ro = new ResizeObserver(resize);
		ro.observe(mount);

		const nearSide = (p: Place) => {
			const C = world.camera().position;
			const D = C.length();
			const R = world.getGlobeRadius();
			const g = world.getCoords(p.lat, p.lng, 0);
			const len = Math.hypot(g.x, g.y, g.z) || 1;
			return (g.x * C.x + g.y * C.y + g.z * C.z) / (len * D) > R / D + 0.02;
		};
		const prio = (p: Place) =>
			(p === selectedRef.current ? 4 : 0) + (p === hoveredRef.current ? 3 : 0) + (isKey(p) ? 2 : 0);

		let raf = 0;
		const tick = () => {
			const placed: { x: number; y: number }[] = [];
			const show = new Set<Place>();
			for (const p of [...PLACES].sort((a, b) => prio(b) - prio(a))) {
				if (!elMap.has(p.id) || !nearSide(p)) continue;
				const forced = isKey(p) || p === selectedRef.current || p === hoveredRef.current;
				if (!forced && altRef.current >= REVEAL) continue;
				const sc = world.getScreenCoords(p.lat, p.lng, 0.004);
				if (!sc) continue;
				if (!forced && placed.some((q) => Math.hypot(q.x - sc.x, q.y - sc.y) < 92)) continue;
				placed.push(sc);
				show.add(p);
			}
			for (const p of PLACES) {
				const el = elMap.get(p.id);
				if (!el) continue;
				const near = nearSide(p);
				el.style.opacity = near ? '1' : '0';
				el.style.pointerEvents = near ? 'auto' : 'none';
				el.classList.toggle('show-label', show.has(p));
				el.classList.toggle('is-sel', p === selectedRef.current);
				el.style.zIndex = String(p === selectedRef.current || p === hoveredRef.current ? 6 : isKey(p) ? 4 : 2);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			try {
				world._destructor?.();
			} catch {
				/* ignore */
			}
			mount.innerHTML = '';
			worldRef.current = null;
		};
	}, [select]);

	return (
		<section className='relative h-[calc(100dvh-5.5rem)] min-h-[560px] w-full overflow-hidden font-mono'>
			<div ref={mountRef} className='absolute inset-0' aria-hidden />

			<div className='pointer-events-none absolute left-6 top-6 max-w-[16rem] sm:left-10 sm:top-10 sm:max-w-sm'>
				<div className='text-xs font-semibold uppercase tracking-[0.25em] text-accent'>Journey</div>
				<h1 className='mt-2 text-3xl font-extrabold text-white sm:text-4xl'>
					Places I've <span className='text-gradient'>been</span>
				</h1>
				<p className='mt-3 hidden text-sm text-zinc-400 sm:block'>
					Spin the globe to trace where I've studied, worked and travelled. Tap a pin to read the story.
				</p>
				<div className='mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500'>
					<span>
						<b className='text-zinc-300'>5</b> countries
					</span>
					<span>
						<b className='text-zinc-300'>20</b> places
					</span>
					<span>
						<b className='text-accent'>◆</b> lived / studied
					</span>
				</div>
			</div>

			<Legend selected={selected} onSelect={select} />
			{selected && <InfoCard place={selected} onClose={() => select(null)} />}
		</section>
	);
}

function Legend({ selected, onSelect }: { selected: Place | null; onSelect: (p: Place) => void }) {
	const order: string[] = [];
	const groups: Record<string, Place[]> = {};
	for (const p of PLACES) {
		if (!groups[p.country]) {
			groups[p.country] = [];
			order.push(p.country);
		}
		groups[p.country].push(p);
	}
	return (
		<div className='glass pointer-events-auto absolute bottom-6 left-10 hidden max-w-md rounded-2xl p-4 lg:block'>
			<div className='mb-3 text-[11px] uppercase tracking-[0.15em] text-zinc-500'>Where I've been</div>
			{order.map((country) => (
				<div key={country} className='mb-2 grid grid-cols-[96px_1fr] items-baseline gap-x-3 gap-y-1.5 last:mb-0'>
					<div className='flex items-center gap-1.5 text-[13px] font-semibold text-white'>
						<span className='h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]' />
						{country}
					</div>
					<div className='flex flex-wrap gap-x-1.5 gap-y-1'>
						{groups[country].map((p) => (
							<button
								key={p.id}
								onClick={() => onSelect(p)}
								className={`rounded-md px-1 py-0.5 text-xs transition-colors hover:bg-accent/15 hover:text-white ${
									selected?.id === p.id ? 'bg-accent/15 text-white' : isKey(p) ? 'text-accent-soft' : 'text-zinc-400'
								}`}
							>
								{isKey(p) && <span className='mr-0.5 text-[9px]'>◆</span>}
								{p.city}
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

function InfoCard({ place, onClose }: { place: Place; onClose: () => void }) {
	const [src, setSrc] = useState(photoUrl(place));
	useEffect(() => {
		setSrc(photoUrl(place));
	}, [place]);

	return (
		<div className='glass pointer-events-auto absolute inset-x-3 bottom-3 z-30 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-6 sm:w-[360px]'>
			<button
				onClick={onClose}
				aria-label='Close'
				className='absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/45 text-lg text-white backdrop-blur transition-colors hover:bg-black/70'
			>
				×
			</button>
			<div className='relative h-[150px]'>
				<img
					src={src}
					onError={() => setSrc(photoPlaceholder(place.city))}
					alt={`${place.city}`}
					className='h-full w-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent' />
				<span
					className='absolute bottom-3 left-5 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur'
					style={{ borderColor: `${ACCENT}73`, background: `${ACCENT}38` }}
				>
					{place.tag || 'Visited'}
				</span>
			</div>
			<div className='px-6 pb-6 pt-4'>
				<h2 className='text-[26px] font-bold text-white'>{place.city}</h2>
				<div className='mt-0.5 text-[13px] text-zinc-400'>{place.country}</div>
				<p className='mt-3.5 text-[13px] leading-relaxed text-zinc-200'>{place.highlight}</p>
				{place.roles && (
					<div className='mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4'>
						{place.roles.map((r) => (
							<div key={r.org} className='border-l-2 border-accent/40 pl-3'>
								<div className='text-sm font-semibold text-white'>{r.org}</div>
								<div className='mt-0.5 text-xs leading-snug text-zinc-400'>{r.detail}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
