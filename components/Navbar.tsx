import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Dropbar from './Dropbar';

type NavProps = {
	options: string[];
};

export default function Navbar({ options }: NavProps) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onContactClick = () => {
		if (pathname === '/') {
			window.location.hash = 'contact';
		} else {
			navigate('/#contact');
		}
	};

	const linkBase =
		'relative rounded-md px-3 py-1.5 font-medium text-zinc-400 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';

	return (
		<div className='sticky top-0 z-40 px-4 pt-4 sm:px-6'>
			<nav
				aria-label='Primary'
				className='glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 font-mono shadow-lg shadow-black/20 sm:px-6'
			>
				<Link
					to='/'
					className='group flex items-center gap-2 rounded-md px-1 font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
				>
					<span className='grid h-7 w-7 place-items-center rounded-lg bg-accent-strong/20 text-accent ring-1 ring-accent/30 transition-transform duration-300 group-hover:scale-105'>
						{'</>'}
					</span>
					<span className='hidden sm:inline'>AlZ11</span>
				</Link>

				<ul className='hidden items-center gap-1 text-sm sm:flex xl:text-base'>
					{options.map((item) => (
						<li key={item}>
							<NavLink
								to={`/${item.toLowerCase()}`}
								className={({ isActive }) => `${linkBase} ${isActive ? 'text-white' : ''}`}
							>
								{({ isActive }) => (
									<>
										{item}
										<span
											className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-200 ${
												isActive ? 'scale-x-100' : 'scale-x-0'
											}`}
										/>
									</>
								)}
							</NavLink>
						</li>
					))}
					<li>
						<a
							href='/Alex_Resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className={linkBase}
						>
							Resume
						</a>
					</li>
					<li className='ml-1'>
						<button
							onClick={onContactClick}
							className='rounded-full bg-white px-4 py-1.5 font-semibold text-zinc-900 transition-transform duration-200 hover:scale-105 hover:bg-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
						>
							Contact
						</button>
					</li>
				</ul>

				<div className='sm:hidden'>
					<Dropbar options={options} />
				</div>
			</nav>
		</div>
	);
}
