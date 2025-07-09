import { Link } from 'react-router-dom';

type NavbarProps = {
	options: string[];
};

export default function Navbar({ options }: NavbarProps) {
	return (
		<nav
			aria-label='Primary'
			className='flex items-center justify-between gap-6 mx-4 sm:mx-14 md:mx-18 lg:mx-30 py-10 text-3xl font-mono'
		>
			<Link to={'/'} className='font-bold tracking-tight text-5xl'>
				AlZ11
			</Link>

			<ul className={`grid grid-flow-col auto-cols-max gap-6 rounded-md px-4 py-2`}>
				{options.map((item) => (
					<li key={item}>
						<Link
							to={`/${item.toLowerCase()}`}
							className='font-medium transition duration-300 hover:scale-110 focus:outline-none focus-visible:ring-'
						>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
