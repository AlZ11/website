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
			delayChildren: 0.06,
			staggerChildren: 0.06
		}
	},
	closed: {
		opacity: 0,
		y: -12,
		transition: {
			duration: 0.2,
			ease: [0.4, 0, 1, 1],
			staggerChildren: 0.04,
			staggerDirection: -1
		}
	}
};

const ITEMVARIANTS: Variants = {
	open: { opacity: 1, y: 0 },
	closed: { opacity: 0, y: -8 }
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

	const itemClass =
		'block rounded-lg px-4 py-2 font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white';

	return (
		<div className='relative'>
			<button
				aria-label='Toggle menu'
				aria-expanded={open}
				onClick={() => setOpen(!open)}
				className='grid h-9 w-9 place-items-center rounded-full text-xl text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
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
						className='glass absolute right-0 top-12 z-50 w-52 origin-top-right rounded-2xl p-2 shadow-xl shadow-black/40'
					>
						<motion.ul className='flex flex-col gap-1 text-sm'>
							{options.map((item) => (
								<motion.li variants={ITEMVARIANTS} key={item}>
									<Link to={`/${item.toLowerCase()}`} onClick={handleNav} className={itemClass}>
										{item}
									</Link>
								</motion.li>
							))}

							<motion.li variants={ITEMVARIANTS}>
								<a
									href='/Alex_Resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									onClick={handleNav}
									className={itemClass}
								>
									Resume
								</a>
							</motion.li>
							<motion.li variants={ITEMVARIANTS} className='pt-1'>
								<button
									onClick={handleContact}
									className='block w-full rounded-lg bg-white px-4 py-2 text-center font-semibold text-zinc-900 transition-colors hover:bg-accent hover:text-white'
								>
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
