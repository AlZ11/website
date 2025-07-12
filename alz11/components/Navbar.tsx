import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

type NavbarProps = {
	options: string[];
};

export default function Navbar({ options }: NavbarProps) {
	const [open, setOpen] = useState(false);

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
					<a href='AZResume.pdf'>Resume</a>
				</li>
				<li className='hover:scale-120 transition duration-300 ease-in-out'>
					<a href='#contact'>Contact</a>
				</li>
			</ul>
		</nav>
	);
}
