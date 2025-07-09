import { Link } from 'react-router-dom';

type NavbarProps = {
	options: string[];
};

export default function Navbar({ options }: NavbarProps) {
	return (
		<nav
			aria-label='Primary'
			className='flex items-center justify-between gap-6 mx-4 sm:mx-14 md:mx-18 lg:mx-30 py-10 text-3xl font-mono '
		>
			<Link to={'/'} className='font-bold tracking-tight text-5xl hover:scale-120 transition duration-300 ease-in-out'>
				AlZ11
			</Link>

			<ul className={`grid grid-flow-col auto-cols-max gap-8 rounded-md px-4 py-2`}>
				{options.map((item) => (
					<li key={item} className='hover:scale-120 transition duration-300 ease-in-out'>
						<Link to={`/${item.toLowerCase()}`} className='font-medium focus:outline-none focus-visible:ring-'>
							{item}
						</Link>
					</li>
				))}
				<li>
					<a href='AZResume.pdf'>Resume</a>
				</li>
				<li>
					<a href='#contact'>Contact</a>
				</li>
			</ul>
		</nav>
	);
}
