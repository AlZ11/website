import { Link } from 'react-router-dom';
import ContactSection from '../../components/Contact';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

export default function Landing() {
	return (
		<>
			<section className='flex flex-col items-center justify-center min-h-screen -translate-y-30 py-10 font-mono text-center pointer-events-none'>
				<h1 className='max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-8xl'>
					AlZ11 -&nbsp;
					<span className='text-blue-600 dark:text-blue-500'>software developer</span>
				</h1>
				<p className='max-w-xl mt-7 text-lg text-muted-foreground'>
					I'm Alex — a computer science student with a passion for data science and software development
				</p>
				<div className='text-6xl animate-bounce pt-70'>
					<a href='placeholder'>
						<MdKeyboardDoubleArrowDown />
					</a>
				</div>
			</section>
			<ContactSection />
		</>
	);
}
