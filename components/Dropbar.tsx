import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'motion/react';

type DropbarProps = {
	options: string[];
};

const CONTAINERVARIANTS: Variants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			bounce: 0,
			duration: 0.35,
			ease: [0.16, 1, 0.3, 1],
			delayChildren: 0.05,
			staggerChildren: 0.06
		}
	},
	closed: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.25,
			ease: [0.4, 0, 1, 1],
			staggerChildren: 0.05,
			staggerDirection: -1
		}
	}
};

const ITEMVARIANTS: Variants = {
	open: { opacity: 1, y: 0 },
	closed: { opacity: 0, y: -12 }
};

export default function Dropbar({ options }: DropbarProps) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleContact = () => {
		setOpen(false);
		if (pathname === '/') {
			window.location.hash = 'contact';
		} else {
			navigate('/#contact');
		}
	};

	const handleNav = () => setOpen(false);

	return (
		<div>
			<button
				aria-label='Toggle menu'
				onClick={() => setOpen(!open)}
				className={`sm:hidden ${open ? 'fixed' : 'absolute'} top-10 right-8 z-50 text-xl`}
			>
				{open ? <IoClose /> : <IoMenu />}
			</button>

			<AnimatePresence>
				{open && (
					<motion.nav
						key='dropbar'
						initial='closed'
						animate='open'
						exit='closed'
						variants={CONTAINERVARIANTS}
						className='sm:hidden absolute mr-10 right-0 top-15 z-50'
					>
						<motion.ul className='flex flex-col px-6 py-4 space-y-5 text-sm'>
							{options.map((item) => (
								<motion.li key={item}>
									<Link to={`/${item.toLowerCase()}`} onClick={handleNav} className='block font-medium'>
										{item}
									</Link>
								</motion.li>
							))}

							<motion.li variants={ITEMVARIANTS}>
								<a href='/AZResume.pdf' onClick={handleNav} className='block font-medium'>
									Resume
								</a>
							</motion.li>
							<motion.li variants={ITEMVARIANTS}>
								<button onClick={handleContact} className='block w-full font-medium'>
									Contact
								</button>
							</motion.li>
						</motion.ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</div>
	);
}
