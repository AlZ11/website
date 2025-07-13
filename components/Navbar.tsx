import { Link, useNavigate, useLocation } from 'react-router-dom';

type NavbarProps = {
	options: string[];
};

export default function Navbar({ options }: NavbarProps) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onContactClick = () => {
		if (pathname === '/') {
			window.location.hash = 'contact';
		} else {
			navigate('/#contact');
		}
	};

	return (
		<nav
			aria-label='Primary'
			className='
			flex items-center justify-between gap-6 py-10 font-mono
			sm:mx-10
			md:mx-15 
			lg:mx-10
			lg:text-md
			xl:text-lg'
		>
			<Link to={'/'} className='font-bold hover:scale-120 transition duration-300 ease-in-out mx-8'>
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
				<li className='hover:scale-120 transition duration-300 ease-in-out'>
					<a href='../public/AZResume.pdf'>Resume</a>
				</li>
				<li className='hover:scale-120 transition duration-300 ease-in-out'>
					<button onClick={onContactClick}>Contact</button>
				</li>
			</ul>
		</nav>
	);
}
