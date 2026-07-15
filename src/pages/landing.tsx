import ContactSection from '../../components/Contact';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const STACK = ['C++', 'Python', 'TypeScript', 'React', 'pandas'];

export default function Landing() {
	const contactRef = useRef<HTMLElement | null>(null);
	const { hash } = useLocation();

	useEffect(() => {
		if (hash === '#contact' && contactRef.current) {
			contactRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [hash]);

	const handleScrollToContact = useCallback(() => {
		if (contactRef.current) {
			contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, []);

	return (
		<>
			<section className='relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-16 text-center font-mono'>
				<span className='mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300'>
					<span className='relative flex h-2 w-2'>
						<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
						<span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
					</span>
					Open to internships & collaboration
				</span>

				<h1 className='max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-6xl 2xl:text-7xl'>
					Hi, I'm Alex —<br className='hidden sm:block' />
					<span className='text-gradient'> software engineer</span>
				</h1>

				<p className='mt-7 max-w-md text-sm text-zinc-400 sm:max-w-xl sm:text-base 2xl:max-w-2xl 2xl:text-lg'>
					A computer science student with a passion for mathematics, low-latency systems and turning
					complex ideas into elegant software.
				</p>

				<div className='mt-9 flex flex-col items-center gap-3 sm:flex-row'>
					<Link
						to='/projects'
						className='group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-transform duration-200 hover:scale-105 hover:bg-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
					>
						View my work
						<HiArrowRight className='transition-transform duration-200 group-hover:translate-x-1' />
					</Link>
					<button
						onClick={handleScrollToContact}
						className='inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors duration-200 hover:border-white/30 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
					>
						Get in touch
					</button>
				</div>

				<ul className='mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500'>
					{STACK.map((tech) => (
						<li key={tech} className='rounded-full border border-white/10 bg-white/[0.03] px-3 py-1'>
							{tech}
						</li>
					))}
				</ul>

				<button
					type='button'
					onClick={handleScrollToContact}
					aria-label='Scroll to contact section'
					className='absolute bottom-6 text-3xl text-zinc-500 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
				>
					<MdKeyboardDoubleArrowDown className='animate-float' />
				</button>
			</section>

			<section ref={contactRef} id='contact' className='scroll-mt-24'>
				<ContactSection />
			</section>
		</>
	);
}
