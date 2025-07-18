import ContactSection from '../../components/Contact';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

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
			<section className='flex flex-col items-center justify-center min-h-screen py-10 px-10 font-mono text-center pointer-events-none'>
				<h1 className='font-extrabold tracking-tight text-4xl md:text-5xl 2xl:text-7xl'>
					AlZ11 -&nbsp;
					<span className='text-blue-600 dark:text-blue-500'>software developer</span>
				</h1>
				<p className='mt-7 text-muted-foreground text-wrap max-w-sm md:max-w-xl 2xl:max-w-2xl text-md md:text-lg 2xl:text-xl'>
					I'm Alex — a computer science student with a passion for data science and software development
				</p>
				<button
					type='button'
					onClick={handleScrollToContact}
					aria-label='Scroll to contact section'
					className='text-6xl animate-bounce [animation-duration:3s] pt-70 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'
				>
					<MdKeyboardDoubleArrowDown />
				</button>
			</section>
			<section ref={contactRef} id='contact' className='scroll-mt-0'>
				<ContactSection />
			</section>
		</>
	);
}
