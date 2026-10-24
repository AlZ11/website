import { Suspense, lazy } from 'react';

const MapGlobe = lazy(() => import('./MapGlobe'));

export default function Map() {
	return (
		<Suspense
			fallback={
				<section className='flex h-[calc(100dvh-5.5rem)] min-h-[560px] items-center justify-center font-mono text-sm text-zinc-500'>
					<span className='animate-pulse'>Loading globe…</span>
				</section>
			}
		>
			<MapGlobe />
		</Suspense>
	);
}
