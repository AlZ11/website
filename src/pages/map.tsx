import { HiMap } from 'react-icons/hi2';

export default function Map() {
	return (
		<section className='flex min-h-[60vh] flex-col items-center justify-center px-6 text-center font-mono'>
			<span className='grid h-16 w-16 place-items-center rounded-2xl bg-accent-strong/15 text-2xl text-accent ring-1 ring-accent/20'>
				<HiMap />
			</span>
			<h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl'>Coming soon</h2>
			<p className='mt-3 max-w-md text-sm text-zinc-400'>
				An interactive map of the places I've lived, studied and played is in the works. Check back soon.
			</p>
		</section>
	);
}
